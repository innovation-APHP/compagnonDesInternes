export function fullDate(date, options) {
  const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
  const shortDays = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.']
  const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
  const shortMonths = ['jan.', 'fév.', 'mars', 'avril', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']

  const formattedDate = new Date(date)
  let dayName, month

  if (options && options.short) {
    dayName = shortDays[formattedDate.getDay()]
    month = shortMonths[formattedDate.getMonth()]
  }
  else {
    dayName = days[formattedDate.getDay()]
    month = months[formattedDate.getMonth()]
  }
  const day = formattedDate.getDate()

  const capitalize = word => {
    return word ? word.charAt(0).toUpperCase() + word.slice(1) : null
  }
  
  if (options && options.lowercase) return `${dayName} ${day} ${month}${options && options.year ? ` ${formattedDate.getFullYear()}` : ''}`
  else return `${capitalize(dayName) || dayName} ${day} ${month}${options && options.year ? ` ${formattedDate.getFullYear()}` : ''}`
}

export function miniDateTime(datetime) {
  const splittedDateTime = datetime.split('T')
  const date = splittedDateTime[0]
  const time = splittedDateTime[1]

  const splittedDate = date.split('-')
  const month = splittedDate[1]
  const day = splittedDate[2]

  const splittedTime = time.split(':')
  const hour = splittedTime[0]
  const minute = splittedTime[1]

  return `${day}/${month} à ${hour}:${minute}`
}

export function areSameDay(first, second) {
  first = new Date(first)
  second = new Date(second)
  return first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate()
}

export function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate()
}