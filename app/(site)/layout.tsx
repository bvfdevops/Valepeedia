import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { ThemeToggle } from '@/components/theme/theme-toggle'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeToggle />
      <Header />
      {children}
      <Footer />
    </>
  )
}
