"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Next.js remonta este template en cada navegación, así que sirve como
 * punto de una transición de entrada distintiva: una cortina con la silueta
 * de la huella se retira mientras el contenido aparece debajo.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[9998] bg-brand"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1], delay: 0.05 }}
        style={{ transformOrigin: "top" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[9997] bg-ink"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1], delay: 0.15 }}
        style={{ transformOrigin: "top" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
