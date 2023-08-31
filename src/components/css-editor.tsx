import { EditorState } from '@codemirror/state'
import useCodeMirror from 'hooks/useCodemirror'
import { useCallback, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { cssState, initialCSSState } from 'states/theme'
import './css-editor.css'

function CSSEditor() {
  const setCSS = useSetRecoilState(cssState)
  const initialCSS = useRecoilValue(initialCSSState)
  const handleChange = useCallback((state: EditorState) => setCSS(state.doc.toString()), [setCSS])
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: initialCSS,
    onChange: handleChange,
  })

  useEffect(() => {
    if (editorView) {
      editorView.dispatch({ changes: { from: 0, to: editorView.state.doc.length, insert: initialCSS } })
    }
  }, [editorView, initialCSS])

  return <div className="css-editor-wrapper" ref={refContainer}></div>
}

export default CSSEditor
