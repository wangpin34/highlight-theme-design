import { Box, Text } from '@radix-ui/themes'
import classnames from 'classnames'
import ColorPicker from 'components/color-picker'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentItemState } from 'states/theme'
import styles from './item-design.module.css'

export default function ItemDesign() {
  const [item, setItem] = useRecoilState(currentItemState)
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
    <Box className="absolute top-0 right-0 w-[120px] h-full flex items-center justify-center">
      <Box
        className={classnames(`w-[100px] h-[80px] p-2 rounded-md shadow-2xl`, { 'opacity-0': !item }, styles.design)}
        onClick={(e) => e.stopPropagation()}
      >
        <Box className={classnames('px-2 border-b-2 border-solid border-slate-200')}>
          <Text className="capitalize" size="3">
            {item?.key ?? ''}
          </Text>
        </Box>
        <Box className="flex pt-2 gap-2 items-center px-2">
          <ColorPicker color={item?.color ?? '#000'} onChange={(color) => item && setItem({ ...item, color })} />
          <Text className="capitalize" size="2">
            Color
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
