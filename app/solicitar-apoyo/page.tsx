import type { Metadata } from "next";
import { SolicitarApoyoForm } from "@/components/forms/SolicitarApoyoForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Solicitar Apoyo",
  description:
    "Reporta un animal en situación de calle o solicita apoyo veterinario para tu mascota.",
};

export default function SolicitarApoyoPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
      <Reveal className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">
          Nadie rescata solo
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          ¿Qué tipo de apoyo necesitas?
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-ink-soft">
          Elige la opción que mejor describe tu situación para dirigirte al
          formulario correcto.
        </p>
      </Reveal>

      <div className="mt-10">
        <SolicitarApoyoForm />
      </div>
    </div>
  );
}
