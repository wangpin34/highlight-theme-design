import { DefaultValue, atom, selector } from 'recoil'
import type { Item, Theme } from 'types/theme'

export const themeState = atom<Theme>({
  key: 'themeState',
  default: { backgroundColor: '#fff', color: '#1a2a3a', items: new Map() },
})

export const baseState = selector<Omit<Theme, 'items'>>({
  key: 'baseState',
  get: ({ get }) => {
    const theme = get(themeState)
    return {
      backgroundColor: theme.backgroundColor,
      color: theme.color,
    }
  },
  set: ({ get, set }, newValue) => {
    if (newValue === null) {
      return // ignore
    }

    if (newValue instanceof DefaultValue) {
      // ignore
    } else {
      const theme = get(themeState)
      set(themeState, {
        ...theme,
        ...newValue,
      })
    }
  },
})

export const currentItemKeyState = atom<string | null>({
  key: 'currentItemKeyState',
  default: null,
})

export const currentItemState = selector<Item | null>({
  key: 'currentItemState',
  get: ({ get }) => {
    const key = get(currentItemKeyState)
    const theme = get(themeState)
    if (key !== null) {
      return theme.items.get(key) ?? { category: key, color: theme.color }
    }
    return null
  },
  set: ({ get, set }, newValue) => {
    if (newValue === null) {
      return // ignore
    }

    if (newValue instanceof DefaultValue) {
      // ignore
    } else {
      const theme = get(themeState)
      const items = new Map(theme.items)
      items.set(newValue.category, newValue)
      set(themeState, {
        ...theme,
        items,
      })
    }
  },
})
