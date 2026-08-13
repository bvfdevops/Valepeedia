import { defineQuery } from 'next-sanity'

// Campos compartidos por cualquier listado de artículos (tarjetas, grillas)
const articleSummaryFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  deck,
  coverImage,
  category->{ _id, title, "slug": slug.current },
  publishedAt,
  readingTime,
  featured
`

export const featuredArticleQuery = defineQuery(`
  *[_type == "article" && status == "published" && featured == true] | order(publishedAt desc) [0] {
    ${articleSummaryFields}
  }
`)

export const latestArticlesQuery = defineQuery(`
  *[_type == "article" && status == "published" && !featured] | order(publishedAt desc) [0...$limit] {
    ${articleSummaryFields}
  }
`)

export const allArticlesQuery = defineQuery(`
  *[_type == "article" && status == "published"
    && ($category == "" || category->slug.current == $category)
  ] | order(publishedAt desc) {
    ${articleSummaryFields}
  }
`)

export const articleBySlugQuery = defineQuery(`
  *[_type == "article" && status == "published" && slug.current == $slug][0] {
    ${articleSummaryFields},
    body,
    author->{ _id, name, "slug": slug.current, avatar },
    tags[]->{ _id, title, "slug": slug.current },
    relatedArticles[]->{ ${articleSummaryFields} }
  }
`)

export const articleSlugsQuery = defineQuery(`
  *[_type == "article" && status == "published" && defined(slug.current)].slug.current
`)

export const articlesByCategoryQuery = defineQuery(`
  *[_type == "article" && status == "published" && category->slug.current == $category] | order(publishedAt desc) {
    ${articleSummaryFields}
  }
`)

export const categoriesQuery = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  }
`)

export const categoryBySlugQuery = defineQuery(`
  *[_type == "category" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, description
  }
`)

export const primaryAuthorQuery = defineQuery(`
  *[_type == "author"] | order(_createdAt asc) [0] {
    _id, name, "slug": slug.current, avatar, bio
  }
`)
