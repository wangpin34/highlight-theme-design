import rehypeParse from 'rehype-parse'
import rehypeReact from 'rehype-react'
import { unified } from 'unified'
import React, { ComponentType } from 'react'
import * as prod from 'react/jsx-runtime'
import Span from './span'

const processor = unified()
  .use(rehypeParse, {
    fragment: true,
  })
  .use(
    rehypeReact,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    {
      createElement: React.createElement,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      Fragment: prod.Fragment,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      jsx: prod.jsx,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      jsxs: prod.jsxs,
      components: {
        span: Span as ComponentType<JSX.IntrinsicElements['span']>,
      },
    }
  )

export default processor