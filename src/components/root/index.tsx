import { Box } from '@radix-ui/themes'
import Design from 'components/design'
import Dock from 'components/dock'
import Header from 'components/header'
import ItemDesign from 'components/item-design'
import { darken } from 'polished'
import { useEffect, useMemo } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { designPreferencesState } from 'states/design-preferences'
import { preferencesState as sitePreferencesState } from 'states/site-preferences'
import { themeState } from 'states/theme'
import { setSitePreferences, setTheme } from 'utils/storage'

export default function Root() {
  const theme = useRecoilValue(themeState)
  const preferences = useRecoilValue(designPreferencesState)
  const style = useMemo(
    () => ({
      '--code-background-color': theme.backgroundColor,
      '--code-font-size': preferences.fontSize + 'px',
      '--code-font-color': theme.color,
    }),
    [theme, preferences]
  )
  const persitState = useRecoilCallback(({ snapshot }) => async () => {
    const theme = await snapshot.getPromise(themeState)
    const sitePreferences = await snapshot.getPromise(sitePreferencesState)
    setTheme(theme)
    setSitePreferences(sitePreferences)
  })
  useEffect(() => {
    window.addEventListener('unload', () => {
      persitState()
    })
  })
  return (
    <Box className="w-full h-full pt-[64px] mx-auto">
      <Header />
      <Box className="w-full h-full" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', ...style }}>
        <Box></Box>
        <div className="h-full flex items-center">
          <div className="p-8 rounded-2xl" style={{ backgroundColor: darken(0.2, theme.backgroundColor) }}>
            <Design />
          </div>
        </div>
        <ItemDesign />
      </Box>
      <Dock />
    </Box>
  )
}
