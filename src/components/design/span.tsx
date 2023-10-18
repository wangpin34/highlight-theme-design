import classnames from 'classnames'
import React, { useMemo } from 'react'
import { useRecoilCallback } from 'recoil'
import { currentItemKeyState, currentItemState, themeState } from 'states/theme'
import type { Item } from 'types/theme'
import './index.css'

function Span({ children, className }: { children: React.ReactNode; className?: string }) {
  const multiChild = useMemo(() => children instanceof Array, [children])
  const metadata = useMemo<Pick<Item, 'key' | 'type'>>(() => {
    const segment = className
      ?.split(' ')
      .find((e) => e.indexOf('hljs-') === 0)
      ?.substring('hljs-'.length)
    const language = className
      ?.split(' ')
      .find((e) => e.indexOf('language-') === 0)
      ?.substring('language-'.length)
    return {
      key: language || segment || 'unknown',
      type: language ? 'language' : 'general',
    }
  }, [className])
  const initialItemThemeIfNotFound = useRecoilCallback(({ snapshot, set }) => async (key: string, type: Item['type']) => {
    const theme = await snapshot.getPromise(themeState)
    set(currentItemKeyState, key)
    const currentItem = await snapshot.getPromise(currentItemState)
    if (!currentItem) {
      const item = {
        key,
        type,
        color: theme.color,
      }
      set(currentItemState, item)
    }
  })
  const myChildren = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (typeof child === 'string') {
        return (
          <span
            className={classnames(
              className,
              'hover:outline-1 hover:outline-pink-600 hover:outline-dashed hover:outline-offset-2 cursor-pointer rounded'
            )}
            // data-category={category}
            onClick={(e) => {
              e.stopPropagation()
              metadata.key !== 'unknown' && initialItemThemeIfNotFound(metadata.key, metadata.type)
            }}
          >
            {child}
          </span>
        )
      }
      return child
    })
  }, [children, className, metadata, initialItemThemeIfNotFound])

  if (!multiChild) {
    return (
      <span
        className={classnames(
          className,
          'hover:outline-2 hover:outline-pink-600 hover:outline-dashed hover:outline-offset-2 cursor-pointer rounded-md'
        )}
        onClick={(e) => {
          e.stopPropagation()
          metadata.key !== 'unknown' && initialItemThemeIfNotFound(metadata.key, metadata.type)
        }}
      >
        {children}
      </span>
    )
  }
  return <span>{myChildren}</span>
}

export default Span
