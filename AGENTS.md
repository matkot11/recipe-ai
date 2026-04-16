AGENTS

Purpose
- This document tells automated agents and humans how to operate in this repository. It collects the commands to build, lint and test the project, plus code-style and contribution expectations. Agents must read this before making changes.

Repository summary
- Framework: Nuxt (server + client fullstack)
- Language: TypeScript (strict mode expected)
- Styling: Tailwind CSS
- Tooling: ESLint, Prettier. Tests are not included by default; prefer Vitest for new tests.

Quick commands
- Install dependencies (run locally):
  ```
  npm install
  ```
- Start dev server:
  ```
  npm run dev
  ```
- Build for production:
  ```
  npm run build
  ```
- Start production server (after build):
  ```
  npm run start
  ```
- Lint project:
  ```
  npm run lint
  ```
- Format project with Prettier:
  ```
  npm run format
  ```

Testing (examples and single-test guidance)
- This scaffold does not include a test framework by default. When adding tests prefer Vitest for its fast, Vite-compatible dev experience.
- Recommended install for tests (example):
  ```
  npm install -D vitest @vue/test-utils jsdom
  ```
- Run all tests with Vitest:
  ```
  npx vitest
  ```
- Run a single test file with Vitest:
  ```
  npx vitest run path/to/test.spec.ts
  ```
- Run tests that match a name pattern (single test or subset):
  ```
  npx vitest -t "should render recipe list"
  ```
- If you use Jest, run a single test file or a pattern with:
  ```
  npx jest path/to/file.test.ts
  npx jest -t "test name pattern"
  ```

Code style overview
- Formatting: Prettier is source-of-truth for formatting. Use `npm run format` before committing. Editor integrations should run Prettier on save.
- Linting: ESLint with Vue and TypeScript rules. Fix lint issues before committing.
- TypeScript: Use strict mode. Prefer explicit types for exported APIs and public function signatures. Use type inference for short local variables.

Imports
- Group imports in this order separated by a single blank line: Node built-ins, external packages, alias imports (Nuxt aliases like `~`/`@`/`#`), local relative imports.
- Prefer absolute project aliases for app code: `~/components/MyComp.vue` or `#imports` where applicable.
- Use named imports for utilities. For single default exported Vue components, use the default export in .vue files.

File and naming conventions
- Files and directories: kebab-case (e.g., `recipe-list.vue`, `use-recipe.ts`).
- Vue component filenames: PascalCase is allowed and common for components (e.g., `RecipeCard.vue`) but keep either consistent across the project. Component name inside the file should match PascalCase.
- Composables: `useXxx` naming for functions and use kebab-case filenames (e.g., `use-recipe.ts`).
- Stores: `useXxxStore` or `useXxx` depending on the store solution; file names kebab-case.
- Types/interfaces: PascalCase (e.g., `RecipeItem`, `UserDTO`).

Types and typing rules
- Prefer `interface` for object shapes and `type` for union/utility types.
- Avoid `any`. If a temporary `any` is required, add a `// TODO` with a short explanation and an issue reference.
- Use `unknown` instead of `any` when receiving external input and narrow before usage.
- Export types from a central `types/` or `interfaces/` module when shared across multiple modules.

Vue / Nuxt specifics
- Use `<script setup lang="ts">` for single-file components where possible.
- Keep templates simple and extract complex logic into composables or utilities.
- Use Nuxt composables and runtime APIs (`useFetch`, `useAsyncData`, `useRuntimeConfig`) for data fetching and config.
- Server API routes belong in `server/api/` and must validate inputs and return consistent structured errors.

Error handling and API responses
- Server endpoints should return structured errors with status code and message. Example shape:
  ```json
  { "statusCode": 404, "message": "Recipe not found", "details": { ... } }
  ```
- Use `createError()` / `useError` or throw an error with `statusCode` in server routes so Nuxt/Nitro can handle it properly.
- Do not swallow errors silently. Either handle the error or rethrow with added context.

Logging and secrets
- Use console.log for local debugging only. For production use a pluggable logger.
- Never commit secrets. Add `.env` to `.gitignore` and keep `.env.example` with placeholder names only.

Commit and PR expectations
- Keep commits small and focused. Commit messages should be imperative and explain the why in 1-2 lines.
- Open a PR for non-trivial changes and include a summary, testing steps, and any migration notes.

Pre-commit and CI
- Recommended: use Husky + lint-staged to run `prettier --write` and `eslint --fix` on staged files.

Add Husky + lint-staged (what we added)
- This repo includes a Husky pre-commit hook (`.husky/pre-commit`) that runs `lint-staged`.
- Configuration is in `.lintstagedrc.json` and will run `eslint --fix` and `prettier --write` on staged files.
- CI should run install, lint, and tests. A sample GitHub Actions workflow exists in `.github/workflows/ci.yml`.

Cursor / Copilot rules
- Cursor rules: none detected in this repository. If `.cursor/rules/` or `.cursorrules` are added, agents MUST read them and follow their constraints before making edits.
- GitHub Copilot instructions: none detected. If `.github/copilot-instructions.md` is added, agents MUST follow it.

Agent behaviour requirements
- Always run local linters/formatters before committing. Keep edits minimal and well-scoped.
- When unsure about design or breaking changes, open an issue or ask a human reviewer instead of guessing.
- If adding or changing dependencies, update `package.json` with exact reasons and pin versions where reproducibility is important.

Where to look
- Project config: `package.json`, `nuxt.config.ts`, `tsconfig.json`, `.eslintrc.cjs`, `.prettierrc`, `tailwind.config.cjs`.
- Server routes: `server/api/`.
- Pages and components: `pages/`, `components/`, `composables/`.

If You Add Tests
- Add a `test` script to `package.json` and document how to run single tests. Prefer Vitest. Example `package.json` entries:
  ```json
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch"
  }
  ```

Revision history
- This file is authoritative for agent behaviour. Keep it up to date when project conventions evolve.
