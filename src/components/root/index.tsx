import { themeState } from "states/theme";
import { darken } from 'polished'
import { designPreferencesState } from "states/design-preferences";
import { useRecoilValue } from "recoil";
import { useMemo } from 'react'
import Dock from 'components/dock'
import Design from 'components/design'
import Header from 'components/header'
import ItemDesign from 'components/item-design'

export default function Root() {
  const theme = useRecoilValue(themeState)
  const preferences = useRecoilValue(designPreferencesState)
  const style = useMemo(() => ({
    '--code-background-color': theme.backgroundColor,
    '--code-font-size': preferences.fontSize + 'px',
    '--code-font-color': theme.color
  }), [theme, preferences])
  return <>

  <Header />
  <div className="w-full h-full" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', backgroundColor: darken(0.2, theme.backgroundColor), ...style }}>
    <div></div>
    <Design />
     <ItemDesign />
  </div>
  <Dock />
  </>
}