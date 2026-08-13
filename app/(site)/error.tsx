'use client'

import { useEffect } from 'react'

import { Daisy } from '@/components/ui/daisy'

export default function SiteError({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="wrap" style={{ textAlign: 'center', padding: '60px 24px 80px' }}>
      <Daisy className="daisy" />
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 400,
          fontSize: 24,
          color: 'var(--color-text-strong)',
          margin: '20px 0 12px',
        }}
      >
        No pudimos cargar el contenido
      </h1>
      <p
        style={{
          fontSize: 14,
          color: 'var(--color-text-muted)',
          maxWidth: 420,
          margin: '0 auto 30px',
        }}
      >
        Hubo un problema al traer los reportajes. Puede ser algo temporal — vuelve a intentarlo en
        unos segundos.
      </p>
      <button type="button" onClick={retry} className="retry-button">
        Reintentar
      </button>
    </div>
  )
}
