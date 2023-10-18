import classnames from 'classnames'
import hljs from 'highlight.js'
import { lighten } from 'polished'
import React, { useCallback, useLayoutEffect, useMemo, useRef } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { isEditModeState } from 'states/action'
import { codeState } from 'states/code'
import { currentItemKeyState, themeState } from 'states/theme'
import { themeToHljs } from 'utils/theme-to'
import './index.css'
import useCodeChildren from './useCodeChildren'

export default function Previewer() {
  const isEditMode = useRecoilValue(isEditModeState)
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
    return themeToHljs(theme)
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

  return (
    <div className="overflow-auto rounded-xl h-max-content">
      <div className="w-min-content h-min-content flex justify-center items-center min-w-min" data-current-item-key={currentItemKey}>
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
  )
}
