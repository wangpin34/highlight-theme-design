import { DefaultValue, atom, selector } from 'recoil'
import { Preferences } from 'types/site-preferences'
import { getSitePreferences } from 'utils/storage'

export const preferencesState = atom<Preferences>({
  key: 'preferencesState',
  default: getSitePreferences(),
})

export const darkState = selector<Preferences['dark']>({
  key: 'darkState',
  get: ({ get }) => {
    const p = get(preferencesState)
    return p.dark
  },
  set: ({ get, set }, newValue) => {
    if (newValue === null) {
      return // ignore
    }

    if (newValue instanceof DefaultValue) {
      // ignore
    } else {
      const p = get(preferencesState)
      set(preferencesState, {
        ...p,
        dark: newValue,
      })
    }
  },
})
