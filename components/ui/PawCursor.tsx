"use client";

import { useEffect, useRef, useState } from "react";

interface Print {
  id: number;
  x: number;
  y: number;
  rot: number;
  flip: boolean;
}

/**
 * Cursor personalizado: deja una huella de patita cada cierta distancia
 * recorrida. Solo se activa en dispositivos con mouse fino y si el usuario
 * no pidió movimiento reducido.
 */
export function PawCursor() {
  const [enabled, setEnabled] = useState(false);
  const [prints, setPrints] = useState<Print[]>([]);
  const lastPoint = useRef({ x: 0, y: 0 });
  const counter = useRef(0);
  const flipToggle = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    // Feature-detected client-only behavior: must flip after mount so the
    // server-rendered (disabled) markup matches the first client render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
    document.documentElement.classList.add("paw-cursor-active");

    function onMove(e: MouseEvent) {
      const dx = e.clientX - lastPoint.current.x;
      const dy = e.clientY - lastPoint.current.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 46) {
        lastPoint.current = { x: e.clientX, y: e.clientY };
        flipToggle.current = !flipToggle.current;
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        const id = counter.current++;
        setPrints((p) => [
          ...p.slice(-14),
          {
            id,
            x: e.clientX,
            y: e.clientY,
            rot: angle,
            flip: flipToggle.current,
          },
        ]);
        window.setTimeout(() => {
          setPrints((p) => p.filter((pr) => pr.id !== id));
        }, 900);
      }
    }

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("paw-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {prints.map((p) => (
        <svg
          key={p.id}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="var(--color-brand)"
          className="absolute animate-[pawfade_0.9s_ease-out_forwards]"
          style={{
            left: p.x - 9,
            top: p.y - 9,
            transform: `rotate(${p.rot}deg) scaleX(${p.flip ? -1 : 1})`,
          }}
        >
          <ellipse cx="12" cy="16" rx="5.2" ry="4.4" />
          <ellipse cx="5.5" cy="9" rx="2.1" ry="2.6" />
          <ellipse cx="10.2" cy="5.5" rx="2.1" ry="2.7" />
          <ellipse cx="15.5" cy="6" rx="2" ry="2.6" />
          <ellipse cx="19.2" cy="10.2" rx="1.9" ry="2.4" />
        </svg>
      ))}
      <style jsx global>{`
        @keyframes pawfade {
          0% {
            opacity: 0.55;
            transform-origin: center;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
