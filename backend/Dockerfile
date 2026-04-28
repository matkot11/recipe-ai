ARG PYTHON_VERSION=3.11

# Base stage
FROM ghcr.io/astral-sh/uv:python${PYTHON_VERSION}-bookworm-slim AS base

# https://github.com/GoogleContainerTools/kaniko/issues/3246
RUN mkdir /app
WORKDIR /app


ENV UV_PYTHON_DOWNLOADS=0 \
    UV_LINK_MODE=copy \
    UV_COMPILE_BYTECODE=1 \

# Builder stage
FROM base AS builder

COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-install-project --no-cache --no-dev

COPY scripts/download_livekit_files.py scripts/download_livekit_files.py
RUN uv run --frozen --no-cache --no-dev python -m scripts.download_livekit_files

COPY . .
RUN uv sync --frozen --no-cache --no-dev


# Development/CI stage
FROM base AS development

ENV PATH="/app/.venv/bin:$PATH" \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONFAULTHANDLER=1

COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-install-project --no-cache

COPY . .
RUN uv sync --frozen --no-cache

ENTRYPOINT ["pytest"]


# Production stage
FROM python:${PYTHON_VERSION}-slim-bookworm AS production

ENV PATH="/app/.venv/bin:$PATH" \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONFAULTHANDLER=1 \
    HF_HOME=/app/.cache/huggingface

# https://github.com/GoogleContainerTools/kaniko/issues/3246
RUN mkdir /app
WORKDIR /app

RUN groupadd -g 10001 appgroup && \
    useradd -m -u 10001 -g appgroup appuser && \
    chown -R appuser:appgroup .

COPY --from=builder --chown=appuser:appgroup /app .

USER appuser

EXPOSE 8000

ENTRYPOINT ["python", "-m", "main"]
