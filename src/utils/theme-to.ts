import type { Theme } from 'types/theme'

export function themeItemsToCSS(items: Theme['items']) {
  return Array.from(Object.values(items))
    .map((item) => {
      return `
${item.type === 'language' ? '.language-' + item.key : '.hljs-' + item.key} {
  color: ${item.color};
}`
    })
    .join('\n')
}

export function themeToHljs(theme: Theme) {
  return (
    `
.hljs {
  font-size: var(--code-font-size);
  background-color: var(--code-background-color);
  color: var(--code-font-color);
}
` + themeItemsToCSS(theme.items)
  )
}
