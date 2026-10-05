// Edge Function da Vercel — ponto de entrada /api/app (rewrite de /functions/v1/app).
// Reaproveita integralmente functions/handler.mjs (100% Web-standard: Response.json,
// crypto.subtle p/ PBKDF2, crypto.randomUUID e supabase.from). A chave de serviço só
// existe aqui, no servidor; o navegador nunca vê credenciais do banco.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { handlePortal } from "../functions/handler.mjs";

export const config = { runtime: "edge" };

let cached: SupabaseClient | null = null;
function getSupabase(): SupabaseClient {
  if (cached) return cached;
  const url = process.env.SUPABASE_URL as string | undefined;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY as string | undefined;
  if (!url || !key) throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY ausentes");
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  return cached;
}

export default async function handler(request: Request): Promise<Response> {
  try {
    return await handlePortal({ request, supabase: getSupabase() });
  } catch {
    return Response.json({ error: "database_request_failed" }, { status: 503, headers: { "cache-control": "no-store" } });
  }
}
