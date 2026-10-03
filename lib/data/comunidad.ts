import { createPublicClient } from "@/lib/supabase/public";
import type { AliadoBeneficio, Patrocinador, BlogPost } from "@/lib/types";

function mapAliado(row: Record<string, unknown>): AliadoBeneficio {
  return {
    id: row.id as string,
    nombre: row.nombre as string,
    categoria: row.categoria as string,
    descripcionBeneficio: row.descripcion_beneficio as string,
    logoUrl: row.logo_url as string,
    sitioWeb: (row.sitio_web as string) ?? undefined,
  };
}

export async function getAliadosBeneficio(): Promise<AliadoBeneficio[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("aliados_beneficios")
    .select("*")
    .order("nombre", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(mapAliado);
}

function mapPatrocinador(row: Record<string, unknown>): Patrocinador {
  return {
    id: row.id as string,
    nombre: row.nombre as string,
    descripcion: (row.descripcion as string) ?? undefined,
    logoUrl: row.logo_url as string,
    sitioWeb: (row.sitio_web as string) ?? undefined,
    nivel: row.nivel as Patrocinador["nivel"],
  };
}

export async function getPatrocinadores(): Promise<Patrocinador[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("patrocinadores")
    .select("*")
    .order("nivel", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(mapPatrocinador);
}

function mapBlogPost(row: Record<string, unknown>): BlogPost {
  return {
    id: row.id as string,
    slug: row.slug as string,
    titulo: row.titulo as string,
    extracto: row.extracto as string,
    contenido: (row.contenido as string[]) ?? [],
    imagenPortada: row.imagen_portada as string,
    autor: row.autor as string,
    publicadoEn: row.publicado_en as string,
    territorio: (row.territorio as string) ?? undefined,
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("publicado_en", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapBlogPost);
}

export async function getBlogPostPorSlug(slug: string): Promise<BlogPost | undefined> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data ? mapBlogPost(data) : undefined;
}
