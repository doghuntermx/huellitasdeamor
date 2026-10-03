import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WHATSAPP_DISPLAY, whatsappHabilitado, whatsappUrl } from "@/lib/contacto";

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

      {whatsappHabilitado && (
        <Reveal delay={0.06} className="mt-10 rounded-3xl bg-ink px-6 py-8 text-center text-cream">
          <WhatsAppIcon className="mx-auto h-8 w-8 text-brand-light" />
          <p className="mt-3 font-display text-xl font-semibold">La forma más directa: WhatsApp</p>
          <p className="mt-1 text-sm text-cream/70">{WHATSAPP_DISPLAY}</p>
          <a
            href={whatsappUrl("Hola, me gustaría información sobre Huellitas de Amor.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-cream shadow-md shadow-brand/25 transition-transform hover:scale-105"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Abrir chat
          </a>
        </Reveal>
      )}

      <Reveal delay={0.1} className={`${whatsappHabilitado ? "mt-6" : "mt-10"} grid gap-4 sm:grid-cols-3`}>
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
