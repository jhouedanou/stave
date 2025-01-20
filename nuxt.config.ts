export default defineNuxtConfig({
  head: {
    title: process.env.VUE_APP_TITLE || "Quiz Saint-Valentin",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  },

  modules: ["@nuxtjs/supabase"],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
    },
  },
  runtimeConfig: {
    public: {
      supabase: {
        url: process.env.NUXT_PUBLIC_SUPABASE_URL,
        key: process.env.NUXT_PUBLIC_SUPABASE_KEY
      }
    }
  },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
    "@/assets/styles/main.css",
  ],

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },

  compatibilityDate: "2025-01-20",
});
