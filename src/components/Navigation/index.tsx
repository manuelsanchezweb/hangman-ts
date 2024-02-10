import styles from './Navigation.module.css'
import React from 'react'
import { WORD_PER_DAY } from '../../data'
import DaySelect from '../DaySelect'

const Navigation = ({
  selectedDay,
  handleDayChange,
  isWordGuessed,
  guessedWordsCount,
}: {
  selectedDay: string
  handleDayChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  isWordGuessed: (day: string) => boolean
  guessedWordsCount: () => number
}) => {
  const totalOfWordsUpToToday = WORD_PER_DAY.filter(
    (entry) => entry.day <= new Date().toISOString().split('T')[0]
  ).length

  return (
    <nav className={styles.nav}>
      <DaySelect
        selectedDay={selectedDay}
        handleDayChange={handleDayChange}
        isWordGuessed={isWordGuessed}
      />
      <div
        style={{
          display: 'flex',
          gap: '10px',
        }}
      >
        <span>Nº. of words guessed: </span>
        <span>
          <strong>
            {guessedWordsCount()} / {totalOfWordsUpToToday}
          </strong>
        </span>
      </div>
    </nav>
  )
}

export default Navigation
