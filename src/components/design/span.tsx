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
import { designPreferencesState } from 'states/design-preferences'
import ItemDesign from '../item-design'
import { MaterialSymbolsCheckCircleOutline } from 'components/icons/material'
import { isEditModeState, modeState, Mode } from 'states/action'
import './index.css'
import Dock from '../dock'

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

export default Span