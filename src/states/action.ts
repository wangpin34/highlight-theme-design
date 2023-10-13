import { atom, selector } from 'recoil'

export enum Mode {
  Design = 'design',
  Edit = 'edit'
}

export const modeState = atom({
  key: 'modeState',
  default: Mode.Design
})

export const isEditModeState = selector({
  key: 'isEditModeState',
  get: ({ get }) => {
    const modeStateValue = get(modeState)
    return modeStateValue === Mode.Edit
  },
})