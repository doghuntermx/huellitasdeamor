import type { Metadata } from "next";
import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { formatMXN } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Bienvenido al Círculo de Socios",
};

export default async function CirculoSociosGraciasPage(
  props: PageProps<"/circulo-de-socios/gracias">
) {
  const params = await props.searchParams;
  const monto = Number(Array.isArray(params.monto) ? params.monto[0] : params.monto) || 0;
  const nivelRaw = Array.isArray(params.nivel) ? params.nivel[0] : params.nivel;
  const nombreRaw = Array.isArray(params.nombre) ? params.nombre[0] : params.nombre;
  const nombre = nombreRaw?.split(" ")[0];

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 py-16 text-center md:px-8">
      <Reveal>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand/10">
          <Users className="h-8 w-8 text-brand" />
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h1 className="mt-6 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Bienvenido al Círculo{nombre ? `, ${nombre}` : ""}.
        </h1>
      </Reveal>
      <Reveal delay={0.18}>
        <p className="mt-4 text-balance text-ink-soft">
          {nivelRaw && monto > 0
            ? `Tu membresía ${nivelRaw} de ${formatMXN(monto)} al mes `
            : "Tu membresía mensual "}
          ya es parte de lo que sostiene el refugio todos los días, no solo
          cuando alguien comparte un caso urgente. Te enviaremos la
          confirmación y tu primer recibo por correo.
        </p>
      </Reveal>
      <Reveal delay={0.26} className="mt-8 flex flex-wrap justify-center gap-4">
        <MagneticButton href="/casos-de-exito" variant="brand" icon={<ArrowRight className="h-4 w-4" />}>
          Mira lo que tu apoyo hace posible
        </MagneticButton>
        <Link href="/" className="inline-flex items-center px-4 py-3.5 text-sm font-semibold text-ink-soft hover:text-brand">
          Volver al inicio
        </Link>
      </Reveal>
    </div>
  );
}
