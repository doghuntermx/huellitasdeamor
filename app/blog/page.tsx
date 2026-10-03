import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { getBlogPosts } from "@/lib/data/comunidad";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Historias, reflexiones y aprendizajes de Huellitas de Amor A.C. sobre rescate, adopción responsable y comunidad.",
};

function formatFecha(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div>
      <section className="relative overflow-hidden bg-cream pb-14 pt-16 md:pb-16 md:pt-24">
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />
        <div className="relative mx-auto max-w-2xl px-5 text-center md:px-8">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">Blog</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-3 text-balance font-display text-3xl font-semibold text-ink sm:text-4xl md:text-5xl">
              Historias detrás de cada rescate
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-4 max-w-lg text-ink-soft">
              Reflexiones y aprendizajes desde los tres territorios que nos
              definen: nadie rescata solo, cada huellita deja una historia, y
              del abandono al amor.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
        <RevealGroup className="grid grid-cols-1 gap-8 md:grid-cols-3" stagger={0.1}>
          {posts.map((post) => (
            <RevealItem key={post.id}>
              <Link href={`/blog/${post.slug}`} className="group block h-full overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/5 transition-shadow hover:shadow-lg">
                <div className="aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.imagenPortada}
                    alt={post.titulo}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  {post.territorio && (
                    <span className="inline-flex rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-semibold text-brand">
                      {post.territorio}
                    </span>
                  )}
                  <h2 className="mt-3 font-display text-lg font-semibold leading-snug text-ink">
                    {post.titulo}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm text-ink-soft">{post.extracto}</p>
                  <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-soft/70">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {formatFecha(post.publicadoEn)}
                  </p>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        {posts.length === 0 && (
          <p className="text-center text-ink-soft">Aún no hay artículos publicados.</p>
        )}
      </section>
    </div>
  );
}
