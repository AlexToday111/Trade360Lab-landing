# Trade360Lab Landing

Лендинг для `Trade360Lab` на `Vite + React + Tailwind CSS v4`.

Проект теперь запускается прямо из корня репозитория, без дополнительной директории `landing/`.

## Локальный запуск

```bash
npm install
npm run dev
```

По умолчанию Vite поднимает dev-сервер на `http://localhost:5173`.

## Команды

- `npm run dev` - запуск dev-сервера
- `npm run build` - production-сборка в `dist/`
- `npm run preview` - локальный preview production-сборки

## Переменные окружения

Скопируй `.env.example` в `.env.local` и при необходимости переопредели ссылки:

- `VITE_REPOSITORY_URL` - ссылка на GitHub-репозиторий, открываемая кнопкой `View Repository`

## Структура

- `src/app/App.tsx` - основная страница лендинга
- `src/styles/` - шрифты, тема и Tailwind-слои
- `index.html` - HTML-шаблон Vite
- `vite.config.ts` - конфигурация Vite и alias `@ -> src`
- `.github/workflows/deploy-pages.yml` - деплой на GitHub Pages через GitHub Actions
- `Dockerfile` и `nginx.conf` - production-сборка и раздача через Nginx

## Docker

```bash
docker build -t trade360lab-landing .
docker run --rm -p 4173:80 trade360lab-landing
```

## Дополнительно

- `ATTRIBUTIONS.md` содержит лицензии и атрибуции для использованных ресурсов
- Для production нужен только статический вывод из `dist/`

## GitHub Pages

После push в `main` workflow из `.github/workflows/deploy-pages.yml` сам соберет проект и задеплоит его в GitHub Pages.

Что нужно сделать в GitHub:

1. Открыть `Settings -> Pages`
2. В `Source` выбрать `GitHub Actions`
3. В поле `Custom domain` указать `t360lab.tech`
4. После выпуска сертификата включить `Enforce HTTPS`

Что нужно сделать у регистратора домена для `t360lab.tech`:

- добавить `A` записи для `@`:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- добавить `AAAA` записи для `@`:
  - `2606:50c0:8000::153`
  - `2606:50c0:8001::153`
  - `2606:50c0:8002::153`
  - `2606:50c0:8003::153`

Опционально для `www`:

- добавить `CNAME` запись `www -> <your-github-username>.github.io`

После обновления DNS сайт должен открываться по `https://t360lab.tech`.
