import { DocumentationHub } from './components/DocumentationHub'
import { HomeLanding } from './components/HomeLanding'

const repositoryUrl =
  import.meta.env.VITE_REPOSITORY_URL ?? 'https://github.com/Trade360Lab/Trade360Lab'

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
    normalizedPath === '/documentation' ||
    normalizedPath === '/documentation/'

  return isDocsHost || isDocsPath ? 'docs' : 'home'
}

export default function App() {
  const pageMode = resolvePageMode()

  return pageMode === 'docs' ? (
    <DocumentationHub repositoryUrl={repositoryUrl} />
  ) : (
    <HomeLanding repositoryUrl={repositoryUrl} />
  )
}
