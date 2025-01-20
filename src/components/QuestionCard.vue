<template>
  <v-card class="question-card ma-4">
    <v-card-title class="text-h5">
      {{ question.question_text }}
    </v-card-title>
    <v-card-text>
      <v-radio-group v-model="selectedAnswer" @change="emitAnswer">
        <v-radio
          v-for="(choice, key) in choices"
          :key="key"
          :label="choice"
          :value="key"
        ></v-radio>
      </v-radio-group>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  question: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['answer'])

const selectedAnswer = ref(null)

const choices = computed(() => ({
  A: props.question.choice_a,
  B: props.question.choice_b,
  C: props.question.choice_c
}))

const emitAnswer = () => {
  emit('answer', {
    questionId: props.question.id,
    answer: selectedAnswer.value
  })
}
</script>
