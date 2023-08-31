import { useEffect, useRef, useState } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { css } from '@codemirror/lang-css'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { basicSetup } from 'codemirror'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { oneDark } from '@codemirror/theme-one-dark'

interface Props {
  initialDoc: string
  onChange?: (state: EditorState) => void
}

const useCodeMirror = <T extends Element>(props: Props): [React.MutableRefObject<T | null>, EditorView?] => {
  const refContainer = useRef<T>(null)
  const [editorView, setEditorView] = useState<EditorView>()
  const { onChange } = props

  useEffect(() => {
    if (!refContainer.current) return
    if (editorView) return

    const startState = EditorState.create({
      doc: props.initialDoc,
      extensions: [
        basicSetup,
        css(),
        oneDark,
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            onChange && onChange(update.state)
          }
        }),
      ],
    })
    const view = new EditorView({
      state: startState,
      parent: refContainer.current,
    })

    setEditorView(view)
  }, [refContainer, editorView, onChange, props.initialDoc])

  return [refContainer, editorView]
}

export default useCodeMirror
