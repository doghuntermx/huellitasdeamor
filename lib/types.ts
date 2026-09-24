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

export type TipoSolicitud = "reporte_calle" | "apoyo_mascota_propia";

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
