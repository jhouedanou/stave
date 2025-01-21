<template>
  <v-app>
    <v-app-bar color="primary" class="px-3">
      <v-app-bar-title class="text-white">
        <img src="/images/logo.png" alt="Logo" height="160" />
        {{ appTitle }}
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn color="white" variant="text" @click="openRules"> Règlement </v-btn>
    </v-app-bar>

    <v-main class="valentine-background">
      <v-container class="goodwife">
        <NuxtPage />

        <v-dialog v-model="showRules" max-width="600">
          <v-card>
            <v-card-title>Règlement du Quiz</v-card-title>
            <v-card-text>
              <QuizRules />
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="showRules = false">Fermer</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>

    <!-- <v-footer class="text-center d-flex flex-column">
      <div>
        <v-icon icon="mdi-heart" color="primary" class="mr-2"></v-icon>
        Quiz Saint-Valentin - Saint-Avé
      </div>
      <div class="mt-2">Participation jusqu'au {{ formatDeadline }}</div>
    </v-footer> -->
  </v-app>
</template>

<style>
:root {
  --font-title: "Great Vibes", cursive;
  --font-subtitle: "Parisienne", cursive;
  --font-body: "Quicksand", sans-serif;
}

.v-application {
  font-family: var(--font-body) !important;
}

.romantic-title {
  font-family: var(--font-title);
  font-size: 3rem;
  color: #ff0000;
}

.romantic-subtitle {
  font-family: var(--font-subtitle);
  font-size: 2rem;
}

.v-app-bar-title {
  font-family: var(--font-title);
  font-size: 2.5rem !important;
}

.question-text {
  font-family: var(--font-body);
  font-weight: 500;
}

.footer-text {
  font-family: var(--font-subtitle);
  font-size: 1.2rem;
}

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
}

.v-card {
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(255, 29, 142, 0.1) !important;
}

.v-btn {
  letter-spacing: 1px;
  text-transform: none;
  border-radius: 25px;
}
.v-application {
  background: url(images/bg.jpg) !important;
  background-size: cover !important;
}
.v-footer {
  background: none !important;
  position: fixed !important;
  z-index: 10 !important;
  padding: 1em auto !important;
  border-top: 2px solid rgba(255, 29, 142, 0.1);
}
</style>

<script setup>
useHead({
  title: "Quiz Saint-Valentin",
  meta: [
    { property: "og:title", content: "Quiz Saint-Valentin 2024" },
    {
      property: "og:description",
      content:
        "Participez à notre quiz spécial Saint-Valentin et tentez de gagner de superbes cadeaux !",
    },
    {
      property: "og:image",
      content: "https://quizzstave.netlify.app/images/miniature.jpg",
    },
    { property: "og:url", content: "https://quizzstave.netlify.app/" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "description",
      content: "Quiz Saint-Valentin avec de nombreux lots à gagner",
    },
  ],
});

const showRules = ref(false);
const openRules = () => {
  showRules.value = true;
};
</script>
