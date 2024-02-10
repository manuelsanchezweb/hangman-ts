/**
 * Transforms a date string from "YYYY-MM-DD" format to "DD.MM.YYYY" format.
 *
 * @param date - A string representing the date in "YYYY-MM-DD" format.
 * @returns A string representing the date in "DD.MM.YYYY" format.
 */
export function transformDateToGermanFormat(date: string): string {
  // Split the input date string by "-" to separate year, month, and day.
  const parts = date.split('-')

  // Reorder the parts to "DD.MM.YYYY" format and join them with ".".
  return `${parts[2]}.${parts[1]}.${parts[0]}`
}
