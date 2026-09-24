-- Huellitas de Amor A.C. — esquema inicial de Supabase
-- Ejecutar completo en Supabase → SQL Editor → New query → Run.
-- Es seguro volver a correrlo: usa "if not exists" / "or replace" donde aplica.

create extension if not exists "pgcrypto";

-- =========================================================
-- animales
-- =========================================================
create table if not exists animales (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nombre text not null,
  especie text not null check (especie in ('perro', 'gato')),
  raza_aproximada text,
  edad_aproximada text not null,
  tamano text not null check (tamano in ('chico', 'mediano', 'grande')),
  sexo text not null check (sexo in ('macho', 'hembra')),
  sucursal text not null,
  estado text not null default 'disponible' check (estado in ('disponible', 'en_proceso', 'adoptado')),
  historia_corta text not null,
  personalidad text[] not null default '{}',
  requisitos_adopcion text[] not null default '{}',
  fotos text[] not null default '{}',
  fecha_ingreso date not null default current_date,
  destacado boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table animales enable row level security;

drop policy if exists "animales_lectura_publica" on animales;
create policy "animales_lectura_publica" on animales
  for select using (true);

-- =========================================================
-- casos_exito (Fase 2 — historial de rescatados / panel de impacto)
-- =========================================================
create table if not exists casos_exito (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nombre text not null,
  especie text not null check (especie in ('perro', 'gato')),
  foto_antes text not null,
  foto_despues text not null,
  historia_breve text not null,
  fecha_rescate date not null,
  fecha_adopcion date,
  tiempo_recuperacion text,
  created_at timestamptz not null default now()
);

alter table casos_exito enable row level security;

drop policy if exists "casos_exito_lectura_publica" on casos_exito;
create policy "casos_exito_lectura_publica" on casos_exito
  for select using (true);

-- =========================================================
-- solicitudes_apoyo
-- tipo: 'reporte_calle' | 'apoyo_mascota_propia' | 'adopcion'
-- =========================================================
create table if not exists solicitudes_apoyo (
  id uuid primary key default gen_random_uuid(),
  tipo text not null check (tipo in ('reporte_calle', 'apoyo_mascota_propia', 'adopcion')),
  nombre_contacto text not null,
  telefono text not null,
  email text,
  descripcion text not null,
  ubicacion text,
  nombre_animal text,
  animal_id uuid references animales(id),
  estado text not null default 'nueva' check (estado in ('nueva', 'en_revision', 'atendida')),
  created_at timestamptz not null default now()
);

alter table solicitudes_apoyo enable row level security;

drop policy if exists "solicitudes_insercion_publica" on solicitudes_apoyo;
create policy "solicitudes_insercion_publica" on solicitudes_apoyo
  for insert with check (true);
-- Sin política de SELECT para el rol anon: nadie puede leer solicitudes
-- ajenas desde el sitio público. La lectura/gestión real queda pendiente
-- de conectar autenticación de administrador (ver README de /admin).

-- =========================================================
-- socios (Círculo de Socios — Fase 2)
-- estado 'pendiente' hasta confirmar el cobro recurrente real
-- =========================================================
create table if not exists socios (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  email text not null,
  telefono text not null,
  nivel_id text not null,
  monto_mensual numeric not null,
  fecha_alta date not null default current_date,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'activo', 'cancelado')),
  created_at timestamptz not null default now()
);

alter table socios enable row level security;

drop policy if exists "socios_insercion_publica" on socios;
create policy "socios_insercion_publica" on socios
  for insert with check (true);
-- Sin política de SELECT para anon: contiene datos personales.

-- =========================================================
-- donativos
-- espejo interno; la fuente de verdad de si se completó el cobro es el
-- webhook del proveedor de pago (Clip), no esta tabla por sí sola.
-- =========================================================
create table if not exists donativos (
  id uuid primary key default gen_random_uuid(),
  monto numeric not null,
  moneda text not null default 'MXN',
  metodo_pago text not null,
  referencia_pago text,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'completado', 'fallido')),
  nombre_donante text not null,
  email_donante text,
  created_at timestamptz not null default now()
);

alter table donativos enable row level security;

drop policy if exists "donativos_insercion_publica" on donativos;
create policy "donativos_insercion_publica" on donativos
  for insert with check (true);
-- Sin política de SELECT para anon: contiene datos personales.

-- =========================================================
-- Datos semilla — igualan el contenido de muestra que ya vive en el sitio
-- para que la migración a Supabase no cambie nada visualmente.
-- Seguro de re-ejecutar gracias a "on conflict do nothing".
-- =========================================================
insert into animales (slug, nombre, especie, raza_aproximada, edad_aproximada, tamano, sexo, sucursal, estado, historia_corta, personalidad, requisitos_adopcion, fotos, fecha_ingreso, destacado) values
('canela', 'Canela', 'perro', 'Mestiza', '2 años', 'mediano', 'hembra', 'Refugio Central', 'disponible',
 'Canela llegó temblando de frío una madrugada de enero, escondida bajo un auto. Hoy es la primera en salir a recibir a quien entra al refugio, como si cada visita fuera una razón para festejar.',
 array['Juguetona','Cariñosa','Sociable con otros perros'],
 array['Espacio para correr o paseos diarios','Visita de compatibilidad con la familia','Compromiso de esterilización si aún no aplica'],
 array['https://placedog.net/800/600?id=10','https://placedog.net/800/600?id=11'],
 '2026-01-14', true),
('max', 'Max', 'perro', 'Labrador mix', '4 años', 'grande', 'macho', 'Refugio Central', 'disponible',
 'Max pasó más de un año esperando en el refugio mientras perros más pequeños encontraban hogar antes que él. No perdió la paciencia ni las ganas de apoyar su cabeza en quien se sienta a su lado.',
 array['Tranquilo','Leal','Bueno con niños'],
 array['Casa con patio o acceso a paseos largos','Experiencia previa con perros grandes es un plus'],
 array['https://placedog.net/800/600?id=20','https://placedog.net/800/600?id=21'],
 '2025-08-02', true),
('luna', 'Luna', 'gato', 'Doméstico de pelo corto', '1 año', 'chico', 'hembra', 'Casa Hogar Sur', 'disponible',
 'Luna nació en un lote baldío junto con sus hermanos. Fue la única en sobrevivir. Ahora duerme panza arriba, sin miedo, en la ventana más soleada de la casa hogar.',
 array['Curiosa','Independiente','Le encanta la altura'],
 array['Espacio seguro con ventanas protegidas','Compromiso de mantenerla en interior'],
 array['https://cataas.com/cat?width=800&height=600&position=center&fit=cover&id=luna1','https://cataas.com/cat?width=800&height=600&position=center&fit=cover&id=luna2'],
 '2026-03-20', true),
('rocky', 'Rocky', 'perro', 'Pitbull mix', '3 años', 'grande', 'macho', 'Refugio Central', 'en_proceso',
 'Rocky llegó con cicatrices que contaban una historia difícil. Un equipo de voluntarios trabajó semanas para ganarse su confianza. Hoy mueve la cola en cuanto escucha su nombre.',
 array['Protector','Atento','Necesita guía firme y cariñosa'],
 array['Familia con experiencia en la raza','Sin otros perros machos en casa','Entrevista y visita domiciliaria'],
 array['https://placedog.net/800/600?id=30'],
 '2025-11-11', false),
('mia', 'Mía', 'perro', 'Schnauzer mix', '7 años', 'chico', 'hembra', 'Casa Hogar Sur', 'disponible',
 'Mía fue entregada al refugio cuando su familia se mudó de ciudad. Le tomó tiempo entender que no todos los adioses son definitivos. Busca un hogar tranquilo para envejecer en paz.',
 array['Tranquila','Apegada','Ideal para casa sin muchas escaleras'],
 array['Hogar sereno, sin niños muy pequeños','Disposición a cuidados de perro senior'],
 array['https://placedog.net/800/600?id=40'],
 '2025-05-30', false),
('simba', 'Simba', 'gato', 'Doméstico de pelo largo', '5 meses', 'chico', 'macho', 'Refugio Central', 'disponible',
 'Simba llegó en una caja de cartón dejada en la puerta del refugio. Ahora es puro escándalo: corre por los pasillos como si el mundo entero fuera suyo para explorar.',
 array['Energético','Juguetón','Bueno con otros gatos'],
 array['Espacio para trepar y jugar','Idealmente con otro gato o compañía humana frecuente'],
 array['https://cataas.com/cat?width=800&height=600&position=center&fit=cover&id=simba'],
 '2026-06-02', false),
('toby', 'Toby', 'perro', 'Beagle mix', '1 año', 'mediano', 'macho', 'Refugio Norte', 'disponible',
 'Toby fue reportado por vecinos que lo vieron deambular por semanas cerca de una carretera. Hoy su nariz no deja de investigar cada rincón nuevo, como agradeciendo el mundo seguro que encontró.',
 array['Curioso','Activo','Aprende rápido'],
 array['Familia activa, disfruta paseos largos','Patio con buen cercado — le gusta explorar'],
 array['https://placedog.net/800/600?id=50'],
 '2026-02-18', false),
('coco', 'Coco', 'perro', 'Poodle mix', '9 años', 'chico', 'hembra', 'Casa Hogar Sur', 'adoptado',
 'Coco esperó más de dos años. Muchos preferían cachorros. Una familia la vio, no por lástima, sino porque supieron reconocer lo que ella tenía para dar. Hoy duerme en un sillón que ya es suyo.',
 array['Dulce','Tranquila','Compañera de sofá'],
 array[]::text[],
 array['https://placedog.net/800/600?id=60'],
 '2024-09-10', false),
('nube', 'Nube', 'gato', 'Doméstico de pelo corto', '2 años', 'mediano', 'hembra', 'Refugio Norte', 'disponible',
 'Nube llegó con una pata lastimada tras un accidente en la calle. La cirugía y la rehabilitación tomaron meses. Camina distinto, pero eso nunca le impidió recibir cariño a mordiditas suaves.',
 array['Cariñosa','Tranquila','Se adapta bien a otros animales'],
 array['Seguimiento veterinario los primeros meses','Hogar sin muchas escaleras por su movilidad'],
 array['https://cataas.com/cat?width=800&height=600&position=center&fit=cover&id=nube'],
 '2025-12-05', false)
on conflict (slug) do nothing;

insert into casos_exito (slug, nombre, especie, foto_antes, foto_despues, historia_breve, fecha_rescate, fecha_adopcion, tiempo_recuperacion) values
('coco', 'Coco', 'perro', 'https://placedog.net/900/700?id=61', 'https://placedog.net/900/700?id=60',
 'Coco esperó más de dos años en el refugio. Muchos preferían cachorros. Una familia la vio, no por lástima, sino porque supieron reconocer lo que ella tenía para dar.',
 '2024-03-02', '2024-09-10', '6 meses hasta encontrar hogar'),
('rocky', 'Rocky', 'perro', 'https://placedog.net/900/700?id=31', 'https://placedog.net/900/700?id=30',
 'Rocky llegó con cicatrices que contaban una historia difícil. Un equipo de voluntarios trabajó semanas para ganarse su confianza antes de siquiera pensar en buscarle familia.',
 '2025-11-11', null, '4 meses de rehabilitación y en proceso de adopción'),
('nube', 'Nube', 'gato', 'https://cataas.com/cat?width=900&height=700&id=nube-antes', 'https://cataas.com/cat?width=900&height=700&id=nube-despues',
 'Nube llegó con una pata lastimada tras un accidente en la calle. La cirugía y la rehabilitación tomaron meses. Camina distinto, pero eso nunca le impidió recibir cariño.',
 '2025-08-20', null, '3 meses de tratamiento veterinario')
on conflict (slug) do nothing;
