import { Theme } from '@radix-ui/themes'
import Design from 'components/design'
import Header from 'components/header'
import { RecoilRoot } from 'recoil'
import './App.css'

function App() {
  return (
    <Theme>
      <RecoilRoot>
        <div className="min-w-[950px] h-screen max-h-screen">
          <Header />
          <div className="h-full pt-[32px] mx-auto bg-slate-50">
            <Design />
          </div>
        </div>
      </RecoilRoot>
    </Theme>
  )
}

export default App
