-- Huellitas de Amor A.C. — Fase 2: Aliados de beneficios, Patrocinadores y Blog
-- Ejecutar en Supabase → SQL Editor DESPUÉS de schema.sql y admin-auth.sql
-- (usa la función is_admin() definida en admin-auth.sql).

-- =========================================================
-- aliados_beneficios: negocios que dan descuentos a socios del
-- Círculo de Socios
-- =========================================================
create table if not exists aliados_beneficios (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  categoria text not null,
  descripcion_beneficio text not null,
  logo_url text not null,
  sitio_web text,
  created_at timestamptz not null default now()
);

alter table aliados_beneficios enable row level security;

drop policy if exists "aliados_lectura_publica" on aliados_beneficios;
create policy "aliados_lectura_publica" on aliados_beneficios
  for select using (true);

drop policy if exists "aliados_admin_todo" on aliados_beneficios;
create policy "aliados_admin_todo" on aliados_beneficios
  for all using (is_admin()) with check (is_admin());

-- =========================================================
-- patrocinadores: empresas/fundaciones que patrocinan a Huellitas
-- =========================================================
create table if not exists patrocinadores (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  descripcion text,
  logo_url text not null,
  sitio_web text,
  nivel text not null default 'aliado' check (nivel in ('aliado', 'institucional')),
  created_at timestamptz not null default now()
);

alter table patrocinadores enable row level security;

drop policy if exists "patrocinadores_lectura_publica" on patrocinadores;
create policy "patrocinadores_lectura_publica" on patrocinadores
  for select using (true);

drop policy if exists "patrocinadores_admin_todo" on patrocinadores;
create policy "patrocinadores_admin_todo" on patrocinadores
  for all using (is_admin()) with check (is_admin());

-- =========================================================
-- blog_posts: contenido editorial por territorio narrativo
-- =========================================================
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  titulo text not null,
  extracto text not null,
  contenido text[] not null default '{}',
  imagen_portada text not null,
  autor text not null default 'Huellitas de Amor A.C.',
  territorio text,
  publicado_en date not null default current_date,
  created_at timestamptz not null default now()
);

alter table blog_posts enable row level security;

drop policy if exists "blog_lectura_publica" on blog_posts;
create policy "blog_lectura_publica" on blog_posts
  for select using (true);

drop policy if exists "blog_admin_todo" on blog_posts;
create policy "blog_admin_todo" on blog_posts
  for all using (is_admin()) with check (is_admin());

-- =========================================================
-- Datos semilla de ejemplo
-- =========================================================
insert into aliados_beneficios (nombre, categoria, descripcion_beneficio, logo_url, sitio_web) values
('PetCentral', 'Alimento y accesorios', '15% de descuento en alimento premium para socios del Círculo de Socios.', 'https://placehold.co/200x120?text=PetCentral', 'https://example.com'),
('Clínica VetAmigo', 'Veterinaria', 'Consulta general sin costo una vez al año para socios activos.', 'https://placehold.co/200x120?text=VetAmigo', 'https://example.com'),
('Estética Canina Bella', 'Bienestar y estética', '20% de descuento en baño y corte de pelo.', 'https://placehold.co/200x120?text=Bella', 'https://example.com'),
('Seguros Compañero', 'Seguros para mascotas', '10% de descuento en el primer año de póliza.', 'https://placehold.co/200x120?text=Seguros+Compañero', 'https://example.com')
on conflict do nothing;

insert into patrocinadores (nombre, descripcion, logo_url, sitio_web, nivel) values
('Fundación Huella Grande', 'Aliada institucional en campañas de esterilización masiva.', 'https://placehold.co/220x120?text=Huella+Grande', 'https://example.com', 'institucional'),
('Grupo Constructor Alameda', 'Patrocinador del refugio con aportaciones para infraestructura.', 'https://placehold.co/220x120?text=Alameda', 'https://example.com', 'institucional'),
('Café Rescate', 'Dona el 5% de sus ventas mensuales a Huellitas de Amor.', 'https://placehold.co/220x120?text=Cafe+Rescate', 'https://example.com', 'aliado')
on conflict do nothing;

insert into blog_posts (slug, titulo, extracto, contenido, imagen_portada, autor, territorio, publicado_en) values
(
  'nadie-rescata-solo',
  'Nadie rescata solo: la red que sostiene cada historia',
  'Detrás de cada animal rescatado hay una cadena de personas que nunca aparecen en la foto final: quien reporta, quien traslada, quien dona, quien adopta.',
  array[
    'Cuando alguien ve un perro en la calle y decide reportarlo, casi nunca sabe todo lo que viene después.',
    'Hay una llamada, una foto compartida en un grupo, un voluntario que se acerca a confirmar la situación. Hay quien presta el auto para trasladar al animal, quien dona el primer tratamiento, quien ofrece un hogar temporal mientras se recupera.',
    'Ese es el territorio que más nos importa contar: nadie rescata solo. Cada segunda oportunidad es, en realidad, una cadena de personas que decidieron no mirar hacia otro lado.'
  ],
  'https://placedog.net/1000/600?id=90',
  'Huellitas de Amor A.C.',
  'Nadie rescata solo',
  '2026-08-15'
),
(
  'cada-huellita-una-historia',
  'Cada huellita deja una historia: por qué no usamos fichas técnicas',
  'No hablamos de nuestros animales en términos de raza y peso. Hablamos de quiénes son, porque eso es lo que realmente conecta con quien busca adoptar.',
  array[
    'Es fácil reducir a un animal rescatado a una ficha: edad aproximada, tamaño, estado de salud. Pero eso no es lo que hace que alguien decida compartir su vida con él.',
    'Por eso cada perfil en nuestro catálogo se escribe como lo que es: una historia. La de Canela, que llegó temblando y hoy recibe a todos con la cola en alto. La de Rocky, que necesitó semanas para volver a confiar.',
    'Contar historias, no fichas, es nuestra forma de recordar que cada huellita es alguien, no algo.'
  ],
  'https://placedog.net/1000/600?id=91',
  'Huellitas de Amor A.C.',
  'Cada huellita deja una historia',
  '2026-07-02'
),
(
  'del-abandono-al-amor',
  'Del abandono al amor: lo que aprendimos después de mil rescates',
  'Cruzar la marca de mil huellitas con una segunda oportunidad nos hizo detenernos a pensar qué es lo que realmente cambia entre el abandono y el amor.',
  array[
    'Mil es solo un número, pero decidimos detenernos en él porque marcar hitos ayuda a entender el camino recorrido.',
    'Lo que aprendimos es que la diferencia entre el abandono y el amor casi nunca es dramática: es constancia. Es alguien que vuelve al refugio la semana siguiente. Es un socio que dona lo mismo cada mes, sin que nadie se lo recuerde.',
    'Del abandono al amor no es un salto, es un camino que se construye una decisión pequeña a la vez — y ese es el camino que seguimos documentando aquí.'
  ],
  'https://placedog.net/1000/600?id=92',
  'Huellitas de Amor A.C.',
  'Del abandono al amor',
  '2026-05-20'
)
on conflict (slug) do nothing;
