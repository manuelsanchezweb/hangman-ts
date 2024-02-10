// Define an interface for word entries to ensure type safety
interface WordEntry {
  word: string
  day: string // Use ISO date strings for easy comparison and handling
}

// Example words mapped to specific dates
export const WORD_PER_DAY: WordEntry[] = [
  {
    word: 'able',
    day: '2024-02-05',
  },
  {
    word: 'about',
    day: '2024-02-06',
  },
  // Add more words for future days here
]
