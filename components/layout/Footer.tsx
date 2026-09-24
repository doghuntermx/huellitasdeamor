import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Heart } from "lucide-react";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.6h2.6l.4-3H13.5V8.4c0-.87.24-1.46 1.5-1.46h1.6V4.28C16.3 4.2 15.36 4.1 14.26 4.1c-2.3 0-3.87 1.4-3.87 3.98v2.32H7.8v3h2.6V21h3.1Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/logo/huellitas-logo-blanco.png"
                alt="Huellitas de Amor A.C."
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <span className="font-display text-xl font-semibold">Huellitas de Amor</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
              Transformando abandono en amor. Rescatamos, curamos y encontramos
              segundas oportunidades para quienes no pueden pedirlas por sí
              mismos.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-cream/50">
              Navegación
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/nuestra-historia" className="text-cream/80 hover:text-brand-light">Nuestra Historia</Link></li>
              <li><Link href="/casos-de-exito" className="text-cream/80 hover:text-brand-light">Casos de Éxito</Link></li>
              <li><Link href="/adopciones" className="text-cream/80 hover:text-brand-light">Adopciones</Link></li>
              <li><Link href="/donar" className="text-cream/80 hover:text-brand-light">Donar</Link></li>
              <li><Link href="/solicitar-apoyo" className="text-cream/80 hover:text-brand-light">Solicitar Apoyo</Link></li>
              <li><Link href="/contacto" className="text-cream/80 hover:text-brand-light">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-cream/50">
              Contacto
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-cream/80">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-light" />
                <a href="mailto:contacto@huellitasdeamor.org" className="hover:text-brand-light">
                  contacto@huellitasdeamor.org
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-light" />
                <span>Escríbenos, respondemos rápido</span>
              </li>
              <li className="flex items-center gap-3 pt-1">
                <a href="#" aria-label="Instagram" className="rounded-full bg-white/10 p-2 hover:bg-brand">
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a href="#" aria-label="Facebook" className="rounded-full bg-white/10 p-2 hover:bg-brand">
                  <FacebookIcon className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-6 text-xs text-cream/50 md:flex-row">
          <p>© {new Date().getFullYear()} Huellitas de Amor A.C. — Todos los derechos reservados.</p>
          <p className="flex items-center gap-1.5">
            Hecho con <Heart className="h-3.5 w-3.5 fill-brand-light text-brand-light" /> por{" "}
            <a
              href="https://makodigital.com.mx/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-cream/70 hover:text-brand-light"
            >
              Makodigital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
