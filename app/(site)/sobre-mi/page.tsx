import Image from 'next/image'
import type { Metadata } from 'next'

import { urlForImage } from '@/lib/sanity/image'
import { client } from '@/lib/sanity/client'
import { primaryAuthorQuery } from '@/lib/sanity/queries'
import type { Author } from '@/lib/sanity/types'

export const metadata: Metadata = {
  title: 'Sobre mí',
  description: 'Periodista independiente especializada en investigación, derechos humanos y crónica social.',
}

const FALLBACK_BIO =
  'Soy periodista independiente especializada en reportajes de investigación y crónica social. En los últimos años he cubierto temas de derechos humanos, medio ambiente y comunidades vulnerables para distintos medios digitales. Este portafolio reúne una selección de mi trabajo publicado y funciona como carta de presentación para editores, medios y futuras colaboraciones.'

export default async function SobreMiPage() {
  const author = await client.fetch<Author | null>(primaryAuthorQuery)
  const avatarUrl = urlForImage(author?.avatar, { width: 280, height: 280 })

  return (
    <div className="wrap page-enter">
      <section className="about" style={{ borderTop: 'none', flexDirection: 'column', textAlign: 'center' }}>
        {avatarUrl && (
          <Image
            className="avatar"
            style={{ width: 140, height: 140 }}
            src={avatarUrl}
            alt={author?.name ?? 'Valepeedia'}
            width={140}
            height={140}
          />
        )}
        <div className="about-text" style={{ maxWidth: 560, marginTop: 24 }}>
          <h4>Sobre {author?.name ?? 'Valepeedia'}</h4>
          <p>{author?.bio ?? FALLBACK_BIO}</p>
        </div>
      </section>

      <section className="contact" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="contact-title">Kit de prensa</div>
        <p className="contact-intro">
          Para editores y medios: escríbeme por correo o LinkedIn para solicitar CV, clips destacados o
          coordinar una colaboración.
        </p>
        <div className="contact-links">
          <a href="mailto:hola@valepeedia.com">Correo</a>
          <a href="#">LinkedIn</a>
        </div>
      </section>
    </div>
  )
}
