import { ArrowRight, Check, Copy, Database, FileText } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { OrbitalSystem } from '../OrbitalSystem'
import {
  architectureLayers,
  backtestStatuses,
  dataEntities,
  dataFlowSteps,
  endpoints,
  errorResponseSnippet,
  navigationItems,
  overviewCards,
  projectDescription,
  qualityCommands,
  releaseChecklist,
  repositoryTree,
  runtimeCommands,
  statusIcons,
  systemLayers,
  type SectionId,
} from './content'

type DocsPageProps = {
  isLightTheme: boolean
}

const lightTheme = {
  ambient: 'bg-[radial-gradient(circle_at_top,rgba(200,242,74,0.24)_0%,rgba(200,242,74,0)_38%),radial-gradient(circle_at_85%_18%,rgba(243,180,108,0.16)_0%,rgba(243,180,108,0)_28%)]',
  container: 'bg-[#f6f4ec] text-[#182016]',
  corner: 'border-[#c8d59f]/70',
  footer: 'text-[#748063]',
  ghostPrimaryOpacity: 'opacity-[0.08]',
  ghostPrimaryStroke: '2px rgba(32, 37, 30, 0.12)',
  ghostSecondaryOpacity: 'opacity-[0.05]',
  ghostSecondaryStroke: '2px rgba(143, 170, 34, 0.14)',
  gridOpacity: 'opacity-60',
  gridPattern:
    'linear-gradient(rgba(37, 46, 32, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 46, 32, 0.05) 1px, transparent 1px)',
  muted: 'text-[#2d3527]/78',
  panel: 'border-[#c8d59f]/60 bg-white/70 shadow-[0_20px_50px_rgba(31,39,29,0.09)]',
  panelStrong: 'border-[#bfc9ac] bg-[#fffef8]/86 shadow-[0_24px_70px_rgba(31,39,29,0.12)]',
  pill: 'border-[#bfc9ac] bg-white/70 text-[#2d3527]',
  titleLab: 'text-[#8faa22] drop-shadow-[0_12px_28px_rgba(143,170,34,0.18)]',
  titleLine: 'via-[#9bb43d]/45',
  titleMain: 'text-[#1f271d] drop-shadow-[0_14px_24px_rgba(31,39,29,0.08)]',
}

const darkTheme = {
  ambient: 'bg-[radial-gradient(circle_at_top,rgba(200,242,74,0.12)_0%,rgba(200,242,74,0)_32%),radial-gradient(circle_at_20%_80%,rgba(0,255,136,0.08)_0%,rgba(0,255,136,0)_28%)]',
  container: 'bg-[#0a0a0a] text-white',
  corner: 'border-[#c8f24a]/20',
  footer: 'text-[#c8f24a]/40',
  ghostPrimaryOpacity: 'opacity-[0.03]',
  ghostPrimaryStroke: '2px rgba(200, 242, 74, 0.3)',
  ghostSecondaryOpacity: 'opacity-[0.02]',
  ghostSecondaryStroke: '2px rgba(200, 242, 74, 0.2)',
  gridOpacity: 'opacity-20',
  gridPattern:
    'linear-gradient(rgba(200, 242, 74, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(200, 242, 74, 0.1) 1px, transparent 1px)',
  muted: 'text-white/72',
  panel: 'border-[#c8f24a]/18 bg-black/34 shadow-[0_24px_70px_rgba(0,0,0,0.3)]',
  panelStrong: 'border-[#c8f24a]/24 bg-black/46 shadow-[0_28px_90px_rgba(0,0,0,0.38)]',
  pill: 'border-[#c8f24a]/28 bg-[#c8f24a]/8 text-[#c8f24a]',
  titleLab: 'text-[#c8f24a]/80 drop-shadow-[0_0_15px_rgba(200,242,74,0.2)]',
  titleLine: 'via-[#c8f24a]/40',
  titleMain: 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]',
}

function CodePanel({ title, code, compact = false }: { title: string; code: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-current/10 bg-black/52 text-white">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c8f24a]">{title}</p>
        <button
          type="button"
          onClick={copyCode}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-white/70 hover:text-[#c8f24a]"
          aria-label={`Скопировать ${title}`}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <pre className={`scrollbar-hidden overflow-x-auto px-4 py-3 text-xs leading-6 text-[#dce8c2] ${compact ? 'max-h-44' : 'max-h-72'}`}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

function MethodBadge({ method }: { method: 'GET' | 'POST' }) {
  return (
    <span className={`rounded-md px-2.5 py-1 text-xs font-black ${method === 'POST' ? 'bg-[#c8f24a] text-black' : 'bg-white/12 text-white'}`}>
      {method}
    </span>
  )
}

export function DocsPage({ isLightTheme }: DocsPageProps) {
  const [activeSection, setActiveSection] = useState<SectionId>('overview')
  const theme = isLightTheme ? lightTheme : darkTheme
  const activeLabel = navigationItems.find((item) => item.id === activeSection)?.label

  return (
    <div className={`relative h-screen w-full overflow-hidden ${theme.container}`}>
      <div
        className={`absolute inset-0 ${theme.gridOpacity}`}
        style={{ backgroundImage: theme.gridPattern, backgroundSize: '50px 50px' }}
      />
      <div className={`absolute inset-0 ${theme.ambient}`} />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div
          className={`absolute text-[20vw] font-bold whitespace-nowrap ${theme.ghostPrimaryOpacity}`}
          style={{ color: 'transparent', fontFamily: 'Sora, sans-serif', WebkitTextStroke: theme.ghostPrimaryStroke }}
        >
          T360 LAB
        </div>
        <div
          className={`absolute top-[20%] text-[20vw] font-bold whitespace-nowrap ${theme.ghostSecondaryOpacity}`}
          style={{ color: 'transparent', fontFamily: 'Sora, sans-serif', WebkitTextStroke: theme.ghostSecondaryStroke }}
        >
          T360 LAB
        </div>
      </div>

      <OrbitalSystem isLightTheme={isLightTheme} />

      <div className="relative z-10 flex h-screen flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className={`mb-3 rounded-lg border px-4 py-3 backdrop-blur-xl ${theme.panel}`}>
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#c8f24a]/30 bg-black/10 p-1.5 dark:bg-white/5">
                <img
                  src="/YellowLogo.png"
                  alt="Trade360Lab"
                  className="h-full w-full object-contain"
                  loading="eager"
                />
              </div>
              <div>
                <p className="text-sm font-bold">Documentation</p>
              </div>
            </div>
            <nav className="scrollbar-hidden flex gap-2 overflow-x-auto" aria-label="Разделы документации">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`whitespace-nowrap rounded-lg border px-3 py-2 text-sm font-semibold transition-all ${
                    activeSection === item.id
                      ? 'border-[#c8f24a] bg-[#c8f24a] text-black shadow-[0_0_24px_rgba(200,242,74,0.24)]'
                      : `${theme.pill} hover:border-[#c8f24a] hover:text-[#8faa22] dark:hover:text-[#c8f24a]`
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </header>

        <section className="grid min-h-0 flex-1 gap-3 lg:grid-cols-[0.78fr_1.22fr]">
          <aside className={`hidden min-h-0 flex-col justify-between rounded-lg border p-4 backdrop-blur-xl lg:flex ${theme.panel}`}>
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="relative mb-4"
              >
                <motion.div
                  className="absolute inset-0 bg-[#c8f24a] opacity-30 blur-2xl"
                  animate={{ opacity: [0.16, 0.34, 0.16] }}
                  transition={{ duration: 3, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY }}
                />
                <div className="relative">
                  <h1 className="flex items-baseline text-[3.4rem] font-black leading-none tracking-tight sm:text-[4.8rem] lg:text-[5.6rem]">
                    <span className={theme.titleMain}>T360</span>
                    <span className={`-ml-[0.04em] text-[2.15rem] font-bold sm:text-[3rem] lg:text-[3.45rem] ${theme.titleLab}`}>
                      LAB
                    </span>
                  </h1>
                  <div className={`mt-1 h-[2px] bg-gradient-to-r from-transparent ${theme.titleLine} to-transparent`} />
                </div>
              </motion.div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8faa22] dark:text-[#c8f24a]">
                {activeLabel}
              </p>
              <h2 className="mt-2 max-w-xl text-2xl font-black leading-tight sm:text-3xl">
                Trade360Lab
              </h2>
              <p className={`mt-3 max-w-xl text-sm leading-6 ${theme.muted}`}>
                {projectDescription}
              </p>
            </div>
            <div className={`mt-4 hidden rounded-lg border p-3 text-xs leading-5 lg:block ${theme.pill}`}>
              STRATEGY RESEARCH / BACKTESTING / OPTIMIZATION
            </div>
          </aside>

          <div className={`min-h-0 rounded-lg border p-4 backdrop-blur-xl ${theme.panelStrong}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="h-full min-h-0"
              >
                {activeSection === 'overview' ? (
                  <OverviewView onSelect={setActiveSection} theme={theme} />
                ) : null}
                {activeSection === 'architecture' ? <ArchitectureView theme={theme} /> : null}
                {activeSection === 'api' ? <ApiView theme={theme} /> : null}
                {activeSection === 'lifecycle' ? <LifecycleView theme={theme} /> : null}
                {activeSection === 'data-model' ? <DataModelView theme={theme} /> : null}
                {activeSection === 'release' ? <ReleaseView theme={theme} /> : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>

      <div className={`absolute top-0 left-0 h-32 w-32 border-l-2 border-t-2 ${theme.corner}`} />
      <div className={`absolute top-0 right-0 h-32 w-32 border-r-2 border-t-2 ${theme.corner}`} />
      <div className={`absolute bottom-0 left-0 h-32 w-32 border-l-2 border-b-2 ${theme.corner}`} />
      <div className={`absolute right-0 bottom-0 h-32 w-32 border-r-2 border-b-2 ${theme.corner}`} />
    </div>
  )
}

function OverviewView({ onSelect, theme }: { onSelect: (section: SectionId) => void; theme: typeof lightTheme }) {
  return (
    <div className="grid h-full min-h-0 gap-3 xl:grid-cols-[1fr_0.82fr]">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        {overviewCards.map((card) => {
          const Icon = card.icon
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => onSelect(card.id)}
              className={`group rounded-lg border p-4 text-left transition-all hover:-translate-y-0.5 ${theme.panel}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#c8f24a]/12 text-[#8faa22] dark:text-[#c8f24a]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold">{card.title}</h3>
                  <p className={`mt-1 text-sm leading-5 ${theme.muted}`}>{card.description}</p>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 opacity-50 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          )
        })}
      </div>
      <div className={`rounded-lg border p-4 ${theme.panel}`}>
        <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#8faa22] dark:text-[#c8f24a]">
          Структура репозитория
        </p>
        <pre className="scrollbar-hidden mt-3 overflow-x-auto rounded-lg bg-black/55 p-4 text-xs leading-6 text-[#dce8c2]">
          <code>{repositoryTree}</code>
        </pre>
        <div className="mt-3 grid gap-2">
          {systemLayers.map((item) => (
            <div key={item} className={`rounded-lg border px-3 py-2 text-sm ${theme.pill}`}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ArchitectureView({ theme }: { theme: typeof lightTheme }) {
  return (
    <div className="grid h-full min-h-0 gap-3 xl:grid-cols-[1fr_0.9fr]">
      <div className="grid gap-3 sm:grid-cols-2">
        {architectureLayers.map((layer) => {
          const Icon = layer.icon
          return (
            <div key={layer.title} className={`rounded-lg border p-4 ${theme.panel}`}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#c8f24a]/12 text-[#8faa22] dark:text-[#c8f24a]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-55">{layer.sourceName}</p>
                  <h3 className="font-bold">{layer.title}</h3>
                </div>
              </div>
              <p className={`mt-3 text-sm leading-6 ${theme.muted}`}>{layer.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {layer.responsibilities.map((item) => (
                  <span key={item} className={`rounded-md border px-2 py-1 text-xs ${theme.pill}`}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      <div className={`rounded-lg border p-4 ${theme.panel}`}>
        <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#8faa22] dark:text-[#c8f24a]">
          Поток данных
        </p>
        <div className="mt-3 grid gap-2">
          {dataFlowSteps.slice(0, 5).map((step, index) => (
            <div key={step.title} className={`grid grid-cols-[34px_1fr] gap-3 rounded-lg border p-3 ${theme.pill}`}>
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#c8f24a] text-xs font-black text-black">
                {index + 1}
              </div>
              <div>
                <h4 className="text-sm font-bold">{step.title}</h4>
                <p className="mt-1 text-xs leading-5 opacity-75">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ApiView({ theme }: { theme: typeof lightTheme }) {
  const primaryEndpoint = endpoints[0]

  return (
    <div className="grid h-full min-h-0 gap-3 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="grid gap-2">
        {endpoints.map((endpoint) => (
          <div key={endpoint.path} className={`rounded-lg border p-3 ${theme.panel}`}>
            <div className="flex items-start gap-3">
              <MethodBadge method={endpoint.method} />
              <div>
                <p className="font-mono text-sm font-bold">{endpoint.path}</p>
                <p className={`mt-1 text-xs leading-5 ${theme.muted}`}>{endpoint.description}</p>
              </div>
            </div>
          </div>
        ))}
        <div className={`rounded-lg border p-3 text-sm leading-6 ${theme.pill}`}>
          Ошибки возвращаются в JSON. При некорректном запросе документация фиксирует формат с
          timestamp, status, error, message и path.
        </div>
      </div>
      <div className="grid min-h-0 gap-3">
        <div className="grid gap-3 lg:grid-cols-2">
          {primaryEndpoint.request ? (
            <CodePanel title="POST /backtests запрос" code={primaryEndpoint.request} compact />
          ) : null}
          <CodePanel title="POST /backtests ответ" code={primaryEndpoint.response} compact />
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          <CodePanel title="GET /backtests/{id}" code={endpoints[1].response} compact />
          <CodePanel title="Ошибка API" code={errorResponseSnippet} compact />
        </div>
      </div>
    </div>
  )
}

function LifecycleView({ theme }: { theme: typeof lightTheme }) {
  return (
    <div className="grid h-full min-h-0 gap-3 xl:grid-cols-[0.8fr_1.2fr]">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        {backtestStatuses.map((item) => {
          const Icon = statusIcons[item.tone]
          return (
            <div key={item.status} className={`rounded-lg border p-4 ${theme.panel}`}>
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-[#8faa22] dark:text-[#c8f24a]" />
                <span className="rounded-md bg-[#c8f24a] px-2.5 py-1 text-xs font-black text-black">{item.status}</span>
              </div>
              <p className={`mt-3 text-sm leading-6 ${theme.muted}`}>{item.description}</p>
            </div>
          )
        })}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {dataFlowSteps.map((step, index) => (
          <div key={step.title} className={`rounded-lg border p-3 ${theme.panel}`}>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8faa22] dark:text-[#c8f24a]">
              0{index + 1}
            </p>
            <h3 className="mt-1 font-bold">{step.title}</h3>
            <p className={`mt-1 text-sm leading-5 ${theme.muted}`}>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function DataModelView({ theme }: { theme: typeof lightTheme }) {
  return (
    <div className="grid h-full min-h-0 gap-3 sm:grid-cols-2">
      {dataEntities.map((entity) => (
        <div key={entity.name} className={`rounded-lg border p-4 ${theme.panel}`}>
          <div className="flex items-start gap-3">
            <Database className="mt-1 h-5 w-5 shrink-0 text-[#8faa22] dark:text-[#c8f24a]" />
            <div>
              <h3 className="font-mono text-lg font-bold">{entity.name}</h3>
              <p className={`mt-1 text-sm leading-5 ${theme.muted}`}>{entity.description}</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {entity.fields.map((field) => (
              <span key={field} className={`rounded-md border px-2 py-1 text-[11px] ${theme.pill}`}>
                {field}
              </span>
            ))}
          </div>
          <div className="mt-3 grid gap-1.5">
            {entity.notes.map((note) => (
              <div key={note} className={`flex items-start gap-2 text-xs leading-5 ${theme.muted}`}>
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8faa22] dark:text-[#c8f24a]" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ReleaseView({ theme }: { theme: typeof lightTheme }) {
  return (
    <div className="grid h-full min-h-0 gap-3 xl:grid-cols-[1fr_1fr]">
      <div className="grid gap-3 sm:grid-cols-2">
        {releaseChecklist.map((group) => (
          <div key={group.title} className={`rounded-lg border p-3 ${theme.panel}`}>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#8faa22] dark:text-[#c8f24a]" />
              <h3 className="font-bold">{group.title}</h3>
            </div>
            <div className="mt-2 grid gap-1.5">
              {group.items.map((item) => (
                <div key={item} className={`flex items-start gap-2 text-xs leading-5 ${theme.muted}`}>
                  <span className="mt-1 h-3 w-3 shrink-0 rounded-sm border border-[#8faa22] dark:border-[#c8f24a]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-3">
        <CodePanel title="Проверки качества" code={qualityCommands} compact />
        <CodePanel title="Проверка запуска" code={runtimeCommands} compact />
      </div>
    </div>
  )
}
