import { Box, Button, DropdownMenu, Flex, Switch, Text, TextField } from '@radix-ui/themes'
import classnames from 'classnames'
import ColorPicker from 'components/color-picker'
import { useCallback } from 'react'
import { useRecoilCallback, useRecoilState } from 'recoil'
import { Mode, modeState, showTokensState } from 'states/action'
import { designPreferencesState } from 'states/design-preferences'
import { themeState } from 'states/theme'
import { downloadHljs, downloadText } from 'utils/download'
import styles from './dock.module.css'

export default function Dock() {
  const [theme, setTheme] = useRecoilState(themeState)
  const [showTokens, setShowTokens] = useRecoilState(showTokensState)
  const [dPreferences, setPreferences] = useRecoilState(designPreferencesState)
  const setThemeFontColor = useRecoilCallback(
    ({ snapshot }) =>
      async (color: string) => {
        const theme = snapshot.getLoadable(themeState).getValue()
        setTheme({ ...theme, color })
      },
    []
  )
  const setThemeBgColor = useRecoilCallback(
    ({ snapshot }) =>
      async (backgroundColor: string) => {
        const theme = snapshot.getLoadable(themeState).getValue()
        setTheme({ ...theme, backgroundColor })
      },
    []
  )
  const [mode, setMode] = useRecoilState(modeState)
  const onToggle = useCallback(() => {
    setMode(mode === Mode.Design ? Mode.Edit : Mode.Design)
  }, [setMode, mode])
  const onToggleShowTokens = useCallback(() => {
    setShowTokens((c) => !c)
  }, [setShowTokens])
  const onExportHljs = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const theme = snapshot.getLoadable(themeState).getValue()
        downloadHljs(theme)
      },
    []
  )
  const onExportThemeJSON = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const theme = snapshot.getLoadable(themeState).getValue()
        downloadText(JSON.stringify(theme, null, 2), { filename: 'code-theme.json', type: 'text/json' })
      },
    []
  )
  return (
    <Box className="fixed bottom-2 w-full flex justify-center">
      <Box className={classnames('min-w-[400px] p-4 flex gap-4 justify-center items-center rounded-xl shadow-2xl', styles.dock)}>
        <Box id="theme-root-properties" className="flex flex-col justify-center h-full w-min-fit p-2 rounded-lg shadow-md">
          <Flex gap="2">
            <ColorPicker color={theme.color} onChange={(color) => setThemeFontColor(color)} />
            <Text size="2">Font Color</Text>
          </Flex>
          <Flex gap="2">
            <ColorPicker color={theme.backgroundColor} onChange={(color) => setThemeBgColor(color)} />
            <Text size="2">Background</Text>
          </Flex>
        </Box>
        <Box id="preview-preferences" className="h-full w-[300px] grid grid-rows-2 grid-cols-2 items-center p-2 rounded-lg shadow-md">
          <Text as="label" size="2">
            <Flex gap="2">
              <Switch defaultChecked checked={mode === Mode.Edit} onClick={() => onToggle()} /> Edit Mode
            </Flex>
          </Text>
          <Text as="label" size="2">
            <Flex gap="2">
              <Switch defaultChecked checked={showTokens} onClick={() => onToggleShowTokens()} /> Show Tokens
            </Flex>
          </Text>
          <Text>
            <Flex gap="2" align="center">
              <button onClick={() => setPreferences({ ...dPreferences, fontSize: dPreferences.fontSize - 1 })} style={{ lineHeight: 0 }}>
                <Text className="material-symbols-outlined" size="2">
                  text_decrease
                </Text>
              </button>
              <TextField.Root>
                <TextField.Input
                  placeholder="font size"
                  value={dPreferences.fontSize}
                  onChange={(e) => {
                    const next = parseInt(e.target.value)
                    if (!Number.isNaN(next)) {
                      setPreferences({ ...dPreferences, fontSize: next })
                    }
                  }}
                />
              </TextField.Root>
              <button onClick={() => setPreferences({ ...dPreferences, fontSize: dPreferences.fontSize + 1 })} style={{ lineHeight: 0 }}>
                <Text className="material-symbols-outlined" size="2">
                  text_increase
                </Text>
              </button>
            </Flex>
          </Text>
        </Box>
        <Box id="actions" className="w-min-fit h-full p-2 rounded-lg shadow-md">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="surface">Export</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item onClick={onExportHljs}>Export Highlight CSS</DropdownMenu.Item>
              <DropdownMenu.Item onClick={onExportThemeJSON}>Export Theme as JSON</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Box>
      </Box>
    </Box>
  )
}
