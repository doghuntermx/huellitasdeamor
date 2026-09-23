import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { ReadingProgress } from "@/components/story/ReadingProgress";
import { Timeline } from "@/components/story/Timeline";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Nuestra Historia",
  description:
    "Todo comenzó con una decisión sencilla: no mirar hacia otro lado. Conoce la historia de Huellitas de Amor A.C.",
};

const parrafosCortos = [
  "Al principio era alimento.",
  "Después, un refugio temporal.",
  "Luego llegaron las consultas, los tratamientos, las recuperaciones y la búsqueda de familias dispuestas a darles un hogar.",
  "Y con cada nuevo rescate quedó claro que ayudar a uno significaba abrir la puerta al siguiente.",
];

const territorios = [
  { n: "01", t: "Nadie rescata solo" },
  { n: "02", t: "Cada huellita deja una historia" },
  { n: "03", t: "Del abandono al amor" },
];

export default function NuestraHistoriaPage() {
  return (
    <>
      <ReadingProgress />

      <section className="relative overflow-hidden bg-cream pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">
              Nuestra Historia
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 text-balance font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl md:text-5xl">
              Todo comenzó con una decisión sencilla:{" "}
              <span className="italic text-brand">no mirar hacia otro lado.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <p className="text-balance text-lg leading-relaxed text-ink-soft">
            Wendy Martínez, arquitecta y amante de los animales desde pequeña,
            comenzó ayudando por cuenta propia a perros que encontraba
            abandonados, heridos o con hambre.
          </p>
        </Reveal>

        <div className="mt-10 space-y-5 border-l-2 border-brand/30 pl-6">
          {parrafosCortos.map((p, i) => (
            <Reveal key={p} delay={i * 0.06} y={16}>
              <p className="font-display text-xl italic leading-snug text-ink sm:text-2xl">
                {p}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10">
          <p className="text-balance text-lg leading-relaxed text-ink-soft">
            Así comenzó a crecer Huellitas de Amor A.C. Lo que nació como el
            esfuerzo de una persona se convirtió poco a poco en una comunidad:
            personas que rescatan, adoptan, donan, comparten, ofrecen hogares
            temporales y creen que la vida de un animal abandonado también
            merece una segunda oportunidad.
          </p>
        </Reveal>
      </section>

      <section className="bg-cream-warm py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <Reveal className="mb-14 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">
              Nuestro crecimiento
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
              De un rescate individual a una comunidad
            </h2>
          </Reveal>
          <Timeline />
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <p className="text-balance text-lg leading-relaxed text-ink-soft">
            Con el paso de los años, <strong className="text-ink">más de 1,000 huellitas</strong> han
            encontrado una nueva oportunidad. Pero detrás de ese número
            existen historias: de perros que llegaron con miedo y volvieron a
            confiar, de animales enfermos que lograron recuperarse, de
            familias que decidieron adoptar y terminaron descubriendo que
            ellas también habían sido transformadas.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <blockquote className="border-l-2 border-brand pl-6 font-display text-2xl italic leading-snug text-ink sm:text-3xl">
            Cada rescate dejó una marca.
            <br />
            Cada mirada salvada dejó una huella.
          </blockquote>
        </Reveal>

        <Reveal delay={0.16} className="mt-8">
          <p className="text-balance text-lg leading-relaxed text-ink-soft">
            Porque rescatar no significa únicamente sacar a un animal de la
            calle. Significa devolverle dignidad. Curar sus heridas.
            Recuperar su confianza. Encontrarle un hogar. Y darle la
            posibilidad de comenzar otra vez.
          </p>
        </Reveal>

        <Reveal delay={0.22} className="mt-8">
          <p className="text-balance text-lg leading-relaxed text-ink-soft">
            Hoy, Huellitas de Amor continúa trabajando no solamente para
            rescatar animales, sino también para crear conciencia, romper el
            ciclo del abandono y promover una cultura de adopción
            responsable. Porque ningún animal debería pasar por la vida
            sintiéndose invisible. Y porque detrás de cada huellita que
            encuentra un hogar existe algo mucho más grande que un rescate:
            existe una segunda oportunidad.
          </p>
        </Reveal>
      </section>

      <section className="bg-ink py-16 text-cream md:py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <Reveal className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-light">
              Territorios narrativos
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {territorios.map((t, i) => (
              <Reveal key={t.n} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-cream/15 bg-cream/5 p-6 text-center">
                  <span className="font-display text-3xl font-semibold text-brand-light">
                    {t.n}
                  </span>
                  <p className="mt-3 font-display text-lg font-medium">{t.t}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-5 py-20 text-center md:px-8 md:py-28">
        <Reveal>
          <p className="font-display text-3xl italic text-brand sm:text-4xl">
            &ldquo;Transformando abandono en amor.&rdquo;
          </p>
        </Reveal>
        <Reveal delay={0.12} className="mt-10 flex flex-wrap justify-center gap-4">
          <MagneticButton href="/donar" variant="brand" icon={<ArrowRight className="h-4 w-4" />}>
            Donar hoy
          </MagneticButton>
          <MagneticButton href="/solicitar-apoyo" variant="outline" icon={<ArrowRight className="h-4 w-4" />}>
            Solicitar Apoyo
          </MagneticButton>
        </Reveal>
      </section>
    </>
  );
}
