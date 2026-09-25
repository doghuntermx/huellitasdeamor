"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Star, AlertCircle } from "lucide-react";
import { useAdminData } from "@/lib/admin/store";
import { cn } from "@/lib/utils";

const estadoLabel: Record<string, string> = {
  disponible: "Disponible",
  en_proceso: "En proceso",
  adoptado: "Adoptado",
};

export default function AdminAnimalesPage() {
  const { animales, cargando, deleteAnimal } = useAdminData();
  const [confirmarBorrar, setConfirmarBorrar] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Animales</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {cargando ? "Cargando desde Supabase…" : `${animales.length} en el catálogo`}
          </p>
        </div>
        <Link
          href="/admin/animales/nuevo"
          className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-cream shadow-md shadow-brand/25 hover:bg-brand-dark"
        >
          <Plus className="h-4 w-4" />
          Nuevo animal
        </Link>
      </div>

      {error && (
        <p className="mt-4 flex items-center gap-2 rounded-xl bg-brand/10 px-4 py-2.5 text-sm text-brand-dark">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-ink/5">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/5 text-xs uppercase tracking-wide text-ink-soft/70">
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Especie</th>
              <th className="px-4 py-3 font-medium">Sucursal</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium">Destacado</th>
              <th className="px-4 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {animales.map((a) => (
              <tr key={a.id} className="border-b border-ink/5 last:border-0">
                <td className="px-4 py-3 font-medium text-ink">{a.nombre}</td>
                <td className="px-4 py-3 text-ink-soft capitalize">{a.especie}</td>
                <td className="px-4 py-3 text-ink-soft">{a.sucursal}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[11px] font-semibold",
                      a.estado === "disponible" && "bg-brand/10 text-brand",
                      a.estado === "en_proceso" && "bg-ink/10 text-ink",
                      a.estado === "adoptado" && "bg-ink text-cream"
                    )}
                  >
                    {estadoLabel[a.estado]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {a.destacado && <Star className="h-4 w-4 fill-brand text-brand" />}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/animales/${a.id}/editar`}
                      className="rounded-lg p-2 text-ink-soft hover:bg-cream-warm hover:text-ink"
                      aria-label={`Editar ${a.nombre}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    {confirmarBorrar === a.id ? (
                      <button
                        onClick={async () => {
                          setError(null);
                          const err = await deleteAnimal(a.id);
                          if (err) setError(err);
                          setConfirmarBorrar(null);
                        }}
                        className="rounded-lg bg-brand px-2.5 py-1.5 text-xs font-semibold text-cream"
                      >
                        Confirmar
                      </button>
                    ) : (
                      <button
                        onClick={() => setConfirmarBorrar(a.id)}
                        className="rounded-lg p-2 text-ink-soft hover:bg-cream-warm hover:text-brand"
                        aria-label={`Eliminar ${a.nombre}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
