// Verificação local do handler com um cliente Supabase falso em memória.
// Uso: node dev/handler-check.mjs
import { handlePortal } from "../functions/handler.mjs";

const tables = { training_results: [], certificates: [] };

function matches(row, filters) {
  return Object.entries(filters).every(([k, v]) => row[k] === v);
}

function fakeQuery(table, filters) {
  const rows = tables[table];
  const q = {
    _filters: { ...filters },
    _op: null,
    _payload: null,
    select() { return q; },
    eq(col, val) { q._filters[col] = val; return q; },
    order() { return q; },
    limit() { return q; },
    single() { q._single = true; return q; },
    maybeSingle() { q._maybeSingle = true; return q; },
    upsert(payload, opts) {
      q._op = "upsert"; q._payload = payload; q._onConflict = opts?.onConflict;
      return q;
    },
    insert(payload) { q._op = "insert"; q._payload = payload; return q; },
    then(resolve) {
      let data = null, error = null;
      try {
        if (q._op === "upsert") {
          const [c1, c2] = q._onConflict.split(",");
          const existing = rows.find((r) => r[c1] === q._payload[c1] && r[c2] === q._payload[c2]);
          if (existing) Object.assign(existing, q._payload, { id: existing.id });
          else rows.push({ ...q._payload });
          data = q._payload;
        } else if (q._op === "insert") {
          rows.push({ ...q._payload });
          data = q._payload;
        } else {
          data = rows.filter((r) => matches(r, q._filters));
          if (q._single) data = data[0] ?? null;
          if (q._maybeSingle) data = data[0] ?? null;
        }
      } catch { error = { message: "fixture_error" }; }
      resolve({ data, error });
    },
  };
  return q;
}

const supabase = { from: (t) => fakeQuery(t, {}) };

function req(action, { method = "GET", body = null } = {}) {
  const url = `https://site.example/functions/v1/app?action=${action}${body?.email && action === "my_results" ? "&email=" + encodeURIComponent(body.email) : ""}`;
  return new Request(url, {
    method,
    headers: body ? { "content-type": "application/json" } : {},
    body: body && method === "POST" ? JSON.stringify(body) : null,
  });
}

let failures = 0;
function check(name, cond, extra) {
  if (cond) console.log(`PASS ${name}`);
  else { failures++; console.log(`FAIL ${name}`, extra ?? ""); }
}

// 1. Ação desconhecida → 404
let res = await handlePortal({ request: req("nope"), supabase });
check("unknown action 404", res.status === 404);

// 2. Entrada inválida → 400
res = await handlePortal({ request: req("save_result", { method: "POST", body: { name: "X", email: "sem-email", lessonId: "hack", score: 99, total: 4 } }), supabase });
check("invalid input 400", res.status === 400, await res.text());

// 3. Método errado → 405
res = await handlePortal({ request: req("save_result", { method: "GET" }), supabase });
check("GET save_result 405", res.status === 405);

// 4. Resultado aprovado (score 3/4 = 75%) — passed calculado no servidor
res = await handlePortal({ request: req("save_result", { method: "POST", body: { name: "Maria da Silva", email: "maria@empresa.com.br", company: "Indústria ABC", lessonId: "incendio", score: 3, total: 4, passed: false } }), supabase });
let data = await res.json();
check("save_result ok", res.status === 200 && data.ok === true && data.record.passed === true, JSON.stringify(data));

// 5. Reprovado 2/4
res = await handlePortal({ request: req("save_result", { method: "POST", body: { name: "Maria da Silva", email: "maria@empresa.com.br", company: "Indústria ABC", lessonId: "nr6", score: 2, total: 4 } }), supabase });
data = await res.json();
check("save_result fail stored", res.status === 200 && data.record.passed === false);

// 6. Upsert melhora a nota (mesmo email+módulo não duplica)
res = await handlePortal({ request: req("save_result", { method: "POST", body: { name: "Maria da Silva", email: "maria@empresa.com.br", company: "Indústria ABC", lessonId: "nr6", score: 4, total: 4 } }), supabase });
data = await res.json();
const nr6Rows = tables.training_results.filter((r) => r.lesson_id === "nr6");
check("upsert single row", nr6Rows.length === 1 && nr6Rows[0].passed === true && data.ok);

// 7. my_results
res = await handlePortal({ request: req("my_results", { body: { email: "maria@empresa.com.br" } }), supabase });
data = await res.json();
check("my_results 2 items", res.status === 200 && data.items.length === 2, JSON.stringify(data));

// 8. Certificado sem todos os módulos → 400 not_all_passed
res = await handlePortal({ request: req("issue_certificate", { method: "POST", body: { name: "Maria da Silva", email: "maria@empresa.com.br", company: "" } }), supabase });
data = await res.json();
check("certificate blocked", res.status === 400 && data.error === "not_all_passed" && data.missing.length === 7, JSON.stringify(data));

// 9. Conclui os demais módulos e emite certificado
const rest = ["cortes", "engasgo", "rcp", "queimaduras", "fraturas", "choque", "samu"];
for (const id of rest) {
  await handlePortal({ request: req("save_result", { method: "POST", body: { name: "Maria da Silva", email: "maria@empresa.com.br", company: "Indústria ABC", lessonId: id, score: 4, total: 4 } }), supabase });
}
res = await handlePortal({ request: req("issue_certificate", { method: "POST", body: { name: "Maria da Silva", email: "maria@empresa.com.br", company: "Indústria ABC" } }), supabase });
data = await res.json();
check("certificate issued", res.status === 200 && data.ok && /^DV-[0-9A-F]{12}$/.test(data.code), JSON.stringify(data));

// 10. Reemissão é idempotente (mesmo código)
res = await handlePortal({ request: req("issue_certificate", { method: "POST", body: { name: "Maria da Silva", email: "maria@empresa.com.br", company: "Indústria ABC" } }), supabase });
const again = await res.json();
check("certificate idempotent", again.code === data.code && tables.certificates.length === 1);

// 11. my_results com email inválido → 400
res = await handlePortal({ request: new Request("https://site.example/functions/v1/app?action=my_results&email=abc"), supabase });
check("my_results invalid email 400", res.status === 400);

console.log(failures === 0 ? "\nTODOS OS TESTES PASSARAM" : `\n${failures} FALHA(S)`);
process.exit(failures === 0 ? 0 : 1);
