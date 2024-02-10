import { useEffect, useState } from 'react'
import './App.css'
import { HangmanDrawing } from './components/HangmanDrawing'
import { WORD_PER_DAY } from './data'
import { useSelectedWordPerDay } from './hooks/useSelectedWordPerDay'
import { useGuessedWords } from './hooks/useGuessedWords'
import DaySelect from './components/DaySelect'

function App() {
  const { selectedDay, setSelectedDay, wordToGuess, setWordToGuess } =
    useSelectedWordPerDay()
  const { isWordGuessed, markWordAsGuessed } = useGuessedWords()
  const [guessedWordsUpdate, setGuessedWordsUpdate] = useState(0)
  // const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  // const incorrectLetters = guessedLetters.filter(
  //   (letter) => !wordToGuess.includes(letter)
  // )

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const validEntries = WORD_PER_DAY.filter((entry) => entry.day <= today)
    const mostRecentEntry = validEntries[validEntries.length - 1]
    if (mostRecentEntry) {
      setSelectedDay(mostRecentEntry.day)
      setWordToGuess(mostRecentEntry.word)
    }
  }, [])

  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDate = event.target.value
    const selectedWordEntry = WORD_PER_DAY.find(
      (entry) => entry.day === selectedDate
    )
    if (selectedWordEntry) {
      setSelectedDay(selectedWordEntry.day)
      setWordToGuess(selectedWordEntry.word)
    }
  }

  const handleGuess = () => {
    markWordAsGuessed(selectedDay)
    setGuessedWordsUpdate(guessedWordsUpdate + 1)
  }

  return (
    <div
      style={{
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        margin: '0 auto',
        alignItems: 'center',
      }}
    >
      <h1>Hangman</h1>
      <DaySelect
        selectedDay={selectedDay}
        handleDayChange={handleDayChange}
        isWordGuessed={isWordGuessed}
      />
      <HangmanDrawing numberOfGuesses={8} />
      <p>Selected word: {wordToGuess}</p>
      <button onClick={handleGuess}>Guess</button>
    </div>
  )
}

export default App
