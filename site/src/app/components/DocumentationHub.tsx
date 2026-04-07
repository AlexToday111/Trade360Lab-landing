import {
  ArrowUpRight,
  BookOpenText,
  Braces,
  Boxes,
  ChevronRight,
  Copy,
  Database,
  ExternalLink,
  FileCode2,
  FileJson,
  Github,
  Globe,
  Layers3,
  Play,
  ServerCog,
  Sparkles,
} from 'lucide-react'
import { motion } from 'motion/react'
import { useMemo, useState } from 'react'

type DocumentationHubProps = {
  repositoryUrl: string
}

type DocCard = {
  title: string
  description: string
  href: string
  kind: string
  accent: string
}

const documentationCards: DocCard[] = [
  {
    title: 'Root README',
    description: 'Monorepo overview, architecture map, quick start and service entry points.',
    href: 'https://github.com/Trade360Lab/Trade360Lab/blob/main/README.md',
    kind: 'Start here',
    accent: 'from-[#c8f24a] to-[#eef6a2]',
  },
  {
    title: 'Architecture',
    description: 'Detailed data flow between frontend, Java API, Python engine and PostgreSQL.',
    href: 'https://github.com/Trade360Lab/Trade360Lab/blob/main/docs/architecture.md',
    kind: 'docs/architecture.md',
    accent: 'from-[#d9efe7] to-[#f2f7ec]',
  },
  {
    title: 'REST API',
    description: 'Backtest endpoints, example payloads and error format for clients.',
    href: 'https://github.com/Trade360Lab/Trade360Lab/blob/main/docs/api.md',
    kind: 'docs/api.md',
    accent: 'from-[#f7ddcb] to-[#fbf0e8]',
  },
  {
    title: 'Data Model',
    description: 'Entities, storage shape and persistence boundaries used by the platform.',
    href: 'https://github.com/Trade360Lab/Trade360Lab/blob/main/docs/data-model.md',
    kind: 'docs/data-model.md',
    accent: 'from-[#dbe4ff] to-[#eef2ff]',
  },
  {
    title: 'Backtest Flow',
    description: 'Lifecycle of a run from request creation to metrics, trades and equity curve.',
    href: 'https://github.com/Trade360Lab/Trade360Lab/blob/main/docs/backtest-flow.md',
    kind: 'docs/backtest-flow.md',
    accent: 'from-[#ffd9d4] to-[#fff0ee]',
  },
  {
    title: 'docker-compose',
    description: 'Single-file orchestration for frontend, Java API, Python parser and database.',
    href: 'https://github.com/Trade360Lab/Trade360Lab/blob/main/docker-compose.yml',
    kind: 'Infra',
    accent: 'from-[#e2ebd2] to-[#f6f8ef]',
  },
]

const serviceCards = [
  {
    title: 'Frontend Workspace',
    description: 'Next.js App Router application for datasets, backtests, runs and comparisons.',
    href: 'https://github.com/Trade360Lab/Trade360Lab/blob/main/frontend/README.md',
    icon: Globe,
    items: ['Next.js 16', 'React 18', 'Tailwind CSS', 'Proxy API routes'],
  },
  {
    title: 'Java API',
    description: 'Spring Boot layer for datasets, candles, imports and run orchestration.',
    href: 'https://github.com/Trade360Lab/Trade360Lab/blob/main/backend/java/README.md',
    icon: ServerCog,
    items: ['Spring Boot 3', 'JPA', 'Swagger UI', 'PostgreSQL'],
  },
  {
    title: 'Python Parser',
    description: 'FastAPI ingestion service that imports OHLCV candles and writes to PostgreSQL.',
    href: 'https://github.com/Trade360Lab/Trade360Lab/blob/main/backend/python/README.md',
    icon: Braces,
    items: ['FastAPI', 'Uvicorn', 'Binance import', 'Schema bootstrap'],
  },
]

const architectureLayers = [
  {
    title: 'Interface Layer',
    description: 'Users work in workspace, data, backtests, run details and compare views.',
    icon: Layers3,
  },
  {
    title: 'Orchestration Layer',
    description: 'Java backend accepts REST requests, validates DTOs and coordinates execution.',
    icon: Boxes,
  },
  {
    title: 'Execution Layer',
    description: 'Python services import candles and execute strategy calculations over market data.',
    icon: Sparkles,
  },
  {
    title: 'Persistence Layer',
    description: 'PostgreSQL stores datasets, candles, runs, trades and equity points.',
    icon: Database,
  },
]

const sectionLinks = [
  { label: 'Overview', href: '#overview' },
  { label: 'Map', href: '#map' },
  { label: 'Quick Start', href: '#quick-start' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'API', href: '#api' },
]

const quickStartSnippet = `docker compose up --build

# services
# frontend     http://localhost:3000
# java api     http://localhost:8080
# python api   http://localhost:8000
# postgres     localhost:5432`

const localDevSnippet = `cd frontend
npm install
npm run dev

cd ../backend/python
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn parser.main:app --host 0.0.0.0 --port 8000

cd ../java
mvn spring-boot:run`

const backtestRequestSnippet = `POST /backtests
Content-Type: application/json

{
  "strategyId": 42,
  "exchange": "binance",
  "symbol": "BTCUSDT",
  "interval": "1h",
  "from": "2024-01-01T00:00:00Z",
  "to": "2024-01-03T00:00:00Z",
  "params": {
    "fastPeriod": 10,
    "slowPeriod": 21
  },
  "initialCash": 10000.0,
  "feeRate": 0.001,
  "slippageBps": 5.0,
  "strictData": true
}`

function CodeWindow({
  title,
  code,
  caption,
}: {
  title: string
  code: string
  caption: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-[#d8decb] bg-white shadow-[0_20px_50px_rgba(31,41,55,0.08)]">
      <div className="flex items-center justify-between border-b border-[#edf0e7] bg-[#fafbf7] px-5 py-3">
        <div>
          <p className="text-sm font-semibold text-[#20251e]">{title}</p>
          <p className="text-xs text-[#6e7766]">{caption}</p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-full border border-[#d8decb] px-3 py-1.5 text-sm text-[#4a5342] transition-colors hover:border-[#bcc8a8] hover:bg-[#f3f7e8]"
        >
          <Copy className="h-4 w-4" />
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto bg-[#f7f8f4] px-5 py-5 text-sm leading-7 text-[#2a3026]">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export function DocumentationHub({ repositoryUrl }: DocumentationHubProps) {
  const repositoryTreeUrl = `${repositoryUrl.replace(/\.git$/, '')}/tree/main`
  const repositoryDocsUrl = `${repositoryTreeUrl}/docs`
  const stats = useMemo(
    () => [
      { value: '4', label: 'core layers' },
      { value: '3', label: 'runtime services' },
      { value: '6+', label: 'primary docs' },
      { value: '1', label: 'docker entrypoint' },
    ],
    [],
  )

  return (
    <div className="min-h-screen bg-[#f4f2ea] text-[#1a1f19]">
      <div className="fixed inset-x-0 top-0 z-10 h-20 bg-[linear-gradient(180deg,rgba(244,242,234,0.95)_0%,rgba(244,242,234,0.6)_70%,rgba(244,242,234,0)_100%)] backdrop-blur-sm" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(200,242,74,0.16)_0%,rgba(200,242,74,0)_30%),radial-gradient(circle_at_85%_15%,rgba(243,180,108,0.16)_0%,rgba(243,180,108,0)_26%)]" />
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(37,46,32,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,46,32,0.04) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-6 sm:px-8 lg:px-10">
        <header className="sticky top-0 z-20 mb-8 rounded-full border border-white/60 bg-white/70 px-4 py-3 shadow-[0_10px_30px_rgba(25,32,20,0.08)] backdrop-blur-xl">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1f271d] text-[#c8f24a] shadow-[0_10px_20px_rgba(31,39,29,0.18)]">
                <BookOpenText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#78816e]">
                  Trade360Lab docs
                </p>
                <p className="text-sm text-[#23281f]">
                  Project documentation collection and launch map
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {sectionLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-full px-3 py-2 text-sm text-[#4d5546] transition-colors hover:bg-[#edf2df] hover:text-[#1f271d]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={repositoryDocsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#d7dfc4] bg-[#f7faee] px-4 py-2 text-sm font-semibold text-[#2b3325] transition-transform hover:-translate-y-0.5"
              >
                <FileCode2 className="h-4 w-4" />
                Open docs/
              </a>
              <a
                href={repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#1f271d] px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(31,39,29,0.18)] transition-transform hover:-translate-y-0.5"
              >
                <Github className="h-4 w-4" />
                Repository
              </a>
            </div>
          </div>
        </header>

        <section
          id="overview"
          className="mb-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-start"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="rounded-[36px] border border-[#dde3d1] bg-[linear-gradient(135deg,#fffefb_0%,#f6f5ef_55%,#edf6d4_100%)] p-7 shadow-[0_24px_60px_rgba(27,35,22,0.1)] sm:p-10"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dbe6be] bg-white/75 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#61704c]">
              <Sparkles className="h-4 w-4" />
              Documentation collection
            </div>
            <h1 className="max-w-3xl text-4xl font-black tracking-[-0.04em] text-[#20251e] sm:text-6xl">
              Красивый центр документации для всего Trade360Lab.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#495244] sm:text-lg">
              Здесь собраны входные точки проекта, README по сервисам, архитектурные заметки,
              REST API и сценарии локального запуска. Страница построена как навигатор по
              монорепозиторию `Trade360Lab/Trade360Lab`, чтобы быстро перейти от обзора к
              конкретному файлу и рабочей инструкции.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#map"
                className="inline-flex items-center gap-2 rounded-full bg-[#20251e] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_24px_rgba(24,29,20,0.18)]"
              >
                Explore documentation
                <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href={repositoryTreeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#d6deca] bg-white/80 px-5 py-3 text-sm font-semibold text-[#293123]"
              >
                Browse monorepo
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
            className="grid gap-4"
          >
            <div className="rounded-[32px] border border-[#dde3d1] bg-white/90 p-6 shadow-[0_20px_45px_rgba(31,41,55,0.08)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7b846f]">
                What is inside
              </p>
              <div className="mt-5 grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-[#f5f7ef] p-4">
                    <p className="text-3xl font-black tracking-[-0.05em] text-[#23291f]">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-[#616a59]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[32px] border border-[#dde3d1] bg-[#1f271d] p-6 text-white shadow-[0_20px_45px_rgba(31,41,55,0.14)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b7c58e]">
                Monorepo layout
              </p>
              <pre className="mt-4 overflow-x-auto text-sm leading-7 text-[#edf3dc]">
                <code>{`Trade360Lab/
|- frontend/
|- backend/java/
|- backend/python/
|- docs/
|- docker-compose.yml
\`- README.md`}</code>
              </pre>
            </div>
          </motion.div>
        </section>

        <section
          id="map"
          className="mb-8 rounded-[36px] border border-[#dde3d1] bg-white/88 p-7 shadow-[0_24px_60px_rgba(27,35,22,0.08)] sm:p-8"
        >
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7a826f]">
                Documentation map
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#20251e] sm:text-4xl">
                Главные документы и точки входа
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#5c6554]">
              Карточки ведут прямо в GitHub-файлы проекта: от общего обзора до архитектуры,
              модели данных, бэктест-пайплайна и compose-конфигурации.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {documentationCards.map((card, index) => (
              <motion.a
                key={card.title}
                href={card.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.06 * index, ease: 'easeOut' }}
                className="group rounded-[28px] border border-[#e2e6d8] bg-[#fcfcf8] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#cad6af] hover:shadow-[0_22px_44px_rgba(41,49,35,0.12)]"
              >
                <div className={`mb-4 h-2 w-24 rounded-full bg-gradient-to-r ${card.accent}`} />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7b846f]">
                      {card.kind}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-[#23281f]">{card.title}</h3>
                  </div>
                  <ArrowUpRight className="mt-1 h-5 w-5 text-[#7d866f] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <p className="mt-4 text-sm leading-7 text-[#56604f]">{card.description}</p>
              </motion.a>
            ))}
          </div>
        </section>

        <section id="quick-start" className="mb-8 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[36px] border border-[#dde3d1] bg-[linear-gradient(180deg,#ffffff_0%,#f9faf4_100%)] p-7 shadow-[0_24px_60px_rgba(27,35,22,0.08)] sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7a826f]">
              Quick start
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#20251e] sm:text-4xl">
              От первого запуска до локальной разработки
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-[#586150] sm:text-base">
              Основной путь запуска проекта описан в корневом README. Для быстрого старта есть
              `docker compose up --build`, а для локальной разработки сервисы можно запускать
              раздельно: Next.js frontend, FastAPI parser и Spring Boot API.
            </p>
            <div className="mt-8 grid gap-4">
              {[
                'Frontend: http://localhost:3000',
                'Java API: http://localhost:8080',
                'Python parser: http://localhost:8000',
                'Swagger UI: /swagger-ui/index.html и /docs',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-[#f3f6ea] px-4 py-4 text-sm text-[#374032]"
                >
                  <Play className="mt-0.5 h-4 w-4 shrink-0 text-[#6f8d24]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-5">
            <CodeWindow
              title="Docker Compose"
              caption="Recommended full-stack entrypoint"
              code={quickStartSnippet}
            />
            <CodeWindow
              title="Local Development"
              caption="Separate startup for frontend, Python and Java"
              code={localDevSnippet}
            />
          </div>
        </section>

        <section className="mb-8 grid gap-4 lg:grid-cols-3">
          {serviceCards.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.a
                key={service.title}
                href={service.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 * index, ease: 'easeOut' }}
                className="group rounded-[30px] border border-[#dde3d1] bg-white/90 p-6 shadow-[0_20px_45px_rgba(31,41,55,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c9d5af]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f1f5e5] text-[#2d3527]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#23281f]">{service.title}</h3>
                    <p className="text-sm text-[#70796a]">Service README</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-[#56604f]">{service.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-[#f4f7ed] px-3 py-1.5 text-xs font-medium text-[#516046]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#273022]">
                  Open README
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </motion.a>
            )
          })}
        </section>

        <section
          id="architecture"
          className="mb-8 rounded-[36px] border border-[#dde3d1] bg-[#20251e] p-7 text-white shadow-[0_24px_60px_rgba(27,35,22,0.12)] sm:p-8"
        >
          <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b8c68f]">
                Architecture
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                Как проходит поток данных в платформе
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#d6dcc7]">
              Клиент создаёт запуск бэктеста, Java backend оркестрирует lifecycle, Python engine
              обрабатывает данные и расчёты, а PostgreSQL хранит свечи, метрики, сделки и equity.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-4">
            {architectureLayers.map((layer, index) => {
              const Icon = layer.icon
              return (
                <motion.div
                  key={layer.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 * index, ease: 'easeOut' }}
                  className="rounded-[28px] border border-white/10 bg-white/5 p-5"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c8f24a]/12 text-[#d9f56e]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{layer.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#d6dcc7]">{layer.description}</p>
                </motion.div>
              )
            })}
          </div>
          <div className="mt-6 rounded-[28px] border border-white/10 bg-[#141813] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#b7c58e]">
              Execution flow
            </p>
            <div className="mt-4 grid gap-3 text-sm text-[#edf3dc] md:grid-cols-4">
              {[
                'POST /backtests creates a run and marks it as PENDING',
                'BacktestService moves execution to RUNNING and loads candles',
                'Python executor calculates summary, trades and equity JSON',
                'Java API persists results and sets COMPLETED or FAILED',
              ].map((step, index) => (
                <div key={step} className="rounded-2xl bg-white/5 px-4 py-4">
                  <p className="mb-2 text-xs uppercase tracking-[0.22em] text-[#9aa678]">
                    0{index + 1}
                  </p>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="api" className="grid gap-8 xl:grid-cols-[1fr_0.95fr]">
          <div className="rounded-[36px] border border-[#dde3d1] bg-white/88 p-7 shadow-[0_24px_60px_rgba(27,35,22,0.08)] sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7a826f]">
              API surface
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#20251e] sm:text-4xl">
              Основные endpoint-ы платформы
            </h2>
            <div className="mt-6 grid gap-3">
              {[
                ['GET', '/api/health', 'Проверка статуса Java API'],
                ['GET', '/api/python/health', 'Проверка доступности Python parser'],
                ['GET', '/api/datasets', 'Список датасетов'],
                ['POST', '/api/imports/candles', 'Запуск импорта свечей'],
                ['POST', '/backtests', 'Создание и запуск бэктеста'],
                ['GET', '/backtests/{id}', 'Получение статуса и summary запуска'],
                ['GET', '/backtests/{id}/trades', 'Сделки конкретного запуска'],
                ['GET', '/backtests/{id}/equity', 'Кривая капитала'],
              ].map(([method, path, note]) => (
                <div
                  key={path}
                  className="grid gap-3 rounded-[24px] border border-[#e3e7da] bg-[#fbfcf8] px-4 py-4 sm:grid-cols-[auto_1fr] sm:items-center"
                >
                  <div className="inline-flex w-fit items-center rounded-full bg-[#eaf4cc] px-3 py-1 text-xs font-bold tracking-[0.16em] text-[#516100]">
                    {method}
                  </div>
                  <div>
                    <p className="font-mono text-sm text-[#22281e]">{path}</p>
                    <p className="mt-1 text-sm text-[#687161]">{note}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://github.com/Trade360Lab/Trade360Lab/blob/main/docs/api.md"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#d7dfc4] bg-[#f7faee] px-4 py-2 text-sm font-semibold text-[#2b3325]"
              >
                <FileJson className="h-4 w-4" />
                Open API spec note
              </a>
              <a
                href="https://github.com/Trade360Lab/Trade360Lab/blob/main/backend/java/README.md"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#d7dfc4] bg-white px-4 py-2 text-sm font-semibold text-[#2b3325]"
              >
                Swagger and Java API
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
          <CodeWindow
            title="Backtest Request Example"
            caption="Based on docs/api.md"
            code={backtestRequestSnippet}
          />
        </section>
      </div>
    </div>
  )
}
