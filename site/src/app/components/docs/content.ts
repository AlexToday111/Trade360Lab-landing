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
  details: string[]
  icon: LucideIcon
  skillIcon: string
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
  details: { label: string; value: string }[]
}

export type LaunchGroup = {
  title: string
  items: string[]
}

export type LaunchPort = {
  service: string
  url: string
  env: string
}

export type LaunchLocalService = {
  title: string
  path: string
  command: string
  detail: string
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
    title: 'Next.js',
    sourceName: 'frontend',
    description: 'Next.js слой интерфейса: собирает рабочее пространство, экран данных, карточки запусков и сравнение результатов.',
    responsibilities: ['Workspace', 'Data', 'Backtests', 'Compare'],
    details: ['Next.js UI + API proxy', 'Strategy upload', 'Charts & visualization'],
    icon: Globe2,
    skillIcon: 'nextjs',
  },
  {
    title: 'Backend',
    sourceName: 'backend',
    description: 'Spring Boot API принимает REST-запросы, управляет lifecycle запусков, читает свечи и сохраняет артефакты.',
    responsibilities: ['Controllers', 'DTO', 'BacktestService', 'Repositories'],
    details: ['Dataset API', 'Strategy management', 'Run control'],
    icon: ServerCog,
    skillIcon: 'spring',
  },
  {
    title: 'Backend',
    sourceName: 'backend',
    description: 'Python parser/backtesting service готовит данные, запускает стратегии, считает индикаторы и возвращает JSON.',
    responsibilities: ['Parser', 'Strategy Runner', 'Backtesting', 'Indicators'],
    details: ['Exchange adapters', 'CSV processing', 'Metrics, trades, equity'],
    icon: TerminalSquare,
    skillIcon: 'python',
  },
  {
    title: 'DataBase',
    sourceName: 'database',
    description: 'База хранит стратегии, свечи, запуски, сделки и точки кривой капитала.',
    responsibilities: ['candles', 'runs', 'backtest_trades', 'backtest_equity_points'],
    details: ['OHLCV storage', 'Run artifacts', 'Relational links by run_id'],
    icon: Database,
    skillIcon: 'postgresql',
  },
]

export const dataFlowSteps: FlowStep[] = [
  {
    title: 'POST /backtests',
    description: 'Клиент передает стратегию, рынок, interval, период, параметры и настройки исполнения.',
  },
  {
    title: 'Validate request',
    description: 'Backend проверяет стратегию, временной диапазон, параметры капитала, комиссии и доступность данных.',
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
    title: 'Strategy execution',
    description: 'Python engine применяет стратегию к подготовленным свечам, считает сделки, PnL, комиссии и equity.',
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

export const quickStartSnippet = `git clone https://github.com/Trade360Lab/Trade360Lab.git
cd Trade360Lab
docker compose up --build`

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
    details: [
      { label: 'Роль', value: 'центр агрегации: к нему привязаны сделки, equity curve, параметры и итоговые метрики' },
      { label: 'Статусы', value: 'PENDING, RUNNING, COMPLETED, FAILED' },
      { label: 'JSON', value: 'params_json хранит входные параметры, metrics_json хранит итоговый summary' },
    ],
  },
  {
    name: 'backtest_trades',
    description: 'Сделки конкретного запуска.',
    fields: ['id', 'run_id', 'entry_time', 'exit_time', 'entry_price', 'exit_price', 'quantity', 'pnl', 'fee'],
    notes: ['run_id -> runs.id.'],
    details: [
      { label: 'Назначение', value: 'детализация входа и выхода из позиции для последующего анализа результата' },
      { label: 'Расчет', value: 'pnl и fee приходят из Python engine и сохраняются как артефакт запуска' },
      { label: 'Связь', value: 'каждая сделка принадлежит одному run и очищается вместе с ним на уровне сервиса' },
    ],
  },
  {
    name: 'backtest_equity_points',
    description: 'Точки кривой капитала.',
    fields: ['id', 'run_id', 'timestamp', 'equity'],
    notes: ['run_id -> runs.id.'],
    details: [
      { label: 'Назначение', value: 'построение equity curve и сравнение динамики капитала между запусками' },
      { label: 'Гранулярность', value: 'timestamp соответствует времени точки, рассчитанной движком бэктеста' },
      { label: 'Потребитель', value: 'frontend использует массив точек для графиков и визуального сравнения' },
    ],
  },
  {
    name: 'candles',
    description: 'OHLCV-данные, из которых выполняется бэктест.',
    fields: ['exchange', 'symbol', 'interval', 'open_time', 'close_time', 'open', 'high', 'low', 'close', 'volume'],
    notes: ['BacktestService читает исходные свечи из этой таблицы.'],
    details: [
      { label: 'Источник', value: 'рыночные OHLCV-данные по exchange, symbol и interval' },
      { label: 'Фильтр', value: 'Java API выбирает диапазон open_time между from и to перед передачей в Python' },
      { label: 'Строгость', value: 'strictData позволяет остановить запуск при недостаточных или некорректных данных' },
    ],
  },
]

export const launchGuide: LaunchGroup[] = [
  {
    title: 'Вариант A',
    items: ['Весь стек в Docker', 'Рекомендуемый быстрый старт из README', 'Одна команда поднимает frontend, Java API, Python service и PostgreSQL'],
  },
  {
    title: 'Вариант B',
    items: ['Локальная разработка по сервисам', 'Frontend запускается отдельно', 'Python parser и Java API стартуют из своих каталогов'],
  },
]

export const launchPorts: LaunchPort[] = [
  { service: 'Frontend', url: 'http://localhost:3000', env: 'FRONTEND_HOST_PORT' },
  { service: 'Java API', url: 'http://localhost:18080', env: 'JAVA_API_HOST_PORT' },
  { service: 'Python parser', url: 'http://localhost:18000', env: 'PYTHON_PARSER_HOST_PORT' },
  { service: 'PostgreSQL', url: 'localhost:55432', env: 'POSTGRES_HOST_PORT' },
]

export const launchLocalServices: LaunchLocalService[] = [
  {
    title: 'Frontend',
    path: 'frontend',
    command: 'npm install && npm run dev',
    detail: 'Next.js интерфейс, workspace, data screen, backtests, cards и compare.',
  },
  {
    title: 'Python parser',
    path: 'backend/python',
    command: 'uvicorn parser.main:app --host 0.0.0.0 --port 8000',
    detail: 'Parser/import и backtesting service после установки requirements.txt в virtualenv.',
  },
  {
    title: 'Java API',
    path: 'backend/java',
    command: 'mvn spring-boot:run',
    detail: 'Spring Boot слой REST API, lifecycle запусков и интеграция с PostgreSQL/Python.',
  },
]

export const qualityCommands = `docker compose up --build

# services:
# frontend:      http://localhost:3000
# java api:      http://localhost:18080
# python parser: http://localhost:18000
# postgresql:    localhost:55432`

export const runtimeCommands = `cd frontend
npm install
npm run dev

cd ../backend/python
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn parser.main:app --host 0.0.0.0 --port 8000

cd ../java
mvn spring-boot:run`

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
