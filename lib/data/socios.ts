import type { NivelSocio } from "@/lib/types";

/**
 * Niveles de membresía del Círculo de Socios (Fase 2). Montos, nombres y
 * beneficios son propuesta inicial — deben confirmarse con el equipo antes
 * de publicar en producción.
 */
export const nivelesSocio: NivelSocio[] = [
  {
    id: "huella-inicial",
    nombre: "Huella Inicial",
    montoMensual: 100,
    descripcion: "Tu primer paso como parte fija de la comunidad.",
    beneficios: [
      "Recibo mensual de tu aportación",
      "Boletín mensual con el impacto de tu apoyo",
      "Reconocimiento como socio fundador de la comunidad",
    ],
  },
  {
    id: "huella-constante",
    nombre: "Huella Constante",
    montoMensual: 250,
    descripcion: "El nivel que sostiene el día a día del refugio.",
    beneficios: [
      "Todo lo de Huella Inicial",
      "Actualizaciones prioritarias de los casos que apoyas",
      "Invitación a visitas guiadas al refugio (sujeto a calendario)",
    ],
    destacado: true,
  },
  {
    id: "huella-de-manada",
    nombre: "Huella de Manada",
    montoMensual: 500,
    descripcion: "Para quienes quieren liderar el cambio junto con nosotros.",
    beneficios: [
      "Todo lo de Huella Constante",
      "Certificado digital de socio",
      "Mención especial en el reporte anual de transparencia",
    ],
  },
];

export function getNivelPorId(id: string) {
  return nivelesSocio.find((n) => n.id === id);
}
