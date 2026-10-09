import { handlePortal } from '../functions/handler.mjs';

function mockSupabase(tables) {
  const from = (table) => {
    const rows = () => tables[table];
    const st = { filters: [], ins: null, ups: null };
    const match = (arr) => arr.filter((r) => st.filters.every(([k, v]) => r[k] === v));
    const finalize = () => {
      if (st.ins) { rows().push(...st.ins); return st.ins; }
      if (st.ups) {
        for (const u of st.ups) {
          const i = rows().findIndex((x) => x.id === u.id);
          if (i >= 0) rows()[i] = { ...rows()[i], ...u }; else rows().push(u);
        }
        return st.ups;
      }
      return match(rows());
    };
    const b = {};
    const self = () => b;
    b.select = self; b.eq = (k, v) => { st.filters.push([k, v]); return b; };
    b.order = self; b.limit = self;
    b.insert = (r) => { st.ins = Array.isArray(r) ? r : [r]; return b; };
    b.upsert = (r) => { st.ups = Array.isArray(r) ? r : [r]; return b; };
    b.maybeSingle = async () => ({ data: finalize()[0] || null, error: null });
    b.single = async () => ({ data: finalize()[0] || null, error: null });
    b.then = (res) => res({ data: finalize(), error: null });
    return b;
  };
  return { from };
}

const tables = { training_results: [], certificates: [], portal_settings: [] };
const sb = mockSupabase(tables);
const BASE = 'https://x.test/app';
const req = (action, opts = {}) => new Request(`${BASE}?action=${action}`, opts);
const body = (o) => ({ method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(o) });

const out = (label, r) => r.json().then((j) => console.log(label, r.status, JSON.stringify(j)));

// 1) sem aprovação -> not_all_passed
await out('issue (no results):', await handlePortal({ request: req('issue_certificate', body({ name: 'Ana', email: 'ana@x.com', company: '', courseId: 'nr23' })), supabase: sb }));

// 2) aprova o único módulo do curso nr23
tables.training_results.push({ email: 'ana@x.com', lesson_id: 'incendio', passed: true, completed_at: '2026-10-01T10:00:00.000Z', score: 4, total: 4, student_name: 'Ana', company: '' });

// 3) settings snapshot presente
tables.portal_settings.push({ id: 'default', institution_name: 'JL Consultoria', institution_cnpj: '12.345.678/0001-90', institution_address: 'Rua A, 1', technical_name: 'Dr. Tec', technical_registry: 'CRM 1', instructor_name: 'Prof. Inst', instructor_registry: 'REG 2', location: 'São Paulo/SP', modality: 'Semipresencial', hours_override: '{"nr23":6}' });

const issued = await handlePortal({ request: req('issue_certificate', body({ name: 'Ana', email: 'ana@x.com', company: 'ACME', courseId: 'nr23' })), supabase: sb });
await out('issue (ok):', issued);

// 4) idempotência: mesma chamada reusa o certificado
await out('issue (again):', await handlePortal({ request: req('issue_certificate', body({ name: 'Ana', email: 'ana@x.com', company: 'ACME', courseId: 'nr23' })), supabase: sb }));

// 5) curso não concluído (ps exige 7 módulos)
await out('issue (ps incomplete):', await handlePortal({ request: req('issue_certificate', body({ name: 'Ana', email: 'ana@x.com', company: '', courseId: 'ps' })), supabase: sb }));

// 6) courseId inválido
await out('issue (bad course):', await handlePortal({ request: req('issue_certificate', body({ name: 'Ana', email: 'ana@x.com', company: '', courseId: 'zzz' })), supabase: sb }));

// 7) my_certificates
await out('my_certificates:', await handlePortal({ request: req('my_certificates&email=ana@x.com'), supabase: sb }));

// 8) certificado geral: Ana só concluiu 1 módulo -> not_all_passed
await out('issue geral (incompleto):', await handlePortal({ request: req('issue_certificate', body({ name: 'Ana', email: 'ana@x.com', company: '', courseId: 'geral' })), supabase: sb }));

// 9) Bruno conclui TODOS os módulos -> geral ok, hours = soma (com override nr23=6)
const ALL = ['cortes','engasgo','rcp','queimaduras','fraturas','choque','samu','incendio','nr6','nr35','nr18','nr12','nr11','nr20','nr17','gro'];
for (const [i, lid] of ALL.entries()) {
  tables.training_results.push({ email: 'bruno@x.com', lesson_id: lid, passed: true, completed_at: `2026-09-${String(i + 1).padStart(2, '0')}T10:00:00.000Z`, score: 4, total: 4, student_name: 'Bruno', company: '' });
}
const geral = await handlePortal({ request: req('issue_certificate', body({ name: 'Bruno', email: 'bruno@x.com', company: 'ACME', courseId: 'geral' })), supabase: sb });
const gj = await geral.json();
console.log('issue geral (ok):', geral.status, JSON.stringify(gj));
console.log('geral -> courseTitle:', gj.courseTitle, '| hours (esperado 60):', gj.hours, '| started:', gj.startedAt, '| finished:', gj.finishedAt);

// 10) idempotência do geral + endereço da instituição preservado
await out('issue geral (again):', await handlePortal({ request: req('issue_certificate', body({ name: 'Bruno', email: 'bruno@x.com', company: 'ACME', courseId: 'geral' })), supabase: sb }));

console.log('certificates rows:', tables.certificates.length, '| hours override aplicado:', tables.certificates[0]?.hours);
