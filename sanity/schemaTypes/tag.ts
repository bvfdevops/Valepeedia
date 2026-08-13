import { defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons/Tag'

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre',
      type: 'string',
      description: 'OBLIGATORIO — el nombre del tag tal como se muestra en el reportaje.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (dirección web)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description: 'OBLIGATORIO — identificador único del tag.',
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
