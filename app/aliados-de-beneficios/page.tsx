import type { Metadata } from "next";
import { ArrowRight, Tag } from "lucide-react";
import { getAliadosBeneficio } from "@/lib/data/comunidad";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Aliados de Beneficios",
  description:
    "Negocios aliados que ofrecen descuentos y beneficios exclusivos a los socios del Círculo de Socios de Huellitas de Amor A.C.",
};

export default async function AliadosDeBeneficiosPage() {
  const aliados = await getAliadosBeneficio();

  return (
    <div>
      <section className="relative overflow-hidden bg-cream pb-14 pt-16 md:pb-16 md:pt-24">
        <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />
        <div className="relative mx-auto max-w-2xl px-5 text-center md:px-8">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">
              Beneficios para socios
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-3 text-balance font-display text-3xl font-semibold text-ink sm:text-4xl md:text-5xl">
              Ser socio también tiene sus propias ventajas
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-4 max-w-lg text-ink-soft">
              Estos negocios se sumaron a la causa ofreciendo descuentos
              exclusivos a quienes forman parte del Círculo de Socios.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {aliados.map((aliado) => (
            <RevealItem key={aliado.id}>
              <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={aliado.logoUrl} alt={aliado.nombre} className="h-16 w-auto rounded-lg object-contain" />
                <span className="mt-4 inline-flex w-fit items-center gap-1 rounded-full bg-cream-warm px-2.5 py-1 text-[11px] font-semibold text-ink-soft">
                  <Tag className="h-3 w-3" />
                  {aliado.categoria}
                </span>
                <h2 className="mt-3 font-display text-lg font-semibold text-ink">{aliado.nombre}</h2>
                <p className="mt-1.5 flex-1 text-sm text-ink-soft">{aliado.descripcionBeneficio}</p>
                {aliado.sitioWeb && (
                  <a
                    href={aliado.sitioWeb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand"
                  >
                    Conocer más
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {aliados.length === 0 && (
          <p className="text-center text-ink-soft">Muy pronto anunciaremos a nuestros primeros aliados.</p>
        )}

        <Reveal delay={0.1} className="mt-12 rounded-3xl bg-ink px-6 py-8 text-center text-cream">
          <p className="font-display text-xl font-semibold">
            ¿Todavía no eres parte del Círculo de Socios?
          </p>
          <p className="mt-2 text-sm text-cream/70">
            Únete con una aportación mensual y accede a estos beneficios.
          </p>
          <div className="mt-5 flex justify-center">
            <MagneticButton href="/circulo-de-socios" variant="brand" icon={<ArrowRight className="h-4 w-4" />}>
              Conocer el Círculo de Socios
            </MagneticButton>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
