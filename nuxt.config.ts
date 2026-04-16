import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  typescript: { strict: true },
  css: ['~/assets/css/tailwind.css']
})
