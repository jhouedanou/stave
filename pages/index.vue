<template>
  <v-container class="text-center">
    <h1 class="romantic-title mb-6">Quiz Saint-Valentin</h1>

    <v-btn
      color="primary"
      size="x-large"
      :disabled="isAfterDeadline"
      @click="showRegistrationDialog = true"
      class="px-8 py-3"
    >
      <v-icon left>mdi-heart</v-icon>
      Commencer le Quiz
    </v-btn>

    <v-dialog v-model="showRegistrationDialog" persistent max-width="500">
      <v-card>
        <v-card-title class="romantic-subtitle">
          Inscription au Quiz
        </v-card-title>

        <v-card-text>
          <v-alert v-if="errorMessage" type="error" class="mb-4" closable>
            {{ errorMessage }}
          </v-alert>

          <v-form ref="form" v-model="isFormValid" @submit.prevent="startQuiz">
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
</template>

<script setup>
const config = useRuntimeConfig();
const router = useRouter();

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

async function startQuiz() {
  if (!isFormValid.value) return;
  errorMessage.value = "";

  try {
    const { data, error } = await useSupabaseClient()
      .from("participants")
      .insert([
        {
          name: participant.value.name,
          email: participant.value.email,
        },
      ]);

    if (error) {
      if (error.code === "23505") {
        errorMessage.value = "Vous avez déjà participé au quiz avec cet email";
        return;
      }
      throw error;
    }

    showRegistrationDialog.value = false;
    router.push("/quizz");
  } catch (error) {
    console.error("Erreur:", error);
    errorMessage.value = "Une erreur est survenue lors de l'inscription";
  }
}
</script>
