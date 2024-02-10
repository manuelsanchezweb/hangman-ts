import { useEffect, useState } from 'react'
import { WORD_PER_DAY } from '../data'

export const useSelectedWordPerDay = () => {
  const [selectedDay, setSelectedDay] = useState<string>('')
  const [wordToGuess, setWordToGuess] = useState<string>('')

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const validEntries = WORD_PER_DAY.filter((entry) => entry.day <= today)
    const mostRecentEntry = validEntries[validEntries.length - 1]
    if (mostRecentEntry) {
      setSelectedDay(mostRecentEntry.day)
      setWordToGuess(mostRecentEntry.word)
    }
  }, [])

  return { selectedDay, setSelectedDay, wordToGuess, setWordToGuess }
}
