import { Theme } from '@radix-ui/themes'
import CSSEditor from 'components/css-editor'
import Header from 'components/header'
import Previewer from 'components/previewer'
import { RecoilRoot } from 'recoil'
import './App.css'

function App() {
  return (
    <Theme>
      <RecoilRoot>
        <div className="h-screen max-h-screen bg-slate-50">
          <Header />
          <div className="h-screen max-h-screen pt-[68px] xl:container mx-auto  grid grid-cols-2 gap-2">
            <div className="max-h-full overflow-auto" id="editor-container">
              <CSSEditor />
            </div>
            <div className="max-h-full overflow-auto" id="preview-container">
              <Previewer />
            </div>
          </div>
        </div>
      </RecoilRoot>
    </Theme>
  )
}

export default App
