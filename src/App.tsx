import { RecoilRoot } from 'recoil'
import './App.css'
import { Theme, Box } from '@radix-ui/themes'
import Root from 'components/root'

function App() {
  return (
    <RecoilRoot>
      <Theme accentColor="pink">
        <Box className="w-screen h-screen max-h-screen">
          <Root />
        </Box>
      </Theme>
    </RecoilRoot>
  )
}

export default App
