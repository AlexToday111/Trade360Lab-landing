import { useEffect, useState } from 'react'
import { DocumentationHub } from './components/DocumentationHub'
import { HomeLanding } from './components/HomeLanding'

const repositoryUrl =
  import.meta.env.VITE_REPOSITORY_URL ?? 'https://github.com/Trade360Lab/Trade360Lab'
const LIGHT_THEME_START_HOUR = 9
const LIGHT_THEME_END_HOUR = 19

function resolvePageMode() {
  if (typeof window === 'undefined') {
    return 'home'
  }

  const { hostname, pathname } = window.location
  const normalizedPath = pathname.toLowerCase()
  const isDocsHost = hostname.toLowerCase().startsWith('docs.')
  const isDocsPath =
    normalizedPath === '/docs' ||
    normalizedPath === '/docs/' ||
    normalizedPath.startsWith('/docs/')

  return isDocsHost || isDocsPath ? 'docs' : 'home'
}

function shouldUseLightTheme(date = new Date()) {
  const minutes = date.getHours() * 60 + date.getMinutes()
  const lightThemeStartMinutes = LIGHT_THEME_START_HOUR * 60
  const lightThemeEndMinutes = LIGHT_THEME_END_HOUR * 60

  return minutes >= lightThemeStartMinutes && minutes < lightThemeEndMinutes
}

function getDelayUntilNextThemeSwitch(date = new Date()) {
  const nextSwitch = new Date(date)
  const minutes = date.getHours() * 60 + date.getMinutes()
  const lightThemeStartMinutes = LIGHT_THEME_START_HOUR * 60
  const lightThemeEndMinutes = LIGHT_THEME_END_HOUR * 60

  if (minutes < lightThemeStartMinutes) {
    nextSwitch.setHours(LIGHT_THEME_START_HOUR, 0, 0, 0)
  } else if (minutes < lightThemeEndMinutes) {
    nextSwitch.setHours(LIGHT_THEME_END_HOUR, 0, 0, 0)
  } else {
    nextSwitch.setDate(nextSwitch.getDate() + 1)
    nextSwitch.setHours(LIGHT_THEME_START_HOUR, 0, 0, 0)
  }

  return Math.max(nextSwitch.getTime() - date.getTime(), 1000)
}

export default function App() {
  const pageMode = resolvePageMode()
  const [isLightTheme, setIsLightTheme] = useState(() => shouldUseLightTheme())

  useEffect(() => {
    let timeoutId: number | undefined

    const syncTheme = () => {
      const now = new Date()
      setIsLightTheme(shouldUseLightTheme(now))
      timeoutId = window.setTimeout(syncTheme, getDelayUntilNextThemeSwitch(now) + 1000)
    }

    const refreshTheme = () => {
      setIsLightTheme(shouldUseLightTheme())
    }

    syncTheme()
    window.addEventListener('focus', refreshTheme)
    document.addEventListener('visibilitychange', refreshTheme)

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId)
      }

      window.removeEventListener('focus', refreshTheme)
      document.removeEventListener('visibilitychange', refreshTheme)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', !isLightTheme)

    return () => {
      document.documentElement.classList.remove('dark')
    }
  }, [isLightTheme, pageMode])

  useEffect(() => {
    const description = document.querySelector('meta[name="description"]')

    if (pageMode === 'docs') {
      document.title = 'Documentation'
      description?.setAttribute(
        'content',
        'Trade360Lab: продукт, архитектура, API и запуск проекта.',
      )
      return
    }

    document.title = 'Trade360Lab'
    description?.setAttribute(
      'content',
      'Trade360Lab page for strategy research, backtesting, and trading workflow exploration.',
    )
  }, [pageMode])

  return pageMode === 'docs' ? (
    <DocumentationHub isLightTheme={isLightTheme} />
  ) : (
    <HomeLanding repositoryUrl={repositoryUrl} isLightTheme={isLightTheme} />
  )
}
