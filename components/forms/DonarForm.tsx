"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { CreditCard, Landmark, Store, Heart, AlertTriangle } from "lucide-react";
import { cn, formatMXN } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const montosSugeridos = [150, 300, 500, 1000];

const metodos = [
  { id: "tarjeta", label: "Tarjeta", icon: CreditCard },
  { id: "spei", label: "SPEI", icon: Landmark },
  { id: "oxxo", label: "OXXO", icon: Store },
] as const;

const schema = z.object({
  nombre: z.string().min(2, "Cuéntanos tu nombre"),
  email: z.string().email("Ingresa un correo válido"),
});

type FormData = z.infer<typeof schema>;

export function DonarForm() {
  const router = useRouter();
  const [monto, setMonto] = useState<number>(300);
  const [montoLibre, setMontoLibre] = useState("");
  const [metodo, setMetodo] = useState<(typeof metodos)[number]["id"]>("tarjeta");
  const [errorEnvio, setErrorEnvio] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const montoFinal = montoLibre ? Number(montoLibre) : monto;

  async function onSubmit(data: FormData) {
    setErrorEnvio(false);
    const supabase = createClient();
    // Se registra como "pendiente": el cobro real todavía no está
    // conectado (falta el Checkout hospedado de Clip). La fuente de verdad
    // de si el pago se completó será siempre el webhook del proveedor, no
    // este formulario — ver TODO en huellitas-web-fase1-brief-tecnico.md.
    const { error } = await supabase.from("donativos").insert({
      monto: montoFinal,
      moneda: "MXN",
      metodo_pago: metodo,
      estado: "pendiente",
      nombre_donante: data.nombre,
      email_donante: data.email,
    });
    if (error) {
      setErrorEnvio(true);
      return;
    }
    const params = new URLSearchParams({
      monto: String(montoFinal),
      metodo,
      nombre: data.nombre,
    });
    router.push(`/donar/gracias?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {errorEnvio && (
        <p className="flex items-center gap-2 rounded-xl bg-brand/10 px-4 py-2.5 text-sm text-brand-dark">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          No pudimos registrar tu donativo. Intenta de nuevo.
        </p>
      )}
      <div>
        <h2 className="font-display text-lg font-semibold text-ink">Elige un monto</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {montosSugeridos.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMonto(m);
                setMontoLibre("");
              }}
              className={cn(
                "relative rounded-2xl border-2 px-4 py-4 text-center font-display text-lg font-semibold transition-all",
                monto === m && !montoLibre
                  ? "border-brand bg-brand/5 text-brand"
                  : "border-ink/10 text-ink hover:border-brand/40"
              )}
            >
              {monto === m && !montoLibre && (
                <motion.span
                  layoutId="monto-activo"
                  className="absolute inset-0 rounded-2xl border-2 border-brand"
                />
              )}
              <span className="relative">{formatMXN(m)}</span>
            </button>
          ))}
        </div>
        <div className="mt-3">
          <label className="text-sm font-medium text-ink-soft">O ingresa otro monto</label>
          <div className="relative mt-1">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft">$</span>
            <input
              type="number"
              min={1}
              value={montoLibre}
              onChange={(e) => setMontoLibre(e.target.value)}
              placeholder="Monto libre"
              className="w-full rounded-xl border border-ink/10 bg-white py-3 pl-8 pr-4 text-sm outline-none focus:border-brand"
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-display text-lg font-semibold text-ink">Método de pago</h2>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {metodos.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMetodo(m.id)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-2xl border-2 px-3 py-4 text-sm font-medium transition-all",
                metodo === m.id ? "border-brand bg-brand/5 text-brand" : "border-ink/10 text-ink-soft hover:border-brand/40"
              )}
            >
              <m.icon className="h-5 w-5" />
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-display text-lg font-semibold text-ink">Tus datos</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <input
              {...register("nombre")}
              placeholder="Nombre completo"
              className="w-full rounded-xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
            />
            {errors.nombre && <p className="mt-1 text-xs text-brand">{errors.nombre.message}</p>}
          </div>
          <div>
            <input
              {...register("email")}
              placeholder="Correo electrónico"
              className="w-full rounded-xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
            />
            {errors.email && <p className="mt-1 text-xs text-brand">{errors.email.message}</p>}
          </div>
        </div>
        <p className="mt-2 text-xs text-ink-soft/70">
          Recibirás un recibo de tu donativo por correo. Huellitas de Amor A.C.
          no es donataria autorizada, por lo que este donativo no es deducible
          de impuestos.
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || montoFinal <= 0}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand py-4 text-base font-semibold text-cream shadow-lg shadow-brand/25 transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        <Heart className="h-5 w-5 fill-current" />
        {isSubmitting ? "Procesando..." : `Donar ${formatMXN(montoFinal || 0)}`}
      </button>
    </form>
  );
}
