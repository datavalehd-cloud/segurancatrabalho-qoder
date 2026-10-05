// Gera supabase/seed.sql a partir de supabase/export/instructor-report.json.
// Uso: node scripts/generate-seed.mjs
// Idempotente: usa ON CONFLICT DO NOTHING, então reexecutar não duplica registros.
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const inPath = join(root, "supabase", "export", "instructor-report.json");
const outPath = join(root, "supabase", "seed.sql");

function sqlText(v) {
  if (v === null || v === undefined) return "null";
  return `'${String(v).replace(/'/g, "''")}'`;
}
function sqlBool(v) { return v ? "true" : "false"; }

const report = JSON.parse(await readFile(inPath, "utf8"));
const students = Array.isArray(report.students) ? report.students : [];

const resultRows = [];
const certRows = [];

for (const s of students) {
  if (!s || typeof s.email !== "string") continue;
  const email = s.email.toLowerCase();
  const name = s.name ?? "";
  const company = s.company ?? "";
  const modules = s.modules && typeof s.modules === "object" ? s.modules : {};
  for (const [lessonId, m] of Object.entries(modules)) {
    if (!m || typeof m !== "object") continue;
    resultRows.push(
      `(${sqlText(name)}, ${sqlText(email)}, ${sqlText(company)}, ${sqlText(lessonId)}, ` +
      `${Number(m.score) | 0}, ${Number(m.total) | 0}, ${sqlBool(m.passed === true)}, ` +
      `${m.completed_at ? sqlText(m.completed_at) : "now()"})`
    );
  }
  if (s.certificate && typeof s.certificate.code === "string") {
    certRows.push(
      `(${sqlText(s.certificate.code)}, ${sqlText(name)}, ${sqlText(email)}, ${sqlText(company)}, ` +
      `${s.certificate.issuedAt ? sqlText(s.certificate.issuedAt) : "now()"})`
    );
  }
}

const chunks = [];
chunks.push("-- Seed gerado de instructor-report.json (site Qoder). Reexecutável (ON CONFLICT DO NOTHING).");
chunks.push(`-- ${resultRows.length} resultado(s), ${certRows.length} certificado(s).`);

if (resultRows.length) {
  chunks.push("insert into public.training_results (student_name, email, company, lesson_id, score, total, passed, completed_at) values");
  chunks.push(resultRows.join(",\n") + "\non conflict (email, lesson_id) do nothing;");
}
if (certRows.length) {
  chunks.push("insert into public.certificates (code, student_name, email, company, issued_at) values");
  chunks.push(certRows.join(",\n") + "\non conflict (code) do nothing;");
}

await writeFile(outPath, chunks.join("\n\n") + "\n", "utf8");
console.log(`OK: ${resultRows.length} training_results e ${certRows.length} certificates -> ${outPath}`);
