export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    "@invictus.codes/nuxt-vuetify",
    "@nuxt/image",
    "@vite-pwa/nuxt",
  ],
  pwa: {
    manifest: {
      name: 'Quiz Saint-Valentin 2024',
      short_name: 'Quiz St-Valentin',
      description: 'Découvrez si la margarine St Avé fait fondre vos coeurs!',
      theme_color: '#FF0000',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      icons: [
        {
          src: '/images/logo.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/images/logo.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Shadows+Into+Light&family=Open+Sans:wght@400;600;800&display=swap",
        },
      ],
    },
  },

  vuetify: {
    moduleOptions: {
      treeshaking: true,
      useIconCDN: true,
      styles: true,
      autoImport: true,
    },
    vuetifyOptions: {
      theme: {
        defaultTheme: "valentineTheme",
        themes: {
          valentineTheme: {
            dark: false,
            colors: {
              primary: "#FF0000ff",
              secondary: "#E54E38ff",
              background: "#F3EA63ff",
              error: "#FF5252",
              info: "#B39DDB",
              success: "#FF4081",
              warning: "#FFB6C1",
            },
          },
        },
      },
    },
  },

  supabase: {
    redirect: false,
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },

  runtimeConfig: {
    public: {
      appTitle: process.env.VUE_APP_TITLE,
      deadline: process.env.VUE_APP_DEADLINE,
      minScoreEligible: process.env.VUE_APP_MIN_SCORE_ELIGIBLE,
    },
  },

  css: ["~/assets/css/main.scss"],
  compatibilityDate: "2025-01-21",
});
