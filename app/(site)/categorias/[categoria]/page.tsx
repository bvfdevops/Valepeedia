import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { ArticleGrid } from '@/components/articles/article-grid'
import { client } from '@/lib/sanity/client'
import { articlesByCategoryQuery, categoriesQuery, categoryBySlugQuery } from '@/lib/sanity/queries'
import type { ArticleSummary, Category } from '@/lib/sanity/types'

type Params = Promise<{ categoria: string }>

export async function generateStaticParams() {
  const categories = await client.fetch<Category[]>(categoriesQuery)
  return categories.map((category) => ({ categoria: category.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { categoria } = await params
  const category = await client.fetch<Category | null>(categoryBySlugQuery, { slug: categoria })
  if (!category) return {}

  return {
    title: category.title,
    description: category.description ?? `Reportajes de Valepeedia en la categoría ${category.title}.`,
  }
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { categoria } = await params

  const [category, articles] = await Promise.all([
    client.fetch<Category | null>(categoryBySlugQuery, { slug: categoria }),
    client.fetch<ArticleSummary[]>(articlesByCategoryQuery, { category: categoria }),
  ])

  if (!category) notFound()

  return (
    <div className="wrap page-enter" key={categoria}>
      <section className="grid-section" style={{ borderTop: 'none' }}>
        <h1 className="grid-title">{category.title}</h1>
        {category.description && (
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', maxWidth: 500, margin: '-24px auto 40px' }}>
            {category.description}
          </p>
        )}
        <ArticleGrid articles={articles} />
      </section>
    </div>
  )
}
