"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import type {
  Animal,
  SolicitudApoyo,
  EstadoSolicitud,
  SocioActivo,
  Donativo,
} from "@/lib/types";

/**
 * Store del panel de administración. Todo se lee y se escribe en Supabase
 * de verdad, protegido por las políticas de RLS en supabase/admin-auth.sql:
 * solo una persona autenticada Y presente en la tabla `admins` puede ver o
 * modificar estos datos.
 */

interface AdminStore {
  animales: Animal[];
  cargando: boolean;
  addAnimal: (a: Omit<Animal, "id">) => Promise<string | null>;
  updateAnimal: (id: string, a: Partial<Animal>) => Promise<string | null>;
  deleteAnimal: (id: string) => Promise<string | null>;

  solicitudes: SolicitudApoyo[];
  updateEstadoSolicitud: (id: string, estado: EstadoSolicitud) => Promise<string | null>;

  socios: SocioActivo[];
  donativos: Donativo[];

  refrescar: () => void;
}

const AdminDataContext = createContext<AdminStore | null>(null);

function mapAnimalRow(row: Record<string, unknown>): Animal {
  return {
    id: row.id as string,
    slug: row.slug as string,
    nombre: row.nombre as string,
    especie: row.especie as Animal["especie"],
    razaAproximada: (row.raza_aproximada as string) ?? undefined,
    edadAproximada: row.edad_aproximada as string,
    tamano: row.tamano as Animal["tamano"],
    sexo: row.sexo as Animal["sexo"],
    sucursal: row.sucursal as string,
    estado: row.estado as Animal["estado"],
    historiaCorta: row.historia_corta as string,
    personalidad: (row.personalidad as string[]) ?? [],
    requisitosAdopcion: (row.requisitos_adopcion as string[]) ?? [],
    fotos: (row.fotos as string[]) ?? [],
    fechaIngreso: row.fecha_ingreso as string,
    destacado: (row.destacado as boolean) ?? false,
  };
}

function toAnimalRow(a: Partial<Animal>) {
  const row: Record<string, unknown> = {};
  if (a.slug !== undefined) row.slug = a.slug;
  if (a.nombre !== undefined) row.nombre = a.nombre;
  if (a.especie !== undefined) row.especie = a.especie;
  if (a.razaAproximada !== undefined) row.raza_aproximada = a.razaAproximada || null;
  if (a.edadAproximada !== undefined) row.edad_aproximada = a.edadAproximada;
  if (a.tamano !== undefined) row.tamano = a.tamano;
  if (a.sexo !== undefined) row.sexo = a.sexo;
  if (a.sucursal !== undefined) row.sucursal = a.sucursal;
  if (a.estado !== undefined) row.estado = a.estado;
  if (a.historiaCorta !== undefined) row.historia_corta = a.historiaCorta;
  if (a.personalidad !== undefined) row.personalidad = a.personalidad;
  if (a.requisitosAdopcion !== undefined) row.requisitos_adopcion = a.requisitosAdopcion;
  if (a.fotos !== undefined) row.fotos = a.fotos;
  if (a.destacado !== undefined) row.destacado = a.destacado;
  return row;
}

function mapSolicitudRow(row: Record<string, unknown>): SolicitudApoyo {
  return {
    id: row.id as string,
    tipo: row.tipo as SolicitudApoyo["tipo"],
    nombreContacto: row.nombre_contacto as string,
    telefono: row.telefono as string,
    email: (row.email as string) ?? undefined,
    descripcion: row.descripcion as string,
    ubicacion: (row.ubicacion as string) ?? undefined,
    nombreAnimal: (row.nombre_animal as string) ?? undefined,
    estado: row.estado as EstadoSolicitud,
    createdAt: (row.created_at as string).slice(0, 10),
  };
}

function mapSocioRow(row: Record<string, unknown>): SocioActivo {
  return {
    id: row.id as string,
    nombre: row.nombre as string,
    email: row.email as string,
    nivelId: row.nivel_id as string,
    montoMensual: Number(row.monto_mensual),
    fechaAlta: row.fecha_alta as string,
    estado: row.estado as SocioActivo["estado"],
  };
}

function mapDonativoRow(row: Record<string, unknown>): Donativo {
  return {
    id: row.id as string,
    monto: Number(row.monto),
    moneda: row.moneda as string,
    metodoPago: row.metodo_pago as string,
    estado: row.estado as Donativo["estado"],
    nombreDonante: row.nombre_donante as string,
    emailDonante: (row.email_donante as string) ?? "",
    createdAt: (row.created_at as string).slice(0, 10),
  };
}

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [animales, setAnimales] = useState<Animal[]>([]);
  const [solicitudes, setSolicitudes] = useState<SolicitudApoyo[]>([]);
  const [socios, setSocios] = useState<SocioActivo[]>([]);
  const [donativos, setDonativos] = useState<Donativo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelado = false;
    const supabase = createClient();

    async function cargarTodo() {
      const [a, s, so, d] = await Promise.all([
        supabase.from("animales").select("*").order("created_at", { ascending: false }),
        supabase.from("solicitudes_apoyo").select("*").order("created_at", { ascending: false }),
        supabase.from("socios").select("*").order("created_at", { ascending: false }),
        supabase.from("donativos").select("*").order("created_at", { ascending: false }),
      ]);
      if (cancelado) return;
      if (a.data) setAnimales(a.data.map(mapAnimalRow));
      if (s.data) setSolicitudes(s.data.map(mapSolicitudRow));
      if (so.data) setSocios(so.data.map(mapSocioRow));
      if (d.data) setDonativos(d.data.map(mapDonativoRow));
      setCargando(false);
    }

    cargarTodo();
    return () => {
      cancelado = true;
    };
  }, [tick]);

  const value = useMemo<AdminStore>(
    () => ({
      animales,
      cargando,
      refrescar: () => {
        setCargando(true);
        setTick((t) => t + 1);
      },

      async addAnimal(a) {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("animales")
          .insert(toAnimalRow(a))
          .select()
          .single();
        if (error) return error.message;
        setAnimales((prev) => [mapAnimalRow(data), ...prev]);
        return null;
      },

      async updateAnimal(id, patch) {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("animales")
          .update(toAnimalRow(patch))
          .eq("id", id)
          .select()
          .single();
        if (error) return error.message;
        setAnimales((prev) => prev.map((a) => (a.id === id ? mapAnimalRow(data) : a)));
        return null;
      },

      async deleteAnimal(id) {
        const supabase = createClient();
        const { error } = await supabase.from("animales").delete().eq("id", id);
        if (error) return error.message;
        setAnimales((prev) => prev.filter((a) => a.id !== id));
        return null;
      },

      solicitudes,
      async updateEstadoSolicitud(id, estado) {
        const supabase = createClient();
        const { error } = await supabase
          .from("solicitudes_apoyo")
          .update({ estado })
          .eq("id", id);
        if (error) return error.message;
        setSolicitudes((prev) => prev.map((s) => (s.id === id ? { ...s, estado } : s)));
        return null;
      },

      socios,
      donativos,
    }),
    [animales, cargando, solicitudes, socios, donativos]
  );

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error("useAdminData debe usarse dentro de AdminDataProvider");
  return ctx;
}
