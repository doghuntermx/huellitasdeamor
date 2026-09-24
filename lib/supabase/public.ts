import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente sin cookies para lecturas públicas server-side (páginas y
 * generateStaticParams). No usar para nada que dependa de sesión de
 * usuario — para eso, lib/supabase/server.ts (Server Components/Actions
 * con contexto de request) o lib/supabase/client.ts (navegador).
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
