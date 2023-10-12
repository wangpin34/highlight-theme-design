import classnames from 'classnames'
import hljs from 'highlight.js'
import { darken, lighten } from 'polished'
import React, { ComponentType, useMemo, useState, useLayoutEffect, useCallback, useRef } from 'react'
import * as prod from 'react/jsx-runtime'
import { useRecoilValue, useRecoilState } from 'recoil'
import rehypeParse from 'rehype-parse'
import rehypeReact from 'rehype-react'
import { currentItemKeyState, themeState } from 'states/theme'
import { codeState } from 'states/code'
import { unified } from 'unified'
import BaseDesign from './base-design'
import ItemDesign from './item-design'
import './index.css'

function Span({ children, className }: { children: React.ReactNode; className?: string }) {
  const [, setCurrentItemKey] = useRecoilState(currentItemKeyState)
  const multiChild = useMemo(() => children instanceof Array, [children])
  const category = useMemo(() => {
    const segmentCateogry = className
      ?.split(' ')
      .find((e) => e.indexOf('hljs-') === 0)
      ?.substring('hljs-'.length)
    const language = className
      ?.split(' ')
      .find((e) => e.indexOf('language-') === 0)
      ?.substring('language-'.length)
    return language ?? segmentCateogry
  }, [className])
  const myChildren = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (typeof child === 'string') {
        return (
          <span
            className={classnames(
              className,
              'hover:outline-1 hover:outline-pink-600 hover:outline-dashed hover:outline-offset-2 cursor-pointer rounded'
            )}
            data-category={category}
            onClick={(e) => {
              e.stopPropagation()
              category && setCurrentItemKey(category)
            }}
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
        className={classnames(
          className,
          'hover:outline-1 hover:outline-pink-600 hover:outline-dashed hover:outline-offset-2 cursor-pointer rounded'
        )}
        data-category={category}
        onClick={(e) => {
          e.stopPropagation()
          category && setCurrentItemKey(category)
        }}
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

export function MaterialSymbolsEditSquareOutline(props: { color: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" {...props}>
      <path
        fill="currentColor"
        d="M5 23.7q-.825 0-1.413-.587T3 21.7v-14q0-.825.588-1.413T5 5.7h8.925l-2 2H5v14h14v-6.95l2-2v8.95q0 .825-.588 1.413T19 23.7H5Zm7-9Zm4.175-8.425l1.425 1.4l-6.6 6.6V15.7h1.4l6.625-6.625l1.425 1.4l-7.2 7.225H9v-4.25l7.175-7.175Zm4.275 4.2l-4.275-4.2l2.5-2.5q.6-.6 1.438-.6t1.412.6l1.4 1.425q.575.575.575 1.4T22.925 8l-2.475 2.475Z"
      ></path>
    </svg>
  )
}

export function MaterialSymbolsCheckCircleOutline(props: { color: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" {...props}>
      <path
        fill="currentColor"
        d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4l4.25 4.25ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
      ></path>
    </svg>
  )
}

export default function Previewer() {
  const [editMode, setEditMode] = useState<boolean>(false)
  const theme = useRecoilValue(themeState)
  const [code, setCode] = useRecoilState(codeState)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const html = useMemo(() => {
    if (code.language && code.language !== 'auto') {
      return hljs.highlight(code.value, { language: code.language }).value
    }
    return hljs.highlightAuto(code.value).value
  }, [code])
  const [currentItemKey, setCurrentItemKey] = useRecoilState(currentItemKeyState)
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
  useLayoutEffect(() => {
    if (currentItemKey) {
      const listener = () => {
        console.log('set current item key to null')
        setCurrentItemKey(null)
      }
      document.addEventListener('click', listener, { once: true })
      return () => {
        document.removeEventListener('click', listener)
      }
    }
  }, [currentItemKey, setCurrentItemKey])
  const codeChildren = useMemo(() => {
    return processor.processSync(html).result.props.children
  }, [html])
  const onInput = useCallback((e: React.FormEvent<HTMLTextAreaElement>) => {
    const ta = e.target as HTMLTextAreaElement
    ta.style.height = ta.scrollHeight + 'px'
  }, [])
  const frameStyle = {
    backgroundColor: theme.backgroundColor,
    boxShadow: `0 0 4px 1px ${editMode ? 'blue' : lighten(0.4, theme.backgroundColor)}`,
  }

  useLayoutEffect(() => {
    if (editMode) {
      textareaRef.current?.focus()
    }
  }, [editMode])

  return (
    <>
      <div className="w-full pr-[200px] h-full overflow-auto" style={{ backgroundColor: darken(0.2, theme.backgroundColor) }}>
        <div className="w-full h-full flex justify-center items-center min-w-min px-[40px]" data-current-item-key={currentItemKey}>
          <style>{css}</style>
          <div className="container">
            <div className="tool-bar flex justify-end">
              {editMode ? (
                <>
                  <button onClick={() => setEditMode(false)}>
                    <MaterialSymbolsCheckCircleOutline color={theme.color} />
                  </button>
                </>
              ) : (
                <button onClick={() => setEditMode(true)}>
                  <MaterialSymbolsEditSquareOutline color={theme.color} />
                </button>
              )}
            </div>
            <div className="rounded-xl min-w-[320px] p-[20px]" style={frameStyle as React.CSSProperties}>
              {!editMode ? (
                <pre data-language={code.language}>
                  <div className="hljs code-frame text-[14px] leading-normal">{codeChildren}</div>
                </pre>
              ) : (
                <div className="editor">
                  <textarea
                    ref={textareaRef}
                    value={code.value}
                    style={{ color: theme.color }}
                    tabIndex={-1}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    autoCapitalize="off"
                    className={classnames('text-[14px] leading-normal', { 'pointer-events-none': !editMode })}
                    onChange={(e) => setCode((current) => ({ ...current, value: e.target.value, language: 'auto' }))}
                    onInput={(e) => onInput(e)}
                  />
                  <div className="editor-formatted hljs text-[14px] leading-normal" dangerouslySetInnerHTML={{ __html: html }}></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <aside
        className="fixed top-0 right-0 w-[200px] h-full border-l-2 border-slate-200 border-solid bg-white"
        onClick={(e) => {
          setEditMode(false)
          e.stopPropagation()
        }}
      >
        {currentItemKey ? <ItemDesign /> : <BaseDesign />}
      </aside>
    </>
  )
}
