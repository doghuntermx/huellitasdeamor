import type { Metadata } from "next";
import { getAnimales } from "@/lib/data/animales";
import { CatalogClient } from "@/components/catalog/CatalogClient";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Adopciones",
  description:
    "Conoce a las huellitas que buscan un hogar hoy. Filtra por especie, tamaño, edad, sexo y sucursal.",
};

export default async function AdopcionesPage() {
  const animales = await getAnimales();

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
      <Reveal className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">
          Cada huellita deja una historia
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Encuentra a quien va a cambiarte la vida
        </h1>
        <p className="mt-3 text-ink-soft">
          Cuando una huellita encuentra hogar, la dejamos unos días en el
          catálogo con la bandera{" "}
          <span className="font-medium text-brand">
            &ldquo;Encontró su segunda oportunidad&rdquo;
          </span>{" "}
          — para celebrar cada final feliz.
        </p>
      </Reveal>

      <div className="mt-10">
        <CatalogClient animales={animales} />
      </div>
    </div>
  );
}
