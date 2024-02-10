import styles from './Navigation.module.css'
import React from 'react'
import { WORD_PER_DAY } from '../../data'
import DaySelect from '../DaySelect'

const Navigation = ({
  selectedDay,
  handleDayChange,
  isWordGuessed,
  guessWordsCount,
}: {
  selectedDay: string
  handleDayChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  isWordGuessed: (day: string) => boolean
  guessWordsCount: number
}) => {
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
            {guessWordsCount} / {WORD_PER_DAY.length}
          </strong>
        </span>
      </div>
    </nav>
  )
}

export default Navigation
