import type { Metadata } from "next";
import { Bone, Syringe, Stethoscope, Home as HomeIcon } from "lucide-react";
import { DonarForm } from "@/components/forms/DonarForm";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

export const metadata: Metadata = {
  title: "Donar",
  description:
    "Tu donativo se convierte en alimento, esterilizaciones y tratamientos veterinarios para animales rescatados por Huellitas de Amor A.C.",
};

const usos = [
  { icon: Bone, label: "Alimento", detail: "para quienes están en resguardo" },
  { icon: Syringe, label: "Esterilización", detail: "para frenar el abandono" },
  { icon: Stethoscope, label: "Tratamientos", detail: "urgencias y cirugías" },
  { icon: HomeIcon, label: "Refugio", detail: "mientras llega su hogar" },
];

export default function DonarPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
      <div className="grid gap-12 md:grid-cols-[1.1fr_1fr]">
        <div>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">
              Del abandono al amor
            </p>
            <h1 className="mt-2 text-balance font-display text-3xl font-semibold text-ink sm:text-4xl">
              Tu donativo es la segunda oportunidad de alguien
            </h1>
            <p className="mt-3 text-ink-soft">
              Sin incentivo fiscal de por medio — Huellitas de Amor A.C. aún no
              es donataria autorizada — tu confianza es lo que sostiene cada
              rescate. Así se usa cada peso:
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {usos.map((u, i) => (
              <Reveal key={u.label} delay={i * 0.06}>
                <div className="rounded-2xl bg-cream-warm p-5">
                  <u.icon className="h-6 w-6 text-brand" />
                  <p className="mt-3 font-display font-semibold text-ink">{u.label}</p>
                  <p className="text-xs text-ink-soft">{u.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="mt-8 flex items-baseline gap-2 rounded-2xl bg-ink px-6 py-5 text-cream">
            <CountUp value={1000} suffix="+" className="font-display text-3xl font-semibold text-brand-light" />
            <span className="text-sm text-cream/70">huellitas con una segunda oportunidad gracias a personas como tú</span>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-3xl bg-white p-6 shadow-lg shadow-ink/5 ring-1 ring-ink/5 md:p-8">
            <DonarForm />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
