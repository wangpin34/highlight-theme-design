import Design from 'components/design'
import { RecoilRoot } from 'recoil'
import './App.css'
import { Theme } from '@radix-ui/themes';
import Root from 'components/root'

function App() {
  return (
    <RecoilRoot>
      <Theme>
      <div className="w-screen h-screen max-h-screen">
        <div className="w-full h-full mx-auto bg-slate-50">
          <Root />
        </div>
      </div>
      </Theme>
    </RecoilRoot>
  )
}

export default App
