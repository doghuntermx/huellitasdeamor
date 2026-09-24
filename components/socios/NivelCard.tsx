"use client";

import { motion } from "framer-motion";
import { Check, PawPrint } from "lucide-react";
import type { NivelSocio } from "@/lib/types";
import { cn, formatMXN } from "@/lib/utils";

export function NivelCard({
  nivel,
  selected,
  onSelect,
}: {
  nivel: NivelSocio;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative flex h-full w-full flex-col rounded-3xl border-2 p-6 text-left transition-all",
        selected ? "border-brand bg-brand/5" : "border-ink/10 bg-white hover:border-brand/40",
        nivel.destacado && !selected && "border-ink/20"
      )}
    >
      {selected && (
        <motion.span
          layoutId="nivel-activo"
          className="absolute inset-0 rounded-3xl border-2 border-brand"
        />
      )}

      {nivel.destacado && (
        <span className="absolute -top-3 left-6 rounded-full bg-ink px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-cream">
          Más elegido
        </span>
      )}

      <div className="relative flex items-center gap-2">
        <PawPrint className="h-5 w-5 text-brand" />
        <h3 className="font-display text-lg font-semibold text-ink">{nivel.nombre}</h3>
      </div>

      <p className="relative mt-3 font-display text-3xl font-semibold text-ink">
        {formatMXN(nivel.montoMensual)}
        <span className="text-sm font-normal text-ink-soft"> / mes</span>
      </p>

      <p className="relative mt-2 text-sm text-ink-soft">{nivel.descripcion}</p>

      <ul className="relative mt-5 space-y-2.5 text-sm text-ink-soft">
        {nivel.beneficios.map((b) => (
          <li key={b} className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            {b}
          </li>
        ))}
      </ul>

      <span
        className={cn(
          "relative mt-6 inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition-colors",
          selected ? "bg-brand text-cream" : "bg-ink/5 text-ink"
        )}
      >
        {selected ? "Seleccionado" : "Elegir este nivel"}
      </span>
    </button>
  );
}
