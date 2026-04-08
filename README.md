<p align="center">
  <img src="./site/public/YellowLogo.png" alt="TradeLab Logo" width='600'/>
</p>

<h1 align="center">Landing page</h1>

Лендинг для `Trade360Lab` на `Vite + React + Tailwind CSS v4`.

Основное приложение теперь лежит в `site/`, а инфраструктурные файлы вынесены в `infra/`, чтобы корень репозитория оставался компактным.

<h2 align="center">Локальный запуск</h2>

```bash
cd site
npm install
npm run dev
```

По умолчанию Vite поднимает dev-сервер на `http://localhost:5173`.

<h2 align="center">Команды</h2>

- `cd site && npm run dev` - запуск dev-сервера
- `cd site && npm run build` - production-сборка в `site/dist/`
- `cd site && npm run preview` - локальный preview production-сборки

<h2 align="center">Переменные окружения</h2>

Скопируй `site/.env.example` в `site/.env.local` и при необходимости переопредели ссылки:

- `VITE_REPOSITORY_URL` - ссылка на GitHub-репозиторий, открываемая кнопкой `View Repository`

<h2 align="center">Структура</h2>

- `site/src/app/App.tsx` - основная страница лендинга
- `site/src/styles/` - шрифты, тема и Tailwind-слои
- `site/index.html` - HTML-шаблон Vite
- `site/vite.config.ts` - конфигурация Vite и alias `@ -> src`
- `site/public/` - favicon, CNAME и публичные ассеты
- `.github/workflows/deploy-pages.yml` - деплой на GitHub Pages через GitHub Actions
- `infra/docker/Dockerfile` - production-сборка контейнера
- `infra/nginx/default.conf` - Nginx-конфиг для раздачи статики

<h2 align="center">Docker</h2>

```bash
docker build -f infra/docker/Dockerfile -t trade360lab-landing .
docker run --rm -p 4173:80 trade360lab-landing
```

<h2 align="center">Основной репозиторий</h2>

https://github.com/AlexToday111/Trade360Lab.git
