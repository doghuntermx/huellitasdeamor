"use client";

import { useState } from "react";
import { ChevronDown, MapPin, Phone, Mail } from "lucide-react";
import { useAdminData } from "@/lib/admin/store";
import type { EstadoSolicitud } from "@/lib/types";
import { cn } from "@/lib/utils";

const estadoLabel: Record<EstadoSolicitud, string> = {
  nueva: "Nueva",
  en_revision: "En revisión",
  atendida: "Atendida",
};

const estadoBadge: Record<EstadoSolicitud, string> = {
  nueva: "bg-brand/10 text-brand",
  en_revision: "bg-ink/10 text-ink",
  atendida: "bg-ink text-cream",
};

const tipoLabel: Record<string, string> = {
  reporte_calle: "Reporte de calle",
  apoyo_mascota_propia: "Apoyo mascota propia",
  adopcion: "Solicitud de adopción",
};

export default function AdminSolicitudesPage() {
  const { solicitudes, updateEstadoSolicitud } = useAdminData();
  const [abierto, setAbierto] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<EstadoSolicitud | "todas">("todas");

  const filtradas = solicitudes.filter((s) => filtro === "todas" || s.estado === filtro);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Solicitudes de apoyo</h1>
      <p className="mt-1 text-sm text-ink-soft">{solicitudes.length} en total</p>

      <div className="mt-4 flex gap-2">
        {(["todas", "nueva", "en_revision", "atendida"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-semibold",
              filtro === f ? "bg-ink text-cream" : "bg-white text-ink-soft ring-1 ring-ink/10"
            )}
          >
            {f === "todas" ? "Todas" : estadoLabel[f]}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {filtradas.map((s) => {
          const open = abierto === s.id;
          return (
            <div key={s.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ink/5">
              <button
                onClick={() => setAbierto(open ? null : s.id)}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
              >
                <div>
                  <p className="font-medium text-ink">{s.nombreContacto}</p>
                  <p className="text-xs text-ink-soft">
                    {tipoLabel[s.tipo] ?? s.tipo}
                    {s.nombreAnimal && ` — ${s.nombreAnimal}`} · {s.createdAt}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", estadoBadge[s.estado])}>
                    {estadoLabel[s.estado]}
                  </span>
                  <ChevronDown className={cn("h-4 w-4 text-ink-soft transition-transform", open && "rotate-180")} />
                </div>
              </button>

              {open && (
                <div className="border-t border-ink/5 px-5 py-4">
                  <p className="text-sm text-ink-soft">{s.descripcion}</p>
                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-ink-soft">
                    <span className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5" />
                      {s.telefono}
                    </span>
                    {s.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5" />
                        {s.email}
                      </span>
                    )}
                    {s.ubicacion && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {s.ubicacion}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex gap-2">
                    {(["nueva", "en_revision", "atendida"] as const).map((estado) => (
                      <button
                        key={estado}
                        onClick={() => updateEstadoSolicitud(s.id, estado)}
                        className={cn(
                          "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                          s.estado === estado
                            ? "bg-brand text-cream"
                            : "bg-cream-warm text-ink-soft hover:text-ink"
                        )}
                      >
                        Marcar {estadoLabel[estado].toLowerCase()}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtradas.length === 0 && (
          <p className="rounded-2xl bg-white px-5 py-8 text-center text-sm text-ink-soft ring-1 ring-ink/5">
            No hay solicitudes con este filtro.
          </p>
        )}
      </div>
    </div>
  );
}
