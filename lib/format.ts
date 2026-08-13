/**
 * Formatea una fecha ISO de Sanity. Devuelve null si el campo viene vacío o
 * con un valor inválido, para que la UI omita la línea en vez de mostrar
 * "Invalid Date".
 */
export function formatDate(iso: string | undefined | null) {
  if (!iso) return null

  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return null

  return new Intl.DateTimeFormat('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}
