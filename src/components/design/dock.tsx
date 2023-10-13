import { MaterialSymbolsDownloadForOfflineOutline, MaterialSymbolsCodeBlocksOutline } from 'components/icons/material'
import * as polished from 'polished'
import { downloadHljs } from 'utils/download'
import { themeState } from 'states/theme'
import { useCallback} from 'react'
import { modeState, Mode } from 'states/action'
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil'

export default function Dock() {
  const theme = useRecoilValue(themeState)
  const setMode = useSetRecoilState(modeState)
  const onEdit = useCallback(() => {
    setMode(Mode.Edit)
  }, [setMode])
  const onDownload = useRecoilCallback(({snapshot}) => async () => {
    const theme = snapshot.getLoadable(themeState).getValue()
    downloadHljs(theme)
  }, [])
  return <div className="fixed bottom-0 w-full px-2 flex justify-center items-center">
    <div className="rounded-xl p-2 w-full flex justify-center items-center gap-8" style={{backgroundColor: polished.darken(0.1, theme.backgroundColor)}}>
       <button className="w-[48px] h-[48px] rounded-lg text-sm" style={{backgroundColor: theme.color, color: theme.backgroundColor}}>
          Font
      </button>
      <button className="w-[48px] h-[48px] rounded-lg text-sm " style={{backgroundColor: theme.backgroundColor, color: theme.color}}>
          Bg
      </button>
      <button onClick={onEdit} className="rounded-lg p-1 w-12 h-12 flex justify-center items-center" style={{backgroundColor: polished.darken(0.05, theme.backgroundColor)}}>
          <MaterialSymbolsCodeBlocksOutline  color={polished.lighten(0.1, theme.color)}/>
        </button>
        <button onClick={onDownload} className="rounded-lg p-1 w-12 h-12 flex justify-center items-center" style={{backgroundColor: polished.darken(0.05, theme.backgroundColor) }}>
          <MaterialSymbolsDownloadForOfflineOutline color={polished.lighten(0.1, theme.color)}/>
        </button>
      </div>
  </div>
}