"use client";

import { useAdminData } from "@/lib/admin/store";
import { formatMXN, cn } from "@/lib/utils";
import type { EstadoDonativo } from "@/lib/types";

const estadoLabel: Record<EstadoDonativo, string> = {
  pendiente: "Pendiente",
  completado: "Completado",
  fallido: "Fallido",
};

const estadoBadge: Record<EstadoDonativo, string> = {
  pendiente: "bg-ink/10 text-ink",
  completado: "bg-brand/10 text-brand",
  fallido: "bg-ink text-cream",
};

export default function AdminDonativosPage() {
  const { donativos } = useAdminData();
  const totalCompletado = donativos
    .filter((d) => d.estado === "completado")
    .reduce((sum, d) => sum + d.monto, 0);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Donativos</h1>
      <p className="mt-1 text-sm text-ink-soft">
        {donativos.length} registrados · {formatMXN(totalCompletado)} completados
      </p>

      <div className="mt-4 rounded-2xl bg-brand/5 px-5 py-3 text-xs text-ink-soft ring-1 ring-brand/10">
        Datos reales de Supabase. El estado real de cada donativo lo confirma
        el webhook de la pasarela de pago (Clip) una vez conectada — hasta
        entonces, todo queda registrado como &ldquo;Pendiente&rdquo;.
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-ink/5">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/5 text-xs uppercase tracking-wide text-ink-soft/70">
              <th className="px-4 py-3 font-medium">Donante</th>
              <th className="px-4 py-3 font-medium">Monto</th>
              <th className="px-4 py-3 font-medium">Método</th>
              <th className="px-4 py-3 font-medium">Fecha</th>
              <th className="px-4 py-3 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {donativos.map((d) => (
              <tr key={d.id} className="border-b border-ink/5 last:border-0">
                <td className="px-4 py-3">
                  <p className="font-medium text-ink">{d.nombreDonante}</p>
                  <p className="text-xs text-ink-soft">{d.emailDonante}</p>
                </td>
                <td className="px-4 py-3 text-ink-soft">{formatMXN(d.monto)}</td>
                <td className="px-4 py-3 text-ink-soft capitalize">{d.metodoPago}</td>
                <td className="px-4 py-3 text-ink-soft">{d.createdAt}</td>
                <td className="px-4 py-3">
                  <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", estadoBadge[d.estado])}>
                    {estadoLabel[d.estado]}
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
