
import { Text, Switch, Flex, TextField} from '@radix-ui/themes'
import ColorPicker from 'components/color-picker'
import { downloadHljs } from 'utils/download'
import { themeState } from 'states/theme'
import { useCallback} from 'react'
import { modeState, Mode } from 'states/action'
import { designPreferencesState } from 'states/design-preferences'
import { useRecoilCallback, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

export default function Dock() {
  const [theme, setTheme] = useRecoilState(themeState)
  const [dPreferences, setPreferences] = useRecoilState(designPreferencesState)
  const setThemeFontColor = useRecoilCallback(({snapshot}) => async (color: string) => {
    const theme = snapshot.getLoadable(themeState).getValue()
    setTheme({...theme, color})
  }, [])
   const setThemeBgColor = useRecoilCallback(({snapshot}) => async (backgroundColor: string) => {
    const theme = snapshot.getLoadable(themeState).getValue()
    setTheme({...theme, backgroundColor})
  }, [])
  const [mode, setMode] = useRecoilState(modeState)
  const onToggle = useCallback(() => {
      setMode(mode === Mode.Design ? Mode.Edit : Mode.Design)
  }, [setMode, mode])
  const onDownload = useRecoilCallback(({snapshot}) => async () => {
    const theme = snapshot.getLoadable(themeState).getValue()
    downloadHljs(theme)
  }, [])
  return <div className="fixed bottom-0 w-full flex justify-center">
    <div className="w-min-fit p-4 flex gap-4 justify-center items-center bg-slate-100 rounded-xl shadow-xl ">
    <div id="theme-root-properties" className="flex flex-col justify-center h-full w-min-fit p-2 rounded-lg shadow-md bg-slate-50">
      <Flex >
        <ColorPicker color={theme.color} onChange={(color) => setThemeFontColor(color)} />
        <span>Font Color</span>
      </Flex>
      <Flex>
        <ColorPicker color={theme.backgroundColor} onChange={(color) => setThemeBgColor(color)} />
        <span>Background</span>
      </Flex>
      </div>
      <div id="preview-preferences" className="h-full w-[150px] grid grid-rows-2 p-2 rounded-lg shadow-md bg-slate-50">
        <Text as="label" size="2">
          <Flex gap="2">
            <Switch defaultChecked  checked={mode === Mode.Edit} onClick={() => onToggle()}/> Edit Mode
          </Flex>
        </Text>
        <Text>
          <Flex gap="2" align="center">
            <button onClick={() => setPreferences({...dPreferences, fontSize: dPreferences.fontSize - 1})} style={{lineHeight: 0}}>
            <span className="material-symbols-outlined text-md">
            text_decrease
            </span>
            </button>
            <TextField.Root>
           <TextField.Input placeholder="font size" value={dPreferences.fontSize} onChange={(e) => {
            const next = parseInt(e.target.value)
            if (!Number.isNaN(next)) {
              setPreferences({...dPreferences, fontSize: next})
            }
            }} />
          </TextField.Root>
           <button onClick={() => setPreferences({...dPreferences, fontSize: dPreferences.fontSize + 1})} style={{lineHeight: 0}}>
            <span className="material-symbols-outlined text-md">
            text_increase 
            </span>
            </button>
          </Flex>
        </Text>
      </div>
      <div id="actions" className="w-min-[100px] p-2 rounded-lg shadow-md bg-slate-50">
      </div>
  </div>
  </div>
}