export default defineNuxtConfig({
  modules: ["@nuxtjs/supabase", "@invictus.codes/nuxt-vuetify", "@nuxt/image"],

  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Great+Vibes&family=Parisienne&family=Quicksand:wght@300;400;500;600&display=swap",
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
