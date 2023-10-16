import { Text, Flex} from '@radix-ui/themes'
import githubWhite from './github-mark-white.svg'
import logo from 'assets/logo.svg'
import github from './github-mark.svg'


export default function Header() {
  return  <header className="h-[64px] fixed top-0 left-0 w-full px-4 bg-slate-100 flex items-center">
    <Flex gap="2" align="center">
    <img src={logo} alt="logo" className="w-[32px] h-[32px]" style={{color: 'yellow'}}/>
    <Text size="3">
    CodeTheme Designer
    </Text>
    </Flex>
    <Flex gap="2" align="center" justify="end" grow="1">
      <a href="https://github.com/wangpin34/highlight-theme-design">
      <img src={github} className="w-[20px] h-[20px] ml-2" alt="github" />
      </a>
    </Flex>
  </header> 
}