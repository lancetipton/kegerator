import { tapColors } from './tapColors'
import { get } from '@ltipton/jsutils'

export const appHeader = {
  default: {
    container: {
      $all: {
        backgroundColor: get(tapColors, 'backGround'),
      },
    },
  }
}