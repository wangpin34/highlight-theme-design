import classnames from 'classnames'
import hljs from 'highlight.js'
import { darken, lighten } from 'polished'
import React, { ComponentType, useMemo, useLayoutEffect, useCallback, useRef } from 'react'
import * as prod from 'react/jsx-runtime'
import { useRecoilValue, useRecoilState, useRecoilCallback, useSetRecoilState } from 'recoil'
import rehypeParse from 'rehype-parse'
import rehypeReact from 'rehype-react'
import { currentItemKeyState, themeState } from 'states/theme'
import { codeState } from 'states/code'
import { unified } from 'unified'
import BaseDesign from './base-design'
import ItemDesign from './item-design'
import { MaterialSymbolsCheckCircleOutline } from 'components/icons/material'
import { isEditModeState, modeState, Mode } from 'states/action'
import './index.css'
import Dock from './dock'

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
          'hover:outline-2 hover:outline-pink-600 hover:outline-dashed hover:outline-offset-2 cursor-pointer rounded-md'
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

export default function Previewer() {
  const isEditMode = useRecoilValue(isEditModeState)
  const setMode = useSetRecoilState(modeState)
  const onToggleMode = useRecoilCallback(({snapshot}) => async () => {
    const current = snapshot.getLoadable(modeState).getValue()
    if (current === Mode.Design) {
      setMode(Mode.Edit)
    } else {
      setMode(Mode.Design)
    }
  }, [])
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
    boxShadow: `0 0 4px 1px ${isEditMode ? 'blue' : lighten(0.4, theme.backgroundColor)}`,
  }

  useLayoutEffect(() => {
    if (isEditMode) {
      textareaRef.current?.focus()
    }
  }, [isEditMode])

  return (
    <>
      <div className="w-full pr-[200px] h-full overflow-auto" style={{ backgroundColor: darken(0.2, theme.backgroundColor) }}>
        <div className="w-full h-full flex justify-center items-center min-w-min px-[40px]" data-current-item-key={currentItemKey}>
          <style>{css}</style>
          <div className="designer-container">
            <div className="tool-bar flex justify-end">
              
                <>
                  <button onClick={onToggleMode} style={{opacity: isEditMode ? 1 : 0}}>
                    <MaterialSymbolsCheckCircleOutline color={theme.color} />
                  </button>
                </>
              
            </div>
            <div className="rounded-xl min-w-[320px] p-[20px]" style={frameStyle as React.CSSProperties}>
              {!isEditMode ? (
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
                    className={classnames('text-[14px] leading-normal', { 'pointer-events-none': !isEditMode })}
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
          onToggleMode()
          e.stopPropagation()
        }}
      >
        {currentItemKey ? <ItemDesign /> : <BaseDesign />}
      </aside>

      <Dock />
    </>
  )
}
