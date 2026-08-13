import { defineField, defineType } from 'sanity'
import { PlayIcon } from '@sanity/icons/Play'

export default defineType({
  name: 'videoEmbed',
  title: 'Video embebido',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'url',
      title: 'URL (YouTube o Vimeo)',
      type: 'url',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Pie de video',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'url' },
    prepare({ title }) {
      return { title: title || 'Video', subtitle: 'Video embebido' }
    },
  },
})
