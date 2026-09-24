import type { SolicitudApoyo, SocioActivo, Donativo } from "@/lib/types";

/**
 * Datos de muestra exclusivos del panel de administración (mockup). No hay
 * base de datos real conectada todavía — ver TODOs en lib/admin/store.tsx.
 */
export const solicitudesMock: SolicitudApoyo[] = [
  {
    id: "s1",
    tipo: "reporte_calle",
    nombreContacto: "Marisol Vega",
    telefono: "5544332211",
    email: "marisol.v@ejemplo.com",
    descripcion: "Perro mediano cojeando cerca del mercado, parece tener una pata lastimada.",
    ubicacion: "Av. Insurgentes esq. Xola, col. Narvarte",
    estado: "nueva",
    createdAt: "2026-09-20",
  },
  {
    id: "s2",
    tipo: "apoyo_mascota_propia",
    nombreContacto: "Jorge Ramírez",
    telefono: "5511223344",
    email: "jorge.r@ejemplo.com",
    descripcion: "Mi perra necesita cirugía de esterilización, no puedo cubrir el costo completo.",
    nombreAnimal: "Kira",
    estado: "en_revision",
    createdAt: "2026-09-18",
  },
  {
    id: "s3",
    tipo: "reporte_calle",
    nombreContacto: "Ana Torres",
    telefono: "5599887766",
    descripcion: "Camada de gatitos recién nacidos abandonados en una caja.",
    ubicacion: "Calle Durango 145, col. Roma Norte",
    estado: "atendida",
    createdAt: "2026-09-10",
  },
  {
    id: "s4",
    tipo: "apoyo_mascota_propia",
    nombreContacto: "Luis Peña",
    telefono: "5566778899",
    email: "luis.p@ejemplo.com",
    descripcion: "Mi gato tiene una infección y no tengo cómo pagar el tratamiento completo.",
    nombreAnimal: "Michi",
    estado: "nueva",
    createdAt: "2026-09-22",
  },
];

export const sociosActivosMock: SocioActivo[] = [
  {
    id: "sc1",
    nombre: "Paola Hernández",
    email: "paola.h@ejemplo.com",
    nivelId: "huella-constante",
    montoMensual: 250,
    fechaAlta: "2026-06-01",
    estado: "activo",
  },
  {
    id: "sc2",
    nombre: "Diego Martínez",
    email: "diego.m@ejemplo.com",
    nivelId: "huella-inicial",
    montoMensual: 100,
    fechaAlta: "2026-07-15",
    estado: "activo",
  },
  {
    id: "sc3",
    nombre: "Fernanda Ruiz",
    email: "fer.ruiz@ejemplo.com",
    nivelId: "huella-de-manada",
    montoMensual: 500,
    fechaAlta: "2026-05-03",
    estado: "activo",
  },
  {
    id: "sc4",
    nombre: "Carlos Ibáñez",
    email: "carlos.i@ejemplo.com",
    nivelId: "huella-inicial",
    montoMensual: 100,
    fechaAlta: "2026-04-20",
    estado: "cancelado",
  },
];

export const donativosMock: Donativo[] = [
  {
    id: "d1",
    monto: 500,
    moneda: "MXN",
    metodoPago: "tarjeta",
    estado: "completado",
    nombreDonante: "Regina Solís",
    emailDonante: "regina.s@ejemplo.com",
    createdAt: "2026-09-21",
  },
  {
    id: "d2",
    monto: 150,
    moneda: "MXN",
    metodoPago: "oxxo",
    estado: "pendiente",
    nombreDonante: "Héctor Nava",
    emailDonante: "hector.n@ejemplo.com",
    createdAt: "2026-09-21",
  },
  {
    id: "d3",
    monto: 1000,
    moneda: "MXN",
    metodoPago: "spei",
    estado: "completado",
    nombreDonante: "Anónimo",
    emailDonante: "-",
    createdAt: "2026-09-19",
  },
  {
    id: "d4",
    monto: 300,
    moneda: "MXN",
    metodoPago: "tarjeta",
    estado: "fallido",
    nombreDonante: "Iván Cortés",
    emailDonante: "ivan.c@ejemplo.com",
    createdAt: "2026-09-17",
  },
];
