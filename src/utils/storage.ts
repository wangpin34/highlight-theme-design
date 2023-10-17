import { Preferences } from 'types/site-preferences'
import * as yup from 'yup'

const sitePreferencesSchema = yup.object().shape({
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
    if (sitePreferencesSchema.isValidSync(preferences)) {
      return preferences as Preferences
    }
  }
  return defaultSitePreferences
}

export function setSitePreferences(p: Preferences) {
  localStorage.setItem(`${PREFIX}.${SITE_PREFERENCES}`, JSON.stringify(p))
}
