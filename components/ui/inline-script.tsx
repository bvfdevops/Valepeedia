/**
 * Script que se ejecuta durante el parseo del HTML, antes del primer pintado.
 *
 * En el servidor se emite como script ejecutable; en el cliente se marca como
 * `text/plain` para que React no advierta "Encountered a script tag while
 * rendering React component" (los scripts insertados por React nunca se
 * ejecutan en el cliente, así que sería una advertencia legítima).
 *
 * Va dentro de <body>: declarar un <head> explícito en el layout raíz altera el
 * orden de ejecución de los scripts y rompe el bridge de Sanity Studio, que
 * espera que document.body ya exista.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
