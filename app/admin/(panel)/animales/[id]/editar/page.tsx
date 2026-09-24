"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AnimalForm } from "@/components/admin/AnimalForm";
import { useAdminData } from "@/lib/admin/store";

export default function EditarAnimalPage(
  props: PageProps<"/admin/animales/[id]/editar">
) {
  const { id } = use(props.params);
  const { animales } = useAdminData();
  const animal = animales.find((a) => a.id === id);

  if (!animal) notFound();

  return (
    <div>
      <Link href="/admin/animales" className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-brand">
        <ArrowLeft className="h-4 w-4" />
        Volver a Animales
      </Link>
      <h1 className="mt-3 font-display text-2xl font-semibold text-ink">Editar a {animal.nombre}</h1>
      <div className="mt-6">
        <AnimalForm animal={animal} />
      </div>
    </div>
  );
}
