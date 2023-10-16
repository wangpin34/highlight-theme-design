import classnames from 'classnames'
import React, { useMemo } from 'react'
import { useRecoilState} from 'recoil'
import { currentItemKeyState } from 'states/theme'
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