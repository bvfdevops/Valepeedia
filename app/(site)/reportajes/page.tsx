import Link from 'next/link'
import type { Metadata } from 'next'

import { ArticleGrid } from '@/components/articles/article-grid'
import { client } from '@/lib/sanity/client'
import { allArticlesQuery, categoriesQuery } from '@/lib/sanity/queries'
import type { ArticleSummary, Category } from '@/lib/sanity/types'

export const metadata: Metadata = {
  title: 'Reportajes',
  description: 'Archivo completo de reportajes y crónicas de Valepeedia, filtrable por categoría.',
}

export default async function ReportajesPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>
}) {
  const { categoria } = await searchParams
  const activeCategory = categoria ?? ''

  const [articles, categories] = await Promise.all([
    client.fetch<ArticleSummary[]>(allArticlesQuery, { category: activeCategory }),
    client.fetch<Category[]>(categoriesQuery),
  ])

  return (
    <div className="wrap page-enter">
      <section className="grid-section" style={{ borderTop: 'none' }}>
        <h1 className="grid-title">Reportajes</h1>

        <nav
          aria-label="Filtrar por categoría"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 16,
            marginBottom: 40,
            fontSize: 12,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
          }}
        >
          <Link
            href="/reportajes"
            style={{
              color: activeCategory === '' ? 'var(--color-accent)' : 'var(--color-text)',
              textDecoration: 'none',
            }}
          >
            Todas
          </Link>
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/reportajes?categoria=${category.slug}`}
              style={{
                color: activeCategory === category.slug ? 'var(--color-accent)' : 'var(--color-text)',
                textDecoration: 'none',
              }}
            >
              {category.title}
            </Link>
          ))}
        </nav>

        <div key={activeCategory} className="page-enter">
          <ArticleGrid articles={articles} />
        </div>
      </section>
    </div>
  )
}
