import type { CasoExito, ImpactoStats } from "@/lib/types";

/**
 * Casos de ejemplo para el panel de impacto (Fase 2). Las fotos de "antes"
 * son placeholders — deben reemplazarse por fotografías reales del momento
 * del rescate en cuanto el equipo las tenga disponibles.
 */
export const casosExito: CasoExito[] = [
  {
    id: "1",
    slug: "coco",
    nombre: "Coco",
    especie: "perro",
    fotoAntes: "https://placedog.net/900/700?id=61",
    fotoDespues: "https://placedog.net/900/700?id=60",
    historiaBreve:
      "Coco esperó más de dos años en el refugio. Muchos preferían cachorros. Una familia la vio, no por lástima, sino porque supieron reconocer lo que ella tenía para dar.",
    fechaRescate: "2024-03-02",
    fechaAdopcion: "2024-09-10",
    tiempoRecuperacion: "6 meses hasta encontrar hogar",
  },
  {
    id: "2",
    slug: "rocky",
    nombre: "Rocky",
    especie: "perro",
    fotoAntes: "https://placedog.net/900/700?id=31",
    fotoDespues: "https://placedog.net/900/700?id=30",
    historiaBreve:
      "Rocky llegó con cicatrices que contaban una historia difícil. Un equipo de voluntarios trabajó semanas para ganarse su confianza antes de siquiera pensar en buscarle familia.",
    fechaRescate: "2025-11-11",
    tiempoRecuperacion: "4 meses de rehabilitación y en proceso de adopción",
  },
  {
    id: "3",
    slug: "nube",
    nombre: "Nube",
    especie: "gato",
    fotoAntes: "https://cataas.com/cat?width=900&height=700&id=nube-antes",
    fotoDespues: "https://cataas.com/cat?width=900&height=700&id=nube-despues",
    historiaBreve:
      "Nube llegó con una pata lastimada tras un accidente en la calle. La cirugía y la rehabilitación tomaron meses. Camina distinto, pero eso nunca le impidió recibir cariño.",
    fechaRescate: "2025-08-20",
    tiempoRecuperacion: "3 meses de tratamiento veterinario",
  },
];

/**
 * Cifras agregadas de impacto. Placeholder hasta que el equipo confirme los
 * datos actuales (ver checklist de contenido de Fase 1).
 */
export const impacto: ImpactoStats = {
  totalRescatados: 1000,
  adoptados: 850,
  esterilizaciones: 620,
  enTratamiento: 34,
};

export function getCasoPorSlug(slug: string) {
  return casosExito.find((c) => c.slug === slug);
}
