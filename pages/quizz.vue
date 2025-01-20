<template>
  <v-container>
    <section class="text-center">
      <div v-if="!isQuizCompleted">
        <v-card class="pa-6 quiz-card" elevation="4">
          <h2 class="romantic-title mb-4">
            Question {{ currentQuestionIndex + 1 }}/{{ questions.length }}
          </h2>
          <p class="romantic-subtitle mb-6">{{ currentQuestion.question }}</p>

          <v-radio-group v-model="selectedAnswer" class="mb-6">
            <v-radio
              v-for="option in ['A', 'B', 'C']"
              :key="option"
              :value="option"
              :label="getOptionText(option)"
              :disabled="answerSubmitted"
              :color="getAnswerColor(option)"
              class="text-left mb-2"
            ></v-radio>
          </v-radio-group>

          <v-alert
            v-if="answerSubmitted"
            :type="isCorrectAnswer ? 'success' : 'error'"
            class="mb-4"
          >
            {{ isCorrectAnswer ? '✨ Bravo ! Bonne réponse !' : '❌ Dommage, ce n\'était pas la bonne réponse.' }}
          </v-alert>

          <v-btn
            color="primary"
            size="x-large"
            elevation="4"
            class="px-8 py-3 mt-4 romantic-button"
            rounded
            @click="submitAnswer"
            :disabled="!selectedAnswer"
          >
            <v-icon left class="mr-2">mdi-heart</v-icon>
            {{ answerSubmitted ? "Question suivante" : "Valider" }}
          </v-btn>
        </v-card>
      </div>

      <div v-else>
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
          <v-card-title class="romantic-title">Top 10 des meilleurs scores</v-card-title>
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
    </section>
  </v-container>
</template>

<script setup>
import { questions, useTopScores } from "~/composables/useQuestions";

const supabase = useSupabaseClient();
const config = useRuntimeConfig();
const router = useRouter();

const currentQuestionIndex = ref(0);
const selectedAnswer = ref(null);
const answerSubmitted = ref(false);
const totalScore = ref(0);
const isQuizCompleted = ref(false);
const topScores = ref([]);
const isCorrectAnswer = ref(false);

const minScoreEligible = config.public.minScoreEligible;

const currentQuestion = computed(() => questions[currentQuestionIndex.value] || null);

onMounted(async () => {
  topScores.value = await useTopScores();
});

const getOptionText = (option) => {
  switch (option) {
    case "A": return currentQuestion.value.option_a;
    case "B": return currentQuestion.value.option_b;
    case "C": return currentQuestion.value.option_c;
    default: return "";
  }
};

const getAnswerColor = (option) => {
  if (!answerSubmitted.value) return 'primary';
  if (option === currentQuestion.value.correct_answer) return 'success';
  if (option === selectedAnswer.value) return 'error';
  return 'primary';
};

const submitAnswer = () => {
  if (!answerSubmitted.value) {
    isCorrectAnswer.value = selectedAnswer.value === currentQuestion.value.correct_answer;
    if (isCorrectAnswer.value) {
      totalScore.value += currentQuestion.value.points;
      console.log("🎯 Bonne réponse! Score actuel:", totalScore.value);
    } else {
      console.log("❌ Mauvaise réponse. Score actuel:", totalScore.value);
    }
    answerSubmitted.value = true;

    if (currentQuestionIndex.value + 1 >= questions.length) {
      submitFinalScore();
    }
  } else {
    currentQuestionIndex.value++;
    selectedAnswer.value = null;
    answerSubmitted.value = false;
    isCorrectAnswer.value = false;

    if (currentQuestionIndex.value >= questions.length) {
      isQuizCompleted.value = true;
    }
  }
};

const submitFinalScore = async () => {
  const { error } = await supabase
    .from("participants")
    .update({
      score: totalScore.value,
      completed_at: new Date().toISOString()
    })
    .eq("email", participantEmail.value);

  if (!error) {
    alert(`🎉 Félicitations ! Votre score final est de ${totalScore.value} points !`);
  } else {
    console.error("Erreur d'enregistrement:", error);
  }
};
</script>

<style scoped>
.romantic-title {
  font-family: var(--font-title);
  font-size: 2.5rem;
  color: #ff1d8e;
  margin-bottom: 1rem;
}

.romantic-subtitle {
  font-family: var(--font-subtitle);
  font-size: 1.8rem;
  color: #ff8fb1;
}

.romantic-button {
  background: linear-gradient(45deg, #ff1d8e, #ff69b4) !important;
  font-size: 1.2rem;
  font-family: var(--font-subtitle);
  text-transform: none;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.romantic-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(255, 29, 142, 0.3) !important;
}

.quiz-card,
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
  color: #ff1d8e !important;
  font-family: var(--font-subtitle);
  font-size: 1.2rem;
}

.v-table td {
  font-family: var(--font-body);
  color: #666;
}

.v-radio.success .v-label {
  color: #4CAF50 !important;
}

.v-radio.error .v-label {
  color: #FF5252 !important;
}
</style>
