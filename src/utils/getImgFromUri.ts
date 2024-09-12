import { icons } from '@/src/constants/Icons'

export const getImg = (icon: string) => {
  for (let i = 0; i < icons.length; i++) {
    if (icons[i].name === icon) {
      return icons[i].image
    }
  }
}
