import { createImageUrlBuilder } from '@sanity/image-url'

import { dataset, projectId } from '@/sanity/env'
import type { SanityImageRef } from '@/lib/sanity/types'

const imageBuilder = createImageUrlBuilder({ projectId, dataset })

/**
 * Devuelve la URL de una imagen de Sanity, o null si el documento no tiene
 * imagen cargada. Un reportaje publicado sin portada no debe tumbar la página
 * que lo lista, así que quien llame decide cómo renderizar el caso vacío.
 */
export function urlForImage(
  source: SanityImageRef | undefined | null,
  { width, height }: { width: number; height?: number }
) {
  if (!source?.asset?._ref) return null

  const builder = imageBuilder.image(source).auto('format').fit('max').width(width)

  return (height ? builder.height(height) : builder).url()
}
