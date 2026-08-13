import Image from 'next/image'
import Link from 'next/link'

import { urlForImage } from '@/lib/sanity/image'
import { formatDate } from '@/lib/format'
import type { ArticleSummary } from '@/lib/sanity/types'

export function ArticleCard({ article }: { article: ArticleSummary }) {
  const coverUrl = urlForImage(article.coverImage, { width: 500, height: 350 })
  const publishedLabel = formatDate(article.publishedAt)

  return (
    <article className="card">
      <Link href={`/reportajes/${article.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
        {coverUrl && (
          <div className="card-img-wrap">
            <Image
              className="card-img"
              src={coverUrl}
              alt={article.coverImage?.alt || article.title}
              width={500}
              height={350}
            />
          </div>
        )}
        {article.category && <span className="tag">{article.category.title}</span>}
        <h3>{article.title}</h3>
        {article.deck && <p>{article.deck}</p>}
        {publishedLabel && <div className="meta">{publishedLabel}</div>}
      </Link>
    </article>
  )
}
