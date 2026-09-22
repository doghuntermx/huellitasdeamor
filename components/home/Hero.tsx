"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Heart, HandHeart, PawPrint, BookHeart, ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CountUp } from "@/components/ui/CountUp";

const ctas = [
  { href: "/adopciones", label: "Adoptar", icon: PawPrint, variant: "brand" as const },
  { href: "/donar", label: "Donar", icon: Heart, variant: "amber" as const },
  { href: "/solicitar-apoyo", label: "Solicitar Apoyo", icon: HandHeart, variant: "ghost" as const },
  { href: "/nuestra-historia", label: "Conoce Nuestra Historia", icon: BookHeart, variant: "outline" as const },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink pb-24 pt-20 md:pb-32 md:pt-28">
      {/* fondo con huellas flotantes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-10 h-72 w-72 rounded-full bg-brand/25 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-amber/10 blur-3xl" />
        <motion.div style={{ y: y1 }} className="absolute left-[8%] top-[18%] opacity-20 float-slow" aria-hidden>
          <PawPrint className="h-16 w-16 text-brand-light" style={{ "--r": "-18deg" } as React.CSSProperties} />
        </motion.div>
        <motion.div style={{ y: y2 }} className="absolute right-[12%] top-[55%] opacity-15 float-slow" aria-hidden>
          <PawPrint className="h-24 w-24 text-brand-light" style={{ "--r": "12deg" } as React.CSSProperties} />
        </motion.div>
        <motion.div style={{ y: y1 }} className="absolute right-[25%] top-[10%] opacity-10 float-slow" aria-hidden>
          <PawPrint className="h-10 w-10 text-amber" />
        </motion.div>
      </div>

      <motion.div style={{ opacity }} className="relative mx-auto max-w-5xl px-5 text-center md:px-8">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-light"
        >
          Segundas oportunidades
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] text-cream sm:text-5xl md:text-6xl"
        >
          Las huellas más pequeñas <br className="hidden sm:block" />
          pueden{" "}
          <span className="italic text-brand-light">cambiar el mundo</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-2xl text-balance text-base text-cream/75 sm:text-lg"
        >
          Rescatamos, curamos y encontramos hogar para animales en situación de
          calle. Nadie rescata solo — y cada huellita que llega también
          necesita de ti.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex items-baseline justify-center gap-3"
        >
          <CountUp value={1000} suffix="+" className="font-display text-4xl font-semibold text-brand-light sm:text-5xl" />
          <span className="text-sm text-cream/60 sm:text-base">
            huellitas ya encontraron su segunda oportunidad
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {ctas.map((cta) => (
            <MagneticButton
              key={cta.href}
              href={cta.href}
              variant={cta.variant}
              icon={<ArrowRight className="h-4 w-4" />}
            >
              <span className="inline-flex items-center gap-2">
                <cta.icon className="h-4 w-4" />
                {cta.label}
              </span>
            </MagneticButton>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
