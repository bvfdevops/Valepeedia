import { defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons/Tag'

export default defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre',
      type: 'string',
      description: 'OBLIGATORIO — el nombre que se muestra en los filtros y etiquetas.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (dirección web)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description: 'OBLIGATORIO — es la dirección de la categoría (ej. /categorias/cultura).',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      description: 'Opcional. Se muestra bajo el título en la página de la categoría.',
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
