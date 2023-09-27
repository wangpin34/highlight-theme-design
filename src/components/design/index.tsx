import classnames from 'classnames'
import hljs from 'highlight.js'
import { darken, lighten } from 'polished'
import React, { ComponentType, useMemo } from 'react'
import * as prod from 'react/jsx-runtime'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import rehypeParse from 'rehype-parse'
import rehypeReact from 'rehype-react'
import { currentItemKeyState, themeState } from 'states/theme'
import { unified } from 'unified'
import BaseDesign from './base-design'
import ItemDesign from './item-design'

function Span({ children, className }: { children: React.ReactNode; className?: string }) {
  const setCurrentItemKey = useSetRecoilState(currentItemKeyState)
  const multiChild = useMemo(() => children instanceof Array, [children])
  const category = useMemo(() => {
    return (
      className
        ?.split(' ')
        .find((e) => e.indexOf('hljs-') === 0)
        ?.substring('hljs-'.length) ?? 'unknown'
    )
  }, [className])
  const myChildren = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (typeof child === 'string') {
        return (
          <span
            className={classnames(className, {
              'hover:outline-1 hover:outline-pink-600 hover:outline-dashed hover:outline-offset-2 cursor-pointer rounded': true,
            })}
            data-category={category}
            onClick={() => category && setCurrentItemKey(category)}
          >
            {child}
          </span>
        )
      }
      return child
    })
  }, [children, className, setCurrentItemKey, category])

  if (!multiChild) {
    return (
      <span
        className={classnames(className, {
          'hover:outline-1 hover:outline-pink-600 hover:outline-dashed hover:outline-offset-2 cursor-pointer rounded': true,
        })}
        data-category={category}
        onClick={() => category && setCurrentItemKey(category)}
      >
        {children}
      </span>
    )
  }
  return <span>{myChildren}</span>
}

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

const sampleCode = `
import React, {useEffect, useState} from 'react'

export default function App({initialCount}) {
 const [count, setCount] = useState(initialCount)
 useEffect(() => {
  //print size
  const node = document.getElementById('root')
  console.log(node.offsetWidth)
 }, [])

 return (<div>
    <button onClick={() => setCount(v => ++v)}>Click Me({count})</button>
  </div>)
}
`

const html = hljs.highlight(sampleCode, { language: 'javascript' }).value

export default function Previewer() {
  const theme = useRecoilValue(themeState)

  const css = useMemo(() => {
    return `
      .hljs {
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
  }, [theme])
  const codeChildren = useMemo(() => {
    return processor.processSync(html).result.props.children
  }, [])
  return (
    <>
      <div className="fixed top-[32px] left-0 w-fit min-w-[120px]  h-full border-r-2 border-slate-200 border-solid bg-white">
        <BaseDesign />
      </div>
      <div className="w-full h-full flex justify-center items-center" style={{ backgroundColor: darken(0.2, theme.backgroundColor) }}>
        <div>
          <style>{css}</style>
          <pre
            className="hljs overflow-auto p-8 rounded-xl"
            style={{
              //border: `1px solid ${darken(0.3, theme.backgroundColor)}`,
              boxShadow: `0 0 4px 1px ${lighten(0.4, theme.backgroundColor)}`,
            }}
            id="code-frame"
          >
            <code>{codeChildren}</code>
          </pre>
        </div>
      </div>
      <div className="fixed top-[32px] right-0 w-fit min-w-[200px] h-full border-l-2 border-slate-200 border-solid bg-white">
        <ItemDesign />
      </div>
    </>
  )
}
