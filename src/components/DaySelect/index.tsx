import React from 'react'
import { WORD_PER_DAY } from '../../data'
import { transformDateToGermanFormat } from '../../utils'

interface DaySelectProps {
  selectedDay: string
  handleDayChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  isWordGuessed: (day: string) => boolean
}

const DaySelect = ({
  selectedDay,
  handleDayChange,
  isWordGuessed,
}: DaySelectProps) => {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
      aria-label="Choose day"
    >
      <label
        style={{
          fontWeight: 'bold',
        }}
        htmlFor="wordSelect"
      >
        Day{' '}
      </label>
      <div className="select">
        <select
          name="wordSelect"
          id="wordSelect"
          value={selectedDay}
          onChange={handleDayChange}
        >
          {WORD_PER_DAY.filter(
            (entry) => entry.day <= new Date().toISOString().split('T')[0]
          ).map((entry) => (
            <option key={entry.day} value={entry.day}>
              {transformDateToGermanFormat(entry.day)} -{' '}
              {isWordGuessed(entry.day) ? '✅' : '❌'}
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}

export default DaySelect
