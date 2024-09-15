
const getStartDate = (filter) => {

   const localDate = new Date();
   const timezoneOffset =  -60000*420 // localDate.getTimezoneOffset() * 60000
   switch (filter) {
     case 'daily':
       return new Date(new Date(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()).getTime() - timezoneOffset)
     case 'weekly':
       return new Date(new Date(localDate.getFullYear(), localDate.getMonth(), localDate.getDay() - 6).getTime() - timezoneOffset )
     case 'monthly':
       return new Date(
         new Date(localDate.getFullYear(), localDate.getMonth(), 1).getTime() -
           timezoneOffset
       )
     case 'yearly':
       return new Date(
         new Date(localDate.getFullYear(), 0, 1).getTime() - timezoneOffset
       )
     default:
       throw new Error('Invalid filter')
   }


}


module.exports = {
 getStartDate
}