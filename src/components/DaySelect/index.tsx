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
    <section aria-label="Choose day">
      <select
        style={{
          padding: '0.5rem',
        }}
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
    </section>
  )
}

export default DaySelect
