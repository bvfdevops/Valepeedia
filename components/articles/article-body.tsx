import Image from 'next/image'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from 'sanity'

import { urlForImage } from '@/lib/sanity/image'

function getYouTubeEmbedUrl(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : null
}

function getVimeoEmbedUrl(url: string) {
  const match = url.match(/vimeo\.com\/(\d+)/)
  return match ? `https://player.vimeo.com/video/${match[1]}` : null
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const url = urlForImage(value, { width: 1200 })
      if (!url) return null
      return <Image src={url} alt={value.alt || ''} width={1200} height={800} />
    },
    videoEmbed: ({ value }) => {
      if (!value?.url) return null
      const embedUrl = getYouTubeEmbedUrl(value.url) ?? getVimeoEmbedUrl(value.url)
      if (!embedUrl) return null
      return (
        <div style={{ position: 'relative', paddingTop: '56.25%', margin: '30px 0' }}>
          <iframe
            src={embedUrl}
            title={value.caption || 'Video'}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
          />
          {value.caption && (
            <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 8 }}>{value.caption}</p>
          )}
        </div>
      )
    },
  },
}

export function ArticleBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="article-body">
      <PortableText value={value} components={components} />
    </div>
  )
}
