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

// Trilhas de certificação (NR-01, item 1.6.1.1): curso -> módulos, carga horária padrão.
// O conteúdo programático exibido no verso vive no catálogo do frontend (web/js/lessons.js).
const COURSES = {
  ps:   { nr: "",             title: "Primeiros Socorros — Atendimento Básico", hours: 8,  lessons: ["cortes", "engasgo", "rcp", "queimaduras", "fraturas", "choque", "samu"] },
  nr23: { nr: "NR-23",        title: "Proteção Contra Incêndios — Princípio de Incêndio", hours: 4, lessons: ["incendio"] },
  nr6:  { nr: "NR-06",        title: "Equipamentos de Proteção Individual (EPI)", hours: 2, lessons: ["nr6"] },
  nr35: { nr: "NR-35",        title: "Trabalho em Altura", hours: 8,  lessons: ["nr35"] },
  nr18: { nr: "NR-18",        title: "Segurança na Construção Civil", hours: 4,  lessons: ["nr18"] },
  nr12: { nr: "NR-12",        title: "Segurança no Trabalho em Máquinas e Equipamentos", hours: 8, lessons: ["nr12"] },
  nr11: { nr: "NR-11",        title: "Transporte, Movimentação, Armazenagem e Manuseio de Materiais", hours: 16, lessons: ["nr11"] },
  nr20: { nr: "NR-20",        title: "Segurança com Inflamáveis e Combustíveis — Curso Básico", hours: 4, lessons: ["nr20"] },
  nr17: { nr: "NR-17",        title: "Ergonomia", hours: 2,  lessons: ["nr17"] },
  gro:  { nr: "NR-01 (GRO)",  title: "Riscos Psicossociais no Trabalho", hours: 2,  lessons: ["gro"] },
};
const LESSON_IDS = Object.values(COURSES).flatMap((c) => c.lessons);
// Certificado consolidado: emitido quando o aluno conclui TODOS os módulos de TODOS os cursos.
const GENERAL_ID = "geral";
const GENERAL_TITLE = "Programa Completo — Segurança e Saúde do Trabalho";
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

async function loadSettings(supabase) {
  const { data, error } = await supabase.from("portal_settings")
    .select("id,institution_name,institution_cnpj,institution_address,technical_name,technical_registry,instructor_name,instructor_registry,location,modality,hours_override")
    .eq("id", "default")
    .maybeSingle();
  if (error) return { error };
  return { data: data || null };
}

function settingsSnapshot(s) {
  if (!s) return {};
  return {
    institutionName: s.institution_name || "",
    institutionCnpj: s.institution_cnpj || "",
    institutionAddress: s.institution_address || "",
    technicalName: s.technical_name || "",
    technicalRegistry: s.technical_registry || "",
    instructorName: s.instructor_name || "",
    instructorRegistry: s.instructor_registry || "",
    location: s.location || "",
    modality: s.modality || "",
  };
}

function courseHours(courseId, settings) {
  const course = COURSES[courseId];
  let hours = course.hours;
  if (settings && typeof settings.hours_override === "string" && settings.hours_override.trim()) {
    try {
      const map = JSON.parse(settings.hours_override);
      const v = map && map[courseId];
      if (Number.isFinite(v) && v > 0 && v <= 200) hours = Math.round(v);
    } catch { /* override inválido: mantém o padrão do catálogo */ }
  }
  return hours;
}

async function issueCertificate({ request, supabase }, params) {
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405, { allow: "POST" });
  const body = await readBody(request);
  if (!body || typeof body !== "object") return json({ error: "invalid_input" }, 400);

  const name = str(body.name, 2, 100);
  const emailRaw = str(body.email, 5, 160);
  const company = body.company == null || body.company === "" ? "" : str(body.company, 2, 100);
  const courseId = typeof body.courseId === "string" && (COURSES[body.courseId] || body.courseId === GENERAL_ID) ? body.courseId : null;
  const email = emailRaw && EMAIL_RE.test(emailRaw) ? emailRaw.toLowerCase() : null;
  if (!name || !email || company === null || !courseId) return json({ error: "invalid_input" }, 400);
  const isGeneral = courseId === GENERAL_ID;
  const requiredLessons = isGeneral ? LESSON_IDS : COURSES[courseId].lessons;
  const courseTitle = isGeneral ? GENERAL_TITLE : COURSES[courseId].title;

  const { data: results, error: rErr } = await supabase.from("training_results")
    .select("lesson_id,passed,completed_at")
    .eq("email", email)
    .limit(LESSON_IDS.length * 2);
  if (rErr || !Array.isArray(results)) return json({ error: "database_request_failed" }, 503);

  const passedRows = results.filter((r) => r.passed === true && requiredLessons.includes(r.lesson_id));
  const passedIds = new Set(passedRows.map((r) => r.lesson_id));
  const missing = requiredLessons.filter((id) => !passedIds.has(id));
  if (missing.length > 0) return json({ error: "not_all_passed", missing }, 400);

  const dates = passedRows.map((r) => r.completed_at).filter((d) => typeof d === "string").sort();
  const startedAt = dates[0] || new Date().toISOString();
  const finishedAt = dates[dates.length - 1] || startedAt;

  const { data: settings, error: sErr } = await loadSettings(supabase);
  if (sErr) return json({ error: "database_request_failed" }, 503);
  const snap = settingsSnapshot(settings);
  const hours = isGeneral
    ? Object.keys(COURSES).reduce((sum, cid) => sum + courseHours(cid, settings), 0)
    : courseHours(courseId, settings);

  // Certificado existente é reutilizado (idempotente por aluno + curso).
  const { data: existing, error: eErr } = await supabase.from("certificates")
    .select("id,code,student_name,company,issued_at,course_id,course_title,hours,started_at,finished_at,location,modality,institution_name,institution_cnpj,institution_address,technical_name,technical_registry,instructor_name,instructor_registry")
    .eq("email", email)
    .eq("course_id", courseId)
    .maybeSingle();
  if (eErr) return json({ error: "database_request_failed" }, 503);
  if (existing) {
    return json({ ok: true, ...settingsSnapshot(existing), code: existing.code, issuedAt: existing.issued_at, name: existing.student_name, company: existing.company, courseId, courseTitle: existing.course_title, hours: existing.hours, startedAt: existing.started_at, finishedAt: existing.finished_at });
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
    course_id: courseId,
    course_title: courseTitle,
    hours,
    started_at: startedAt,
    finished_at: finishedAt,
    location: snap.location,
    modality: snap.modality,
    institution_name: snap.institutionName,
    institution_cnpj: snap.institutionCnpj,
    institution_address: snap.institutionAddress,
    technical_name: snap.technicalName,
    technical_registry: snap.technicalRegistry,
    instructor_name: snap.instructorName,
    instructor_registry: snap.instructorRegistry,
  }).select("id,code,issued_at").single();
  if (cErr || !created) return json({ error: "database_request_failed" }, 503);

  return json({ ok: true, ...snap, code: created.code, issuedAt: created.issued_at, name, company, courseId, courseTitle, hours, startedAt, finishedAt });
}

async function myCertificates({ supabase }, params) {
  const emailRaw = (params.get("email") || "").trim().toLowerCase();
  if (!EMAIL_RE.test(emailRaw) || emailRaw.length > 160) return json({ error: "invalid_input" }, 400);

  const { data, error } = await supabase.from("certificates")
    .select("code,course_id,course_title,hours,started_at,finished_at,issued_at,location,modality,institution_name,institution_cnpj,institution_address,technical_name,technical_registry,instructor_name,instructor_registry")
    .eq("email", emailRaw)
    .order("issued_at", { ascending: true })
    .limit(50);
  if (error || !Array.isArray(data)) return json({ error: "database_request_failed" }, 503);
  return json({ ok: true, items: data });
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
    .select("email,code,course_id,course_title,issued_at")
    .limit(5000);
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

  const certsByEmail = new Map();
  for (const c of certs) {
    if (!c || typeof c.email !== "string") continue;
    const list = certsByEmail.get(c.email);
    const item = { code: c.code, courseId: c.course_id || "geral", courseTitle: c.course_title || "Curso de Segurança do Trabalho e Primeiros Socorros", issuedAt: c.issued_at };
    if (list) list.push(item); else certsByEmail.set(c.email, [item]);
  }

  const students = Array.from(byEmail.values()).map((s) => {
    const entries = Object.entries(s.modules);
    const passedCount = entries.filter(([, m]) => m.passed).length;
    const certificates = certsByEmail.get(s.email) || [];
    const coursesDone = Object.keys(COURSES).filter((cid) =>
      COURSES[cid].lessons.every((lid) => s.modules[lid] && s.modules[lid].passed));
    return {
      email: s.email, name: s.name, company: s.company,
      passedCount, attempted: entries.length,
      modules: s.modules,
      lastActivity: s.lastActivity,
      coursesDone,
      certificates,
      certificate: certificates[0] || null,
    };
  }).sort((a, b) => (b.lastActivity || "").localeCompare(a.lastActivity || ""));

  const completedAll = students.filter((s) => s.passedCount === LESSON_IDS.length).length;
  return json({
    ok: true,
    totals: {
      students: students.length,
      completedAll,
      certificates: certs.length,
      averageProgress: students.length
        ? Math.round(students.reduce((acc, s) => acc + s.passedCount / LESSON_IDS.length, 0) / students.length * 100)
        : 0,
    },
    lessonIds: LESSON_IDS,
    courseIds: Object.keys(COURSES),
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

// ---------- dados cadastrais do certificado (NR-01) ----------
const SETTINGS_FIELDS = {
  institution_name: [2, 160], institution_cnpj: [0, 32], institution_address: [0, 240],
  technical_name: [0, 100], technical_registry: [0, 60],
  instructor_name: [0, 100], instructor_registry: [0, 60],
  location: [0, 160], modality: [0, 60],
};

function parseSettingsBody(body) {
  const out = {};
  for (const [field, [min, max]] of Object.entries(SETTINGS_FIELDS)) {
    const raw = body[field];
    if (raw == null || raw === "") { out[field] = ""; continue; }
    const v = str(raw, min, max);
    if (v === null) return null;
    out[field] = v;
  }
  if (body.hours_override == null || body.hours_override === "") out.hours_override = "";
  else if (typeof body.hours_override === "object") {
    const clean = {};
    for (const [cid, v] of Object.entries(body.hours_override)) {
      if (COURSES[cid] && Number.isFinite(v) && v > 0 && v <= 200) clean[cid] = Math.round(v);
    }
    out.hours_override = JSON.stringify(clean);
  } else return null;
  return out;
}

async function instructorSettings({ request, supabase }) {
  if (request.method !== "GET") return json({ error: "method_not_allowed" }, 405, { allow: "GET" });
  const ip = clientIp(request);
  if (throttled(ip)) return json({ error: "too_many_attempts" }, 429);
  const password = request.headers.get("x-instructor-pass");
  if (!(await passwordMatches(password))) {
    registerFail(ip);
    return json({ error: "invalid_credentials" }, 401);
  }
  failCounts.delete(ip);
  const { data, error } = await loadSettings(supabase);
  if (error) return json({ error: "database_request_failed" }, 503);
  return json({ ok: true, settings: data });
}

async function instructorSaveSettings({ request, supabase }) {
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
  const fields = parseSettingsBody(body);
  if (!fields) return json({ error: "invalid_input" }, 400);

  const { data, error } = await supabase.from("portal_settings").upsert({
    id: "default",
    ...fields,
    updated_at: new Date().toISOString(),
  }, { onConflict: "id" })
    .select("id,institution_name,institution_cnpj,institution_address,technical_name,technical_registry,instructor_name,instructor_registry,location,modality,hours_override")
    .single();
  if (error || !data) return json({ error: "database_request_failed" }, 503);
  return json({ ok: true, settings: data });
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
    if (action === "my_certificates") {
      if (request.method !== "GET") return json({ error: "method_not_allowed" }, 405, { allow: "GET" });
      return await myCertificates({ supabase }, params);
    }
    if (action === "instructor_report") return await instructorReport({ request, supabase }, params);
    if (action === "instructor_settings") return await instructorSettings({ request, supabase });
    if (action === "instructor_save_settings") return await instructorSaveSettings({ request, supabase });
    if (action === "instructor_save_result") return await instructorSaveResult({ request, supabase }, params);
    if (action === "instructor_delete") return await instructorDelete({ request, supabase }, params);
    return json({ error: "not_found" }, 404);
  } catch {
    return json({ error: "database_request_failed" }, 503);
  }
}
