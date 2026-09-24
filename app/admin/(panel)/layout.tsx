"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  PawPrint,
  Inbox,
  Users,
  HeartHandshake,
  LogOut,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { useAdminAuth } from "@/lib/admin/auth";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Resumen", icon: LayoutDashboard },
  { href: "/admin/animales", label: "Animales", icon: PawPrint },
  { href: "/admin/solicitudes", label: "Solicitudes", icon: Inbox },
  { href: "/admin/socios", label: "Socios", icon: Users },
  { href: "/admin/donativos", label: "Donativos", icon: HeartHandshake },
];

export default function AdminPanelLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, logout } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-ink-soft">Cargando…</div>;
  }

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-ink/10 bg-white p-5 md:flex">
        <Link href="/" className="flex items-center gap-2.5 px-1">
          <Image src="/logo/huellitas-logo.svg" alt="" width={36} height={36} />
          <span className="font-display text-base font-semibold text-ink">
            Huellitas <span className="text-brand">Admin</span>
          </span>
        </Link>

        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active ? "bg-brand/10 text-brand" : "text-ink-soft hover:bg-cream-warm hover:text-ink"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-ink/10 pt-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-cream-warm hover:text-ink"
          >
            <ExternalLink className="h-4 w-4" />
            Ver sitio público
          </Link>
          <button
            onClick={() => {
              logout();
              router.push("/admin/login");
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-ink-soft hover:bg-cream-warm hover:text-ink"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <div className="flex items-center gap-2 bg-ink px-5 py-2.5 text-xs text-cream md:px-8">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-brand-light" />
          Vista previa de demostración: los cambios aquí no se guardan de forma permanente todavía.
        </div>

        <nav className="flex gap-1 overflow-x-auto border-b border-ink/10 bg-white px-3 py-2 md:hidden">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium",
                  active ? "bg-brand text-cream" : "bg-cream-warm text-ink-soft"
                )}
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <main className="p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
