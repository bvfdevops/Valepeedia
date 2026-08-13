import Link from 'next/link'

import { Daisy } from '@/components/ui/daisy'

export function Header() {
  const today = new Intl.DateTimeFormat('es-CL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  return (
    <>
      <header className="masthead">
        <div className="wrap">
          <div className="date-line">
            {today.charAt(0).toUpperCase() + today.slice(1)} · Edición digital
          </div>
          <Link href="/" className="site-title" style={{ display: 'inline-block', textDecoration: 'none' }}>
            Vale<span>peedia</span>
          </Link>
          <div className="site-tagline">Reportajes y crónicas</div>
          <div className="daisy-wrap">
            <Daisy className="daisy" />
          </div>
          <nav className="mainnav">
            <Link href="/">Inicio</Link>
            <Link href="/reportajes">Reportajes</Link>
            <Link href="/sobre-mi">Sobre mí</Link>
            <Link href="/contacto">Contacto</Link>
          </nav>
        </div>
      </header>
      <div className="breaking">
        <b>Último reportaje</b> — nuevas historias publicadas cada semana
      </div>
    </>
  )
}
