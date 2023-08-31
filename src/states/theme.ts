import idea from 'constants/theme-idea.css'
import { atom } from 'recoil'

export const initialCSSState = atom<string>({
  key: 'initialCSSState',
  default: idea,
})

export const cssState = atom<string>({
  key: 'cssState',
  default: idea,
})
