import {
  ArrowRight,
  BookOpenText,
  Check,
  ChevronRight,
  Copy,
  Database,
  FileText,
  Layers3,
  Sparkles,
} from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import {
  architectureLayers,
  backtestStatuses,
  dataEntities,
  dataFlowSteps,
  endpoints,
  errorResponseSnippet,
  localDevSnippet,
  navigationLinks,
  overviewCards,
  qualityCommands,
  quickStartSnippet,
  releaseChecklist,
  repositoryTree,
  runtimeCommands,
  sourceFiles,
  statusIcons,
  systemLayers,
} from './content'

function SectionHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string
  title: string
  intro: string
}) {
  return (
    <div className="mb-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c8f24a]">
        {eyebrow}
      </p>
      <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-white/68 sm:text-base">{intro}</p>
    </div>
  )
}

function CodePanel({
  title,
  code,
  language = 'text',
}: {
  title: string
  code: string
  language?: string
}) {
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#070907]/80 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-white/[0.04] px-5 py-3">
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-white/38">{language}</p>
        </div>
        <button
          type="button"
          onClick={copyCode}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/62 transition-colors hover:border-[#c8f24a]/40 hover:text-[#c8f24a]"
          aria-label={`Copy ${title}`}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <pre className="scrollbar-hidden overflow-x-auto px-5 py-5 text-[13px] leading-7 text-[#dce8c2]">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function SourcePill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#c8f24a]/20 bg-[#c8f24a]/8 px-3 py-1 text-xs font-semibold text-[#d9f56e]">
      {children}
    </span>
  )
}

function MethodBadge({ method }: { method: 'GET' | 'POST' }) {
  return (
    <span
      className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-black tracking-[0.18em] ${
        method === 'POST'
          ? 'bg-[#c8f24a] text-black shadow-[0_0_24px_rgba(200,242,74,0.22)]'
          : 'bg-white/10 text-white'
      }`}
    >
      {method}
    </span>
  )
}

export function DocsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070807] text-white selection:bg-[#c8f24a]/30 selection:text-white">
      <div
        className="pointer-events-none fixed inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(200,242,74,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,242,74,0.1) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(200,242,74,0.18)_0%,rgba(200,242,74,0)_32%),radial-gradient(circle_at_85%_18%,rgba(0,255,136,0.09)_0%,rgba(0,255,136,0)_28%),linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(7,8,7,0)_34%)]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-6 sm:px-8 lg:px-10">
        <header className="mb-10 flex flex-col gap-4 rounded-[32px] border border-white/10 bg-white/[0.04] px-5 py-4 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-[#c8f24a]/25 bg-[#c8f24a]/10 text-[#c8f24a] shadow-[0_0_34px_rgba(200,242,74,0.16)]">
              <BookOpenText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Trade360Lab Docs</p>
              <p className="text-xs text-white/48">Public product and technical documentation</p>
            </div>
          </div>
          <nav className="scrollbar-hidden flex gap-2 overflow-x-auto" aria-label="Docs sections">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap rounded-full px-3 py-2 text-sm text-white/58 transition-colors hover:bg-white/8 hover:text-[#c8f24a]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </header>

        <section id="overview" className="mb-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-[44px] border border-white/10 bg-white/[0.05] p-7 shadow-[0_28px_100px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:p-10"
          >
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#c8f24a]/12 blur-3xl" />
            <div className="relative">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#c8f24a]/20 bg-[#c8f24a]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#daf777]">
                <Sparkles className="h-4 w-4" />
                Source-driven documentation
              </div>
              <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white sm:text-7xl">
                Trade360Lab Docs
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
                Trade360Lab is a platform for research, data preparation, launching, and
                comparing trading scenarios. This page repackages the repository documentation
                into a product-oriented technical guide.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {sourceFiles.map((source) => (
                  <SourcePill key={source}>{source}</SourcePill>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
            className="rounded-[44px] border border-white/10 bg-[#10140f]/82 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c8f24a]">
              Repository shape
            </p>
            <pre className="mt-5 scrollbar-hidden overflow-x-auto rounded-[24px] border border-white/10 bg-black/30 p-5 text-sm leading-7 text-white/74">
              <code>{repositoryTree}</code>
            </pre>
            <div className="mt-5 grid gap-3">
              {systemLayers.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[20px] border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-white/66"
                >
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[#c8f24a]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="mb-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {overviewCards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.a
                key={card.id}
                href={`#${card.id}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.05, ease: 'easeOut' }}
                className="group rounded-[30px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#c8f24a]/35 hover:bg-[#c8f24a]/8"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.06] text-[#c8f24a]">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/38">
                  {card.source}
                </p>
                <h2 className="mt-2 text-xl font-bold text-white">{card.title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/58">{card.description}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#c8f24a]">
                  Open section
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.a>
            )
          })}
        </section>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:items-start">
          <aside className="top-6 hidden lg:sticky lg:block">
            <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
              <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/36">
                On this page
              </p>
              <div className="grid gap-1">
                {navigationLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-2xl px-3 py-2 text-sm text-white/62 transition-colors hover:bg-[#c8f24a]/10 hover:text-[#c8f24a]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <div className="grid gap-8">
            <section id="architecture" className="rounded-[38px] border border-white/10 bg-white/[0.045] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-8">
              <SectionHeader
                eyebrow="Architecture"
                title="Four layers with a clear execution boundary"
                intro="The project documentation describes the platform as frontend, Java API, Python engine, and PostgreSQL. Java owns orchestration and persistence boundaries; Python does strategy execution and returns JSON artifacts."
              />
              <div className="grid gap-4 xl:grid-cols-4">
                {architectureLayers.map((layer) => {
                  const Icon = layer.icon
                  return (
                    <div key={layer.title} className="rounded-[28px] border border-white/10 bg-[#0d110d]/78 p-5">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[18px] bg-[#c8f24a]/10 text-[#c8f24a]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/36">
                        {layer.sourceName}
                      </p>
                      <h3 className="mt-2 text-xl font-bold text-white">{layer.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/62">{layer.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {layer.responsibilities.map((item) => (
                          <span key={item} className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/58">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {dataFlowSteps.slice(0, 3).map((step, index) => (
                  <div key={step.title} className="rounded-[24px] border border-[#c8f24a]/15 bg-[#c8f24a]/7 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c8f24a]">
                      0{index + 1}
                    </p>
                    <h4 className="mt-2 font-bold text-white">{step.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-white/58">{step.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="api" className="rounded-[38px] border border-white/10 bg-white/[0.045] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-8">
              <SectionHeader
                eyebrow="REST API"
                title="Backtest endpoints and response contracts"
                intro="The API documentation focuses on the backtest surface: create a run, inspect run state, fetch trades, fetch equity, and handle JSON errors."
              />
              <div className="grid gap-5">
                {endpoints.map((endpoint) => (
                  <div key={endpoint.path} className="rounded-[30px] border border-white/10 bg-[#0d110d]/78 p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <MethodBadge method={endpoint.method} />
                        <h3 className="mt-3 font-mono text-xl font-semibold text-white">{endpoint.path}</h3>
                        <p className="mt-2 text-sm leading-6 text-white/62">{endpoint.description}</p>
                      </div>
                      <SourcePill>{endpoint.source}</SourcePill>
                    </div>
                    <div className={`mt-5 grid gap-4 ${endpoint.request ? 'xl:grid-cols-2' : ''}`}>
                      {endpoint.request ? (
                        <CodePanel title="Request" language="json" code={endpoint.request} />
                      ) : null}
                      <CodePanel title="Response" language="json" code={endpoint.response} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
                <div className="rounded-[28px] border border-[#ff7676]/20 bg-[#ff7676]/8 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ffaaa5]">
                    Error contract
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/62">
                    Invalid requests return JSON. The source example uses status 400 for a date
                    range validation error.
                  </p>
                </div>
                <CodePanel title="Error response" language="json" code={errorResponseSnippet} />
              </div>
            </section>

            <section id="lifecycle" className="rounded-[38px] border border-white/10 bg-white/[0.045] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-8">
              <SectionHeader
                eyebrow="Backtest lifecycle"
                title="Statuses, artifacts, and failure behavior"
                intro="Backtest execution starts with validation and a runs row, moves through Python execution, then stores metrics, trades, and equity points before finalizing the run."
              />
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {backtestStatuses.map((item) => {
                  const Icon = statusIcons[item.tone]
                  return (
                    <div key={item.status} className="rounded-[28px] border border-white/10 bg-[#0d110d]/78 p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-white/[0.06] text-[#c8f24a]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="rounded-full bg-[#c8f24a]/10 px-3 py-1 text-xs font-black tracking-[0.18em] text-[#c8f24a]">
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-white/62">{item.description}</p>
                    </div>
                  )
                })}
              </div>
              <div className="mt-6 grid gap-3">
                {dataFlowSteps.map((step, index) => (
                  <div key={step.title} className="grid gap-4 rounded-[26px] border border-white/10 bg-[#0d110d]/78 p-4 sm:grid-cols-[64px_1fr] sm:items-start">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-[#c8f24a]/20 bg-[#c8f24a]/10 font-black text-[#c8f24a]">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{step.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-white/62">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="data-model" className="rounded-[38px] border border-white/10 bg-white/[0.045] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-8">
              <SectionHeader
                eyebrow="Data model"
                title="Core entities stored around a run"
                intro="The data model documentation defines one main run table, two artifact tables, and candles as the OHLCV source for backtest execution."
              />
              <div className="grid gap-4 xl:grid-cols-2">
                {dataEntities.map((entity) => (
                  <div key={entity.name} className="rounded-[30px] border border-white/10 bg-[#0d110d]/78 p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] bg-[#c8f24a]/10 text-[#c8f24a]">
                        <Database className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-mono text-xl font-bold text-white">{entity.name}</h3>
                        <p className="mt-2 text-sm leading-6 text-white/62">{entity.description}</p>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {entity.fields.map((field) => (
                        <span key={field} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium text-white/64">
                          {field}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 grid gap-2">
                      {entity.notes.map((note) => (
                        <div key={note} className="flex items-start gap-2 text-sm text-white/58">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#c8f24a]" />
                          <span>{note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="release" className="rounded-[38px] border border-white/10 bg-white/[0.045] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-8">
              <SectionHeader
                eyebrow="Release checklist"
                title="Operational gates for alpha release"
                intro="The release checklist is organized around scope, quality, runtime validation, configuration, and final release steps."
              />
              <div className="grid gap-4 xl:grid-cols-5">
                {releaseChecklist.map((group) => (
                  <div key={group.title} className="rounded-[28px] border border-white/10 bg-[#0d110d]/78 p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-[#c8f24a]/10 text-[#c8f24a]">
                        <FileText className="h-4 w-4" />
                      </div>
                      <h3 className="font-bold text-white">{group.title}</h3>
                    </div>
                    <div className="grid gap-3">
                      {group.items.map((item) => (
                        <label key={item} className="flex items-start gap-3 text-sm leading-6 text-white/62">
                          <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-[#c8f24a]/40 bg-[#c8f24a]/8" />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid gap-4 xl:grid-cols-2">
                <CodePanel title="Quality gates" language="bash" code={qualityCommands} />
                <CodePanel title="Runtime validation" language="bash" code={runtimeCommands} />
              </div>
            </section>

            <section className="grid gap-4 xl:grid-cols-2">
              <div className="rounded-[34px] border border-white/10 bg-[#c8f24a]/8 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[18px] bg-[#c8f24a]/12 text-[#c8f24a]">
                  <Layers3 className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-black text-white">Quick start</h2>
                <p className="mt-3 text-sm leading-7 text-white/62">
                  The repository README recommends Docker for the full stack and separate service
                  startup for local development.
                </p>
              </div>
              <div className="grid gap-4">
                <CodePanel title="Docker Compose" language="bash" code={quickStartSnippet} />
                <CodePanel title="Local development" language="bash" code={localDevSnippet} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
