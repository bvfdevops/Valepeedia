import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Escríbeme para propuestas de colaboración, notas de prensa o cualquier consulta.',
}

export default function ContactoPage() {
  return (
    <div className="wrap page-enter">
      <section className="contact" style={{ borderTop: 'none' }}>
        <div className="contact-badge">Formulario — próxima integración</div>
        <div className="contact-title">Hablemos</div>
        <p className="contact-intro">
          Para propuestas de colaboración, notas de prensa o cualquier consulta, puedes escribirme
          directamente por estos medios.
        </p>
        <div className="contact-links">
          <a href="mailto:hola@valepeedia.com">Correo</a>
          <a href="#">LinkedIn</a>
        </div>
        <form className="contact-form is-preview">
          <div>
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" placeholder="Tu nombre" disabled />
          </div>
          <div>
            <label htmlFor="email">Correo</label>
            <input type="email" id="email" placeholder="tu@correo.com" disabled />
          </div>
          <div>
            <label htmlFor="message">Mensaje</label>
            <textarea id="message" placeholder="Cuéntame en qué puedo ayudarte" disabled />
          </div>
          <button type="submit" disabled>
            Enviar
          </button>
        </form>
        <p className="contact-note">
          Vista previa del formulario — se activará en una siguiente etapa del proyecto. Por ahora, usa
          correo o LinkedIn.
        </p>
      </section>
    </div>
  )
}
