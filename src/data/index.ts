/**
 * Define the structure of the word entry
 */
interface WordEntry {
  word: string
  day: string // Use ISO date strings for easy comparison and handling
}

/**
 * Define the list of words to guess, one for each day
 */
export const WORD_PER_DAY: WordEntry[] = [
  {
    word: 'able',
    day: '2024-02-05',
  },
  {
    word: 'about',
    day: '2024-02-06',
  },
  {
    word: 'person',
    day: '2024-02-07',
  },
  {
    word: 'monster',
    day: '2024-02-08',
  },
  {
    word: 'luxury',
    day: '2024-02-09',
  },
  {
    word: 'lovely',
    day: '2024-02-10',
  },
  {
    word: 'stressful',
    day: '2024-02-11',
  },
  {
    word: 'birthday',
    day: '2024-02-12',
  },
  {
    word: 'luck',
    day: '2024-02-13',
  },
  {
    word: 'valentine',
    day: '2024-02-14',
  },
  {
    word: 'crisis',
    day: '2024-02-15',
  },
  {
    word: 'time',
    day: '2024-02-16',
  },
  {
    word: 'mirror',
    day: '2024-02-17',
  },
  {
    word: 'able',
    day: '2024-02-18',
  },
  {
    word: 'reliable',
    day: '2024-02-19',
  },
  {
    word: 'sunshine',
    day: '2024-02-20',
  },
  {
    word: 'daylight',
    day: '2024-02-21',
  },
  {
    word: 'scary',
    day: '2024-02-22',
  },
  {
    word: 'movie',
    day: '2024-02-23',
  },
  {
    word: 'pineapple',
    day: '2024-02-24',
  },
  {
    word: 'fearless',
    day: '2024-02-25',
  },
  {
    word: 'balloon',
    day: '2024-02-26',
  },
  {
    word: 'courage',
    day: '2024-02-27',
  },
  {
    word: 'festival',
    day: '2024-02-28',
  },
  {
    word: 'exception',
    day: '2024-02-29',
  },
  {
    word: 'march',
    day: '2024-03-01',
  },
]
