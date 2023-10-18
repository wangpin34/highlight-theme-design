import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { Box, Flex, IconButton, Text } from '@radix-ui/themes'
import logoWhite from 'assets/logo-white.svg'
import logo from 'assets/logo.svg'
import classnames from 'classnames'
import { useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { darkState } from 'states/site-preferences'
import githubWhite from './github-mark-white.svg'
import github from './github-mark.svg'
import styles from './index.module.css'

export default function Header() {
  const [dark, setDark] = useRecoilState(darkState)
  const onToggleTheme = useCallback(() => {
    setDark((c) => !c)
  }, [setDark])
  useEffect(() => {
    if (dark) {
      document.documentElement.setAttribute('class', 'dark-theme')
      document.documentElement.style.colorScheme = 'dark'
    } else {
      document.documentElement.setAttribute('class', 'light-theme')
      document.documentElement.style.colorScheme = 'light'
    }
  }, [dark])
  return (
    <Box className={classnames('h-[64px] fixed top-0 left-0 w-full px-4 flex items-center', styles.header)}>
      <Flex gap="2" align="center">
        <img src={dark ? logoWhite : logo} alt="logo" className="w-[32px] h-[32px]" />
        <Text size="3">CodeTheme Designer</Text>
      </Flex>
      <Flex gap="2" align="center" justify="end" grow="1">
        <IconButton onClick={onToggleTheme} variant="ghost">
          {dark ? <MoonIcon width="18" height="18" /> : <SunIcon width="18" height="18" />}
        </IconButton>
        <a href="https://github.com/wangpin34/highlight-theme-design">
          <img src={dark ? githubWhite : github} className="w-[20px] h-[20px] ml-2" alt="github" />
        </a>
      </Flex>
    </Box>
  )
}
