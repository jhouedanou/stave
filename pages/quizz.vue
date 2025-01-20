<template>
  <v-app>
    <v-app-bar color="primary" class="px-3">
      <v-app-bar-title class="text-white romantic-title">
        <v-icon icon="mdi-heart" class="mr-2"></v-icon>
        {{ appTitle }}
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn
        color="white"
        variant="text"
        @click="showRules"
        class="romantic-button"
      >
        Règlement
      </v-btn>
    </v-app-bar>

    <v-main class="valentine-background">
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>

    <v-footer class="text-center d-flex flex-column romantic-footer">
      <div>
        <v-icon icon="mdi-heart" color="primary" class="mr-2"></v-icon>
        <span class="romantic-subtitle">Quiz Saint-Valentin - Saint-Avé</span>
      </div>
      <div class="mt-2 romantic-text">
        Participation jusqu'au {{ formatDeadline }}
      </div>
    </v-footer>

    <!-- Modal Règlement -->
    <v-dialog v-model="isRulesModalOpen" max-width="700px">
      <v-card class="romantic-card">
        <v-card-title class="romantic-title pb-4"
          >Règlement du Quiz</v-card-title
        >
        <v-card-text>
          <v-container>
            <h3 class="romantic-subtitle mb-4">Comment participer ?</h3>
            <ul class="romantic-text">
              <li>
                Le quiz est ouvert à toutes les personnes majeures résidant à
                Saint-Avé
              </li>
              <li>Une seule participation par personne (même adresse email)</li>
              <li>Date limite de participation : {{ formatDeadline }}</li>
            </ul>

            <h3 class="romantic-subtitle mb-4 mt-6">Attribution des points</h3>
            <ul class="romantic-text">
              <li>
                Les points varient selon la difficulté des questions (entre 2 et
                3 points)
              </li>
              <li>
                Score minimum requis : {{ minScoreEligible }} points sur 13
              </li>
            </ul>

            <h3 class="romantic-subtitle mb-4 mt-6">Les prix à gagner</h3>
            <ul class="romantic-text">
              <li>10 lots à gagner pour les meilleurs scores</li>
              <li>Tirage au sort parmi les participants éligibles</li>
            </ul>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="closeRules"
            class="romantic-button mb-4"
          >
            Fermer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
const config = useRuntimeConfig();
const appTitle = ref(config.public.appTitle);
const minScoreEligible = ref(config.public.minScoreEligible);
const isRulesModalOpen = ref(false);

const formatDeadline = computed(() => {
  return new Date(config.public.deadline).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
});

const showRules = () => {
  isRulesModalOpen.value = true;
};

const closeRules = () => {
  isRulesModalOpen.value = false;
};
</script>

<style scoped>
.valentine-background {
  background-image: linear-gradient(
    45deg,
    #fff0f3 25%,
    #fff5f7 25%,
    #fff5f7 50%,
    #fff0f3 50%,
    #fff0f3 75%,
    #fff5f7 75%,
    #fff5f7
  );
  background-size: 56px 56px;
  min-height: 100vh;
}

.romantic-title {
  font-family: var(--font-title);
  font-size: 2.5rem;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.romantic-subtitle {
  font-family: var(--font-subtitle);
  font-size: 1.8rem;
  color: #ff1d8e;
}

.romantic-text {
  font-family: var(--font-body);
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
}

.romantic-button {
  font-family: var(--font-subtitle);
  text-transform: none;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.romantic-button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(255, 29, 142, 0.2);
}

.romantic-card {
  border-radius: 20px;
  background: linear-gradient(145deg, #ffffff, #fff0f3);
  box-shadow: 0 8px 20px rgba(255, 105, 180, 0.1) !important;
}

.romantic-footer {
  background-color: #fff0f3 !important;
  border-top: 2px solid rgba(255, 29, 142, 0.1);
}

.v-card-title {
  border-bottom: 2px solid rgba(255, 29, 142, 0.1);
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
}

li::before {
  content: "❤️";
  position: absolute;
  left: 0;
  color: #ff1d8e;
}
</style>
