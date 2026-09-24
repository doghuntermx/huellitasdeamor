import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCasosExito, impacto } from "@/lib/data/casos-exito";
import { BeforeAfterSlider } from "@/components/impact/BeforeAfterSlider";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

export async function ImpactTeaser() {
  const casosExito = await getCasosExito();
  const destacado = casosExito[0];
  if (!destacado) return null;

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <Reveal>
          <BeforeAfterSlider
            before={destacado.fotoAntes}
            after={destacado.fotoDespues}
            alt={destacado.nombre}
          />
          <p className="mt-2 text-center text-xs text-ink-soft/70">
            Desliza para ver el antes y después de {destacado.nombre}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">
            Historial de rescatados
          </p>
          <h2 className="mt-2 text-balance font-display text-3xl font-semibold text-ink sm:text-4xl">
            El cambio real, en una sola mirada
          </h2>
          <p className="mt-3 text-ink-soft">{destacado.historiaBreve}</p>

          <div className="mt-6 flex items-baseline gap-2">
            <CountUp value={impacto.totalRescatados} suffix="+" className="font-display text-3xl font-semibold text-brand" />
            <span className="text-sm text-ink-soft">huellitas transformadas hasta hoy</span>
          </div>

          <Link
            href="/casos-de-exito"
            className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
          >
            Ver todos los casos de éxito
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
