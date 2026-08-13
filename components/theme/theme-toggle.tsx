'use client'

import { useSyncExternalStore } from 'react'

const THEMES = [
  { id: 'minimalista', label: 'Minimalista' },
  { id: 'clasica', label: 'Clásica' },
] as const

const STORAGE_KEY = 'valepeedia-theme'

const listeners = new Set<() => void>()

function subscribe(callback: () => void) {
  listeners.add(callback)
  return () => listeners.delete(callback)
}

function getSnapshot() {
  return document.documentElement.getAttribute('data-theme') ?? 'minimalista'
}

function getServerSnapshot() {
  return null
}

function setTheme(next: string) {
  document.documentElement.setAttribute('data-theme', next)
  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // localStorage no disponible (modo privado, etc.) — el toggle sigue funcionando en la sesión actual
  }
  listeners.forEach((notify) => notify())
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const mounted = theme !== null

  return (
    <div className="theme-switcher" role="group" aria-label="Cambiar estilo visual">
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => setTheme(t.id)}
          className={mounted && theme === t.id ? 'is-active' : ''}
          aria-pressed={mounted && theme === t.id}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
