import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAnimalesDestacados } from "@/lib/data/animales";
import { AnimalCard } from "@/components/catalog/AnimalCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export async function FeaturedAnimals() {
  const destacados = await getAnimalesDestacados();

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <Reveal className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">
            Cada huellita deja una historia
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Buscan un hogar hoy
          </h2>
        </div>
        <Link
          href="/adopciones"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
        >
          Ver todo el catálogo
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>

      <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {destacados.map((animal, i) => (
          <RevealItem key={animal.id}>
            <AnimalCard animal={animal} index={i} />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
