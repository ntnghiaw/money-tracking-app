export const PasswordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
export const EmailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
export const PhoneNumberRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
export const AmountRegExp = /^\d+(\.\d{1,3})?$/
export const NumberRegExp = /^\d+$/
export const AlphabetRegExp = /^[a-zA-Z]+$/