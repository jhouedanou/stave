export const questions = [
  {
    id: 1,
    question: 'Quelle est l\'origine de la Saint-Valentin ?',
    option_a: 'Une fête religieuse',
    option_b: 'Une tradition païenne',
    option_c: 'Une invention commerciale',
    correct_answer: 'A',
    points: 2
  },
  {
    id: 2,
    question: 'Quel ingrédient rend une pâte à crêpes plus moelleuse ?',
    option_a: 'Le beurre',
    option_b: 'La margarine',
    option_c: 'La crème fraîche',
    correct_answer: 'B',
    points: 3
  },
  {
    id: 3,
    question: 'Combien de grammes de margarine Saint Avé faut-il pour réaliser un fondant au chocolat pour deux personnes ?',
    option_a: '50 g',
    option_b: '100 g',
    option_c: '150 g',
    correct_answer: 'A',
    points: 3
  },
  {
    id: 4,
    question: 'Quelle pâtisserie est souvent associée à un moment romantique ?',
    option_a: 'Mille-feuille',
    option_b: 'Fondant au chocolat',
    option_c: 'Quatre-quarts',
    correct_answer: 'B',
    points: 2
  },
  {
    id: 5,
    question: 'Quelle couleur symbolise l\'amour dans les desserts de Saint-Valentin ?',
    option_a: 'Rouge',
    option_b: 'Jaune',
    option_c: 'Rose',
    correct_answer: 'A',
    points: 2
  }
]

export const useTopScores = async () => {
  const { data: topScores } = await useSupabaseClient()
    .from('participants')
    .select('name, score')
    .order('score', { ascending: false })
    .limit(10)

  return topScores
}
