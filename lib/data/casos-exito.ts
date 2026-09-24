import { createPublicClient } from "@/lib/supabase/public";
import type { CasoExito, ImpactoStats } from "@/lib/types";

interface CasoExitoRow {
  id: string;
  slug: string;
  nombre: string;
  especie: "perro" | "gato";
  foto_antes: string;
  foto_despues: string;
  historia_breve: string;
  fecha_rescate: string;
  fecha_adopcion: string | null;
  tiempo_recuperacion: string | null;
}

function mapRow(row: CasoExitoRow): CasoExito {
  return {
    id: row.id,
    slug: row.slug,
    nombre: row.nombre,
    especie: row.especie,
    fotoAntes: row.foto_antes,
    fotoDespues: row.foto_despues,
    historiaBreve: row.historia_breve,
    fechaRescate: row.fecha_rescate,
    fechaAdopcion: row.fecha_adopcion ?? undefined,
    tiempoRecuperacion: row.tiempo_recuperacion ?? undefined,
  };
}

export async function getCasosExito(): Promise<CasoExito[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("casos_exito")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function getCasoPorSlug(slug: string): Promise<CasoExito | undefined> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("casos_exito")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data ? mapRow(data) : undefined;
}

/**
 * Cifras agregadas de impacto. Placeholder estático hasta que el equipo
 * confirme los datos actuales (ver checklist de contenido de Fase 1) o se
 * decida calcularlas en vivo desde las tablas correspondientes.
 */
export const impacto: ImpactoStats = {
  totalRescatados: 1000,
  adoptados: 850,
  esterilizaciones: 620,
  enTratamiento: 34,
};
