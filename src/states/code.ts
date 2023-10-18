import { atom } from 'recoil'
import type { Code } from 'types/code'
import { getCode } from 'utils/storage'

const codeState = atom<Code>({
  key: 'codeState',
  default: getCode(),
})

export { codeState }
