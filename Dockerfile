FROM node:16.13 AS development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /home/api

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npm run build

FROM node:16.13 AS builder

WORKDIR /home/api

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:16.13 as production

ARG APP_PORT=80
ARG APP_NAME=br.ipti.edmundo.api
ARG NODE_ENV

ARG DATABASE_URL

ARG GIT_SHA
ARG GIT_BRANCH

WORKDIR /home/api

COPY --from=builder /home/api ./

RUN chown -R www-data:www-data ./archives \
&& chown -R www-data:www-data ./archives/ 

EXPOSE 80

CMD [  "npm", "run", "start:migrate:prod" ]
