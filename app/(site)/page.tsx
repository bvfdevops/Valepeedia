import { ArticleGrid } from '@/components/articles/article-grid'
import { FeaturedArticle } from '@/components/articles/featured-article'
import { Daisy } from '@/components/ui/daisy'
import { client } from '@/lib/sanity/client'
import { featuredArticleQuery, latestArticlesQuery } from '@/lib/sanity/queries'
import type { ArticleSummary } from '@/lib/sanity/types'

export default async function HomePage() {
  const [featured, latest] = await Promise.all([
    client.fetch<ArticleSummary | null>(featuredArticleQuery),
    client.fetch<ArticleSummary[]>(latestArticlesQuery, { limit: 6 }),
  ])

  return (
    <div className="wrap page-enter">
      {featured && <FeaturedArticle article={featured} />}

      <section className="grid-section">
        <h2 className="grid-title">Últimas historias</h2>
        <ArticleGrid articles={latest} />
      </section>

      <div className="daisy-wrap">
        <Daisy className="daisy" />
      </div>
    </div>
  )
}
