export function convertDateToLongFormat(date) {
  // '2017-01-31' => 'Tuesday, January 31, 2017'

  const dateObj = new Date(date)

  // Ignore timezones to fix off-by-one error
  dateObj.setMinutes(dateObj.getMinutes() + dateObj.getTimezoneOffset())

  return dateObj.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
    year: 'numeric',
  })
}

export function convertDateToTitleFormat(date) {
  // '2017-01-31' => 'JAN 31'
  const month = Number(date.slice(5, 7))
  const day = date.slice(-2)

  const months = [
    '',
    'JAN',
    'FEB',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUG',
    'SEPT',
    'OCT',
    'NOV',
    'DEC',
  ]

  return `${months[month]} ${day}`
}

export function hasDatePassed(legislativeDateString) {
  // Set legislative time at 2pm PST
  const [year, month, day] = legislativeDateString.split('-').map(Number)
  const legislativeDate = new Date(year, month - 1, day, 16)

  return new Date() > legislativeDate
}
