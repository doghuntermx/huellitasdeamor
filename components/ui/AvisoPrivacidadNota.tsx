import Link from "next/link";

export function AvisoPrivacidadNota({ className }: { className?: string }) {
  return (
    <p className={className ?? "text-xs text-ink-soft/70"}>
      Al enviar aceptas nuestro{" "}
      <Link
        href="/aviso-de-privacidad"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-brand hover:underline"
      >
        Aviso de Privacidad
      </Link>
      .
    </p>
  );
}
