import type { Theme } from 'types/theme'
import { themeItemsToCSS } from './theme-to'

export function downloadText(text: string, { filename, type }: { filename?: string; type?: string }) {
  const blob = new Blob([text], { type: type ?? 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename ?? 'unknown.txt'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function downloadHljs(theme: Theme) {
  const hljs =
    `
.hljs {
  background-color: ${theme.backgroundColor};
  color: ${theme.color};
}
` + themeItemsToCSS(theme.items)
  downloadText(hljs, { filename: 'highlight-theme.css', type: 'text/css' })
}
