import { createClient } from "npm:@supabase/supabase-js@2.57.4";
import { serveSite } from "./adapter.mjs";
import { handlePortal } from "./handler.mjs";

Deno.serve(serveSite(handlePortal, {
  createClient,
  env: (name: string) => Deno.env.get(name),
}));
