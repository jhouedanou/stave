<template>
  <v-container>
    <v-card class="mx-auto" max-width="800">
      <v-card-title class="text-h5 pink lighten-4">
        Question {{ currentQuestion + 1 }}/{{ questions.length }}
      </v-card-title>

      <v-card-text class="pt-4">
        <v-form ref="form" v-model="valid">
          <p class="text-h6 mb-4">{{ currentQuestionData.question }}</p>
          
          <v-radio-group v-model="userAnswers[currentQuestion]" mandatory>
            <v-radio
              v-for="(option, index) in ['A', 'B', 'C']"
              :key="index"
              :label="getAnswerText(option)"
              :value="option"
            ></v-radio>
          </v-radio-group>

          <v-card-actions class="pt-4">
            <v-btn
              v-if="currentQuestion > 0"
              color="grey"
              outlined
              @click="previousQuestion"
            >
              Précédent
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="pink darken-1"
              dark
              :disabled="!userAnswers[currentQuestion]"
              @click="nextQuestion"
            >
              {{ isLastQuestion ? 'Terminer' : 'Suivant' }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { createClient } from '@supabase/supabase-js'

export default {
  name: 'QuizPage',
  data() {
    return {
      supabase: null,
      questions: [],
      currentQuestion: 0,
      userAnswers: [],
      valid: true,
      loading: false
    }
  },
  computed: {
    currentQuestionData() {
      return this.questions[this.currentQuestion] || {}
    },
    isLastQuestion() {
      return this.currentQuestion === this.questions.length - 1
    }
  },
  async created() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    await this.fetchQuestions()
  },
  methods: {
    async fetchQuestions() {
      const { data, error } = await this.supabase
        .from('questions')
        .select('*')
      
      if (error) {
        console.error('Erreur:', error)
        return
      }
      
      this.questions = data
      this.userAnswers = new Array(data.length).fill(null)
    },
    
    getAnswerText(option) {
      const answers = {
        'A': this.currentQuestionData.reponse_a,
        'B': this.currentQuestionData.reponse_b,
        'C': this.currentQuestionData.reponse_c
      }
      return answers[option]
    },
    
    previousQuestion() {
      if (this.currentQuestion > 0) {
        this.currentQuestion--
      }
    },
    
    async nextQuestion() {
      if (this.isLastQuestion) {
        await this.submitQuiz()
      } else {
        this.currentQuestion++
      }
    },
    
    async submitQuiz() {
      this.loading = true
      let score = 0
      
      this.questions.forEach((question, index) => {
        if (this.userAnswers[index] === question.bonne_reponse) {
          score += question.points
        }
      })
      
      // Sauvegarder le score dans la base de données
      const { error } = await this.supabase
        .from('participants')
        .insert([
          {
            email: this.userEmail,
            score: score
          }
        ])
      
      this.loading = false
      
      if (error) {
        console.error('Erreur:', error)
        return
      }
      
      this.$router.push({
        path: '/resultat',
        query: { score }
      })
    }
  }
}
</script>
