export const useGuessedWords = () => {
  const getGuessedWords = () =>
    JSON.parse(localStorage.getItem('guessedWords') || '{}')

  const isWordGuessed = (day: string) => {
    const guessedWords = getGuessedWords()
    return !!guessedWords[day]
  }

  const markWordAsGuessed = (day: string) => {
    const guessedWords = getGuessedWords()
    guessedWords[day] = true
    localStorage.setItem('guessedWords', JSON.stringify(guessedWords))
  }

  return { isWordGuessed, markWordAsGuessed }
}
