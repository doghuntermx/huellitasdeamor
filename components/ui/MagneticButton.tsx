"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { type ReactNode, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  variant?: "brand" | "dark" | "outline";
  className?: string;
  icon?: ReactNode;
}

const variants: Record<string, string> = {
  brand: "bg-brand text-cream hover:bg-brand-dark shadow-lg shadow-brand/25",
  dark: "bg-ink text-cream hover:bg-ink/85 shadow-lg shadow-ink/25",
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-cream",
};

export function MagneticButton({
  href,
  children,
  variant = "brand",
  className,
  icon,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.35, y: y * 0.35 });
  }

  function handleLeave() {
    setPos({ x: 0, y: 0 });
  }

  return (
    <motion.div
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.4 }}
      className="inline-block"
    >
      <Link
        ref={ref}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={cn(
          "group relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold tracking-tight transition-colors duration-300",
          variants[variant],
          className
        )}
      >
        <span>{children}</span>
        {icon && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </Link>
    </motion.div>
  );
}
