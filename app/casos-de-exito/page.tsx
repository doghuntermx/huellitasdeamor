import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { casosExito, impacto } from "@/lib/data/casos-exito";
import { CasoCard } from "@/components/impact/CasoCard";
import { ImpactPanel } from "@/components/impact/ImpactPanel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Casos de Éxito",
  description:
    "Historias reales de antes y después: huellitas que encontraron su segunda oportunidad gracias a quienes no miraron hacia otro lado.",
};

export default function CasosDeExitoPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-cream pb-16 pt-16 md:pb-20 md:pt-24">
        <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">
              Del abandono al amor
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 text-balance font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl md:text-5xl">
              Desliza y mira lo que cambia una segunda oportunidad
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-4 max-w-xl text-ink-soft">
              Detrás de cada cifra hay una historia. Estos son algunos antes y
              después de huellitas que hoy tienen la vida que merecían.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 md:px-8">
        <ImpactPanel stats={impacto} />
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
        <RevealGroup className="grid grid-cols-1 gap-8 md:grid-cols-2" stagger={0.1}>
          {casosExito.map((caso) => (
            <RevealItem key={caso.id}>
              <CasoCard caso={caso} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="bg-cream-warm py-16 text-center md:py-20">
        <Reveal className="mx-auto max-w-xl px-5 md:px-8">
          <p className="font-display text-2xl italic text-ink sm:text-3xl">
            &ldquo;Las huellas más pequeñas pueden cambiar el mundo.&rdquo;
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <MagneticButton href="/adopciones" variant="brand" icon={<ArrowRight className="h-4 w-4" />}>
              Conoce a quienes esperan hoy
            </MagneticButton>
            <MagneticButton href="/donar" variant="outline" icon={<ArrowRight className="h-4 w-4" />}>
              Ayuda a escribir la próxima historia
            </MagneticButton>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
