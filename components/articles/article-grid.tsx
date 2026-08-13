import { ArticleCard } from '@/components/articles/article-card'
import type { ArticleSummary } from '@/lib/sanity/types'

export function ArticleGrid({ articles }: { articles: ArticleSummary[] }) {
  if (articles.length === 0) {
    return <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>Aún no hay reportajes publicados.</p>
  }

  return (
    <div className="grid">
      {articles.map((article) => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  )
}
