"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { animales as animalesIniciales } from "@/lib/data/animales";
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
 * Store en memoria para el mockup del panel de administración.
 *
 * IMPORTANTE: nada de esto persiste. Es una simulación de CRUD para validar
 * el diseño y el flujo antes de invertir en conectar Supabase de verdad.
 * TODO (backend real):
 *  - animales: reemplazar por SELECT/INSERT/UPDATE/DELETE sobre la tabla
 *    `animales` en Supabase (ver huellitas-web-fase1-brief-tecnico.md).
 *  - solicitudes: reemplazar por la tabla `solicitudes_apoyo`.
 *  - socios/donativos: requieren además la integración real de cobro
 *    recurrente y del webhook de Clip respectivamente; estas vistas deben
 *    ser de solo lectura hasta entonces, reflejando lo que confirme el
 *    proveedor de pago — nunca lo que el panel "cree" que pasó.
 */

interface AdminStore {
  animales: Animal[];
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
  const [animales, setAnimales] = useState<Animal[]>(animalesIniciales);
  const [solicitudes, setSolicitudes] = useState<SolicitudApoyo[]>(solicitudesMock);
  const [socios] = useState<SocioActivo[]>(sociosActivosMock);
  const [donativos] = useState<Donativo[]>(donativosMock);

  const value = useMemo<AdminStore>(
    () => ({
      animales,
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
    [animales, solicitudes, socios, donativos]
  );

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error("useAdminData debe usarse dentro de AdminDataProvider");
  return ctx;
}
