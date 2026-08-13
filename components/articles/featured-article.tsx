import Image from 'next/image'
import Link from 'next/link'

import { urlForImage } from '@/lib/sanity/image'
import { formatDate } from '@/lib/format'
import type { ArticleSummary } from '@/lib/sanity/types'

export function FeaturedArticle({ article }: { article: ArticleSummary }) {
  const coverUrl = urlForImage(article.coverImage, { width: 900, height: 500 })

  // Solo se muestran las partes que el reportaje realmente tiene cargadas
  const bylineParts = [
    'Por Valepeedia',
    formatDate(article.publishedAt),
    article.readingTime ? `${article.readingTime} min de lectura` : null,
  ].filter(Boolean)

  return (
    <section className="featured">
      {coverUrl && (
        <Link href={`/reportajes/${article.slug}`}>
          <Image
            className="featured-img"
            src={coverUrl}
            alt={article.coverImage?.alt || article.title}
            width={900}
            height={500}
            priority
          />
        </Link>
      )}
      <span className="tag">Reportaje destacado</span>
      <h1>
        <Link href={`/reportajes/${article.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
          {article.title}
        </Link>
      </h1>
      {article.deck && <p className="deck">{article.deck}</p>}
      <p className="byline">{bylineParts.join(' · ')}</p>
    </section>
  )
}
