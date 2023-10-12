import Design from 'components/design'
import { RecoilRoot } from 'recoil'
import './App.css'

function App() {
  return (
    <RecoilRoot>
      <div className="w-screen h-screen max-h-screen">
        <div className="w-full h-full mx-auto bg-slate-50">
          <Design />
        </div>
      </div>
    </RecoilRoot>
  )
}

export default App
