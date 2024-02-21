import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { HangmanDrawing } from './components/HangmanDrawing'
import { WORD_PER_DAY } from './data'
import { useSelectedWordPerDay } from './hooks/useSelectedWordPerDay'
import { useGuessedWords } from './hooks/useGuessedWords'
import { HangmanWord } from './components/HangmanWord'
import { Keyboard } from './components/Keyboard/Keyboard'
import { useGuessedLetters } from './hooks/useGuessedLetters'
import Navigation from './components/Navigation'
// import confetti from 'canvas-confetti'

/**
 * The main Hangman game component.
 */
function App() {
  const { selectedDay, setSelectedDay, wordToGuess, setWordToGuess } =
    useSelectedWordPerDay()
  const { isWordGuessed, markWordAsGuessed, guessedWordsCount } =
    useGuessedWords()
  const [_guessedWordsUpdate, setGuessedWordsUpdate] = useState(0)
  const { guessedLetters, addGuessedLetter, resetGuessedLetters } =
    useGuessedLetters()

  /**
   * Filters out incorrect guessed letters.
   */
  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  )

  /**
   * Marks the current selected word as guessed and triggers an update.
   */
  const handleGuess = useCallback(() => {
    markWordAsGuessed(selectedDay)
    setGuessedWordsUpdate((prev) => prev + 1)
    // confetti()
  }, [selectedDay])

  /**
   * Determines if the player has lost the game.
   */
  const isLoser = incorrectLetters.length >= 6

  /**
   * Determines if the player has won the game.
   */
  const isWinner = wordToGuess
    .split('')
    .every((letter) => guessedLetters.includes(letter))

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Check if the target of the keypress event is an input, textarea, or select
      const target = e.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        return // Ignore the keypress event
      }

      const key = e.key.toLowerCase()
      if (key.match(/^[a-z]$/) && !isWinner && !isLoser) {
        e.preventDefault()
        addGuessedLetter(key)
      }
    }

    window.addEventListener('keypress', handler)
    return () => window.removeEventListener('keypress', handler)
  }, [addGuessedLetter, isWinner, isLoser])

  useEffect(() => {
    if (isWinner) {
      handleGuess()
    }
  }, [isWinner])

  useEffect(() => {
    const initializeGame = () => {
      // Adjust to prioritize the last visited day or default to the most recent valid entry
      const savedDay = localStorage.getItem('lastVisitedDay')
      let dayToSet = savedDay
      let wordToSet

      if (savedDay) {
        const savedEntry = WORD_PER_DAY.find((entry) => entry.day === savedDay)
        if (savedEntry) {
          wordToSet = savedEntry.word
        } else {
          // Fallback if the saved day is no longer valid
          const today = new Date().toISOString().split('T')[0]
          const validEntries = WORD_PER_DAY.filter(
            (entry) => entry.day <= today
          )
          const mostRecentEntry = validEntries[validEntries.length - 1]
          dayToSet = mostRecentEntry.day
          wordToSet = mostRecentEntry.word
        }
      } else {
        // Initial case if no day is saved, similar fallback as above
        const today = new Date().toISOString().split('T')[0]
        const validEntries = WORD_PER_DAY.filter((entry) => entry.day <= today)
        const mostRecentEntry = validEntries[validEntries.length - 1]
        dayToSet = mostRecentEntry.day
        wordToSet = mostRecentEntry.word
      }

      setSelectedDay(dayToSet as string)
      setWordToGuess(wordToSet)
    }
    initializeGame()
  }, [])

  useEffect(() => {
    // Load the last visited day from localStorage
    const lastVisitedDay = localStorage.getItem('lastVisitedDay')
    if (lastVisitedDay) {
      setSelectedDay(lastVisitedDay)
      const selectedWordEntry = WORD_PER_DAY.find(
        (entry) => entry.day === lastVisitedDay
      )
      if (selectedWordEntry) {
        setWordToGuess(selectedWordEntry.word)
      }
    }
  }, [])

  /**
   * Changes the selected day and updates the word to guess accordingly.
   * Resets guessed letters for the new word.
   */
  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDate = event.target.value
    localStorage.setItem('lastVisitedDay', selectedDate) // Save the last visited day
    const selectedWordEntry = WORD_PER_DAY.find(
      (entry) => entry.day === selectedDate
    )
    if (selectedWordEntry) {
      setSelectedDay(selectedWordEntry.day)
      setWordToGuess(selectedWordEntry.word)
      resetGuessedLetters() // Reset guessed letters for the new word
      // Reset guessed letters for the new word
    }
  }

  return (
    <>
      <Navigation
        selectedDay={selectedDay}
        handleDayChange={handleDayChange}
        isWordGuessed={isWordGuessed}
        guessedWordsCount={guessedWordsCount}
      />

      <div
        style={{
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        {isWordGuessed(selectedDay) ? (
          <p
            style={{
              marginBottom: '1rem',
            }}
          >
            You already discovered the word of the day:{' '}
            <strong>{wordToGuess}</strong>
          </p>
        ) : (
          <>
            <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
            <HangmanWord
              guessedLetters={guessedLetters}
              wordToGuess={wordToGuess}
            />
            <div style={{ alignSelf: 'stretch' }}>
              <Keyboard
                disabled={isWinner || isLoser}
                activeLetters={guessedLetters.filter((letter) =>
                  wordToGuess.includes(letter)
                )}
                inactiveLetters={incorrectLetters}
                addGuessedLetter={addGuessedLetter}
              />
            </div>
          </>
        )}

        <div className="game-status">
          {isWinner && 'Winner! - Try any other day to play again'}
          {isLoser && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <p>Nice Try - Maybe next time!</p>
              <button
                style={{
                  border: '1px solid black',
                  padding: '0.5rem',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  // refresh the page to start a new game
                  window.location.reload()
                }}
              >
                Try again
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
