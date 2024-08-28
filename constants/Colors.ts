
export const Colors = {
  primary: '#50C474',
  gray: '#898989',
  black: '#303841',
  danger: '#E52222',
  lightBlue: '#94C3F6',
  disabledBtn: '#C1C9D1',
  firstCategory: '#94C3F6',
  secondCategory: '#559BE6',
  thirdCategory: '#50C474',
  fourthCategory: '#94EDF7',
}

export enum IconName {
  Food = 'food',
  Grocery = 'cart-variant',
  Transport = 'bus-multiple',
  Health = 'heart-pulse',
  Shopping = 'cart-outline',
  Entertainment = 'video-4k-box',
  Beauty = 'lipstick',
  Bill = 'file-document-outline',
  Home = 'home',
  Family = 'account-group-outline',
  Invest = 'chart-line',
  Allowance = 'hand-heart-outline',
  Interest = 'chart-multiple',
  Bonus = 'flower-pollen',
  Salary = 'account-cash-outline'
}

export const CategorieColors = ['#94C3F6', '#559BE6', '#50C474', '#94EDF7']

interface Map {
  [key: string]: string | undefined
}


export const IconColor: Map = {
  [IconName.Food]: '#FF5900',
  [IconName.Grocery]: '#20A50A',
  [IconName.Transport]: '#559BE6',
  [IconName.Health]: '#FF0000',
  [IconName.Shopping]: '#FF5900',
  [IconName.Entertainment]: '#FF0000',
  [IconName.Beauty]: '#FFC0CB',
  [IconName.Bill]: '#20A50A',
  [IconName.Home]: '#800080',
  [IconName.Family]: '#FFC0CB',
  [IconName.Invest]: '#F3C07B',
  [IconName.Allowance]: '#800080',
  [IconName.Interest]: '#FFA500',
  [IconName.Bonus]: '#FF0000',
  [IconName.Salary]: '#50C474',
}


export const CategoryTitleColors: Map = {
  'Living expenses': '#FFA500',
  'Incidental expenses': '#878306',
  'Fixed expenses': '#94C3F6',
  'Investment - Saving': '#50C474',
}

export const CategoryBGColors: Map = {
  'Living expenses': '#fff2db',
  'Incidental expenses': '#eeeedc',
  'Fixed expenses': '#e3effd',
  'Investment - Saving': '#e5f6ea',
}