"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PawPrint, MapPin, Sparkles } from "lucide-react";
import type { Animal } from "@/lib/types";
import { cn } from "@/lib/utils";

const estadoLabel: Record<Animal["estado"], string> = {
  disponible: "Disponible",
  en_proceso: "En proceso de adopción",
  adoptado: "Encontró su segunda oportunidad",
};

export function AnimalCard({ animal, index = 0 }: { animal: Animal; index?: number }) {
  const adoptado = animal.estado === "adoptado";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/adopciones/${animal.slug}`}
        className="group relative block overflow-hidden rounded-3xl bg-white shadow-sm shadow-ink/5 ring-1 ring-ink/5 transition-shadow hover:shadow-xl hover:shadow-brand/10"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={animal.fotos[0]}
            alt={animal.nombre}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <span
            className={cn(
              "absolute left-3 top-3 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm",
              adoptado && "shimmer-badge",
              animal.estado === "disponible" && "bg-brand",
              animal.estado === "en_proceso" && "bg-amber text-ink"
            )}
          >
            {adoptado && <Sparkles className="h-3 w-3" />}
            {estadoLabel[animal.estado]}
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-xl font-semibold text-ink">{animal.nombre}</h3>
            <PawPrint className="h-5 w-5 shrink-0 text-brand/40 transition-colors group-hover:text-brand" />
          </div>
          <p className="mt-1 text-sm text-ink-soft">
            {animal.edadAproximada} · {animal.tamano} · {animal.sexo === "macho" ? "Macho" : "Hembra"}
          </p>
          <p className="mt-2 flex items-center gap-1 text-xs text-ink-soft/70">
            <MapPin className="h-3.5 w-3.5" />
            {animal.sucursal}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
