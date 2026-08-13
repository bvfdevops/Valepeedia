import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem()
        .title('Reportajes')
        .child(
          S.documentTypeList('article')
            .title('Reportajes')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
        ),
      S.listItem()
        .title('Categorías')
        .child(S.documentTypeList('category').title('Categorías')),
      S.listItem().title('Tags').child(S.documentTypeList('tag').title('Tags')),
      S.listItem()
        .title('Autores')
        .child(S.documentTypeList('author').title('Autores')),
    ])
