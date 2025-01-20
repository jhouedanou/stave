import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      themes: {
        light: {
          colors: {
            primary: '#E91E63',
            secondary: '#FF4081',
          }
        }
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)

})