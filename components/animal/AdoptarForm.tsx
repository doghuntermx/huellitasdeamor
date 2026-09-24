"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { PawPrint, CheckCircle2, AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  nombre: z.string().min(2, "Cuéntanos tu nombre"),
  telefono: z.string().min(8, "Ingresa un teléfono a 10 dígitos"),
  email: z.string().email("Ingresa un correo válido"),
  mensaje: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function AdoptarForm({ animalId, nombreAnimal }: { animalId: string; nombreAnimal: string }) {
  const [enviado, setEnviado] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setErrorEnvio(false);
    const supabase = createClient();
    // TODO: además de insertar, disparar notificación interna al equipo
    // (correo vía Resend u otro proveedor) cuando se conecte.
    const { error } = await supabase.from("solicitudes_apoyo").insert({
      tipo: "adopcion",
      animal_id: animalId,
      nombre_animal: nombreAnimal,
      nombre_contacto: data.nombre,
      telefono: data.telefono,
      email: data.email,
      descripcion: data.mensaje || `Solicitud de adopción para ${nombreAnimal}.`,
    });
    if (error) {
      setErrorEnvio(true);
      return;
    }
    setEnviado(true);
  }

  if (enviado) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-brand/10 p-6 text-center"
      >
        <CheckCircle2 className="mx-auto h-8 w-8 text-brand" />
        <p className="mt-3 font-display text-lg font-semibold text-ink">
          ¡Recibimos tu solicitud para {nombreAnimal}!
        </p>
        <p className="mt-1 text-sm text-ink-soft">
          Nuestro equipo se pondrá en contacto contigo en los próximos días
          hábiles para continuar el proceso.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {errorEnvio && (
        <p className="flex items-center gap-2 rounded-xl bg-brand/10 px-4 py-2.5 text-sm text-brand-dark">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          No pudimos enviar tu solicitud. Revisa tu conexión e intenta de nuevo.
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-ink">Tu nombre</label>
          <input
            {...register("nombre")}
            className="mt-1 w-full rounded-xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
            placeholder="¿Cómo te llamas?"
          />
          {errors.nombre && <p className="mt-1 text-xs text-brand">{errors.nombre.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-ink">Teléfono</label>
          <input
            {...register("telefono")}
            className="mt-1 w-full rounded-xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
            placeholder="10 dígitos"
          />
          {errors.telefono && <p className="mt-1 text-xs text-brand">{errors.telefono.message}</p>}
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-ink">Correo electrónico</label>
        <input
          {...register("email")}
          className="mt-1 w-full rounded-xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
          placeholder="tucorreo@ejemplo.com"
        />
        {errors.email && <p className="mt-1 text-xs text-brand">{errors.email.message}</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-ink">
          Cuéntanos por qué quieres adoptar a {nombreAnimal} (opcional)
        </label>
        <textarea
          {...register("mensaje")}
          rows={3}
          className="mt-1 w-full rounded-xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-cream shadow-md shadow-brand/25 transition-transform hover:scale-105 disabled:opacity-60"
      >
        <PawPrint className="h-4 w-4" />
        {isSubmitting ? "Enviando..." : `Quiero darle un hogar a ${nombreAnimal}`}
      </button>
    </form>
  );
}
