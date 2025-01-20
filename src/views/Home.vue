
<template>
  <v-container class="text-center">
    <v-card class="mx-auto pa-6" max-width="800">
      <h1 class="text-h3 mb-6">Quiz de l'amour : Gagnez un moment inoubliable !</h1>
      
      <v-card-text class="text-h5">
        <p>🎁 Participez à notre quiz spécial Saint-Valentin et gagnez un dîner romantique ou une nuitée de rêve ! Répondez vite, l'amour n'attend pas ! ❤️</p>
        <p>Vous avez jusqu'au 11 février 2025 à 23h59.</p>
        <p>Parmi les personnes ayant trouvé toutes les bonnes réponses, 5 personnes seront tirées au sort pour gagner 3 dîners romantiques pour deux personnes dans un restaurant et 2 nuitées dans un hôtel avec petit-déjeuner inclus.</p>
      </v-card-text>

      <v-btn
        color="primary"
        size="x-large"
        @click="$router.push('/quiz')"
      >
        Commencer le quiz
      </v-btn>
    </v-card>
  </v-container>
</template>
