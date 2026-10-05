// Exporta os dados atuais do site publicado no Qoder Sites via instructor_report.
// Uso (defina as variáveis NO SEU terminal; nunca commitá-las):
//   INSTRUCTOR_PASSWORD="••••" node scripts/export-instructor-report.mjs
// Opcional: PORTAL_REPORT_URL (padrão = host do site publicado).
// Saída: supabase/export/instructor-report.json (gitignored).
import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

const password = process.env.INSTRUCTOR_PASSWORD;
if (!password) {
  console.error("Defina INSTRUCTOR_PASSWORD no ambiente. A senha não é lida de arquivo.");
  process.exit(1);
}
const reportUrl =
  process.env.PORTAL_REPORT_URL ||
  "https://datavale-treinamentos-wodyumgi7rt.qoder.website/functions/v1/app?action=instructor_report";

const res = await fetch(reportUrl, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ password }),
});
const text = await res.text();
if (!res.ok) {
  console.error(`Falha ao obter relatório (HTTP ${res.status}). Verifique a senha e o throttle.`);
  process.exit(1);
}
let data;
try { data = JSON.parse(text); }
catch { console.error("Resposta não é JSON válido."); process.exit(1); }
if (!data || data.ok !== true || !Array.isArray(data.students)) {
  console.error("Resposta inesperada do endpoint.");
  process.exit(1);
}

const outDir = join(root, "supabase", "export");
await mkdir(outDir, { recursive: true });
const outFile = join(outDir, "instructor-report.json");
await writeFile(outFile, JSON.stringify(data, null, 2), "utf8");
console.log(`OK: ${data.students.length} aluno(s) exportado(s) -> ${outFile}`);
