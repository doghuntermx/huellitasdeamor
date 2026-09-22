"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import type { Animal } from "@/lib/types";
import { AnimalCard } from "@/components/catalog/AnimalCard";
import { cn } from "@/lib/utils";

interface Filtros {
  especie: string;
  tamano: string;
  edad: string;
  sexo: string;
  sucursal: string;
}

const initialFiltros: Filtros = {
  especie: "todas",
  tamano: "todos",
  edad: "todas",
  sexo: "todos",
  sucursal: "todas",
};

function edadBucket(edad: string): "cachorro" | "joven" | "adulto" {
  const n = parseFloat(edad);
  if (/mes/.test(edad)) return "cachorro";
  if (isNaN(n)) return "adulto";
  if (n <= 1) return "cachorro";
  if (n <= 3) return "joven";
  return "adulto";
}

export function CatalogClient({ animales }: { animales: Animal[] }) {
  const [filtros, setFiltros] = useState<Filtros>(initialFiltros);
  const [showFilters, setShowFilters] = useState(false);

  const sucursales = useMemo(
    () => Array.from(new Set(animales.map((a) => a.sucursal))),
    [animales]
  );

  const resultado = useMemo(() => {
    return animales.filter((a) => {
      if (filtros.especie !== "todas" && a.especie !== filtros.especie) return false;
      if (filtros.tamano !== "todos" && a.tamano !== filtros.tamano) return false;
      if (filtros.sexo !== "todos" && a.sexo !== filtros.sexo) return false;
      if (filtros.sucursal !== "todas" && a.sucursal !== filtros.sucursal) return false;
      if (filtros.edad !== "todas" && edadBucket(a.edadAproximada) !== filtros.edad) return false;
      return true;
    });
  }, [animales, filtros]);

  const activos = Object.entries(filtros).filter(
    ([k, v]) => v !== initialFiltros[k as keyof Filtros]
  ).length;

  function update<K extends keyof Filtros>(key: K, value: Filtros[K]) {
    setFiltros((f) => ({ ...f, [key]: value }));
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-ink-soft">
          <span className="font-semibold text-ink">{resultado.length}</span>{" "}
          {resultado.length === 1 ? "huellita esperando" : "huellitas esperando"}
        </p>
        <button
          onClick={() => setShowFilters((s) => !s)}
          className="flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-medium text-ink shadow-sm transition-colors hover:border-brand/40"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
          {activos > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-xs text-cream">
              {activos}
            </span>
          )}
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl bg-cream-warm p-4 sm:grid-cols-3 md:grid-cols-5">
              <Select label="Especie" value={filtros.especie} onChange={(v) => update("especie", v)}
                options={[["todas", "Todas"], ["perro", "Perro"], ["gato", "Gato"]]} />
              <Select label="Tamaño" value={filtros.tamano} onChange={(v) => update("tamano", v)}
                options={[["todos", "Todos"], ["chico", "Chico"], ["mediano", "Mediano"], ["grande", "Grande"]]} />
              <Select label="Edad" value={filtros.edad} onChange={(v) => update("edad", v)}
                options={[["todas", "Todas"], ["cachorro", "Cachorro"], ["joven", "Joven"], ["adulto", "Adulto"]]} />
              <Select label="Sexo" value={filtros.sexo} onChange={(v) => update("sexo", v)}
                options={[["todos", "Todos"], ["macho", "Macho"], ["hembra", "Hembra"]]} />
              <Select label="Sucursal" value={filtros.sucursal} onChange={(v) => update("sucursal", v)}
                options={[["todas", "Todas"], ...sucursales.map((s) => [s, s] as [string, string])]} />
            </div>
            {activos > 0 && (
              <button
                onClick={() => setFiltros(initialFiltros)}
                className="mt-3 flex items-center gap-1 text-xs font-medium text-brand hover:text-brand-dark"
              >
                <X className="h-3.5 w-3.5" />
                Limpiar filtros
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        layout
        className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {resultado.map((animal, i) => (
            <AnimalCard key={animal.id} animal={animal} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {resultado.length === 0 && (
        <div className="mt-16 text-center text-ink-soft">
          <p className="font-display text-xl">No hay huellitas con esos filtros todavía.</p>
          <p className="mt-1 text-sm">Prueba ajustando la búsqueda — el catálogo cambia seguido.</p>
        </div>
      )}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft/70">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "rounded-lg border border-ink/10 bg-white px-2.5 py-2 text-sm text-ink outline-none focus:border-brand"
        )}
      >
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </label>
  );
}
