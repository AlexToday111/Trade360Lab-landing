import type { LucideIcon } from 'lucide-react'
import {
  CheckCircle2,
  CircleDashed,
  Code2,
  Database,
  GitBranch,
  Globe2,
  Layers3,
  Rocket,
  ServerCog,
  ShieldAlert,
  TerminalSquare,
} from 'lucide-react'

export type SectionId = 'overview' | 'architecture' | 'api' | 'lifecycle' | 'data-model' | 'launch'

export type NavigationItem = {
  id: SectionId
  label: string
}

export type OverviewCard = {
  id: SectionId
  title: string
  description: string
  icon: LucideIcon
}

export type ArchitectureLayer = {
  title: string
  sourceName: string
  description: string
  responsibilities: string[]
  icon: LucideIcon
}

export type ApiMethod = 'GET' | 'POST' | 'PUT/PATCH' | 'DELETE'

export type ApiMethodOption = {
  id: ApiMethod
  label: string
}

export type Endpoint = {
  method: ApiMethod
  path: string
  description: string
  source: string
  request?: string
  response: string
}

export type BacktestStatus = {
  status: string
  tone: 'idle' | 'active' | 'success' | 'danger'
  description: string
}

export type FlowStep = {
  title: string
  description: string
}

export type DataEntity = {
  name: string
  description: string
  fields: string[]
  notes: string[]
}

export type LaunchGroup = {
  title: string
  items: string[]
}

export const projectDescription =
  'Лаборатория для разработки, тестирования и подготовки торговых стратегий. Платформа объединяет загрузку рыночных данных, управление стратегиями, запуск бэктестов, анализ результатов и подготовку к paper/live trading в едином рабочем процессе.'

export const navigationItems: NavigationItem[] = [
  { id: 'overview', label: 'Обзор' },
  { id: 'architecture', label: 'Архитектура' },
  { id: 'api', label: 'API' },
  { id: 'lifecycle', label: 'Жизненный цикл' },
  { id: 'data-model', label: 'Модель данных' },
  { id: 'launch', label: 'Запуск' },
]

export const overviewCards: OverviewCard[] = [
  {
    id: 'architecture',
    title: 'Архитектура',
    description: 'Четыре слоя: frontend, Spring Boot API, Python engine и PostgreSQL.',
    icon: Layers3,
  },
  {
    id: 'api',
    title: 'API',
    description: 'Endpoint-ы бэктеста: запуск, статус, сделки, equity curve и формат ошибок.',
    icon: Code2,
  },
  {
    id: 'lifecycle',
    title: 'Жизненный цикл',
    description: 'Состояния запуска от валидации до сохраненных артефактов.',
    icon: GitBranch,
  },
  {
    id: 'data-model',
    title: 'Модель данных',
    description: 'Таблицы runs, trades, equity points и candles для выполнения бэктеста.',
    icon: Database,
  },
  {
    id: 'launch',
    title: 'Запуск',
    description: 'Локальный dev-сервер, production-сборка, Docker и базовые проверки.',
    icon: Rocket,
  },
]

export const architectureLayers: ArchitectureLayer[] = [
  {
    title: 'Frontend',
    sourceName: 'frontend',
    description: 'Интерфейс создает запросы на запуск бэктеста и показывает статусы, summary, сделки и equity curve.',
    responsibilities: ['Workspace', 'Data', 'Backtests', 'Compare'],
    icon: Globe2,
  },
  {
    title: 'Java API',
    sourceName: 'backend/java',
    description: 'Spring Boot принимает REST-запросы, управляет lifecycle, читает свечи и сохраняет результат.',
    responsibilities: ['Controllers', 'DTO', 'BacktestService', 'Repositories'],
    icon: ServerCog,
  },
  {
    title: 'Python Engine',
    sourceName: 'backend/python',
    description: 'Python выполняет расчет стратегии на CSV-данных и возвращает JSON с артефактами.',
    responsibilities: ['Parser', 'Strategy Runner', 'Backtesting', 'Indicators'],
    icon: TerminalSquare,
  },
  {
    title: 'PostgreSQL',
    sourceName: 'PostgreSQL',
    description: 'База хранит стратегии, свечи, запуски, сделки и точки кривой капитала.',
    responsibilities: ['candles', 'runs', 'backtest_trades', 'backtest_equity_points'],
    icon: Database,
  },
]

export const dataFlowSteps: FlowStep[] = [
  {
    title: 'POST /backtests',
    description: 'Клиент передает стратегию, рынок, interval, период, параметры и настройки исполнения.',
  },
  {
    title: 'PENDING -> RUNNING',
    description: 'Java создает запись в runs, затем BacktestService переводит запуск в RUNNING.',
  },
  {
    title: 'OHLCV -> CSV',
    description: 'Сервис читает candles по exchange, symbol, interval, from и to, затем готовит временный CSV.',
  },
  {
    title: 'Python process',
    description: 'PythonBacktestExecutor передает JSON через stdin и читает stdout/stderr.',
  },
  {
    title: 'Persist artifacts',
    description: 'summary сохраняется в metrics_json, сделки в backtest_trades, equity в backtest_equity_points.',
  },
  {
    title: 'COMPLETED / FAILED',
    description: 'Успешный запуск завершается COMPLETED, ошибка подготовки или исполнения сохраняется как FAILED.',
  },
]

export const quickStartSnippet = `cd site
npm install
npm run dev

# docs: http://localhost:5173/docs
# home: http://localhost:5173`

export const backtestStatuses: BacktestStatus[] = [
  {
    status: 'PENDING',
    tone: 'idle',
    description: 'Запуск создан, но выполнение еще не началось.',
  },
  {
    status: 'RUNNING',
    tone: 'active',
    description: 'Java backend подготовил данные и выполняет Python-бэктест.',
  },
  {
    status: 'COMPLETED',
    tone: 'success',
    description: 'Python завершился успешно, summary и артефакты сохранены в БД.',
  },
  {
    status: 'FAILED',
    tone: 'danger',
    description: 'Ошибка возникла во время подготовки данных, выполнения Python или сохранения результата.',
  },
]

export const apiMethods: ApiMethodOption[] = [
  { id: 'GET', label: 'GET' },
  { id: 'POST', label: 'POST' },
  { id: 'PUT/PATCH', label: 'PUT/PATCH' },
  { id: 'DELETE', label: 'DELETE' },
]

export const endpoints: Endpoint[] = [
  {
    method: 'POST',
    path: '/backtests',
    description: 'Создает запуск и синхронно выполняет бэктест.',
    source: 'docs/api.md',
    request: `{
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
}`,
    response: `{
  "runId": 101
}`,
  },
  {
    method: 'GET',
    path: '/backtests/{id}',
    description: 'Возвращает состояние запуска, summary, ошибку и timestamps.',
    source: 'docs/api.md',
    response: `{
  "runId": 101,
  "strategyId": 42,
  "status": "COMPLETED",
  "exchange": "binance",
  "symbol": "BTCUSDT",
  "interval": "1h",
  "summary": {
    "profit": 12.5,
    "sharpe": 1.3
  },
  "errorMessage": null
}`,
  },
  {
    method: 'GET',
    path: '/backtests/{id}/trades',
    description: 'Возвращает сделки конкретного запуска.',
    source: 'docs/api.md',
    response: `[{
  "entry_time": "2024-01-01T00:00:00Z",
  "exit_time": "2024-01-01T01:00:00Z",
  "entry_price": 100.0,
  "exit_price": 109.5,
  "qty": 1.0,
  "pnl": 9.5,
  "fee": 0.2
}]`,
  },
  {
    method: 'GET',
    path: '/backtests/{id}/equity',
    description: 'Возвращает кривую капитала.',
    source: 'docs/api.md',
    response: `[{
  "timestamp": "2024-01-01T01:00:00Z",
  "equity": 10009.5
}]`,
  },
]

export const errorResponseSnippet = `{
  "timestamp": "2024-01-01T00:00:05Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Field 'from' must be before 'to'",
  "path": "/backtests"
}`

export const dataEntities: DataEntity[] = [
  {
    name: 'runs',
    description: 'Главная таблица запусков и их lifecycle.',
    fields: ['id', 'strategy_id', 'status', 'exchange', 'symbol', 'interval', 'date_from', 'date_to', 'params_json', 'metrics_json', 'error_message', 'created_at', 'started_at', 'finished_at'],
    notes: ['Идентичность и статус запуска.', 'Запрос в params_json.', 'Summary результата в metrics_json.', 'Текст ошибки в error_message.'],
  },
  {
    name: 'backtest_trades',
    description: 'Сделки конкретного запуска.',
    fields: ['id', 'run_id', 'entry_time', 'exit_time', 'entry_price', 'exit_price', 'quantity', 'pnl', 'fee'],
    notes: ['run_id -> runs.id.'],
  },
  {
    name: 'backtest_equity_points',
    description: 'Точки кривой капитала.',
    fields: ['id', 'run_id', 'timestamp', 'equity'],
    notes: ['run_id -> runs.id.'],
  },
  {
    name: 'candles',
    description: 'OHLCV-данные, из которых выполняется бэктест.',
    fields: ['exchange', 'symbol', 'interval', 'open_time', 'close_time', 'open', 'high', 'low', 'close', 'volume'],
    notes: ['BacktestService читает исходные свечи из этой таблицы.'],
  },
]

export const launchGuide: LaunchGroup[] = [
  {
    title: 'Сервисы',
    items: ['Vite dev-сервер обслуживает лендинг и /docs.', 'Production-сборка собирается в site/dist/.', 'Nginx-контейнер из infra/docker/Dockerfile раздает готовую статику.'],
  },
  {
    title: 'Конфигурация',
    items: ['При необходимости скопируйте site/.env.example в site/.env.local.', 'VITE_REPOSITORY_URL задает ссылку для кнопки View Repository.', 'Для /docs отдельные переменные окружения не требуются.'],
  },
  {
    title: 'Разработка',
    items: ['Установите зависимости в site/.', 'Запустите npm run dev.', 'Откройте /docs напрямую: http://localhost:5173/docs.'],
  },
  {
    title: 'Production',
    items: ['Соберите статику командой npm run build.', 'Проверьте результат через npm run preview.', 'Для контейнера используйте Dockerfile из infra/docker.'],
  },
  {
    title: 'Проверка',
    items: ['Главная страница открывается на корневом URL.', '/docs открывается только по прямому пути.', 'Навигация разделов и копирование code blocks работают без ошибок в консоли.'],
  },
]

export const qualityCommands = `cd site
npm run build

docker build -f infra/docker/Dockerfile -t trade360lab-landing .
docker run --rm -p 4173:80 trade360lab-landing`

export const runtimeCommands = `cd site
npm run preview

# preview: http://localhost:4173
# docs:    http://localhost:4173/docs`

export const statusIcons = {
  idle: CircleDashed,
  active: TerminalSquare,
  success: CheckCircle2,
  danger: ShieldAlert,
} as const

export const repositoryTree = `Project/
|-- frontend/               # Next.js UI + API proxy
|-- backend/
|   |-- java/               # Spring Boot API
|   \`-- python/             # FastAPI parser/import
|-- docs/                   # проектная документация
|-- .github/workflows/      # CI pipeline
\`-- docker-compose.yml      # запуск всего стека`

export const systemFlow = [
  {
    title: 'Frontend',
    detail: 'UI отправляет параметры стратегии, рынка и периода',
  },
  {
    title: 'Java backend',
    detail: 'создает run, валидирует запрос и читает candles',
  },
  {
    title: 'Python engine',
    detail: 'исполняет стратегию и рассчитывает сделки',
  },
  {
    title: 'JSON artifacts',
    detail: 'возвращает summary, trades и equity curve',
  },
]
