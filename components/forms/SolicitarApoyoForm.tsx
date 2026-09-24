"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Stethoscope, CheckCircle2, ArrowLeft } from "lucide-react";
import type { TipoSolicitud } from "@/lib/types";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const baseFields = {
  nombreContacto: z.string().min(2, "Cuéntanos tu nombre"),
  telefono: z.string().min(8, "Ingresa un teléfono a 10 dígitos"),
  email: z.string().email("Ingresa un correo válido").optional().or(z.literal("")),
  descripcion: z.string().min(10, "Cuéntanos un poco más (mínimo 10 caracteres)"),
};

const reporteSchema = z.object({
  ...baseFields,
  ubicacion: z.string().min(4, "Indica la ubicación lo más precisa posible"),
});

const propiaSchema = z.object({
  ...baseFields,
  nombreAnimal: z.string().min(1, "¿Cómo se llama tu mascota?"),
});

type ReporteData = z.infer<typeof reporteSchema>;
type PropiaData = z.infer<typeof propiaSchema>;

const tipos: { id: TipoSolicitud; title: string; desc: string; icon: typeof AlertTriangle }[] = [
  {
    id: "reporte_calle",
    title: "Reportar un animal en situación de calle",
    desc: "Viste un animal abandonado, herido o en riesgo.",
    icon: AlertTriangle,
  },
  {
    id: "apoyo_mascota_propia",
    title: "Solicitar apoyo veterinario para mi mascota",
    desc: "Necesitas ayuda para atender a tu propio animal.",
    icon: Stethoscope,
  },
];

export function SolicitarApoyoForm() {
  const [tipo, setTipo] = useState<TipoSolicitud | null>(null);
  const [enviado, setEnviado] = useState(false);

  if (enviado) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-lg rounded-3xl bg-brand/10 p-8 text-center"
      >
        <CheckCircle2 className="mx-auto h-9 w-9 text-brand" />
        <h2 className="mt-4 font-display text-xl font-semibold text-ink">
          Recibimos tu solicitud
        </h2>
        <p className="mt-2 text-sm text-ink-soft">
          Nuestro equipo la revisará y te contactará en un plazo de 2 a 3 días
          hábiles. Si es una urgencia médica, por favor contáctanos también
          por teléfono.
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      <AnimatePresence mode="wait">
        {!tipo ? (
          <motion.div
            key="selector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {tipos.map((t) => (
              <button
                key={t.id}
                onClick={() => setTipo(t.id)}
                className="group flex flex-col items-start gap-3 rounded-2xl border-2 border-ink/10 bg-white p-6 text-left transition-all hover:border-brand hover:shadow-lg hover:shadow-brand/10"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-cream">
                  <t.icon className="h-5 w-5" />
                </span>
                <span className="font-display text-lg font-semibold text-ink">{t.title}</span>
                <span className="text-sm text-ink-soft">{t.desc}</span>
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setTipo(null)}
              className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-brand"
            >
              <ArrowLeft className="h-4 w-4" />
              Elegir otro tipo de solicitud
            </button>
            {tipo === "reporte_calle" ? (
              <ReporteForm onSuccess={() => setEnviado(true)} />
            ) : (
              <PropiaForm onSuccess={() => setEnviado(true)} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ReporteForm({ onSuccess }: { onSuccess: () => void }) {
  const [errorEnvio, setErrorEnvio] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReporteData>({ resolver: zodResolver(reporteSchema) });

  async function onSubmit(data: ReporteData) {
    setErrorEnvio(false);
    const supabase = createClient();
    // TODO: además de insertar, disparar notificación interna al equipo
    // (correo vía Resend u otro proveedor) cuando se conecte.
    const { error } = await supabase.from("solicitudes_apoyo").insert({
      tipo: "reporte_calle",
      nombre_contacto: data.nombreContacto,
      telefono: data.telefono,
      email: data.email || null,
      descripcion: data.descripcion,
      ubicacion: data.ubicacion,
    });
    if (error) {
      setErrorEnvio(true);
      return;
    }
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5 md:p-8">
      {errorEnvio && <ErrorEnvio />}
      <Field label="Ubicación del animal" error={errors.ubicacion?.message}>
        <input {...register("ubicacion")} className={inputCls} placeholder="Calle, colonia, referencias" />
      </Field>
      <Field label="Descripción de la situación" error={errors.descripcion?.message}>
        <textarea {...register("descripcion")} rows={4} className={inputCls} placeholder="Estado aparente del animal, tiempo que lleva ahí, riesgos..." />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tu nombre" error={errors.nombreContacto?.message}>
          <input {...register("nombreContacto")} className={inputCls} />
        </Field>
        <Field label="Teléfono" error={errors.telefono?.message}>
          <input {...register("telefono")} className={inputCls} />
        </Field>
      </div>
      <Field label="Correo (opcional)" error={errors.email?.message}>
        <input {...register("email")} className={inputCls} />
      </Field>
      <SubmitButton submitting={isSubmitting} label="Enviar reporte" />
    </form>
  );
}

function PropiaForm({ onSuccess }: { onSuccess: () => void }) {
  const [errorEnvio, setErrorEnvio] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PropiaData>({ resolver: zodResolver(propiaSchema) });

  async function onSubmit(data: PropiaData) {
    setErrorEnvio(false);
    const supabase = createClient();
    // TODO: además de insertar, disparar notificación interna al equipo
    // (correo vía Resend u otro proveedor) cuando se conecte.
    const { error } = await supabase.from("solicitudes_apoyo").insert({
      tipo: "apoyo_mascota_propia",
      nombre_contacto: data.nombreContacto,
      telefono: data.telefono,
      email: data.email || null,
      descripcion: data.descripcion,
      nombre_animal: data.nombreAnimal,
    });
    if (error) {
      setErrorEnvio(true);
      return;
    }
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5 md:p-8">
      {errorEnvio && <ErrorEnvio />}
      <Field label="Nombre de tu mascota" error={errors.nombreAnimal?.message}>
        <input {...register("nombreAnimal")} className={inputCls} />
      </Field>
      <Field label="Motivo de la solicitud" error={errors.descripcion?.message}>
        <textarea {...register("descripcion")} rows={4} className={inputCls} placeholder="¿Qué necesita tu mascota? ¿Qué tratamiento o situación enfrenta?" />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tu nombre" error={errors.nombreContacto?.message}>
          <input {...register("nombreContacto")} className={inputCls} />
        </Field>
        <Field label="Teléfono" error={errors.telefono?.message}>
          <input {...register("telefono")} className={inputCls} />
        </Field>
      </div>
      <Field label="Correo (opcional)" error={errors.email?.message}>
        <input {...register("email")} className={inputCls} />
      </Field>
      <SubmitButton submitting={isSubmitting} label="Enviar solicitud" />
    </form>
  );
}

const inputCls =
  "mt-1 w-full rounded-xl border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-medium text-ink">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-brand">{error}</p>}
    </div>
  );
}

function ErrorEnvio() {
  return (
    <p className="flex items-center gap-2 rounded-xl bg-brand/10 px-4 py-2.5 text-sm text-brand-dark">
      <AlertTriangle className="h-4 w-4 shrink-0" />
      No pudimos enviar tu solicitud. Revisa tu conexión e intenta de nuevo.
    </p>
  );
}

function SubmitButton({ submitting, label }: { submitting: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={submitting}
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-cream shadow-md shadow-brand/25 transition-transform hover:scale-105 disabled:opacity-60"
      )}
    >
      {submitting ? "Enviando..." : label}
    </button>
  );
}
