
<template>
  <v-container>
    <v-card v-for="(question, index) in questions" :key="index" class="mb-4">
      <v-card-title>Question {{ index + 1 }}</v-card-title>
      <v-card-text>
        <p>{{ question.question_text }}</p>
        <v-radio-group v-model="answers[index]">
          <v-radio :label="question.choice_a" value="A"></v-radio>
          <v-radio :label="question.choice_b" value="B"></v-radio>
          <v-radio :label="question.choice_c" value="C"></v-radio>
        </v-radio-group>
      </v-card-text>
    </v-card>
    
    <v-btn
      color="success"
      block
      @click="submitAnswers"
    >
      Valider mes réponses
    </v-btn>
  </v-container>
</template>
