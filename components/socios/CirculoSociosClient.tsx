"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { NivelSocio } from "@/lib/types";
import { NivelCard } from "@/components/socios/NivelCard";
import { SocioForm } from "@/components/forms/SocioForm";

export function CirculoSociosClient({ niveles }: { niveles: NivelSocio[] }) {
  const destacado = niveles.find((n) => n.destacado) ?? niveles[0];
  const [seleccionado, setSeleccionado] = useState<NivelSocio>(destacado);

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {niveles.map((nivel) => (
          <NivelCard
            key={nivel.id}
            nivel={nivel}
            selected={seleccionado.id === nivel.id}
            onSelect={() => setSeleccionado(nivel)}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={seleccionado.id}
          id="inscripcion"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="mx-auto mt-14 max-w-xl scroll-mt-24 rounded-3xl bg-white p-6 shadow-lg shadow-ink/5 ring-1 ring-ink/5 md:p-8"
        >
          <h2 className="font-display text-2xl font-semibold text-ink">
            Únete al Círculo de Socios
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            Completa tus datos para comenzar tu membresía mensual.
          </p>
          <div className="mt-6">
            <SocioForm nivel={seleccionado} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
