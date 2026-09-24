import { createPublicClient } from "@/lib/supabase/public";
import type { Animal } from "@/lib/types";

interface AnimalRow {
  id: string;
  slug: string;
  nombre: string;
  especie: "perro" | "gato";
  raza_aproximada: string | null;
  edad_aproximada: string;
  tamano: "chico" | "mediano" | "grande";
  sexo: "macho" | "hembra";
  sucursal: string;
  estado: "disponible" | "en_proceso" | "adoptado";
  historia_corta: string;
  personalidad: string[] | null;
  requisitos_adopcion: string[] | null;
  fotos: string[] | null;
  fecha_ingreso: string;
  destacado: boolean | null;
}

function mapRow(row: AnimalRow): Animal {
  return {
    id: row.id,
    slug: row.slug,
    nombre: row.nombre,
    especie: row.especie,
    razaAproximada: row.raza_aproximada ?? undefined,
    edadAproximada: row.edad_aproximada,
    tamano: row.tamano,
    sexo: row.sexo,
    sucursal: row.sucursal,
    estado: row.estado,
    historiaCorta: row.historia_corta,
    personalidad: row.personalidad ?? [],
    requisitosAdopcion: row.requisitos_adopcion ?? [],
    fotos: row.fotos ?? [],
    fechaIngreso: row.fecha_ingreso,
    destacado: row.destacado ?? false,
  };
}

export async function getAnimales(): Promise<Animal[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("animales")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function getAnimalPorSlug(slug: string): Promise<Animal | undefined> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("animales")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data ? mapRow(data) : undefined;
}

export async function getAnimalesDestacados(): Promise<Animal[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("animales")
    .select("*")
    .eq("destacado", true)
    .neq("estado", "adoptado")
    .limit(4);

  if (error) throw error;
  return (data ?? []).map(mapRow);
}
