// Create our number formatter.
export const formatter = (number) => new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
}).format(number)
/* $2,500.00 */

// convert formatted number back to number
export const numberString = (formattedNumber) => {
  return Number(formattedNumber.replace(/[^0-9.-]+/g,""))
}


