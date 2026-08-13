import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { ArticleBody } from '@/components/articles/article-body'
import { ArticleGrid } from '@/components/articles/article-grid'
import { urlForImage } from '@/lib/sanity/image'
import { formatDate } from '@/lib/format'
import { client } from '@/lib/sanity/client'
import { articleBySlugQuery, articleSlugsQuery } from '@/lib/sanity/queries'
import type { Article } from '@/lib/sanity/types'

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(articleSlugsQuery)
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const article = await client.fetch<Article | null>(articleBySlugQuery, { slug })
  if (!article) return {}

  return {
    title: article.title,
    description: article.deck,
  }
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params
  const article = await client.fetch<Article | null>(articleBySlugQuery, { slug })

  if (!article) notFound()

  const coverUrl = urlForImage(article.coverImage, { width: 1200, height: 675 })

  // Solo se muestran las partes que el reportaje realmente tiene cargadas
  const bylineParts = [
    `Por ${article.author?.name ?? 'Valepeedia'}`,
    formatDate(article.publishedAt),
    article.readingTime ? `${article.readingTime} min de lectura` : null,
  ].filter(Boolean)

  return (
    <div className="wrap page-enter" key={slug}>
      <header className="article-header">
        {article.category && <span className="tag">{article.category.title}</span>}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 34,
            lineHeight: 1.3,
            margin: '0 0 16px',
            color: 'var(--color-text-strong)',
          }}
        >
          {article.title}
        </h1>
        {article.deck && <p className="deck">{article.deck}</p>}
        <p className="byline">{bylineParts.join(' · ')}</p>
      </header>

      {coverUrl && (
        <Image
          src={coverUrl}
          alt={article.coverImage?.alt || article.title}
          width={1200}
          height={675}
          className="featured-img"
          priority
        />
      )}

      {article.body && article.body.length > 0 && <ArticleBody value={article.body} />}

      {article.tags && article.tags.length > 0 && (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
          {article.tags.map((tag) => (
            <span key={tag._id} className="tag">
              {tag.title}
            </span>
          ))}
        </div>
      )}

      {article.relatedArticles && article.relatedArticles.length > 0 && (
        <section className="grid-section">
          <h2 className="grid-title">Reportajes relacionados</h2>
          <ArticleGrid articles={article.relatedArticles} />
        </section>
      )}

      <p style={{ textAlign: 'center', marginBottom: 40 }}>
        <Link href="/reportajes" style={{ color: 'var(--color-accent)' }}>
          ← Volver al archivo de reportajes
        </Link>
      </p>
    </div>
  )
}
