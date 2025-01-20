<template>
  <v-container class="text-center">
    <v-card class="mx-auto mt-5" max-width="800">
      <v-img
        src="/images/valentine-banner.jpg"
        height="200"
        class="align-center"
      >
        <v-card-title class="text-h3 white--text">
          Quiz de l'amour : Gagnez un moment inoubliable !
        </v-card-title>
      </v-img>
      
      <v-card-text class="text-h5 pt-4">
        🎁 Participez à notre quiz spécial Saint-Valentin et gagnez un dîner romantique 
        ou une nuitée de rêve ! Répondez vite, l'amour n'attend pas ! ❤️
      </v-card-text>

      <v-card-text>
        <p class="text-body-1">
          Vous avez jusqu'au {{ formatDeadline }} pour participer.
        </p>
        <p class="text-body-1">
          Parmi les personnes ayant trouvé toutes les bonnes réponses, 
          5 personnes seront tirées au sort pour gagner :
        </p>
        <ul class="text-left">
          <li>3 dîners romantiques pour deux personnes</li>
          <li>2 nuitées en hôtel avec petit-déjeuner inclus</li>
        </ul>
      </v-card-text>

      <v-card-actions class="justify-center pb-6">
        <v-btn
          color="pink darken-1"
          x-large
          dark
          rounded
          @click="startQuiz"
        >
          Commencer le Quiz
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      deadline: process.env.VUE_APP_DEADLINE
    }
  },
  computed: {
    formatDeadline() {
      return new Date(this.deadline).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  },
  methods: {
    startQuiz() {
      this.$router.push('/quiz')
    }
  }
}
</script>
