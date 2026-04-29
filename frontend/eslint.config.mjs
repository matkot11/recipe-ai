import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import antfu from "@antfu/eslint-config"
import eslintPluginBetterTailwindcss from "eslint-plugin-better-tailwindcss"
import eslintParserVue from "vue-eslint-parser"

const configDirectory = dirname(fileURLToPath(import.meta.url))
const tailwindEntryPoint = resolve(configDirectory, "app/assets/main.css")

export default antfu(
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.nuxt/**",
    ],

    stylistic: {
      quotes: "double",
      semi: false,
    },
    vue: true,
    typescript: true,
    rules: {
      "vue/block-order": "off",
      "vue/define-macros-order": "off",
      "node/prefer-global/process": ["error", "always"],
      "antfu/top-level-function": "off",
      "yaml/quotes": ["error", { avoidEscape: true }],
      "pnpm/json-enforce-catalog": "off",
      "style/member-delimiter-style": ["error", { multiline: { delimiter: "none", requireLast: true } }],
      "vue/html-self-closing": ["warn", { html: { void: "always" } }],
    },
  },
  {
    ...eslintPluginBetterTailwindcss.configs.recommended,
    settings: {
      "better-tailwindcss": {
        cwd: configDirectory,
        entryPoint: tailwindEntryPoint,
      },
    },
    files: ["**/*.vue"],
    languageOptions: {
      parser: eslintParserVue,
    },
    rules: {
      "better-tailwindcss/enforce-consistent-line-wrapping": ["warn", { printWidth: 0, preferSingleLine: true }],
      "better-tailwindcss/enforce-consistent-class-order": "warn",
      "better-tailwindcss/no-unnecessary-whitespace": "warn",
      "better-tailwindcss/no-conflicting-classes": "warn",
      "better-tailwindcss/no-duplicate-classes": "error",
      "better-tailwindcss/no-deprecated-classes": "error",
      "better-tailwindcss/no-unknown-classes": "off",
    },
  },
)
