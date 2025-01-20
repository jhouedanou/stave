
<template>
  <v-container class="text-center">
    <v-card class="mx-auto pa-6">
      <h2 class="text-h4 mb-4">Vos résultats</h2>
      
      <v-card-text>
        <p class="text-h5">Score total : {{ score }} points</p>
        <p v-if="isEligible" class="success--text">
          Félicitations ! Vous êtes éligible pour le tirage au sort !
        </p>
        <p v-else class="error--text">
          Continuez à vous entraîner pour la prochaine fois !
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>
