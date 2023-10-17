import ColorPicker from 'components/color-picker'
import { Text, Box } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentItemState } from 'states/theme'
import classnames from 'classnames'
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
  return item ? (
    <Box className="flex justify-center items-center" onClick={(e) => e.stopPropagation()}>
      <Box className={classnames('min-w-min min-h-min p-2 rounded-md shadow-2xl', styles.design)}>
        <Box className={classnames('px-2 py-4 border-b-2 border-solid border-slate-200')}>
          <Text className="capitalize" size="3">
            {item.category}
          </Text>
        </Box>
        <Box className="flex pt-2 gap-2 items-center px-2">
          <ColorPicker color={item.color} onChange={(color) => setItem({ ...item, color })} />
          <Text className="capitalize" size="2">
            Color
          </Text>
        </Box>
      </Box>
    </Box>
  ) : null
}
