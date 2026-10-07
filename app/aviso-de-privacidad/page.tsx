import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { DOMICILIO, EMAIL_PRIVACIDAD, FECHA_ACTUALIZACION, RESPONSABLE } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Aviso de Privacidad",
  description:
    "Cómo Huellitas de Amor A.C. recaba, usa y protege tus datos personales, y cómo ejercer tus derechos.",
};

interface Seccion {
  titulo: string;
  contenido: ReactNode;
}

const email = (
  <a href={`mailto:${EMAIL_PRIVACIDAD}`} className="font-medium text-brand hover:underline">
    {EMAIL_PRIVACIDAD}
  </a>
);

const secciones: Seccion[] = [
  {
    titulo: "1. Quién es el responsable de tus datos",
    contenido: (
      <>
        <p>
          <strong>{RESPONSABLE}</strong> (en adelante, &ldquo;Huellitas de
          Amor&rdquo;) es la responsable del tratamiento de tus datos
          personales, conforme a la Ley Federal de Protección de Datos
          Personales en Posesión de los Particulares y su normatividad
          aplicable.
        </p>
        <p>
          Domicilio:{" "}
          {DOMICILIO ?? (
            <span className="rounded bg-brand/10 px-1.5 py-0.5 text-brand-dark">
              [por completar]
            </span>
          )}
          . Correo para temas de privacidad: {email}.
        </p>
      </>
    ),
  },
  {
    titulo: "2. Qué datos personales recabamos",
    contenido: (
      <>
        <p>Solo recabamos los datos necesarios según lo que hagas en el sitio:</p>
        <ul>
          <li>
            <strong>Solicitar apoyo o reportar un animal:</strong> nombre,
            teléfono, correo electrónico (opcional), la descripción de la
            situación, la ubicación del animal y el nombre de tu mascota, si
            aplica.
          </li>
          <li>
            <strong>Solicitud de adopción:</strong> nombre, teléfono, correo
            electrónico y el mensaje que decidas compartir.
          </li>
          <li>
            <strong>Donativos:</strong> nombre, correo electrónico, monto y
            método de pago elegido. Los datos de tu tarjeta o cuenta bancaria
            los procesa directamente el proveedor de pagos; Huellitas de Amor
            no los almacena.
          </li>
          <li>
            <strong>Círculo de Socios:</strong> nombre, correo electrónico,
            teléfono y el nivel de membresía elegido.
          </li>
          <li>
            <strong>WhatsApp:</strong> si nos escribes por ese medio, tu número
            de teléfono, tu nombre de perfil y el contenido de los mensajes y
            archivos que envíes.
          </li>
        </ul>
      </>
    ),
  },
  {
    titulo: "3. Datos personales sensibles",
    contenido: (
      <p>
        No solicitamos datos personales sensibles (por ejemplo, salud, origen
        étnico, creencias o situación patrimonial). Te pedimos no incluirlos en
        tus mensajes o formularios. Si llegaras a compartirlos, solo los
        usaremos para atender tu solicitud.
      </p>
    ),
  },
  {
    titulo: "4. Para qué usamos tus datos",
    contenido: (
      <>
        <p>Usamos tus datos para estas finalidades, necesarias para atenderte:</p>
        <ul>
          <li>Atender reportes de animales y solicitudes de apoyo.</li>
          <li>Evaluar y dar seguimiento a solicitudes de adopción.</li>
          <li>Registrar donativos y membresías, y enviarte tu recibo o confirmación.</li>
          <li>Responder tus dudas y mensajes, incluidos los de WhatsApp.</li>
          <li>Mantener un registro interno de nuestra operación y su transparencia.</li>
        </ul>
        <p>
          No usamos tus datos para fines distintos a los anteriores. Si en el
          futuro quisiéramos enviarte boletines o campañas, te pediremos tu
          consentimiento por separado y podrás retirarlo cuando quieras.
        </p>
      </>
    ),
  },
  {
    titulo: "5. Con quién compartimos tus datos",
    contenido: (
      <>
        <p>
          No vendemos ni rentamos tus datos. Para operar el sitio y la atención
          nos apoyamos en proveedores que tratan datos por cuenta de Huellitas
          de Amor, solo para los fines descritos:
        </p>
        <ul>
          <li>Alojamiento del sitio y de la base de datos.</li>
          <li>Procesamiento de pagos en línea.</li>
          <li>Mensajería de WhatsApp y su infraestructura.</li>
          <li>
            Un asistente automatizado de inteligencia artificial que puede
            ayudar a responder mensajes, siempre con la posibilidad de que una
            persona del equipo continúe la conversación.
          </li>
        </ul>
        <p>
          Algunos de estos proveedores pueden almacenar o procesar información
          en servidores fuera de México. Exigimos que protejan tus datos con
          medidas equivalentes a las de este aviso. Podemos también compartir
          datos cuando una autoridad competente lo requiera conforme a la ley.
        </p>
      </>
    ),
  },
  {
    titulo: "6. Cómo protegemos tus datos",
    contenido: (
      <p>
        Aplicamos medidas de seguridad administrativas, técnicas y físicas
        razonables: conexión cifrada al sitio, acceso restringido a la
        información solo para el equipo autorizado y cuentas individuales con
        contraseña para el panel interno. Ningún sistema es infalible, por lo
        que, si ocurriera una vulneración que afecte de forma significativa tus
        derechos, te lo informaremos.
      </p>
    ),
  },
  {
    titulo: "7. Tus derechos (ARCO) y cómo ejercerlos",
    contenido: (
      <>
        <p>
          Tienes derecho a <strong>Acceder</strong> a tus datos,{" "}
          <strong>Rectificarlos</strong> si son inexactos o están incompletos,{" "}
          <strong>Cancelarlos</strong> cuando consideres que no se necesitan, y{" "}
          <strong>Oponerte</strong> a su uso para ciertos fines. También puedes
          revocar el consentimiento que nos hayas dado o limitar el uso de tus
          datos.
        </p>
        <p>
          Para ejercerlos, escríbenos a {email} indicando tu nombre, el derecho
          que quieres ejercer, una forma de contactarte y una descripción clara
          de tu petición. Te responderemos en los plazos que establece la ley.
          Si consideras que tus derechos no fueron atendidos, puedes acudir a
          la autoridad competente en materia de protección de datos
          personales.
        </p>
      </>
    ),
  },
  {
    titulo: "8. Cookies y tecnologías similares",
    contenido: (
      <p>
        Este sitio no usa cookies de publicidad ni de seguimiento. Solo se
        utilizan elementos técnicos necesarios para su funcionamiento, como el
        inicio de sesión del equipo en el panel interno. Si en el futuro
        incorporamos herramientas de analítica, actualizaremos este aviso.
      </p>
    ),
  },
  {
    titulo: "9. Menores de edad",
    contenido: (
      <p>
        El sitio no está dirigido a menores de edad. Si eres menor, pide a una
        persona adulta que haga por ti cualquier solicitud o donativo.
      </p>
    ),
  },
  {
    titulo: "10. Cambios a este aviso",
    contenido: (
      <p>
        Podemos modificar este aviso por cambios legales o de nuestra
        operación. Publicaremos la versión vigente en esta misma página con su
        fecha de actualización.
      </p>
    ),
  },
];

export default function AvisoDePrivacidadPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-14 md:px-8 md:py-20">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">Legal</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Aviso de Privacidad
        </h1>
        <p className="mt-2 text-sm text-ink-soft/70">
          Última actualización: {FECHA_ACTUALIZACION}
        </p>
      </Reveal>

      <div className="mt-10 space-y-10">
        {secciones.map((s) => (
          <section key={s.titulo}>
            <h2 className="font-display text-xl font-semibold text-ink">{s.titulo}</h2>
            <div className="mt-3 space-y-3 leading-relaxed text-ink-soft [&_li]:mt-1.5 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
              {s.contenido}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
