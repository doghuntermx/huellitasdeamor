"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/**
 * Autenticación de DEMO para el mockup del panel. Guarda una bandera en
 * localStorage y compara contra una contraseña fija en el cliente.
 *
 * Esto NO es seguro y no debe usarse en producción: cualquier persona con
 * el código fuente puede ver la contraseña y cualquiera puede escribir la
 * bandera de sesión directamente en su navegador.
 *
 * TODO (backend real): reemplazar por Supabase Auth (email/password o
 * magic link) con Row Level Security en las tablas administrables, y mover
 * la verificación de sesión a middleware/servidor.
 */

const DEMO_PASSWORD = "huellitas2026";
const STORAGE_KEY = "huellitas_admin_demo_session";

interface AdminAuth {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuth | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      setIsAuthenticated(window.localStorage.getItem(STORAGE_KEY) === "true");
    } catch {
      // localStorage no disponible (modo privado, etc.) — se queda sin sesión.
    }
    setIsLoading(false);
  }, []);

  function login(password: string) {
    const ok = password === DEMO_PASSWORD;
    if (ok) {
      setIsAuthenticated(true);
      try {
        window.localStorage.setItem(STORAGE_KEY, "true");
      } catch {}
    }
    return ok;
  }

  function logout() {
    setIsAuthenticated(false);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth debe usarse dentro de AdminAuthProvider");
  return ctx;
}
