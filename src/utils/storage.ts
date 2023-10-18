import type { Code } from 'types/code'
import type { Preferences } from 'types/site-preferences'
import type { Theme } from 'types/theme'
import * as yup from 'yup'

const sitePreferencesScheme = yup.object().shape({
  dark: yup.boolean(),
})

const PREFIX = 'codetheme.storage'
const SITE_PREFERENCES = 'site_preferences'

const defaultSitePreferences = {
  dark: false,
}

export function getSitePreferences() {
  const pStr = localStorage.getItem(`${PREFIX}.${SITE_PREFERENCES}`)
  if (pStr) {
    const preferences = JSON.parse(pStr)
    if (sitePreferencesScheme.isValidSync(preferences)) {
      return preferences as Preferences
    }
  }
  return defaultSitePreferences
}

export function setSitePreferences(p: Preferences) {
  localStorage.setItem(`${PREFIX}.${SITE_PREFERENCES}`, JSON.stringify(p))
}

const CODE = 'code'
const defaultCodeStr = `import React, {useEffect, useState} from 'react'

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

const defaultCode: Code = {
  value: defaultCodeStr,
  language: 'typescript',
}

const codeScheme = yup.object().shape({
  value: yup.string().required(),
  language: yup.string().required(),
})

export function getCode() {
  const codeStr = localStorage.getItem(`${PREFIX}.${CODE}`)
  if (codeStr) {
    const codeObj = JSON.parse(codeStr)
    if (codeScheme.isValidSync(codeObj)) {
      return codeObj as Code
    }
  }
  return defaultCode
}

export function setCode(code: Code) {
  localStorage.setItem(`${PREFIX}.${CODE}`, JSON.stringify(code))
}

const THEME = 'theme'
const themeScheme = yup.object().shape({
  backgroundColor: yup.string().required(),
  color: yup.string().required(),
  items: yup.object(),
})

const itemScheme = yup.object().shape({
  key: yup.string().required(),
  type: yup.string().oneOf(['language', 'general']),
  color: yup.string().required(),
})

const defaultTheme: Theme = { backgroundColor: '#fff', color: '#1a2a3a', items: {} }
export function getTheme() {
  const themeStr = localStorage.getItem(`${PREFIX}.${THEME}`)
  if (themeStr) {
    const theme = JSON.parse(themeStr)
    if (themeScheme.isValidSync(theme)) {
      const themeObj = theme as Theme
      if (themeObj.items?.length) {
        const item = themeObj.items[0]
        if (itemScheme.isValidSync(item)) {
          return themeObj
        }
      }
      return themeObj
    }
  }
  return defaultTheme
}

export function setTheme(theme: Theme) {
  localStorage.setItem(`${PREFIX}.${THEME}`, JSON.stringify(theme))
}
