
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const quizService = {
  async getQuestions() {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
    if (error) throw error
    return data
  },

  async saveParticipant(participantData) {
    const { data, error } = await supabase
      .from('participants')
      .insert([participantData])
    if (error) throw error
    return data
  },

  async saveAnswers(answers) {
    const { data, error } = await supabase
      .from('answers')
      .insert(answers)
    if (error) throw error
    return data
  }
}
