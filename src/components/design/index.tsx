import classnames from 'classnames'
import hljs from 'highlight.js'
import { darken, lighten } from 'polished'
import React, { useMemo, useLayoutEffect, useCallback, useRef } from 'react'
import { useRecoilValue, useRecoilState, useRecoilCallback, useSetRecoilState } from 'recoil'
import { currentItemKeyState, themeState } from 'states/theme'
import { codeState } from 'states/code'
import { designPreferencesState } from 'states/design-preferences'
import ItemDesign from '../item-design'
import { MaterialSymbolsCheckCircleOutline } from 'components/icons/material'
import { isEditModeState, modeState, Mode } from 'states/action'
import './index.css'
import Dock from '../dock'
import useCodeChildren from './useCodeChildren'

export default function Previewer() {
  const preferences = useRecoilValue(designPreferencesState)
  const isEditMode = useRecoilValue(isEditModeState)
  const setMode = useSetRecoilState(modeState)
  const onToggleMode = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const current = snapshot.getLoadable(modeState).getValue()
        if (current === Mode.Design) {
          setMode(Mode.Edit)
        } else {
          setMode(Mode.Design)
        }
      },
    []
  )
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
        font-size: var(--code-font-size);
        background-color: var(--code-background-color);
        color: var(--code-font-color);
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
  const codeChildren = useCodeChildren(html)
  const onInput = useCallback((e: React.FormEvent<HTMLTextAreaElement>) => {
    const ta = e.target as HTMLTextAreaElement
    ta.style.height = ta.scrollHeight + 'px'
  }, [])

  const frameStyle = {
    backgroundColor: theme.backgroundColor,
    boxShadow: `0 0 1px 1px ${isEditMode ? 'blue' : lighten(0.4, theme.backgroundColor)}`,
  }

  useLayoutEffect(() => {
    if (isEditMode) {
      textareaRef.current?.focus()
    }
  }, [isEditMode])

  const codeFrameRef = useRef<HTMLDivElement>(null)

  return (
        <div className="h-full flex items-center">
          <div className="overflow-auto rounded-xl p-8 h-max-content">
            <div
              className="w-min-content h-min-content flex justify-center items-center min-w-min"
              data-current-item-key={currentItemKey}
            >
              <style>{css}</style>
              <div className="designer-container">
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
                        className={classnames('leading-normal', { 'pointer-events-none': !isEditMode })}
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
        </div>
  )
}
