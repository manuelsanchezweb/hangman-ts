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

  const guessWordsCount = Object.keys(getGuessedWords()).length

  return { isWordGuessed, markWordAsGuessed, guessWordsCount }
}
