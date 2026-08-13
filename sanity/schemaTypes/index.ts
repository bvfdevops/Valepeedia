import { type SchemaTypeDefinition } from 'sanity'

import article from './article'
import author from './author'
import category from './category'
import tag from './tag'
import videoEmbed from './videoEmbed'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [article, category, tag, author, videoEmbed],
}
