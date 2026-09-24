"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt: string;
}

export function BeforeAfterSlider({
  before,
  after,
  beforeLabel = "Antes",
  afterLabel = "Ahora",
  alt,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(50);
  const [interacted, setInteracted] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Sugiere que el control es interactivo con un pequeño vaivén inicial.
    controls.start({
      left: ["50%", "38%", "62%", "50%"],
      transition: { duration: 2.2, delay: 0.6, ease: "easeInOut" },
    });
  }, [controls]);

  function updateFromClientX(clientX: number) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setPercent((x / rect.width) * 100);
    if (!interacted) setInteracted(true);
  }

  return (
    <div
      ref={containerRef}
      className="group relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-3xl bg-cream-warm"
      onPointerDown={(e) => {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (e.buttons !== 1) return;
        updateFromClientX(e.clientX);
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={after}
        alt={`${alt} — después`}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={before}
          alt={`${alt} — antes`}
          className="absolute inset-0 h-full w-full object-cover grayscale contrast-90"
          draggable={false}
        />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-cream">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-brand px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-cream">
        {afterLabel}
      </span>

      <motion.div
        initial={{ left: "50%" }}
        animate={!interacted ? controls : undefined}
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-cream shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
        style={interacted ? { left: `${percent}%` } : undefined}
      >
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-ink shadow-lg">
          <MoveHorizontal className="h-4 w-4" />
        </div>
      </motion.div>
    </div>
  );
}
