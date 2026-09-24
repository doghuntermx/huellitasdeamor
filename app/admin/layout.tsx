import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminAuthProvider } from "@/lib/admin/auth";
import { AdminDataProvider } from "@/lib/admin/store";

export const metadata: Metadata = {
  title: {
    default: "Panel de administración",
    template: "%s · Panel · Huellitas de Amor A.C.",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminDataProvider>
        <div className="min-h-screen bg-cream-warm text-ink">{children}</div>
      </AdminDataProvider>
    </AdminAuthProvider>
  );
}
