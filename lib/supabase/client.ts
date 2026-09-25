import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | undefined;

/**
 * Cliente de navegador como singleton. Crear una instancia nueva en cada
 * llamada puede disparar una consulta antes de que esa instancia termine
 * de leer la sesión desde las cookies, haciendo que viaje sin el token de
 * autenticación (y por lo tanto sin acceso admin bajo RLS).
 */
export function createClient(): SupabaseClient {
  if (!client) {
    client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return client;
}
