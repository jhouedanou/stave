<template>
  <div>
    <div v-if="isLoading" class="loading-screen">
      <div class="loading-hearts">
        <div v-for="n in 10" :key="n" class="loading-heart">❤</div>
      </div>
      <img src="/images/logo.png" alt="Logo" height="54" class="nkeupbi" />
      <p class="loading-text">Chargement...</p>
    </div>

    <v-dialog v-model="showGameEndedDialog" persistent max-width="400">
      <v-card>
        <v-card-title class="romantic-subtitle"
          >e nombre maximum de gagnants a été atteint.</v-card-title
        >
        <v-card-text>
          <p>Le nombre maximum de gagnants a été atteint.</p>
          <p>Merci de votre intérêt !</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="showGameEndedDialog = false"
            >Fermer</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showCompletionDialog" max-width="400">
      <v-card>
        <v-card-title class="romantic-subtitle"
          >Participation enregistrée</v-card-title
        >
        <v-card-text>
          <p>Email: {{ userEmail }}</p>
          <p>Nom: {{ userName }}</p>
          <p class="mt-4">Merci pour votre participation !</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="showCompletionDialog = false"
            >Fermer</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-container
      class="d-flex align-center justify-center flex-column text-center"
    >
      <img src="/images/logo.png" class="boujto mb-2" alt="" />
      <img
        src="/images/logoTagline.png"
        alt="deco"
        height="250"
        style="object-fit: contain; width: 100%; height: 100%"
      />

      <v-btn
        id="moudd"
        color="primary"
        size="x-large"
        :disabled="isGameEnded || isAfterDeadline"
        @click="showRegistrationDialog = true"
        class="px-8 py-3"
      >
        <v-icon left>mdi-heart</v-icon>
        {{ isGameEnded ? "Jeu Terminé" : "Commencer le Quiz" }}
      </v-btn>

      <v-dialog v-model="showRegistrationDialog" persistent max-width="500">
        <v-card>
          <v-card-title class="romantic-subtitle"
            >Inscription au Quiz</v-card-title
          >
          <v-card-text>
            <v-alert v-if="errorMessage" type="error" class="mb-4" closable>
              {{ errorMessage }}
            </v-alert>
            <v-form
              ref="form"
              v-model="isFormValid"
              @submit.prevent="startQuiz"
            >
              <v-text-field
                v-model="participant.name"
                label="Votre nom"
                :rules="nameRules"
                required
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="participant.email"
                label="Votre email"
                type="email"
                :rules="emailRules"
                required
                variant="outlined"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="startQuiz" :disabled="!isFormValid">
              Commencer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const router = useRouter();
const supabase = useSupabaseClient();

const isLoading = ref(true);
const showCompletionDialog = ref(false);
const showGameEndedDialog = ref(false);
const userEmail = ref("");
const userName = ref("");
const isGameEnded = ref(false);

const showRegistrationDialog = ref(false);
const isFormValid = ref(false);
const form = ref(null);
const errorMessage = ref("");

const participant = ref({
  name: "",
  email: "",
});

const nameRules = [
  (v) => !!v || "Le nom est requis",
  (v) => v.length >= 2 || "Le nom doit contenir au moins 2 caractères",
];

const emailRules = [
  (v) => !!v || "L'email est requis",
  (v) => /.+@.+\..+/.test(v) || "L'email doit être valide",
];

const isAfterDeadline = computed(() => {
  const deadline = new Date(config.public.deadline);
  return new Date() > deadline;
});

async function checkWinnerCount() {
  const { data, error } = await supabase
    .from("participants")
    .select("score")
    .gte("score", 10);

  if (error) {
    console.error("Erreur lors de la vérification des gagnants:", error);
    return false;
  }

  return data.length >= 10;
}

async function startQuiz() {
  if (!isFormValid.value) return;
  errorMessage.value = "";

  try {
    const isMaxWinnersReached = await checkWinnerCount();
    if (isMaxWinnersReached) {
      isGameEnded.value = true;
      showGameEndedDialog.value = true;
      showRegistrationDialog.value = false;
      return;
    }

    const { data, error } = await supabase.from("participants").insert({
      name: participant.value.name,
      email: participant.value.email,
      started_at: new Date().toISOString(),
    });

    if (error) {
      if (error.code === "23505") {
        errorMessage.value = "Vous avez déjà participé au quiz avec cet email";
        return;
      }
      throw error;
    }
    useState("participantEmail").value = participant.value.email;

    showRegistrationDialog.value = false;
    await router.push("/quizz");
  } catch (error) {
    console.error("Erreur:", error);
    errorMessage.value = "Une erreur est survenue lors de l'inscription";
  }
}

onMounted(async () => {
  isGameEnded.value = await checkWinnerCount();

  setTimeout(() => {
    isLoading.value = false;
  }, 2000);

  const quizCompleted = useCookie("quiz-completed").value;
  if (quizCompleted === "true") {
    userEmail.value = useCookie("email").value;
    userName.value = useCookie("username").value;
    showCompletionDialog.value = true;
  }
});

onMounted(() => {
  document.body.classList.add("zeindex");
});

onBeforeUnmount(() => {
  document.body.classList.remove("zeindex");
});
</script>

<style lang="scss" scoped>
.v-application {
  background: url(/images/backgoround.webp) !important;
  background-size: cover !important;
  background-position: center center !important;
}
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #ffffff, #fff0f3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-hearts {
  position: relative;
  width: 100%;
  height: 100%;
}

@keyframes loadingHeartFall {
  0% {
    transform: translateY(-10%) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

.loading-heart {
  position: fixed;
  color: #ff0000ff;
  font-size: 20px;
  z-index: 1;
  animation: loadingHeartFall 10s linear infinite;
}

@for $i from 1 through 10 {
  .loading-heart:nth-child(#{$i}) {
    left: #{random(100)}vw;
    opacity: #{random(100) / 100};
    animation-delay: #{random(10)}s;
    font-size: #{random(10) + 15}px;
  }
}

@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.1);
  }
  40% {
    transform: scale(1);
  }
  60% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.nkeupbi {
  animation: heartbeat 2s infinite;
  transform-origin: center;
}
</style>
