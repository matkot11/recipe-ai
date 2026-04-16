AGENTS

Purpose
- This file documents how agentic coding agents (and humans) should operate in this repository. It describes build, lint, and test commands, coding style, import conventions, naming, error handling, and repository-specific rules.

Build / Lint / Test
- Install dependencies: `npm install` (or `pnpm install` / `yarn` if you prefer)
- Dev server: `npm run dev` -> starts Nuxt in development mode
- Build for production: `npm run build`
- Start production server: `npm run start`
- Lint: `npm run lint` (runs ESLint across .ts, .js, .vue files)
- Format: `npm run format` (runs Prettier)
- Running a single test: This starter does not include a test framework. When tests are added, prefer Vitest or Jest. Example commands to run a single test (configure per chosen runner):
  - Vitest: `npx vitest -t "test name pattern"` or `pnpm vitest -t "test name pattern"`
  - Jest: `npx jest -t "test name pattern"`

Project structure expectations
- pages/ - Nuxt pages (server-rendered routes)
- components/ - Vue components
- composables/ - composable utilities and hooks (useXxx)
- server/ - server/api/ server middleware, nitro server routes
- assets/ - styles, images
- public/ - static files

Code Style Guidelines
- Language: TypeScript with strict mode enabled. Prefer explicit types for public APIs and function signatures. Use type inference for local variables when obvious.
- Formatting: Prettier is the source of truth for formatting. Run `npm run format` and enable editor integration.
- ESLint: follow rules from `plugin:vue/vue3-recommended` and `@typescript-eslint/recommended`. Do not disable rules globally; prefer per-line exceptions with comments and a brief justification.

Imports
- Use absolute imports (Nuxt aliases) for project code: `~/components/MyComp.vue` or `#app`/`#imports` where appropriate.
- Keep import groups separated by a single blank line: built-ins, external packages, absolute project imports, relative imports.
- Prefer named imports over default exports for utility modules. For components, use default exports (Vue single-file components).

Types
- Use `interface` for public object shapes and `type` for unions and utility types.
- Prefer readonly where appropriate: `readonly foo: string`.
- Avoid `any`. If necessary, use `unknown` and narrow before use. Add a TODO comment when using `any` to highlight required follow-up.

Naming conventions
- Files and directories: kebab-case (e.g., `user-card.vue`, `recipe-list.ts`)
- Vue components: PascalCase file names and component names (e.g., `UserCard.vue` exports `defineComponent({ name: 'UserCard' })`)
- Composables: `useXxx` camelCase (e.g., `useRecipe.ts`)
- Stores: `useStoreName` or `useXxxStore`
- Types: PascalCase (e.g., `RecipeItem`, `UserDTO`)

Error handling
- Prefer explicit error types and handling. Return structured errors from server endpoints: `{ statusCode: number, message: string, details?: any }`.
- For async functions, avoid swallowing errors. Either handle or rethrow with context: `throw new Error('fetchRecipes failed: ' + err.message)`.
- On server/API routes use Nuxt's `createError()` / `useError` or throw with proper status codes.

Logging
- Use console logging for local debugging only. Wrap production logging behind a logger instance so it can be swapped later. Do not commit secrets or tokens to logs.

Security
- Never commit secrets to the repository. Use environment variables via `.env` and `.env.example` files. `.env` is gitignored.

Linting and Pre-commit
- Husky is included for git hooks. Add pre-commit hooks to run lint and format for staged files (e.g., `lint-staged`).

Cursor / Copilot Rules
- Cursor rules: none found in this repository. If added, list them under `.cursor/rules/` and ensure agents read them before making code changes.
- GitHub Copilot instructions: none found. If `.github/copilot-instructions.md` is added, agents must follow it.

Agent Behavior
- Before making changes, read this AGENTS.md and repository files. Keep changes minimal and well-scoped.
- Run linters and formatters locally before committing. Respect existing code style.
- When creating commits include a concise message describing the why (1-2 sentences).

Notes
- This repository was initialized with a minimal Nuxt starter. Some tooling versions in package.json are placeholders; run `npm install` locally to resolve working versions. Update this file as the project evolves.
