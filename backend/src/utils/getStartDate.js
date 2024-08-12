module.exports = (currentDate, type) => {
  /**
   *
   * @param currentDate The current date to get the start date of the day/week/month/year.
   * @param type A string that represents the type of date to return. It can be 'day', 'week', 'month', or 'year'.
   * Returns start date of the day/week/month/year
   */
  const localDate = new Date(currentDate) // GMT +0
  
  const timeZone = localDate.getTimezoneOffset()
  const date = localDate.getTime()

  console.log(localDate)
  switch (type) {
    case 'day':
      return new Date(
        
      )
    case 'week':
      return new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay()
      )
    case 'month':
      return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    case 'year':
      return new Date(currentDate.getFullYear(), 0, 1)
    default:
      return new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      )
  }
}
