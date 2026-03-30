FROM node:22-alpine AS build

WORKDIR /app/site

COPY site/package*.json ./
RUN npm ci

COPY site/ ./
RUN npm run build

FROM nginx:1.27-alpine

COPY infra/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/site/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
