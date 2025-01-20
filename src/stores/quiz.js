import { defineStore } from 'pinia'
import { quizService } from '@/services/supabase'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    questions: [],
    currentAnswers: {},
    score: 0,
    participant: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchQuestions() {
      this.loading = true
      try {
        this.questions = await quizService.getQuestions()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async submitQuiz(participantData) {
      this.loading = true
      try {
        const participant = await quizService.saveParticipant(participantData)
        this.participant = participant
        await this.calculateScore()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
})
