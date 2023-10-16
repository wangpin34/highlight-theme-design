import processor from './processor'
import { useMemo } from 'react'

export default function useCodeChildren(html: string) {
  return useMemo(() => {
    return processor.processSync(html).result.props.children
  }, [html])
}