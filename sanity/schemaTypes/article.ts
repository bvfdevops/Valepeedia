import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons/DocumentText'

export default defineType({
  name: 'article',
  title: 'Reportaje',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'content', title: 'Contenido', default: true },
    { name: 'meta', title: 'Metadatos' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      group: 'content',
      description: 'OBLIGATORIO — sin título el reportaje no se puede publicar.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (dirección web)',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      description:
        'OBLIGATORIO — es la dirección del reportaje (ej. /reportajes/mi-reportaje). Presiona "Generate" para crearlo desde el título.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'deck',
      title: 'Bajada',
      type: 'text',
      group: 'content',
      rows: 2,
      description: 'Opcional. Subtítulo corto que resume el reportaje.',
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          description:
            'Opcional. Describe la imagen para lectores de pantalla y buscadores.',
        }),
      ],
      description:
        'Opcional, pero muy recomendada: sin portada el reportaje se ve solo como texto en la portada y el archivo.',
    }),
    defineField({
      name: 'body',
      title: 'Cuerpo',
      type: 'array',
      group: 'content',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Texto alternativo', type: 'string' }],
        },
        { type: 'videoEmbed' },
      ],
      description:
        'Opcional. El texto del reportaje. Puedes insertar imágenes y videos entre los párrafos.',
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      group: 'meta',
      to: [{ type: 'author' }],
      description: 'Opcional. Si lo dejas vacío se firma como "Valepeedia".',
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      group: 'meta',
      to: [{ type: 'category' }],
      description:
        'Opcional, pero recomendada: sin categoría el reportaje no aparece al filtrar por tema.',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'meta',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
      description: 'Opcional. Temas puntuales que no justifican una categoría propia.',
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Reportajes relacionados',
      type: 'array',
      group: 'meta',
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
      validation: (r) => r.max(3),
      description: 'Opcional. Hasta 3 reportajes que se sugieren al final de este.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      group: 'meta',
      initialValue: () => new Date().toISOString(),
      description:
        'Opcional. Se rellena con la fecha de hoy; si la borras, el reportaje se muestra sin fecha.',
    }),
    defineField({
      name: 'readingTime',
      title: 'Tiempo de lectura (min)',
      type: 'number',
      group: 'meta',
      description: 'Opcional. Si lo dejas vacío no se muestra.',
    }),
    defineField({
      name: 'featured',
      title: 'Destacado en portada',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
      description: 'Opcional. Solo debería haber un reportaje destacado a la vez.',
    }),
    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      group: 'meta',
      options: {
        list: [
          { title: 'Borrador', value: 'draft' },
          { title: 'Publicado', value: 'published' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      description:
        'OBLIGATORIO — solo los reportajes en "Publicado" aparecen en el sitio público.',
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    {
      title: 'Fecha de publicación (recientes primero)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      status: 'status',
      date: 'publishedAt',
    },
    prepare({ title, media, status, date }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString('es-CL')
        : 'sin fecha'
      return {
        title,
        subtitle: `${status === 'published' ? 'Publicado' : 'Borrador'} · ${formattedDate}`,
        media,
      }
    },
  },
})
