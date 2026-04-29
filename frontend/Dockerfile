FROM node:22-alpine

ARG INJECT_SCRIPTS
ARG APP_MODE
ARG APP_ENV
ARG NUXT_APP_BASE_URL

ENV INJECT_SCRIPTS=$INJECT_SCRIPTS
ENV APP_MODE=$APP_MODE
ENV APP_ENV=$APP_ENV
ENV NUXT_APP_BASE_URL=$NUXT_APP_BASE_URL

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./

# Install pnpm
RUN COREPACK_INTEGRITY_KEYS=0 corepack prepare
RUN corepack enable

# Install dependencies
RUN pnpm install --shamefully-hoist

# Copy source code
COPY . .

# Prepare all apps
RUN pnpm run prepare-all

EXPOSE 5100 5200

CMD ["sh", "-c", "pnpm run dev:$APP_MODE"]
