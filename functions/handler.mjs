// Portal de Treinamentos JL Consultoria — handler de negócio.
// Ações:
//   POST ?action=save_result        registra resultado de quiz (upsert por aluno+módulo)
//   GET  ?action=my_results&email=  resultados do aluno
//   POST ?action=issue_certificate  emite certificado se todos os módulos foram aprovados
//   POST ?action=instructor_report  progresso agregado por aluno (senha conferida via PBKDF2)
//   POST ?action=instructor_save_result  instrutor registra módulo do aluno (senha no corpo)
//   POST ?action=instructor_delete       instrutor apaga um módulo ou o aluno inteiro (senha no corpo)
const json = (body, status = 200, headers = {}) => Response.json(body, {
  status,
  headers: { "cache-control": "no-store", ...headers },
});

const LESSON_IDS = [
  "incendio", "nr6", "cortes", "engasgo", "rcp",
  "queimaduras", "fraturas", "choque", "samu",
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASS_RATIO = 0.75;

function str(v, min, max) {
  return typeof v === "string" && v.trim().length >= min && v.trim().length <= max ? v.trim() : null;
}

async function readBody(request) {
  if (request.method !== "POST") return null;
  const type = request.headers.get("content-type") || "";
  if (!type.includes("application/json")) return null;
  try {
    const text = await request.text();
    if (text.length > 8192) return null;
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function storeResult(supabase, body) {
  if (!body || typeof body !== "object") return json({ error: "invalid_input" }, 400);

  const name = str(body.name, 2, 100);
  const emailRaw = str(body.email, 5, 160);
  const company = body.company == null || body.company === "" ? "" : str(body.company, 2, 100);
  const lessonId = LESSON_IDS.includes(body.lessonId) ? body.lessonId : null;
  const score = Number.isInteger(body.score) ? body.score : NaN;
  const total = Number.isInteger(body.total) ? body.total : NaN;
  const email = emailRaw && EMAIL_RE.test(emailRaw) ? emailRaw.toLowerCase() : null;

  if (!name || !email || company === null || !lessonId ||
      !Number.isSafeInteger(score) || !Number.isSafeInteger(total) ||
      total < 1 || total > 50 || score < 0 || score > total) {
    return json({ error: "invalid_input" }, 400);
  }
  const passed = score / total >= PASS_RATIO;

  const { data, error } = await supabase.from("training_results").upsert({
    id: crypto.randomUUID(),
    student_name: name,
    email,
    company,
    lesson_id: lessonId,
    score,
    total,
    passed,
    completed_at: new Date().toISOString(),
  }, { onConflict: "email,lesson_id" })
    .select("id,student_name,email,company,lesson_id,score,total,passed,completed_at")
    .single();
  if (error || !data) return json({ error: "database_request_failed" }, 503);

  return json({
    ok: true,
    record: {
      lesson_id: data.lesson_id, score: data.score, total: data.total,
      passed: data.passed, completed_at: data.completed_at,
    },
  });
}

async function saveResult({ request, supabase }, params) {
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405, { allow: "POST" });
  return storeResult(supabase, await readBody(request));
}

async function myResults({ supabase }, params) {
  const emailRaw = (params.get("email") || "").trim().toLowerCase();
  if (!EMAIL_RE.test(emailRaw) || emailRaw.length > 160) return json({ error: "invalid_input" }, 400);

  const { data, error } = await supabase.from("training_results")
    .select("lesson_id,score,total,passed,completed_at")
    .eq("email", emailRaw)
    .order("lesson_id", { ascending: true })
    .limit(LESSON_IDS.length * 2);
  if (error || !Array.isArray(data)) return json({ error: "database_request_failed" }, 503);
  return json({ ok: true, items: data });
}

function certCode() {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  return "DV-" + Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
}

async function issueCertificate({ request, supabase }, params) {
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405, { allow: "POST" });
  const body = await readBody(request);
  if (!body || typeof body !== "object") return json({ error: "invalid_input" }, 400);

  const name = str(body.name, 2, 100);
  const emailRaw = str(body.email, 5, 160);
  const company = body.company == null || body.company === "" ? "" : str(body.company, 2, 100);
  const email = emailRaw && EMAIL_RE.test(emailRaw) ? emailRaw.toLowerCase() : null;
  if (!name || !email || company === null) return json({ error: "invalid_input" }, 400);

  const { data: results, error: rErr } = await supabase.from("training_results")
    .select("lesson_id,passed")
    .eq("email", email)
    .limit(LESSON_IDS.length * 2);
  if (rErr || !Array.isArray(results)) return json({ error: "database_request_failed" }, 503);

  const passedIds = new Set(results.filter((r) => r.passed === true).map((r) => r.lesson_id));
  const missing = LESSON_IDS.filter((id) => !passedIds.has(id));
  if (missing.length > 0) return json({ error: "not_all_passed", missing }, 400);

  // Certificado existente é reutilizado (idempotente por aluno).
  const { data: existing, error: eErr } = await supabase.from("certificates")
    .select("id,code,student_name,company,issued_at")
    .eq("email", email)
    .order("issued_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (eErr) return json({ error: "database_request_failed" }, 503);
  if (existing) {
    return json({ ok: true, code: existing.code, issuedAt: existing.issued_at, name: existing.student_name, company: existing.company });
  }

  const code = certCode();
  const issuedAt = new Date().toISOString();
  const { data: created, error: cErr } = await supabase.from("certificates").insert({
    id: crypto.randomUUID(),
    code,
    student_name: name,
    email,
    company,
    issued_at: issuedAt,
  }).select("id,code,issued_at").single();
  if (cErr || !created) return json({ error: "database_request_failed" }, 503);

  return json({ ok: true, code: created.code, issuedAt: created.issued_at, name, company });
}

// ---------- área do instrutor ----------
// Verificador PBKDF2 da senha única do instrutor (a senha em si não é armazenada).
// Trocar a senha = regenerar salt+hash e republicar esta Function.
const INSTRUCTOR_KDF = {
  saltHex: "3c13284642b5702cd83fe916444c742f",
  hashHex: "7516290eaad8707e827fbaa0c2e5e4aaaaf7fca16c7388a379f164bd51e2f938",
  iterations: 600000,
};
const FAIL_WINDOW_MS = 5 * 60 * 1000;
const FAIL_MAX = 10;
const failCounts = new Map(); // melhor esforço por instância, sem estado compartilhado

function hexToBytes(hex) {
  return Uint8Array.from(hex.match(/../g) || [], (h) => parseInt(h, 16));
}

function bytesEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function passwordMatches(input) {
  if (typeof input !== "string" || input.length < 8 || input.length > 200) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(input), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: hexToBytes(INSTRUCTOR_KDF.saltHex), iterations: INSTRUCTOR_KDF.iterations, hash: "SHA-256" },
    key, 256);
  return bytesEqual(new Uint8Array(bits), hexToBytes(INSTRUCTOR_KDF.hashHex));
}

function clientIp(request) {
  return (request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
}

function throttled(ip) {
  const now = Date.now();
  const entry = failCounts.get(ip);
  if (entry && entry.resetAt > now) return entry.fails >= FAIL_MAX;
  if (entry) failCounts.delete(ip);
  return false;
}

function registerFail(ip) {
  const now = Date.now();
  const entry = failCounts.get(ip);
  if (entry && entry.resetAt > now) entry.fails += 1;
  else failCounts.set(ip, { fails: 1, resetAt: now + FAIL_WINDOW_MS });
}

async function readInstructorPassword(request) {
  const body = await readBody(request);
  if (body && typeof body.password === "string") return body.password;
  const header = request.headers.get("x-instructor-pass");
  return typeof header === "string" ? header : null;
}

async function instructorReport({ request, supabase }) {
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405, { allow: "POST" });
  const ip = clientIp(request);
  if (throttled(ip)) return json({ error: "too_many_attempts" }, 429);
  const password = await readInstructorPassword(request);
  if (!(await passwordMatches(password))) {
    registerFail(ip);
    return json({ error: "invalid_credentials" }, 401);
  }
  failCounts.delete(ip);

  const { data: results, error: rErr } = await supabase.from("training_results")
    .select("email,student_name,company,lesson_id,score,total,passed,completed_at")
    .limit(5000);
  if (rErr || !Array.isArray(results)) return json({ error: "database_request_failed" }, 503);

  const { data: certs, error: cErr } = await supabase.from("certificates")
    .select("email,code,issued_at")
    .limit(2000);
  if (cErr || !Array.isArray(certs)) return json({ error: "database_request_failed" }, 503);

  const byEmail = new Map();
  for (const r of results) {
    if (!r || typeof r.email !== "string" || !LESSON_IDS.includes(r.lesson_id)) continue;
    let s = byEmail.get(r.email);
    if (!s) {
      s = { email: r.email, name: r.student_name || "", company: r.company || "", lastActivity: "", modules: {} };
      byEmail.set(r.email, s);
    }
    if ((r.completed_at || "") > s.lastActivity) {
      s.lastActivity = r.completed_at || s.lastActivity;
      if (r.student_name) s.name = r.student_name;
      if (r.company) s.company = r.company;
    }
    const prev = s.modules[r.lesson_id];
    if (!prev || (r.completed_at || "") >= (prev.completed_at || "")) {
      s.modules[r.lesson_id] = {
        score: r.score, total: r.total, passed: r.passed === true, completed_at: r.completed_at,
      };
    }
  }

  const certByEmail = new Map();
  for (const c of certs) {
    if (!c || typeof c.email !== "string") continue;
    const prev = certByEmail.get(c.email);
    if (!prev || (c.issued_at || "") < prev.issued_at) certByEmail.set(c.email, c);
  }

  const students = Array.from(byEmail.values()).map((s) => {
    const entries = Object.entries(s.modules);
    const passedCount = entries.filter(([, m]) => m.passed).length;
    const cert = certByEmail.get(s.email);
    return {
      email: s.email, name: s.name, company: s.company,
      passedCount, attempted: entries.length,
      modules: s.modules,
      lastActivity: s.lastActivity,
      certificate: cert ? { code: cert.code, issuedAt: cert.issued_at } : null,
    };
  }).sort((a, b) => (b.lastActivity || "").localeCompare(a.lastActivity || ""));

  const completedAll = students.filter((s) => s.passedCount === LESSON_IDS.length).length;
  return json({
    ok: true,
    totals: {
      students: students.length,
      completedAll,
      certificates: certByEmail.size,
      averageProgress: students.length
        ? Math.round(students.reduce((acc, s) => acc + s.passedCount / LESSON_IDS.length, 0) / students.length * 100)
        : 0,
    },
    lessonIds: LESSON_IDS,
    students,
  });
}

async function instructorSaveResult({ request, supabase }) {
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405, { allow: "POST" });
  const ip = clientIp(request);
  if (throttled(ip)) return json({ error: "too_many_attempts" }, 429);
  const body = await readBody(request);
  if (!body || typeof body !== "object") return json({ error: "invalid_input" }, 400);
  if (!(await passwordMatches(typeof body.password === "string" ? body.password : null))) {
    registerFail(ip);
    return json({ error: "invalid_credentials" }, 401);
  }
  failCounts.delete(ip);
  return storeResult(supabase, body);
}

async function instructorDelete({ request, supabase }) {
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405, { allow: "POST" });
  const ip = clientIp(request);
  if (throttled(ip)) return json({ error: "too_many_attempts" }, 429);
  const body = await readBody(request);
  if (!body || typeof body !== "object") return json({ error: "invalid_input" }, 400);
  if (!(await passwordMatches(typeof body.password === "string" ? body.password : null))) {
    registerFail(ip);
    return json({ error: "invalid_credentials" }, 401);
  }
  failCounts.delete(ip);

  const emailRaw = str(body.email, 5, 160);
  const email = emailRaw && EMAIL_RE.test(emailRaw) ? emailRaw.toLowerCase() : null;
  if (!email) return json({ error: "invalid_input" }, 400);
  const isModule = typeof body.lessonId === "string" && body.lessonId !== "" && body.lessonId !== "all";
  const lessonId = isModule ? (LESSON_IDS.includes(body.lessonId) ? body.lessonId : null) : null;
  if (isModule && !lessonId) return json({ error: "invalid_input" }, 400);

  let resultsQuery = supabase.from("training_results").delete().eq("email", email);
  if (lessonId) resultsQuery = resultsQuery.eq("lesson_id", lessonId);
  const { data: removedResults, error: rErr } = await resultsQuery.select("id");
  if (rErr) return json({ error: "database_request_failed" }, 503);

  let removedCerts = [];
  if (!lessonId) {
    const { data: certs, error: cErr } = await supabase.from("certificates")
      .delete().eq("email", email).select("id");
    if (cErr) return json({ error: "database_request_failed" }, 503);
    removedCerts = certs || [];
  }
  return json({
    ok: true,
    scope: lessonId ? "module" : "student",
    lessonId: lessonId || null,
    deleted: { results: (removedResults || []).length, certificates: removedCerts.length },
  });
}

export async function handlePortal({ request, supabase }) {
  const params = new URL(request.url).searchParams;
  const action = params.get("action");
  try {
    if (action === "save_result") return await saveResult({ request, supabase }, params);
    if (action === "my_results") {
      if (request.method !== "GET") return json({ error: "method_not_allowed" }, 405, { allow: "GET" });
      return await myResults({ supabase }, params);
    }
    if (action === "issue_certificate") return await issueCertificate({ request, supabase }, params);
    if (action === "instructor_report") return await instructorReport({ request, supabase }, params);
    if (action === "instructor_save_result") return await instructorSaveResult({ request, supabase }, params);
    if (action === "instructor_delete") return await instructorDelete({ request, supabase }, params);
    return json({ error: "not_found" }, 404);
  } catch {
    return json({ error: "database_request_failed" }, 503);
  }
}
