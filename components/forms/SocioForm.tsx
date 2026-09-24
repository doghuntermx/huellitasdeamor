"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreditCard, HeartHandshake } from "lucide-react";
import type { NivelSocio } from "@/lib/types";
import { formatMXN } from "@/lib/utils";

const schema = z.object({
  nombre: z.string().min(2, "Cuéntanos tu nombre"),
  email: z.string().email("Ingresa un correo válido"),
  telefono: z.string().min(8, "Ingresa un teléfono a 10 dígitos"),
});

type FormData = z.infer<typeof schema>;

export function SocioForm({ nivel }: { nivel: NivelSocio }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    // TODO: crear suscripción recurrente real (Clip Suscripciones u otro
    // proveedor con soporte de cobro mensual) vía
    // /api/socios/crear-suscripcion, y guardar el socio en Supabase solo
    // tras confirmación del proveedor de pago — nunca antes.
    await new Promise((r) => setTimeout(r, 700));
    const params = new URLSearchParams({
      nivel: nivel.nombre,
      monto: String(nivel.montoMensual),
      nombre: data.nombre,
    });
    router.push(`/circulo-de-socios/gracias?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between rounded-2xl bg-cream-warm px-5 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft/70">
            Nivel seleccionado
          </p>
          <p className="font-display text-lg font-semibold text-ink">{nivel.nombre}</p>
        </div>
        <p className="font-display text-xl font-semibold text-brand">
          {formatMXN(nivel.montoMensual)}
          <span className="text-sm font-normal text-ink-soft">/mes</span>
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-ink">Nombre completo</label>
          <input
            {...register("nombre")}
            className="mt-1 w-full rounded-xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
          />
          {errors.nombre && <p className="mt-1 text-xs text-brand">{errors.nombre.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-ink">Teléfono</label>
          <input
            {...register("telefono")}
            className="mt-1 w-full rounded-xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
          />
          {errors.telefono && <p className="mt-1 text-xs text-brand">{errors.telefono.message}</p>}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-ink">Correo electrónico</label>
        <input
          {...register("email")}
          className="mt-1 w-full rounded-xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
        />
        {errors.email && <p className="mt-1 text-xs text-brand">{errors.email.message}</p>}
      </div>

      <div>
        <p className="text-sm font-medium text-ink">Método de pago</p>
        <div className="mt-2 flex items-center gap-2 rounded-xl border-2 border-brand bg-brand/5 px-4 py-3 text-sm font-medium text-ink">
          <CreditCard className="h-4 w-4 text-brand" />
          Tarjeta de crédito o débito
        </div>
        <p className="mt-1.5 text-xs text-ink-soft/70">
          El cobro recurrente solo puede procesarse con tarjeta. SPEI y OXXO
          están disponibles únicamente para donativos únicos.
        </p>
      </div>

      <p className="text-xs leading-relaxed text-ink-soft/70">
        Al confirmar, autorizas un cargo mensual de {formatMXN(nivel.montoMensual)} a tu
        tarjeta hasta que decidas cancelar tu membresía. Puedes cancelar en
        cualquier momento escribiéndonos a{" "}
        <a href="mailto:contacto@huellitasdeamor.org" className="text-brand hover:underline">
          contacto@huellitasdeamor.org
        </a>
        .
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand py-4 text-base font-semibold text-cream shadow-lg shadow-brand/25 transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        <HeartHandshake className="h-5 w-5" />
        {isSubmitting ? "Procesando..." : `Unirme por ${formatMXN(nivel.montoMensual)}/mes`}
      </button>
    </form>
  );
}
