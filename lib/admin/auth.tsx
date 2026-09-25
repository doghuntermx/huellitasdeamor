"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

/**
 * Autenticación real con Supabase Auth (email/contraseña).
 *
 * Tener sesión no basta para ver datos administrativos: las políticas de
 * RLS (ver supabase/admin-auth.sql) solo permiten leer/escribir a quienes
 * además aparezcan en la tabla `admins`. Las cuentas se crean a mano desde
 * el dashboard de Supabase — no hay registro público.
 */

interface AdminAuth {
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuth | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function login(email: string, password: string) {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error ? error.message : null;
  }

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
  }

  return (
    <AdminAuthContext.Provider value={{ session, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth debe usarse dentro de AdminAuthProvider");
  return ctx;
}
