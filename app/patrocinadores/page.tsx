import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { getPatrocinadores } from "@/lib/data/comunidad";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Patrocinadores",
  description:
    "Empresas y fundaciones que patrocinan el trabajo de Huellitas de Amor A.C.",
};

export default async function PatrocinadoresPage() {
  const patrocinadores = await getPatrocinadores();
  const institucionales = patrocinadores.filter((p) => p.nivel === "institucional");
  const aliados = patrocinadores.filter((p) => p.nivel === "aliado");

  return (
    <div>
      <section className="relative overflow-hidden bg-cream pb-14 pt-16 md:pb-16 md:pt-24">
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />
        <div className="relative mx-auto max-w-2xl px-5 text-center md:px-8">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">
              Quiénes hacen esto posible
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-3 text-balance font-display text-3xl font-semibold text-ink sm:text-4xl md:text-5xl">
              Empresas que decidieron sumarse
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-4 max-w-lg text-ink-soft">
              El patrocinio institucional sostiene proyectos que un donativo
              individual no siempre alcanza a cubrir: infraestructura,
              campañas masivas de esterilización, y más.
            </p>
          </Reveal>
        </div>
      </section>

      {institucionales.length > 0 && (
        <section className="mx-auto max-w-5xl px-5 pb-14 md:px-8">
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-brand">
              Patrocinadores institucionales
            </h2>
          </Reveal>
          <RevealGroup className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2" stagger={0.1}>
            {institucionales.map((p) => (
              <RevealItem key={p.id}>
                <div className="flex h-full items-start gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.logoUrl} alt={p.nombre} className="h-16 w-24 shrink-0 rounded-lg object-contain" />
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">{p.nombre}</h3>
                    {p.descripcion && <p className="mt-1 text-sm text-ink-soft">{p.descripcion}</p>}
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      )}

      {aliados.length > 0 && (
        <section className="mx-auto max-w-5xl px-5 pb-14 md:px-8">
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-brand">
              Aliados que colaboran
            </h2>
          </Reveal>
          <RevealGroup className="mt-6 flex flex-wrap justify-center gap-6" stagger={0.08}>
            {aliados.map((p) => (
              <RevealItem key={p.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.logoUrl} alt={p.nombre} className="h-16 w-auto rounded-lg object-contain grayscale transition-all hover:grayscale-0" />
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      )}

      {patrocinadores.length === 0 && (
        <p className="pb-14 text-center text-ink-soft">Muy pronto anunciaremos a nuestros primeros patrocinadores.</p>
      )}

      <section className="bg-cream-warm py-14 text-center md:py-20">
        <Reveal className="mx-auto max-w-lg px-5 md:px-8">
          <p className="font-display text-2xl font-semibold text-ink">
            ¿Tu empresa quiere sumarse?
          </p>
          <p className="mt-2 text-ink-soft">
            Escríbenos y platiquemos cómo tu marca puede acompañar el trabajo
            de Huellitas de Amor A.C.
          </p>
          <a
            href="mailto:contacto@huellitasdeamor.org?subject=Quiero%20ser%20patrocinador"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-cream shadow-md shadow-brand/25 transition-transform hover:scale-105"
          >
            <Mail className="h-4 w-4" />
            contacto@huellitasdeamor.org
          </a>
        </Reveal>
      </section>
    </div>
  );
}
