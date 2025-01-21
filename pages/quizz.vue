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
            {{
              isCorrectAnswer
                ? "✨ Bravo ! Bonne réponse !"
                : "❌ Dommage, ce n'était pas la bonne réponse."
            }}
          </v-alert>

          <v-alert v-if="answerSubmitted" type="info" class="mb-4">
            <div class="text-center">
              <p class="mb-2">Prochaine question dans {{ timer }} secondes</p>
              <v-progress-linear
                v-model="progressValue"
                color="primary"
                height="10"
                rounded
                striped
              ></v-progress-linear>
            </div>
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
    </section>
  </v-container>
</template>

<script setup>
import { questions, useTopScores } from "~/composables/useQuestions";

const supabase = useSupabaseClient();
const router = useRouter();

const currentQuestionIndex = ref(0);
const selectedAnswer = ref(null);
const answerSubmitted = ref(false);
const totalScore = ref(0);
const isQuizCompleted = ref(false);
const isCorrectAnswer = ref(false);
const userEmail = useState("participantEmail");
const timer = ref(5);
const progressValue = ref(100);
let timerInterval = null;

const currentQuestion = computed(
  () => questions[currentQuestionIndex.value] || null
);

const getOptionText = (option) => {
  switch (option) {
    case "A":
      return currentQuestion.value.option_a;
    case "B":
      return currentQuestion.value.option_b;
    case "C":
      return currentQuestion.value.option_c;
    default:
      return "";
  }
};

const getAnswerColor = (option) => {
  if (!answerSubmitted.value) return "primary";
  if (option === currentQuestion.value.correct_answer) return "success";
  if (option === selectedAnswer.value) return "error";
  return "primary";
};

const nextQuestion = () => {
  clearInterval(timerInterval);
  currentQuestionIndex.value++;
  selectedAnswer.value = null;
  answerSubmitted.value = false;
  isCorrectAnswer.value = false;
};

const submitAnswer = () => {
  if (!answerSubmitted.value) {
    isCorrectAnswer.value =
      selectedAnswer.value === currentQuestion.value.correct_answer;
    if (isCorrectAnswer.value) {
      totalScore.value += currentQuestion.value.points;
    }
    answerSubmitted.value = true;

    if (currentQuestionIndex.value + 1 >= questions.length) {
      submitFinalScore();
    } else {
      timer.value = 5;
      progressValue.value = 100;
      timerInterval = setInterval(() => {
        timer.value--;
        progressValue.value = (timer.value / 5) * 100;
        if (timer.value === 0) {
          clearInterval(timerInterval);
          nextQuestion();
        }
      }, 1000);
    }
  } else {
    nextQuestion();
  }
};

const submitFinalScore = async () => {
  try {
    console.log("Début de l'enregistrement du score...");
    console.log("Email:", userEmail.value);
    console.log("Score:", totalScore.value);
    console.log("Date:", new Date().toISOString());

    const { data, error } = await supabase
      .from("participants")
      .update({
        score: totalScore.value,
        completed_at: new Date().toISOString(),
      })
      .eq("email", userEmail.value)
      .select("*");

    if (error) {
      console.log("Erreur Supabase:", error);
      throw error;
    }

    console.log("Données enregistrées:", data);
    useState("totalScore").value = totalScore.value;
    await navigateTo("/resultats");
  } catch (err) {
    console.error("Erreur complète:", err);
  }
};

onBeforeUnmount(() => {
  clearInterval(timerInterval);
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

.romantic-button {
  background: linear-gradient(45deg, #ff0000, #ff69b4) !important;
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

.quiz-card {
  border-radius: 20px;
  background: linear-gradient(145deg, #ffffff, #fff0f3);
  box-shadow: 0 8px 20px rgba(255, 105, 180, 0.1) !important;
}
</style>
