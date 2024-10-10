import { icons } from '@/constants/Icons'
import { walletIcons } from '@/constants/Icons'

export const getImg = (icon: string) => {
  for (let i = 0; i < icons.length; i++) {
    if (icons[i].name === icon) {
      return icons[i].image
    }
  }
}

export const getWaleltImg = (icon: string) => {
  for (let i = 0; i < walletIcons.length; i++) {
    if (walletIcons[i].name === icon) {
      return walletIcons[i].image
    }
  }
}
