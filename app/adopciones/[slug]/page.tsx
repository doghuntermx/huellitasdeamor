import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Heart, MapPin, Sparkles } from "lucide-react";
import { animales, getAnimalPorSlug } from "@/lib/data/animales";
import { Gallery } from "@/components/animal/Gallery";
import { AdoptarForm } from "@/components/animal/AdoptarForm";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return animales.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  props: PageProps<"/adopciones/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const animal = getAnimalPorSlug(slug);
  if (!animal) return {};
  return {
    title: animal.nombre,
    description: animal.historiaCorta,
  };
}

const estadoLabel: Record<string, string> = {
  disponible: "Disponible",
  en_proceso: "En proceso de adopción",
  adoptado: "Encontró su segunda oportunidad",
};

export default async function AnimalPage(props: PageProps<"/adopciones/[slug]">) {
  const { slug } = await props.params;
  const animal = getAnimalPorSlug(slug);
  if (!animal) notFound();

  const adoptado = animal.estado === "adoptado";

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
      <Link
        href="/adopciones"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-brand"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al catálogo
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <Reveal>
          <Gallery fotos={animal.fotos} nombre={animal.nombre} />
        </Reveal>

        <Reveal delay={0.1}>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-white",
              adoptado && "shimmer-badge",
              animal.estado === "disponible" && "bg-brand",
              animal.estado === "en_proceso" && "bg-ink"
            )}
          >
            {adoptado && <Sparkles className="h-3.5 w-3.5" />}
            {estadoLabel[animal.estado]}
          </span>

          <h1 className="mt-4 font-display text-4xl font-semibold text-ink">
            {animal.nombre}
          </h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft">
            <MapPin className="h-4 w-4" />
            {animal.sucursal}
          </p>

          <div className="mt-5 flex flex-wrap gap-2 text-sm">
            {[animal.edadAproximada, animal.tamano, animal.sexo === "macho" ? "Macho" : "Hembra", animal.razaAproximada]
              .filter(Boolean)
              .map((chip) => (
                <span key={chip} className="rounded-full bg-cream-warm px-3 py-1 text-ink-soft">
                  {chip}
                </span>
              ))}
          </div>

          <div className="mt-6">
            <h2 className="font-display text-lg font-semibold text-ink">Su historia</h2>
            <p className="mt-2 text-balance leading-relaxed text-ink-soft">{animal.historiaCorta}</p>
          </div>

          {animal.personalidad.length > 0 && (
            <div className="mt-6">
              <h2 className="font-display text-lg font-semibold text-ink">Personalidad</h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {animal.personalidad.map((p) => (
                  <li key={p} className="rounded-full bg-brand/10 px-3 py-1 text-sm text-brand-dark">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {animal.requisitosAdopcion.length > 0 && (
            <div className="mt-6">
              <h2 className="font-display text-lg font-semibold text-ink">Requisitos de adopción</h2>
              <ul className="mt-2 space-y-1.5 text-sm text-ink-soft">
                {animal.requisitosAdopcion.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span className="text-brand">•</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!adoptado && (
            <a
              href="#adoptar"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-cream shadow-lg shadow-brand/25 transition-transform hover:scale-105"
            >
              <Heart className="h-4 w-4 fill-current" />
              Quiero darle un hogar
            </a>
          )}
        </Reveal>
      </div>

      {!adoptado && (
        <Reveal delay={0.15}>
          <div id="adoptar" className="mx-auto mt-16 max-w-xl scroll-mt-24 rounded-3xl bg-cream-warm p-6 md:p-8">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Solicita adoptar a {animal.nombre}
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              Este es el primer paso. Nuestro equipo revisará tu solicitud y te
              contactará para conocerte mejor.
            </p>
            <div className="mt-6">
              <AdoptarForm nombreAnimal={animal.nombre} />
            </div>
          </div>
        </Reveal>
      )}

      {adoptado && (
        <Reveal delay={0.15} className="mx-auto mt-16 max-w-xl rounded-3xl bg-brand/10 p-8 text-center">
          <Sparkles className="mx-auto h-8 w-8 text-brand" />
          <p className="mt-3 font-display text-xl font-semibold text-ink">
            {animal.nombre} ya encontró su segunda oportunidad
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            Sigue de cerca a las demás huellitas que todavía esperan un hogar.
          </p>
          <Link
            href="/adopciones"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
          >
            Ver catálogo completo
          </Link>
        </Reveal>
      )}
    </div>
  );
}
