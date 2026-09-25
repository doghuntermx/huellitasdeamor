"use client";

import { useAdminData } from "@/lib/admin/store";
import { nivelesSocio } from "@/lib/data/socios";
import { formatMXN, cn } from "@/lib/utils";

export default function AdminSociosPage() {
  const { socios } = useAdminData();
  const activos = socios.filter((s) => s.estado === "activo");
  const ingresoMensual = activos.reduce((sum, s) => sum + s.montoMensual, 0);

  function nombreNivel(nivelId: string) {
    return nivelesSocio.find((n) => n.id === nivelId)?.nombre ?? nivelId;
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Socios</h1>
      <p className="mt-1 text-sm text-ink-soft">
        {activos.length} activos · {formatMXN(ingresoMensual)} de ingreso mensual recurrente
      </p>

      <div className="mt-4 rounded-2xl bg-brand/5 px-5 py-3 text-xs text-ink-soft ring-1 ring-brand/10">
        Datos reales de Supabase. El estado pasa a &ldquo;Activo&rdquo; solo
        cuando se conecte el proveedor de cobro recurrente y confirme el
        primer pago — hasta entonces, toda inscripción nueva queda en
        &ldquo;Pendiente&rdquo; (ver Círculo de Socios).
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-ink/5">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/5 text-xs uppercase tracking-wide text-ink-soft/70">
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Nivel</th>
              <th className="px-4 py-3 font-medium">Monto</th>
              <th className="px-4 py-3 font-medium">Alta</th>
              <th className="px-4 py-3 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {socios.map((s) => (
              <tr key={s.id} className="border-b border-ink/5 last:border-0">
                <td className="px-4 py-3">
                  <p className="font-medium text-ink">{s.nombre}</p>
                  <p className="text-xs text-ink-soft">{s.email}</p>
                </td>
                <td className="px-4 py-3 text-ink-soft">{nombreNivel(s.nivelId)}</td>
                <td className="px-4 py-3 text-ink-soft">{formatMXN(s.montoMensual)}/mes</td>
                <td className="px-4 py-3 text-ink-soft">{s.fechaAlta}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[11px] font-semibold",
                      s.estado === "activo" && "bg-brand/10 text-brand",
                      s.estado === "pendiente" && "bg-ink/10 text-ink",
                      s.estado === "cancelado" && "bg-ink text-cream"
                    )}
                  >
                    {s.estado === "activo" ? "Activo" : s.estado === "pendiente" ? "Pendiente" : "Cancelado"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
