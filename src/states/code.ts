import { atom } from 'recoil'
import type { Code } from 'types/code'
import * as yup from 'yup'

const sampleCode = `import React, {useEffect, useState} from 'react'

export default function App({initialCount} : {initialCount: number}) {
 const [count, setCount] = useState<number>(initialCount)
 useEffect(() => {
  //print size
  const node = document.getElementById('root')
  console.log(node.offsetWidth)
 }, [])

 return (<div>
    <button onClick={() => setCount(v => ++v)}>
      Click Me({count})
    </button>
  </div>)
}
`

const codeScheme = yup.object().shape({
  value: yup.string().required(),
  language: yup.string().required(),
})

function loadLastCode() {
  const codeStr = localStorage.getItem('code_theme_design.code')
  if (codeStr) {
    const codeObj = JSON.parse(codeStr)
    if (codeScheme.isValidSync(codeObj)) {
      return codeObj as Code
    }
  }
}

const codeState = atom<Code>({
  key: 'codeState',
  default: loadLastCode() ?? {
    value: sampleCode,
    language: 'typescript',
  },
})

export { codeState }
