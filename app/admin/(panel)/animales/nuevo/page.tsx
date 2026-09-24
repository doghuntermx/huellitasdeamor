"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AnimalForm } from "@/components/admin/AnimalForm";

export default function NuevoAnimalPage() {
  return (
    <div>
      <Link href="/admin/animales" className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-brand">
        <ArrowLeft className="h-4 w-4" />
        Volver a Animales
      </Link>
      <h1 className="mt-3 font-display text-2xl font-semibold text-ink">Nuevo animal</h1>
      <div className="mt-6">
        <AnimalForm />
      </div>
    </div>
  );
}
