import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function StoryTeaser() {
  return (
    <section className="relative overflow-hidden bg-cream-warm py-20 md:py-28">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
      <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">
            Nadie rescata solo
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <blockquote className="mt-6 font-display text-2xl italic leading-relaxed text-ink sm:text-3xl">
            &ldquo;Todo comenzó con una decisión sencilla: no mirar hacia otro
            lado.&rdquo;
          </blockquote>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-xl text-balance text-ink-soft">
            Lo que nació como el esfuerzo de una persona se convirtió en una
            comunidad de quienes rescatan, adoptan, donan y creen que la vida
            de un animal abandonado también merece una segunda oportunidad.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <Link
            href="/nuestra-historia"
            className="group mt-8 inline-flex items-center gap-1.5 font-semibold text-brand"
          >
            Conoce la historia completa
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
