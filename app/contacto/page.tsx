import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escríbenos si tienes dudas, quieres colaborar o necesitas ayuda.",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
      <Reveal className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">Contacto</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Hablemos
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-ink-soft">
          Para reportar un animal o pedir apoyo veterinario usa el formulario
          de{" "}
          <a href="/solicitar-apoyo" className="font-medium text-brand">
            Solicitar Apoyo
          </a>
          , así llega directo al equipo correcto. Para todo lo demás, aquí nos
          encuentras:
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-cream-warm p-6 text-center">
          <Mail className="mx-auto h-6 w-6 text-brand" />
          <p className="mt-3 text-sm font-semibold text-ink">Correo</p>
          <a href="mailto:contacto@huellitasdeamor.org" className="text-sm text-ink-soft hover:text-brand">
            contacto@huellitasdeamor.org
          </a>
        </div>
        <div className="rounded-2xl bg-cream-warm p-6 text-center">
          <MapPin className="mx-auto h-6 w-6 text-brand" />
          <p className="mt-3 text-sm font-semibold text-ink">Sucursales</p>
          <p className="text-sm text-ink-soft">Refugio Central · Casa Hogar Sur · Refugio Norte</p>
        </div>
        <div className="rounded-2xl bg-cream-warm p-6 text-center">
          <Clock className="mx-auto h-6 w-6 text-brand" />
          <p className="mt-3 text-sm font-semibold text-ink">Respuesta</p>
          <p className="text-sm text-ink-soft">Solemos responder en 2 a 3 días hábiles</p>
        </div>
      </Reveal>
    </div>
  );
}
