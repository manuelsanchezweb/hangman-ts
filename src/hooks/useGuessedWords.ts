export const useGuessedWords = () => {
  const getGuessedWords = () =>
    JSON.parse(localStorage.getItem('guessedWords') || '{}')

  const isWordGuessed = (day: string) => {
    const guessedWords = getGuessedWords()
    return !!guessedWords[day]
  }

  const markWordAsGuessed = (day: string) => {
    if (!day.trim()) return // Prevent marking if day is empty or invalid
    const guessedWords = getGuessedWords()
    guessedWords[day] = true
    localStorage.setItem('guessedWords', JSON.stringify(guessedWords))
  }

  const guessedWordsCount = () => {
    const today = new Date().toISOString().split('T')[0]
    const guessedWords = getGuessedWords()
    return Object.keys(guessedWords).filter(
      (day) => day <= today && guessedWords[day]
    ).length
  }

  return { isWordGuessed, markWordAsGuessed, guessedWordsCount }
}
