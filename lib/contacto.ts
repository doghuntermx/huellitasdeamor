export const WHATSAPP_NUMBER = "529994890757";
export const WHATSAPP_DISPLAY = "+52 999 489 0757";

// Se enciende con NEXT_PUBLIC_WHATSAPP_ENABLED=true cuando el número ya
// responde (agente o persona). Mientras tanto no se muestra nada en el sitio.
export const whatsappHabilitado = process.env.NEXT_PUBLIC_WHATSAPP_ENABLED === "true";

export function whatsappUrl(mensaje?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}
