"use client";

import Link from "next/link";
import { PawPrint, Inbox, Users, HeartHandshake, ArrowRight } from "lucide-react";
import { useAdminData } from "@/lib/admin/store";
import { formatMXN } from "@/lib/utils";

const tipoLabel: Record<string, string> = {
  reporte_calle: "Reporte de calle",
  apoyo_mascota_propia: "Apoyo mascota propia",
  adopcion: "Solicitud de adopción",
};

export default function AdminDashboardPage() {
  const { animales, solicitudes, socios, donativos } = useAdminData();

  const disponibles = animales.filter((a) => a.estado === "disponible").length;
  const nuevasSolicitudes = solicitudes.filter((s) => s.estado === "nueva").length;
  const sociosActivos = socios.filter((s) => s.estado === "activo").length;
  const ingresoMensualSocios = socios
    .filter((s) => s.estado === "activo")
    .reduce((sum, s) => sum + s.montoMensual, 0);
  const donativosCompletados = donativos.filter((d) => d.estado === "completado");
  const totalDonado = donativosCompletados.reduce((sum, d) => sum + d.monto, 0);

  const cards = [
    {
      href: "/admin/animales",
      icon: PawPrint,
      label: "Animales disponibles",
      value: `${disponibles} / ${animales.length}`,
      detail: "en el catálogo",
    },
    {
      href: "/admin/solicitudes",
      icon: Inbox,
      label: "Solicitudes nuevas",
      value: String(nuevasSolicitudes),
      detail: `de ${solicitudes.length} en total`,
    },
    {
      href: "/admin/socios",
      icon: Users,
      label: "Socios activos",
      value: String(sociosActivos),
      detail: `${formatMXN(ingresoMensualSocios)} / mes`,
    },
    {
      href: "/admin/donativos",
      icon: HeartHandshake,
      label: "Donado (completados)",
      value: formatMXN(totalDonado),
      detail: `${donativosCompletados.length} donativos`,
    },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Resumen</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Vista general del refugio, con datos en vivo desde Supabase.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/5 transition-shadow hover:shadow-md"
          >
            <c.icon className="h-6 w-6 text-brand" />
            <p className="mt-3 font-display text-2xl font-semibold text-ink">{c.value}</p>
            <p className="text-sm font-medium text-ink">{c.label}</p>
            <p className="text-xs text-ink-soft">{c.detail}</p>
            <span className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand opacity-0 transition-opacity group-hover:opacity-100">
              Ver detalle
              <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/5">
        <h2 className="font-display text-lg font-semibold text-ink">Solicitudes más recientes</h2>
        <ul className="mt-3 divide-y divide-ink/5">
          {solicitudes
            .slice()
            .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
            .slice(0, 4)
            .map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                <div>
                  <p className="font-medium text-ink">{s.nombreContacto}</p>
                  <p className="text-xs text-ink-soft">
                    {tipoLabel[s.tipo] ?? s.tipo} · {s.createdAt}
                  </p>
                </div>
                <span
                  className={
                    "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold " +
                    (s.estado === "nueva"
                      ? "bg-brand/10 text-brand"
                      : s.estado === "en_revision"
                        ? "bg-ink/10 text-ink"
                        : "bg-ink text-cream")
                  }
                >
                  {s.estado === "nueva" ? "Nueva" : s.estado === "en_revision" ? "En revisión" : "Atendida"}
                </span>
              </li>
            ))}
        </ul>
        <Link href="/admin/solicitudes" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand">
          Ver todas
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
