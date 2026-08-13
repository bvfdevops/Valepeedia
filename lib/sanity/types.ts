import type { Image, PortableTextBlock } from 'sanity'

export interface SanityImageRef extends Image {
  alt?: string
}

export interface Author {
  _id: string
  name: string
  slug: string
  avatar?: SanityImageRef
  bio?: string
}

export interface Category {
  _id: string
  title: string
  slug: string
  description?: string
}

export interface Tag {
  _id: string
  title: string
  slug: string
}

export interface ArticleSummary {
  _id: string
  title: string
  slug: string
  deck?: string
  /** Opcional: el Studio permite publicar sin portada, la UI debe tolerarlo. */
  coverImage?: SanityImageRef
  category?: Pick<Category, '_id' | 'title' | 'slug'>
  publishedAt?: string
  readingTime?: number
  featured?: boolean
}

export interface Article extends ArticleSummary {
  body?: PortableTextBlock[]
  author?: Pick<Author, '_id' | 'name' | 'slug' | 'avatar'>
  tags?: Pick<Tag, '_id' | 'title' | 'slug'>[]
  relatedArticles?: ArticleSummary[]
}
