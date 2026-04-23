import { DocsPage } from './docs/DocsPage'

type DocumentationHubProps = {
  isLightTheme: boolean
}

export function DocumentationHub({ isLightTheme }: DocumentationHubProps) {
  return <DocsPage isLightTheme={isLightTheme} />
}
