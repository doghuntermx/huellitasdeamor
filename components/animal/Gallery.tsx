"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Gallery({ fotos, nombre }: { fotos: string[]; nombre: string }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  function go(next: number) {
    setDir(next > index ? 1 : -1);
    setIndex((next + fotos.length) % fotos.length);
  }

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-cream-warm shadow-sm">
        <AnimatePresence custom={dir} mode="wait">
          <motion.img
            key={index}
            src={fotos[index]}
            alt={`${nombre} — foto ${index + 1}`}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40, scale: 1.02 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -dir * 40, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full object-cover"
          />
        </AnimatePresence>

        {fotos.length > 1 && (
          <>
            <button
              onClick={() => go(index - 1)}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink shadow-md backdrop-blur transition-transform hover:scale-110"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(index + 1)}
              aria-label="Foto siguiente"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink shadow-md backdrop-blur transition-transform hover:scale-110"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {fotos.length > 1 && (
        <div className="mt-3 flex gap-2">
          {fotos.map((f, i) => (
            <button
              key={f + i}
              onClick={() => go(i)}
              className={cn(
                "h-16 w-20 shrink-0 overflow-hidden rounded-xl ring-2 transition-all",
                i === index ? "ring-brand" : "ring-transparent opacity-70 hover:opacity-100"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
