"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/nuestra-historia", label: "Nuestra Historia" },
  { href: "/adopciones", label: "Adopciones" },
  { href: "/solicitar-apoyo", label: "Solicitar Apoyo" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-cream/90 backdrop-blur-md shadow-sm shadow-ink/5"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/logo/huellitas-logo.svg"
            alt="Huellitas de Amor A.C."
            width={44}
            height={44}
            className="h-10 w-10 md:h-11 md:w-11"
            priority
          />
          <span className="font-display text-lg font-semibold leading-none text-ink md:text-xl">
            Huellitas
            <br className="hidden md:block" />
            <span className="text-brand"> de Amor</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "relative text-sm font-medium text-ink-soft transition-colors hover:text-brand",
                pathname === l.href && "text-brand"
              )}
            >
              {l.label}
              {pathname === l.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-brand"
                />
              )}
            </Link>
          ))}
          <Link
            href="/donar"
            className="inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-cream shadow-md shadow-brand/25 transition-transform hover:scale-105 hover:bg-brand-dark"
          >
            <Heart className="h-4 w-4 fill-current" />
            Donar
          </Link>
        </nav>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Abrir menú"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-ink/5 bg-cream md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-base font-medium text-ink-soft",
                    pathname === l.href && "bg-cream-warm text-brand"
                  )}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/donar"
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-brand px-5 py-3 text-base font-semibold text-cream"
              >
                <Heart className="h-4 w-4 fill-current" />
                Donar
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
