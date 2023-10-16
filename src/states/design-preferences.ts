import { atom } from 'recoil'

export interface Preferences {
  fontSize: number
}

export const designPreferencesState = atom<Preferences>({
  key: 'designPreferencesState',
  default: {
    fontSize: 14
  }
})