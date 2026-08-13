import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons/User'

export default defineType({
  name: 'author',
  title: 'Autor',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      description: 'OBLIGATORIO — el nombre con que se firman los reportajes.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (dirección web)',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      description: 'OBLIGATORIO — identificador único del autor.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
      description: 'Opcional. Se muestra en la página "Sobre mí".',
    }),
    defineField({
      name: 'bio',
      title: 'Bio corta',
      type: 'text',
      rows: 4,
      description:
        'Opcional. Si la dejas vacía, "Sobre mí" muestra un texto de respaldo por defecto.',
    }),
  ],
  preview: {
    select: { title: 'name', media: 'avatar' },
  },
})
