"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappHabilitado, whatsappUrl } from "@/lib/contacto";

function mensajeParaRuta(pathname: string) {
  if (pathname.startsWith("/adopciones/")) {
    const nombre = pathname.split("/")[2];
    const bonito = nombre.charAt(0).toUpperCase() + nombre.slice(1);
    return `Hola, me interesa adoptar a ${bonito}. ¿Me pueden dar más información?`;
  }
  if (pathname.startsWith("/adopciones")) return "Hola, me gustaría información sobre adopciones.";
  if (pathname.startsWith("/donar")) return "Hola, quiero información para hacer un donativo.";
  if (pathname.startsWith("/circulo-de-socios")) return "Hola, quiero saber más del Círculo de Socios.";
  if (pathname.startsWith("/solicitar-apoyo")) return "Hola, necesito apoyo con un animal.";
  return "Hola, me gustaría información sobre Huellitas de Amor.";
}

export function WhatsAppButton() {
  const pathname = usePathname();
  if (!whatsappHabilitado) return null;

  return (
    <motion.a
      href={whatsappUrl(mensajeParaRuta(pathname))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 16 }}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-0 rounded-full bg-brand p-3.5 text-cream shadow-lg shadow-brand/30 transition-colors hover:bg-brand-dark"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-brand/40 [animation-iteration-count:3]" />
      <WhatsAppIcon className="h-6 w-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[8rem] group-hover:opacity-100">
        Escríbenos
      </span>
    </motion.a>
  );
}
