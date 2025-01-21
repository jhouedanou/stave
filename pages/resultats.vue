<template>
  <v-container>
    <v-fade-transition>
      <div>
        <v-card class="pa-6 result-card" elevation="4">
          <h2 class="romantic-title">Quiz terminé !</h2>
          <p class="romantic-subtitle mb-4">
            Votre score : {{ totalScore }}/13 points
          </p>

          <div v-if="totalScore >= minScoreEligible">
            <v-alert type="success" variant="tonal" class="mb-4">
              Félicitations ! Vous êtes éligible au tirage au sort.
            </v-alert>
          </div>
          <div v-else>
            <v-alert type="error" variant="tonal">
              Désolé, vous devez obtenir au moins {{ minScoreEligible }} points
              pour être éligible au tirage au sort.
            </v-alert>
          </div>
        </v-card>

        <v-card class="mt-6 scores-card" elevation="4">
          <v-card-title class="romantic-title"
            >Top 10 des meilleurs scores</v-card-title
          >
          <v-table>
            <thead>
              <tr>
                <th class="text-center">Position</th>
                <th>Nom</th>
                <th class="text-center">Score</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(score, index) in topScores" :key="index">
                <td class="text-center">{{ index + 1 }}</td>
                <td>{{ score.name }}</td>
                <td class="text-center">{{ score.score }}/13</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </div>
    </v-fade-transition>
  </v-container>
</template>

<script setup>
const config = useRuntimeConfig();
const minScoreEligible = config.public.minScoreEligible;
const totalScore = useState("totalScore");
const topScores = ref([]);

onMounted(async () => {
  topScores.value = await useTopScores();
});
</script>

<style scoped>
.romantic-title {
  font-family: var(--font-title);
  font-size: 2.5rem;
  color: #ff0000;
  margin-bottom: 1rem;
}

.romantic-subtitle {
  font-family: var(--font-subtitle);
  font-size: 1.8rem;
  color: #ff8fb1;
}

.result-card,
.scores-card {
  border-radius: 20px;
  background: linear-gradient(145deg, #ffffff, #fff0f3);
  box-shadow: 0 8px 20px rgba(255, 105, 180, 0.1) !important;
}

.v-table {
  background: transparent !important;
}

.v-table th {
  color: #ff0000 !important;
  font-family: var(--font-subtitle);
  font-size: 1.2rem;
}

.v-table td {
  font-family: var(--font-body);
  color: #666;
}
</style>
