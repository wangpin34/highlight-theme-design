import { Box, Strong, Text } from '@radix-ui/themes'
import ColorPicker from 'components/color-picker'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { baseState } from 'states/theme'

export default function BaseDesign() {
  const [base, setBase] = useRecoilState(baseState)
  const [showColorPicker, setShow] = useState<boolean>(false)
  useEffect(() => {
    const listener = () => {
      setShow(false)
    }
    if (showColorPicker) {
      document.body.addEventListener('click', listener, { once: true })
      return () => {
        document.body.removeEventListener('click', listener)
      }
    }
  }, [showColorPicker])
  return (
    <Box>
      <div className="px-2 py-4 border-b-2 border-solid border-slate-200">
        <Text size="3">
          <Strong>Page</Strong>
        </Text>
      </div>
      <div className="px-2 pt-2">
        <div className="flex gap-2 items-center">
          <ColorPicker color={base.color} onChange={(color) => setBase({ ...base, color })} />
          <Text size="1">Color</Text>
        </div>
        <div className="flex gap-2 items-center">
          <ColorPicker color={base.backgroundColor} onChange={(backgroundColor) => setBase({ ...base, backgroundColor })} />
          <Text size="1">Background Color</Text>
        </div>
      </div>
    </Box>
  )
}
