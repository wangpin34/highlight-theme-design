import { CaretDownIcon } from '@radix-ui/react-icons'
import { Box, Button, DropdownMenu } from '@radix-ui/themes'
import * as htmlToImage from 'html-to-image'
import { useRecoilValue } from 'recoil'
import { themeState } from 'states/theme'
import { Theme } from 'types/theme'

function getFrame() {
  return document.querySelector('#code-frame') as HTMLElement
}

function SavePNG() {
  const editor = getFrame()
  if (!editor) return
  htmlToImage
    .toPng(editor as HTMLElement)
    .then(function (dataUrl) {
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = `highlight-design.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error)
    })
}

function SaveSVG() {
  const editor = getFrame()
  if (!editor) return
  htmlToImage
    .toSvg(editor as HTMLElement)
    .then(function (dataUrl) {
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = `highlight-design.svg`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error)
    })
}

function downloadText(filename: string, text: string) {
  const element = document.createElement('a')
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  element.href = url
  element.download = filename
  element.click()
  URL.revokeObjectURL(url)
}

function dowloadThemeAsJSON(theme: Theme) {
  downloadText(
    'theme.json',
    JSON.stringify(
      {
        backgroundColor: theme.backgroundColor,
        color: theme.color,
        items: Array.from(theme.items.values()),
      },
      null,
      2
    )
  )
}

function dowloadThemeAsHighlightCSS(theme: Theme) {
  downloadText(
    'highlight-theme.css',
    `.hljs {
  background-color: ${theme.backgroundColor};
  color: ${theme.color};
}
${Array.from(theme.items.values())
  .map((item) => {
    return `
.hljs-${item.category} {
  color: ${item.color};
}
  `
  })
  .join('\n')}
    `
  )
}

export default function Header() {
  const theme = useRecoilValue(themeState)
  return (
    <>
      <header className="w-full fixed top-0">
        <Box>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="soft">
                New
                <CaretDownIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>New Blank</DropdownMenu.Item>
              <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger>Load</DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent>
                  <DropdownMenu.Item>From JSON</DropdownMenu.Item>
                  <DropdownMenu.Item>From Local</DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="soft">
                Export
                <CaretDownIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item onSelect={() => dowloadThemeAsJSON(theme)}>JSON</DropdownMenu.Item>
              <DropdownMenu.Item onSelect={() => dowloadThemeAsHighlightCSS(theme)}>CSS(highlight.js)</DropdownMenu.Item>
              <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger>Code Image</DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent>
                  <DropdownMenu.Item onSelect={SavePNG}>Export as PNG</DropdownMenu.Item>
                  <DropdownMenu.Item onSelect={SaveSVG}>Export as SVG</DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="soft">
                About
                <CaretDownIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>Version</DropdownMenu.Item>
              <DropdownMenu.Item>Author</DropdownMenu.Item>
              <DropdownMenu.Item>Why this project?</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Box>
      </header>
    </>
  )
}
