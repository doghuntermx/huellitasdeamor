import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, User } from "lucide-react";
import { getBlogPosts, getBlogPostPorSlug } from "@/lib/data/comunidad";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getBlogPostPorSlug(slug);
  if (!post) return {};
  return { title: post.titulo, description: post.extracto };
}

function formatFecha(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getBlogPostPorSlug(slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 md:px-8 md:py-16">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-brand">
        <ArrowLeft className="h-4 w-4" />
        Volver al blog
      </Link>

      <Reveal className="mt-6">
        {post.territorio && (
          <span className="inline-flex rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
            {post.territorio}
          </span>
        )}
        <h1 className="mt-3 text-balance font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          {post.titulo}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-ink-soft">
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            {post.autor}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            {formatFecha(post.publicadoEn)}
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-8 overflow-hidden rounded-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.imagenPortada} alt={post.titulo} className="w-full object-cover" />
      </Reveal>

      <div className="mt-8 space-y-5">
        {post.contenido.map((parrafo, i) => (
          <Reveal key={i} delay={0.05 * i}>
            <p className="text-balance leading-relaxed text-ink-soft">{parrafo}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-12 rounded-3xl bg-cream-warm p-6 text-center">
        <p className="font-display text-lg font-semibold text-ink">
          ¿Esta historia te movió a hacer algo?
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <MagneticButton href="/adopciones" variant="brand" icon={<ArrowRight className="h-4 w-4" />}>
            Adoptar
          </MagneticButton>
          <MagneticButton href="/donar" variant="outline" icon={<ArrowRight className="h-4 w-4" />}>
            Donar
          </MagneticButton>
        </div>
      </Reveal>
    </div>
  );
}
