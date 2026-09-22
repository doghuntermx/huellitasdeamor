"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PawPrint } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const hitos = [
  {
    title: "Un rescate individual",
    text: "Wendy Martínez comienza ayudando por cuenta propia a perros abandonados: alimento, refugio temporal, las primeras consultas veterinarias.",
  },
  {
    title: "Una red de apoyo",
    text: "Cada rescate abre la puerta al siguiente. Llegan tratamientos, recuperaciones y la búsqueda activa de familias dispuestas a adoptar.",
  },
  {
    title: "Una comunidad",
    text: "Personas que rescatan, adoptan, donan, comparten y ofrecen hogares temporales se suman. Nace formalmente Huellitas de Amor A.C.",
  },
  {
    title: "+1,000 segundas oportunidades",
    text: "Con los años, más de 1,000 huellitas encuentran una nueva oportunidad — y detrás de cada número, una historia de confianza recuperada.",
  },
];

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.4"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative mx-auto max-w-2xl">
      <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-ink/10 md:left-1/2 md:-translate-x-1/2" />
      <motion.div
        style={{ height: lineHeight }}
        className="absolute left-[15px] top-2 w-[2px] bg-brand md:left-1/2 md:-translate-x-1/2"
      />

      <div className="space-y-12">
        {hitos.map((h, i) => (
          <Reveal key={h.title} className="relative pl-10 md:pl-0" y={20}>
            <div
              className={`md:grid md:grid-cols-2 md:gap-10 ${
                i % 2 === 1 ? "" : ""
              }`}
            >
              <div className={i % 2 === 0 ? "md:text-right md:pr-10" : "md:col-start-2 md:pl-10"}>
                <span className="absolute left-0 top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-cream shadow-md shadow-brand/30 md:static md:mb-2 md:inline-flex">
                  <PawPrint className="h-4 w-4" />
                </span>
                <h3 className="mt-1 font-display text-lg font-semibold text-ink md:mt-0">
                  {h.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{h.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
