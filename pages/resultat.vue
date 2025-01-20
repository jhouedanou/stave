<template>
  <v-container class="text-center">
    <v-card class="mx-auto mt-5" max-width="600">
      <v-card-title class="text-h4 pink lighten-4">
        Résultats du Quiz
      </v-card-title>

      <v-card-text class="pt-6">
        <h2 class="text-h5 mb-4">
          Votre score: {{ score }}/13 points
        </h2>

        <v-alert
          :type="score >= minScoreEligible ? 'success' : 'info'"
          class="mt-4"
        >
          <template v-if="score >= minScoreEligible">
            <p class="text-h6">🎉 Félicitations !</p>
            <p>Vous êtes éligible au tirage au sort pour gagner un des magnifiques lots !</p>
          </template>
          <template v-else>
            <p>Il fallait obtenir au minimum {{ minScoreEligible }} points pour être éligible au tirage au sort.</p>
            <p>N'hésitez pas à réessayer !</p>
          </template>
        </v-alert>

        <v-card-actions class="justify-center mt-4">
          <v-btn
            color="pink darken-1"
            dark
            @click="retourAccueil"
          >
            Retour à l'accueil
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'ResultatPage',
  data() {
    return {
      minScoreEligible: process.env.VUE_APP_MIN_SCORE_ELIGIBLE || 10
    }
  },
  computed: {
    score() {
      return parseInt(this.$route.query.score) || 0
    }
  },
  methods: {
    retourAccueil() {
      this.$router.push('/')
    }
  }
}
</script>
