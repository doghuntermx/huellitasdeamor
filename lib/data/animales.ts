import type { Animal } from "@/lib/types";

/**
 * Datos de muestra para poblar el catálogo mientras se redactan las fichas
 * reales (ver checklist de contenido en huellitas-web-fase1-especificacion.md)
 * y se conecta la tabla `animales` en Supabase. Las fotos son placeholders.
 */
export const animales: Animal[] = [
  {
    id: "1",
    slug: "canela",
    nombre: "Canela",
    especie: "perro",
    razaAproximada: "Mestiza",
    edadAproximada: "2 años",
    tamano: "mediano",
    sexo: "hembra",
    sucursal: "Refugio Central",
    estado: "disponible",
    historiaCorta:
      "Canela llegó temblando de frío una madrugada de enero, escondida bajo un auto. Hoy es la primera en salir a recibir a quien entra al refugio, como si cada visita fuera una razón para festejar.",
    personalidad: ["Juguetona", "Cariñosa", "Sociable con otros perros"],
    requisitosAdopcion: [
      "Espacio para correr o paseos diarios",
      "Visita de compatibilidad con la familia",
      "Compromiso de esterilización si aún no aplica",
    ],
    fotos: [
      "https://placedog.net/800/600?id=10",
      "https://placedog.net/800/600?id=11",
    ],
    fechaIngreso: "2026-01-14",
    destacado: true,
  },
  {
    id: "2",
    slug: "max",
    nombre: "Max",
    especie: "perro",
    razaAproximada: "Labrador mix",
    edadAproximada: "4 años",
    tamano: "grande",
    sexo: "macho",
    sucursal: "Refugio Central",
    estado: "disponible",
    historiaCorta:
      "Max pasó más de un año esperando en el refugio mientras perros más pequeños encontraban hogar antes que él. No perdió la paciencia ni las ganas de apoyar su cabeza en quien se sienta a su lado.",
    personalidad: ["Tranquilo", "Leal", "Bueno con niños"],
    requisitosAdopcion: [
      "Casa con patio o acceso a paseos largos",
      "Experiencia previa con perros grandes es un plus",
    ],
    fotos: [
      "https://placedog.net/800/600?id=20",
      "https://placedog.net/800/600?id=21",
    ],
    fechaIngreso: "2025-08-02",
    destacado: true,
  },
  {
    id: "3",
    slug: "luna",
    nombre: "Luna",
    especie: "gato",
    razaAproximada: "Doméstico de pelo corto",
    edadAproximada: "1 año",
    tamano: "chico",
    sexo: "hembra",
    sucursal: "Casa Hogar Sur",
    estado: "disponible",
    historiaCorta:
      "Luna nació en un lote baldío junto con sus hermanos. Fue la única en sobrevivir. Ahora duerme panza arriba, sin miedo, en la ventana más soleada de la casa hogar.",
    personalidad: ["Curiosa", "Independiente", "Le encanta la altura"],
    requisitosAdopcion: [
      "Espacio seguro con ventanas protegidas",
      "Compromiso de mantenerla en interior",
    ],
    fotos: [
      "https://cataas.com/cat?width=800&height=600&position=center&fit=cover&id=luna1",
      "https://cataas.com/cat?width=800&height=600&position=center&fit=cover&id=luna2",
    ],
    fechaIngreso: "2026-03-20",
    destacado: true,
  },
  {
    id: "4",
    slug: "rocky",
    nombre: "Rocky",
    especie: "perro",
    razaAproximada: "Pitbull mix",
    edadAproximada: "3 años",
    tamano: "grande",
    sexo: "macho",
    sucursal: "Refugio Central",
    estado: "en_proceso",
    historiaCorta:
      "Rocky llegó con cicatrices que contaban una historia difícil. Un equipo de voluntarios trabajó semanas para ganarse su confianza. Hoy mueve la cola en cuanto escucha su nombre.",
    personalidad: ["Protector", "Atento", "Necesita guía firme y cariñosa"],
    requisitosAdopcion: [
      "Familia con experiencia en la raza",
      "Sin otros perros machos en casa",
      "Entrevista y visita domiciliaria",
    ],
    fotos: ["https://placedog.net/800/600?id=30"],
    fechaIngreso: "2025-11-11",
  },
  {
    id: "5",
    slug: "mia",
    nombre: "Mía",
    especie: "perro",
    razaAproximada: "Schnauzer mix",
    edadAproximada: "7 años",
    tamano: "chico",
    sexo: "hembra",
    sucursal: "Casa Hogar Sur",
    estado: "disponible",
    historiaCorta:
      "Mía fue entregada al refugio cuando su familia se mudó de ciudad. Le tomó tiempo entender que no todos los adioses son definitivos. Busca un hogar tranquilo para envejecer en paz.",
    personalidad: ["Tranquila", "Apegada", "Ideal para casa sin muchas escaleras"],
    requisitosAdopcion: [
      "Hogar sereno, sin niños muy pequeños",
      "Disposición a cuidados de perro senior",
    ],
    fotos: ["https://placedog.net/800/600?id=40"],
    fechaIngreso: "2025-05-30",
  },
  {
    id: "6",
    slug: "simba",
    nombre: "Simba",
    especie: "gato",
    razaAproximada: "Doméstico de pelo largo",
    edadAproximada: "5 meses",
    tamano: "chico",
    sexo: "macho",
    sucursal: "Refugio Central",
    estado: "disponible",
    historiaCorta:
      "Simba llegó en una caja de cartón dejada en la puerta del refugio. Ahora es puro escándalo: corre por los pasillos como si el mundo entero fuera suyo para explorar.",
    personalidad: ["Energético", "Juguetón", "Bueno con otros gatos"],
    requisitosAdopcion: [
      "Espacio para trepar y jugar",
      "Idealmente con otro gato o compañía humana frecuente",
    ],
    fotos: ["https://cataas.com/cat?width=800&height=600&position=center&fit=cover&id=simba"],
    fechaIngreso: "2026-06-02",
  },
  {
    id: "7",
    slug: "toby",
    nombre: "Toby",
    especie: "perro",
    razaAproximada: "Beagle mix",
    edadAproximada: "1 año",
    tamano: "mediano",
    sexo: "macho",
    sucursal: "Refugio Norte",
    estado: "disponible",
    historiaCorta:
      "Toby fue reportado por vecinos que lo vieron deambular por semanas cerca de una carretera. Hoy su nariz no deja de investigar cada rincón nuevo, como agradeciendo el mundo seguro que encontró.",
    personalidad: ["Curioso", "Activo", "Aprende rápido"],
    requisitosAdopcion: [
      "Familia activa, disfruta paseos largos",
      "Patio con buen cercado — le gusta explorar",
    ],
    fotos: ["https://placedog.net/800/600?id=50"],
    fechaIngreso: "2026-02-18",
  },
  {
    id: "8",
    slug: "coco",
    nombre: "Coco",
    especie: "perro",
    razaAproximada: "Poodle mix",
    edadAproximada: "9 años",
    tamano: "chico",
    sexo: "hembra",
    sucursal: "Casa Hogar Sur",
    estado: "adoptado",
    historiaCorta:
      "Coco esperó más de dos años. Muchos preferían cachorros. Una familia la vio, no por lástima, sino porque supieron reconocer lo que ella tenía para dar. Hoy duerme en un sillón que ya es suyo.",
    personalidad: ["Dulce", "Tranquila", "Compañera de sofá"],
    requisitosAdopcion: [],
    fotos: ["https://placedog.net/800/600?id=60"],
    fechaIngreso: "2024-09-10",
  },
  {
    id: "9",
    slug: "nube",
    nombre: "Nube",
    especie: "gato",
    razaAproximada: "Doméstico de pelo corto",
    edadAproximada: "2 años",
    tamano: "mediano",
    sexo: "hembra",
    sucursal: "Refugio Norte",
    estado: "disponible",
    historiaCorta:
      "Nube llegó con una pata lastimada tras un accidente en la calle. La cirugía y la rehabilitación tomaron meses. Camina distinto, pero eso nunca le impidió recibir cariño a mordiditas suaves.",
    personalidad: ["Cariñosa", "Tranquila", "Se adapta bien a otros animales"],
    requisitosAdopcion: [
      "Seguimiento veterinario los primeros meses",
      "Hogar sin muchas escaleras por su movilidad",
    ],
    fotos: ["https://cataas.com/cat?width=800&height=600&position=center&fit=cover&id=nube"],
    fechaIngreso: "2025-12-05",
  },
];

export function getAnimalPorSlug(slug: string) {
  return animales.find((a) => a.slug === slug);
}

export function getAnimalesDestacados() {
  return animales.filter((a) => a.destacado && a.estado !== "adoptado").slice(0, 4);
}
