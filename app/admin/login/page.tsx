"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, AlertCircle } from "lucide-react";
import { useAdminAuth } from "@/lib/admin/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (login(password)) {
      router.push("/admin");
    } else {
      setError(true);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-lg shadow-ink/5 ring-1 ring-ink/5">
        <div className="flex flex-col items-center text-center">
          <Image src="/logo/huellitas-logo.svg" alt="Huellitas de Amor A.C." width={56} height={56} />
          <h1 className="mt-4 font-display text-xl font-semibold text-ink">Panel de administración</h1>
          <p className="mt-1 text-sm text-ink-soft">Acceso solo para el equipo de Huellitas de Amor.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-ink">Contraseña</label>
            <div className="relative mt-1">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft/60" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className="w-full rounded-xl border border-ink/10 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand"
                placeholder="••••••••"
                autoFocus
              />
            </div>
            {error && (
              <p className="mt-1.5 flex items-center gap-1 text-xs text-brand">
                <AlertCircle className="h-3.5 w-3.5" />
                Contraseña incorrecta.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-brand py-3 text-sm font-semibold text-cream shadow-md shadow-brand/25 transition-transform hover:scale-[1.02]"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 rounded-xl bg-cream-warm p-3 text-center text-xs text-ink-soft">
          Vista previa de demostración — contraseña: <code className="font-semibold">huellitas2026</code>
          <br />
          No hay datos reales conectados todavía.
        </p>
      </div>
    </div>
  );
}
