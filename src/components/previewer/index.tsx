import { Box } from '@radix-ui/themes'
import hljs from 'highlight.js'
import { useRecoilValue } from 'recoil'
import { cssState } from 'states/theme'
import Options from './options'

const sampleCode = `
  import React from 'react'
`

const html = hljs.highlightAuto(sampleCode).value

export default function Previewer() {
  const css = useRecoilValue(cssState)
  return (
    <Box className="h-full flex flex-col bg-white ">
      <Options />
      <Box py="4" className="grow shadow-xl">
        <style>{css}</style>
        <pre>
          <code dangerouslySetInnerHTML={{ __html: html }}></code>
        </pre>
      </Box>
    </Box>
  )
}
