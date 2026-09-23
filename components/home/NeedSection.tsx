import { Bone, Syringe, Stethoscope, Home as HomeIcon } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowRight } from "lucide-react";

const usos = [
  { icon: Bone, label: "Alimento diario", detail: "para más de 80 animales en resguardo" },
  { icon: Syringe, label: "Esterilizaciones", detail: "para frenar el ciclo del abandono" },
  { icon: Stethoscope, label: "Tratamientos veterinarios", detail: "urgencias, cirugías y recuperación" },
  { icon: HomeIcon, label: "Refugio y hogares temporales", detail: "mientras encuentran una familia" },
];

export function NeedSection() {
  return (
    <section className="relative overflow-hidden bg-cream-warm py-20 md:py-28">
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-brand/15 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">
            La necesidad es todos los días
          </p>
          <h2 className="mt-2 text-balance font-display text-3xl font-semibold text-ink sm:text-4xl">
            Mientras lees esto, alguien más está esperando su segunda oportunidad
          </h2>
          <p className="mt-4 text-ink-soft">
            Ningún rescate termina el mismo día que llega. Cada huellita necesita
            tiempo, cuidado y recursos constantes para sanar. Esto es en qué se
            convierte tu apoyo:
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {usos.map((u) => (
            <RevealItem key={u.label}>
              <div className="h-full rounded-2xl border border-ink/10 bg-white p-6 shadow-sm transition-colors hover:border-brand/40">
                <u.icon className="h-7 w-7 text-brand" />
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{u.label}</h3>
                <p className="mt-1.5 text-sm text-ink-soft">{u.detail}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.15} className="mt-12 flex justify-center">
          <MagneticButton href="/donar" variant="dark" icon={<ArrowRight className="h-4 w-4" />}>
            Quiero apoyar hoy
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
