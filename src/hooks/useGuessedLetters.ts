// hooks/useGuessedLetters.js
import { useCallback, useState } from 'react'

export const useGuessedLetters = () => {
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const addGuessedLetter = useCallback((letter: string) => {
    setGuessedLetters((currentLetters) => {
      // Avoid duplicates and ensure it's a single lowercase letter
      if (letter.match(/^[a-z]$/) && !currentLetters.includes(letter)) {
        return [...currentLetters, letter]
      }
      return currentLetters
    })
  }, [])

  const resetGuessedLetters = useCallback(() => {
    setGuessedLetters([])
  }, [])

  return { guessedLetters, addGuessedLetter, resetGuessedLetters }
}
