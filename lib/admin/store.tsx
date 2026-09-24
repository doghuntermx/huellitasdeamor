"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  solicitudesMock,
  sociosActivosMock,
  donativosMock,
} from "@/lib/data/admin-mock";
import type {
  Animal,
  SolicitudApoyo,
  EstadoSolicitud,
  SocioActivo,
  Donativo,
} from "@/lib/types";

/**
 * Store del panel de administración.
 *
 * `animales` ya se lee de verdad desde Supabase (su SELECT es público), pero
 * las acciones de alta/edición/borrado siguen aplicándose solo en memoria:
 * falta conectar autenticación de administrador + políticas de RLS para
 * permitir escrituras reales desde este panel.
 *
 * `solicitudes`, `socios` y `donativos` siguen siendo datos de muestra: sus
 * tablas ya reciben inserciones reales desde los formularios públicos, pero
 * no tienen política de SELECT para el rol anónimo (contienen datos
 * personales), así que este panel no puede leerlas todavía sin esa
 * autenticación real.
 *
 * TODO (backend real): Supabase Auth para el equipo + políticas de RLS que
 * permitan a un usuario autenticado con rol de administrador leer y escribir
 * estas cuatro tablas.
 */

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

interface AdminStore {
  animales: Animal[];
  cargandoAnimales: boolean;
  addAnimal: (a: Animal) => void;
  updateAnimal: (id: string, a: Partial<Animal>) => void;
  deleteAnimal: (id: string) => void;

  solicitudes: SolicitudApoyo[];
  updateEstadoSolicitud: (id: string, estado: EstadoSolicitud) => void;

  socios: SocioActivo[];
  donativos: Donativo[];
}

const AdminDataContext = createContext<AdminStore | null>(null);

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [animales, setAnimales] = useState<Animal[]>([]);
  const [cargandoAnimales, setCargandoAnimales] = useState(true);
  const [solicitudes, setSolicitudes] = useState<SolicitudApoyo[]>(solicitudesMock);
  const [socios] = useState<SocioActivo[]>(sociosActivosMock);
  const [donativos] = useState<Donativo[]>(donativosMock);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("animales")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setAnimales(data.map(mapAnimalRow));
        setCargandoAnimales(false);
      });
  }, []);

  const value = useMemo<AdminStore>(
    () => ({
      animales,
      cargandoAnimales,
      addAnimal: (a) => setAnimales((prev) => [a, ...prev]),
      updateAnimal: (id, patch) =>
        setAnimales((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a))),
      deleteAnimal: (id) => setAnimales((prev) => prev.filter((a) => a.id !== id)),

      solicitudes,
      updateEstadoSolicitud: (id, estado) =>
        setSolicitudes((prev) => prev.map((s) => (s.id === id ? { ...s, estado } : s))),

      socios,
      donativos,
    }),
    [animales, cargandoAnimales, solicitudes, socios, donativos]
  );

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error("useAdminData debe usarse dentro de AdminDataProvider");
  return ctx;
}
