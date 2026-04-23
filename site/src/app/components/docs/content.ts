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

export type OverviewCard = {
  id: string
  title: string
  description: string
  source: string
  icon: LucideIcon
}

export type ArchitectureLayer = {
  title: string
  sourceName: string
  description: string
  responsibilities: string[]
  icon: LucideIcon
}

export type Endpoint = {
  method: 'GET' | 'POST'
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

export type ChecklistGroup = {
  title: string
  items: string[]
}

export const sourceFiles = [
  'README.md',
  'docs/api.md',
  'docs/architecture.md',
  'docs/backtest-flow.md',
  'docs/data-model.md',
  'docs/release-checklist.md',
]

export const overviewCards: OverviewCard[] = [
  {
    id: 'architecture',
    title: 'Architecture',
    description: 'Four core layers: frontend, Spring Boot API, Python engine, and PostgreSQL.',
    source: 'docs/architecture.md',
    icon: Layers3,
  },
  {
    id: 'api',
    title: 'API',
    description: 'Backtest endpoints with request, status, trades, equity, and error examples.',
    source: 'docs/api.md',
    icon: Code2,
  },
  {
    id: 'lifecycle',
    title: 'Backtest lifecycle',
    description: 'Run states and execution flow from validation to persisted results.',
    source: 'docs/backtest-flow.md',
    icon: GitBranch,
  },
  {
    id: 'data-model',
    title: 'Data model',
    description: 'Runs, trades, equity points, and candle storage used by the backtest flow.',
    source: 'docs/data-model.md',
    icon: Database,
  },
  {
    id: 'release',
    title: 'Release checklist',
    description: 'Operational checklist for alpha scope, quality gates, runtime checks, and release completion.',
    source: 'docs/release-checklist.md',
    icon: Rocket,
  },
]

export const navigationLinks = [
  { label: 'Overview', href: '#overview' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'API', href: '#api' },
  { label: 'Lifecycle', href: '#lifecycle' },
  { label: 'Data model', href: '#data-model' },
  { label: 'Release', href: '#release' },
]

export const architectureLayers: ArchitectureLayer[] = [
  {
    title: 'Frontend',
    sourceName: 'frontend',
    description:
      'The user interface creates backtest requests and displays statuses, summaries, trades, and equity curves.',
    responsibilities: ['Workspace and data screens', 'Backtests and run cards', 'Results comparison', 'API integration'],
    icon: Globe2,
  },
  {
    title: 'Java API',
    sourceName: 'backend/java',
    description:
      'The Spring Boot backend accepts REST requests, manages the run lifecycle, reads candles, and persists results.',
    responsibilities: ['Controllers and DTOs', 'BacktestService orchestration', 'Repository persistence', 'Run control'],
    icon: ServerCog,
  },
  {
    title: 'Python Engine',
    sourceName: 'backend/python',
    description:
      'The Python backtesting engine executes strategy calculations on CSV data and returns JSON results.',
    responsibilities: ['Parser/import service', 'Strategy runner', 'Backtesting', 'Indicators and adapters'],
    icon: TerminalSquare,
  },
  {
    title: 'PostgreSQL',
    sourceName: 'PostgreSQL',
    description:
      'The database stores strategies, candles, runs, trades, and equity curve points.',
    responsibilities: ['candles', 'runs', 'backtest_trades', 'backtest_equity_points'],
    icon: Database,
  },
]

export const dataFlowSteps: FlowStep[] = [
  {
    title: 'Client submits a run',
    description: 'The client calls POST /backtests with strategy, market, interval, date range, params, and execution settings.',
  },
  {
    title: 'Java creates PENDING run',
    description: 'The backend creates a row in runs with status PENDING, then BacktestService moves execution to RUNNING.',
  },
  {
    title: 'Candles become CSV input',
    description: 'OHLCV candles are read from the candles table for exchange, symbol, interval, from, and to.',
  },
  {
    title: 'Python executes strategy',
    description: 'PythonBacktestExecutor passes JSON through stdin and reads stdout/stderr from the Python process.',
  },
  {
    title: 'Artifacts are persisted',
    description: 'Summary goes to runs.metrics_json, trades to backtest_trades, and equity to backtest_equity_points.',
  },
  {
    title: 'Run is finalized',
    description: 'Successful runs become COMPLETED. Failed preparation, execution, or persistence attempts become FAILED.',
  },
]

export const quickStartSnippet = `docker compose up --build

# services
# frontend       http://localhost:3000
# java api       http://localhost:18080
# python parser  http://localhost:18000
# postgresql     localhost:55432`

export const localDevSnippet = `cd frontend
npm install
npm run dev

cd backend/python
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn parser.main:app --host 0.0.0.0 --port 8000

cd backend/java
mvn spring-boot:run`

export const backtestStatuses: BacktestStatus[] = [
  {
    status: 'PENDING',
    tone: 'idle',
    description: 'The run has been created, but execution has not started yet.',
  },
  {
    status: 'RUNNING',
    tone: 'active',
    description: 'The Java backend has prepared data and is executing the Python backtest.',
  },
  {
    status: 'COMPLETED',
    tone: 'success',
    description: 'Python finished successfully, and summary plus artifacts were stored in the database.',
  },
  {
    status: 'FAILED',
    tone: 'danger',
    description: 'An error happened during data preparation, Python execution, or result persistence.',
  },
]

export const endpoints: Endpoint[] = [
  {
    method: 'POST',
    path: '/backtests',
    description: 'Creates a run and executes the backtest synchronously.',
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
    description: 'Returns run state, request fields, summary, error text, and timestamps.',
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
    description: 'Returns trades for a specific run.',
    source: 'docs/api.md',
    response: `[
  {
    "entry_time": "2024-01-01T00:00:00Z",
    "exit_time": "2024-01-01T01:00:00Z",
    "entry_price": 100.0,
    "exit_price": 109.5,
    "qty": 1.0,
    "pnl": 9.5,
    "fee": 0.2
  }
]`,
  },
  {
    method: 'GET',
    path: '/backtests/{id}/equity',
    description: 'Returns the equity curve for a specific run.',
    source: 'docs/api.md',
    response: `[
  {
    "timestamp": "2024-01-01T01:00:00Z",
    "equity": 10009.5
  }
]`,
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
    description: 'Main table for backtest runs and their lifecycle.',
    fields: [
      'id',
      'strategy_id',
      'status',
      'exchange',
      'symbol',
      'interval',
      'date_from',
      'date_to',
      'params_json',
      'metrics_json',
      'error_message',
      'created_at',
      'started_at',
      'finished_at',
    ],
    notes: ['Stores run identity and lifecycle.', 'Stores serialized request in params_json.', 'Stores summary result in metrics_json.', 'Stores failure text in error_message.'],
  },
  {
    name: 'backtest_trades',
    description: 'Trades produced by a specific run.',
    fields: ['id', 'run_id', 'entry_time', 'exit_time', 'entry_price', 'exit_price', 'quantity', 'pnl', 'fee'],
    notes: ['run_id references runs.id.'],
  },
  {
    name: 'backtest_equity_points',
    description: 'Equity curve points for a specific run.',
    fields: ['id', 'run_id', 'timestamp', 'equity'],
    notes: ['run_id references runs.id.'],
  },
  {
    name: 'candles',
    description: 'OHLCV source data used during backtest execution.',
    fields: ['exchange', 'symbol', 'interval', 'open_time', 'close_time', 'open', 'high', 'low', 'close', 'volume'],
    notes: ['Backtest execution reads source OHLCV data from this table.'],
  },
]

export const releaseChecklist: ChecklistGroup[] = [
  {
    title: 'Scope',
    items: ['Release tag/version chosen, for example 0.1.0-alpha.1.', 'Changelog updated for this release.', 'Release notes drafted.'],
  },
  {
    title: 'Code quality',
    items: [
      'Frontend lint, typecheck, test:ci, and build pass.',
      'Python ruff check and pytest pass.',
      'Java mvn -B test passes.',
    ],
  },
  {
    title: 'Runtime validation',
    items: [
      'docker compose config -q passes.',
      'docker compose up --build starts all services.',
      'Frontend, Java health, and Python health endpoints respond.',
    ],
  },
  {
    title: 'Config and security',
    items: ['Non-dev credentials are configured for target environment.', 'Telegram vars are set only if enabled.', '.env files are not committed.'],
  },
  {
    title: 'Release completion',
    items: ['Release commit pushed to main.', 'Release tag created.', 'Rollback plan documented.'],
  },
]

export const qualityCommands = `npm --prefix frontend run lint
npm --prefix frontend run typecheck
npm --prefix frontend run test:ci
npm --prefix frontend run build

cd backend/python && .venv/bin/python -m ruff check .
cd backend/python && .venv/bin/python -m pytest

cd backend/java && mvn -B test`

export const runtimeCommands = `docker compose config -q
docker compose up --build

curl http://localhost:18080/api/health
curl http://localhost:18000/health`

export const statusIcons = {
  idle: CircleDashed,
  active: TerminalSquare,
  success: CheckCircle2,
  danger: ShieldAlert,
} as const

export const repositoryTree = `Trade360Lab/
|-- frontend/               # Next.js UI and API proxy
|-- backend/
|   |-- java/               # Spring Boot API
|   \`-- python/             # FastAPI parser/import service
|-- docs/                   # Project documentation
|-- .github/workflows/      # CI pipeline
\`-- docker-compose.yml      # Full-stack orchestration`

export const systemLayers = [
  'Frontend API integration calls Java backend.',
  'Java persists runs and reads candles from PostgreSQL.',
  'Java invokes PythonBacktestExecutor through ProcessBuilder.',
  'Python returns summary, trades, and equity_curve as JSON.',
]
