import Link from 'next/link'

import { Daisy } from '@/components/ui/daisy'

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-title">
        Vale<span>peedia</span>
      </div>
      <div className="not-found-code">404</div>
      <Daisy className="daisy" />
      <h1>Esta historia no existe</h1>
      <p>
        La página que buscas fue movida, cambió de nombre o nunca existió. Vuelve al inicio para seguir
        explorando los reportajes.
      </p>
      <Link className="not-found-link" href="/">
        Volver al inicio
      </Link>
    </div>
  )
}
