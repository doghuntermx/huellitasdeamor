"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import type { Animal } from "@/lib/types";
import { useAdminData } from "@/lib/admin/store";

const schema = z.object({
  nombre: z.string().min(1, "Requerido"),
  slug: z
    .string()
    .min(1, "Requerido")
    .regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones"),
  especie: z.enum(["perro", "gato"]),
  razaAproximada: z.string().optional(),
  edadAproximada: z.string().min(1, "Requerido"),
  tamano: z.enum(["chico", "mediano", "grande"]),
  sexo: z.enum(["macho", "hembra"]),
  sucursal: z.string().min(1, "Requerido"),
  estado: z.enum(["disponible", "en_proceso", "adoptado"]),
  historiaCorta: z.string().min(1, "Requerido"),
  personalidad: z.string(),
  requisitosAdopcion: z.string(),
  fotos: z.string().min(1, "Agrega al menos una URL de foto"),
  destacado: z.boolean(),
});

type FormData = z.infer<typeof schema>;

function toFormValues(a?: Animal): FormData {
  return {
    nombre: a?.nombre ?? "",
    slug: a?.slug ?? "",
    especie: a?.especie ?? "perro",
    razaAproximada: a?.razaAproximada ?? "",
    edadAproximada: a?.edadAproximada ?? "",
    tamano: a?.tamano ?? "mediano",
    sexo: a?.sexo ?? "macho",
    sucursal: a?.sucursal ?? "",
    estado: a?.estado ?? "disponible",
    historiaCorta: a?.historiaCorta ?? "",
    personalidad: a?.personalidad.join(", ") ?? "",
    requisitosAdopcion: a?.requisitosAdopcion.join(", ") ?? "",
    fotos: a?.fotos.join(", ") ?? "",
    destacado: a?.destacado ?? false,
  };
}

export function AnimalForm({ animal }: { animal?: Animal }) {
  const router = useRouter();
  const { addAnimal, updateAnimal } = useAdminData();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: toFormValues(animal) });

  async function onSubmit(data: FormData) {
    setError(null);
    const payload: Omit<Animal, "id"> = {
      nombre: data.nombre,
      slug: data.slug,
      especie: data.especie,
      razaAproximada: data.razaAproximada || undefined,
      edadAproximada: data.edadAproximada,
      tamano: data.tamano,
      sexo: data.sexo,
      sucursal: data.sucursal,
      estado: data.estado,
      historiaCorta: data.historiaCorta,
      personalidad: data.personalidad.split(",").map((s) => s.trim()).filter(Boolean),
      requisitosAdopcion: data.requisitosAdopcion.split(",").map((s) => s.trim()).filter(Boolean),
      fotos: data.fotos.split(",").map((s) => s.trim()).filter(Boolean),
      fechaIngreso: animal?.fechaIngreso ?? new Date().toISOString().slice(0, 10),
      destacado: data.destacado,
    };

    const err = animal ? await updateAnimal(animal.id, payload) : await addAnimal(payload);
    if (err) {
      setError(err);
      return;
    }
    router.push("/admin/animales");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-5">
      {error && (
        <p className="flex items-center gap-2 rounded-xl bg-brand/10 px-4 py-2.5 text-sm text-brand-dark">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre" error={errors.nombre?.message}>
          <input {...register("nombre")} className={inputCls} />
        </Field>
        <Field label="Slug (URL)" error={errors.slug?.message}>
          <input {...register("slug")} className={inputCls} placeholder="canela" />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Especie">
          <select {...register("especie")} className={inputCls}>
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
          </select>
        </Field>
        <Field label="Tamaño">
          <select {...register("tamano")} className={inputCls}>
            <option value="chico">Chico</option>
            <option value="mediano">Mediano</option>
            <option value="grande">Grande</option>
          </select>
        </Field>
        <Field label="Sexo">
          <select {...register("sexo")} className={inputCls}>
            <option value="macho">Macho</option>
            <option value="hembra">Hembra</option>
          </select>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Edad aproximada" error={errors.edadAproximada?.message}>
          <input {...register("edadAproximada")} className={inputCls} placeholder="2 años" />
        </Field>
        <Field label="Raza aproximada">
          <input {...register("razaAproximada")} className={inputCls} />
        </Field>
        <Field label="Sucursal" error={errors.sucursal?.message}>
          <input {...register("sucursal")} className={inputCls} />
        </Field>
      </div>

      <Field label="Estado">
        <select {...register("estado")} className={inputCls}>
          <option value="disponible">Disponible</option>
          <option value="en_proceso">En proceso de adopción</option>
          <option value="adoptado">Adoptado</option>
        </select>
      </Field>

      <Field label="Historia corta" error={errors.historiaCorta?.message}>
        <textarea {...register("historiaCorta")} rows={4} className={inputCls} />
      </Field>

      <Field label="Personalidad (separada por comas)">
        <input {...register("personalidad")} className={inputCls} placeholder="Juguetona, Cariñosa" />
      </Field>

      <Field label="Requisitos de adopción (separados por comas)">
        <input {...register("requisitosAdopcion")} className={inputCls} />
      </Field>

      <Field label="Fotos — URLs separadas por comas" error={errors.fotos?.message}>
        <input {...register("fotos")} className={inputCls} placeholder="https://..." />
      </Field>

      <label className="flex items-center gap-2 text-sm text-ink">
        <input type="checkbox" {...register("destacado")} className="h-4 w-4 rounded border-ink/20 accent-brand" />
        Mostrar como destacado en el Inicio
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-cream shadow-md shadow-brand/25 transition-transform hover:scale-105 disabled:opacity-60"
      >
        {animal ? "Guardar cambios" : "Crear animal"}
      </button>
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
