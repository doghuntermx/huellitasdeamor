export type EstadoAnimal = "disponible" | "en_proceso" | "adoptado";

export interface Animal {
  id: string;
  slug: string;
  nombre: string;
  especie: "perro" | "gato";
  razaAproximada?: string;
  edadAproximada: string;
  tamano: "chico" | "mediano" | "grande";
  sexo: "macho" | "hembra";
  sucursal: string;
  estado: EstadoAnimal;
  historiaCorta: string;
  personalidad: string[];
  requisitosAdopcion: string[];
  fotos: string[];
  fechaIngreso: string;
  destacado?: boolean;
}

export type TipoSolicitud = "reporte_calle" | "apoyo_mascota_propia" | "adopcion";

export interface CasoExito {
  id: string;
  slug: string;
  nombre: string;
  especie: "perro" | "gato";
  fotoAntes: string;
  fotoDespues: string;
  historiaBreve: string;
  fechaRescate: string;
  fechaAdopcion?: string;
  tiempoRecuperacion?: string;
}

export interface ImpactoStats {
  totalRescatados: number;
  adoptados: number;
  esterilizaciones: number;
  enTratamiento: number;
}

export interface NivelSocio {
  id: string;
  nombre: string;
  montoMensual: number;
  descripcion: string;
  beneficios: string[];
  destacado?: boolean;
}

export type EstadoSolicitud = "nueva" | "en_revision" | "atendida";

export interface SolicitudApoyo {
  id: string;
  tipo: TipoSolicitud;
  nombreContacto: string;
  telefono: string;
  email?: string;
  descripcion: string;
  ubicacion?: string;
  nombreAnimal?: string;
  estado: EstadoSolicitud;
  createdAt: string;
}

export interface SocioActivo {
  id: string;
  nombre: string;
  email: string;
  nivelId: string;
  montoMensual: number;
  fechaAlta: string;
  estado: "pendiente" | "activo" | "cancelado";
}

export type EstadoDonativo = "pendiente" | "completado" | "fallido";

export interface Donativo {
  id: string;
  monto: number;
  moneda: string;
  metodoPago: string;
  estado: EstadoDonativo;
  nombreDonante: string;
  emailDonante: string;
  createdAt: string;
}
