/**
 * Convert date to a readable string
 * @param {Date} date
 * @returns {string}
 */
export function readableDate(date?: Date): string {
  if (!date) date = new Date();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours() >= 12 ? date.getHours() - 12 : date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? 'pm' : 'am';

  return `${monthNames[monthIndex]} ${day}, ${year} ${hours}:${minutes}:${seconds} ${ampm}`;
}
