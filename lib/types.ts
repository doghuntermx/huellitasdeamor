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
