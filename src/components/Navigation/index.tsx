import styles from './Navigation.module.css'
import React from 'react'
import { WORD_PER_DAY } from '../../data'
import DaySelect from '../DaySelect'
import User from '../User/User'

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
      <User guessedWordsCount={guessedWordsCount} />

      <div className={styles.nav__right}>
        <DaySelect
          selectedDay={selectedDay}
          handleDayChange={handleDayChange}
          isWordGuessed={isWordGuessed}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginRight: '30px',
          }}
        >
          <div
            style={{
              fontWeight: 'bold',
            }}
          >
            Nº. of words guessed:{' '}
          </div>
          <div>
            {guessedWordsCount()} / {totalOfWordsUpToToday}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
