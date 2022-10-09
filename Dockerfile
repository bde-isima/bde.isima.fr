FROM node:16-alpine AS base

ARG DATABASE_URL

ENV PATH /usr/src/app/node_modules/.bin:$PATH

USER node
WORKDIR /usr/src/app
COPY --chown=node:node package.json yarn.* /usr/src/app/

RUN chown -R node:node /usr/src/app \
  && yarn --ignore-scripts --prefer-offline --frozen-lockfile --production \
  && yarn cache clean --force

###################################################

FROM base AS build

ENV NODE_ENV=production
ENV DATABASE_URL=$DATABASE_URL

COPY --chown=node:node . /usr/src/app/
COPY --chown=node:node --from=base /usr/src/app/node_modules /usr/src/app/node_modules

RUN yarn --prefer-offline --production=false \
  && blitz codegen \
  && yarn build \
  && yarn cache clean --force

###################################################

FROM node:16-alpine AS prod

ARG DATABASE_URL

ENV DATABASE_URL=$DATABASE_URL
ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN apk add --no-cache dumb-init

USER node
EXPOSE 3000
WORKDIR /usr/src/app

COPY --chown=node:node --from=base /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node --from=build /usr/src/app/db /usr/src/app/db
COPY --chown=node:node --from=build /usr/src/app/.env /usr/src/app/.env
COPY --chown=node:node --from=build /usr/src/app/.next /usr/src/app/.next
COPY --chown=node:node --from=build /usr/src/app/public /usr/src/app/public
COPY --chown=node:node --from=build /usr/src/app/package.json /usr/src/app/package.json
COPY --chown=node:node --from=build /usr/src/app/.blitz.config.compiled.js /usr/src/app/.blitz.config.compiled.js

CMD blitz prisma db push \
  && dumb-init yarn start
