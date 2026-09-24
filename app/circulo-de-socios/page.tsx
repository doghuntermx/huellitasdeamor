import type { Metadata } from "next";
import { ArrowDown, Users } from "lucide-react";
import { nivelesSocio } from "@/lib/data/socios";
import { CirculoSociosClient } from "@/components/socios/CirculoSociosClient";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Círculo de Socios",
  description:
    "Conviértete en socio de Huellitas de Amor A.C. con una aportación mensual y sostén el rescate todos los días del año, no solo cuando alguien se entera de un caso.",
};

export default function CirculoDeSociosPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-cream pb-14 pt-16 md:pb-16 md:pt-24">
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />
        <div className="relative mx-auto max-w-2xl px-5 text-center md:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cream">
              <Users className="h-3.5 w-3.5" />
              Nadie rescata solo
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 text-balance font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl md:text-5xl">
              Un rescate no depende de un buen mes. Depende de todos los meses.
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-4 max-w-lg text-ink-soft">
              El Círculo de Socios es tu aportación mensual fija: la que nos
              permite planear tratamientos, comprar alimento por adelantado y
              no depender solo de donativos ocasionales.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-6">
            <a
              href="#niveles"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
            >
              Ver niveles de membresía
              <ArrowDown className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-16 md:px-8">
        <Reveal className="rounded-2xl bg-ink px-6 py-5 text-center text-cream">
          <p className="text-sm">
            Programa recién lanzado — sé de las primeras personas en unirte al
            Círculo de Socios.
          </p>
        </Reveal>
      </section>

      <section id="niveles" className="mx-auto max-w-5xl scroll-mt-20 px-5 pb-20 md:px-8 md:pb-28">
        <Reveal className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">
            Elige tu nivel
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
            Tres formas de comprometerte cada mes
          </h2>
        </Reveal>

        <CirculoSociosClient niveles={nivelesSocio} />
      </section>
    </div>
  );
}
