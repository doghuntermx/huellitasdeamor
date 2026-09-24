import { Calendar } from "lucide-react";
import type { CasoExito } from "@/lib/types";
import { BeforeAfterSlider } from "@/components/impact/BeforeAfterSlider";

function formatFecha(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("es-MX", {
    month: "long",
    year: "numeric",
  });
}

export function CasoCard({ caso }: { caso: CasoExito }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/5">
      <BeforeAfterSlider
        before={caso.fotoAntes}
        after={caso.fotoDespues}
        alt={caso.nombre}
      />
      <div className="p-6">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-xl font-semibold text-ink">{caso.nombre}</h3>
          <span className="flex items-center gap-1 text-xs text-ink-soft/70">
            <Calendar className="h-3.5 w-3.5" />
            Rescate: {formatFecha(caso.fechaRescate)}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{caso.historiaBreve}</p>
        {caso.tiempoRecuperacion && (
          <p className="mt-3 inline-flex rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand-dark">
            {caso.tiempoRecuperacion}
          </p>
        )}
      </div>
    </div>
  );
}
