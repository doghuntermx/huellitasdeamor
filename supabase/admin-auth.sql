-- Huellitas de Amor A.C. — autenticación real del panel de administración
-- Ejecutar en Supabase → SQL Editor DESPUÉS de schema.sql.

-- =========================================================
-- Tabla de administradores autorizados
-- Solo las personas cuyo user_id aparezca aquí pueden leer/gestionar
-- datos administrativos. Se llena a mano (ver instrucciones al final).
-- =========================================================
create table if not exists admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  nombre text,
  created_at timestamptz not null default now()
);

alter table admins enable row level security;
-- Sin políticas: nadie puede leer/escribir esta tabla desde el cliente,
-- ni siquiera un admin. Solo la usa internamente la función is_admin().

create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from admins where user_id = auth.uid()
  );
$$;

-- =========================================================
-- animales: los administradores pueden crear/editar/borrar
-- (la lectura pública ya existía desde schema.sql)
-- =========================================================
drop policy if exists "animales_admin_todo" on animales;
create policy "animales_admin_todo" on animales
  for all using (is_admin()) with check (is_admin());

-- =========================================================
-- casos_exito: los administradores pueden crear/editar/borrar
-- =========================================================
drop policy if exists "casos_exito_admin_todo" on casos_exito;
create policy "casos_exito_admin_todo" on casos_exito
  for all using (is_admin()) with check (is_admin());

-- =========================================================
-- solicitudes_apoyo: los administradores pueden leer y actualizar
-- el estado (la inserción pública ya existía desde schema.sql)
-- =========================================================
drop policy if exists "solicitudes_admin_lectura" on solicitudes_apoyo;
create policy "solicitudes_admin_lectura" on solicitudes_apoyo
  for select using (is_admin());

drop policy if exists "solicitudes_admin_actualiza" on solicitudes_apoyo;
create policy "solicitudes_admin_actualiza" on solicitudes_apoyo
  for update using (is_admin()) with check (is_admin());

-- =========================================================
-- socios: los administradores pueden leer y actualizar el estado
-- =========================================================
drop policy if exists "socios_admin_lectura" on socios;
create policy "socios_admin_lectura" on socios
  for select using (is_admin());

drop policy if exists "socios_admin_actualiza" on socios;
create policy "socios_admin_actualiza" on socios
  for update using (is_admin()) with check (is_admin());

-- =========================================================
-- donativos: los administradores pueden leer (el registro real de si
-- se completó un cobro seguirá viniendo del webhook de Clip, no de aquí)
-- =========================================================
drop policy if exists "donativos_admin_lectura" on donativos;
create policy "donativos_admin_lectura" on donativos
  for select using (is_admin());

-- =========================================================
-- Cómo dar de alta a una persona del equipo como administradora
-- =========================================================
-- 1. Ve a Authentication → Users → Add user (en el dashboard de Supabase).
--    Ingresa su correo y una contraseña, y activa "Auto Confirm User"
--    para que pueda iniciar sesión de inmediato.
-- 2. Corre esto reemplazando el correo y el nombre:
--
--    insert into admins (user_id, nombre)
--    select id, 'Nombre de la persona'
--    from auth.users
--    where email = 'correo@ejemplo.com'
--    on conflict (user_id) do nothing;
--
-- Repite el paso 2 por cada persona que necesite acceso al panel.
