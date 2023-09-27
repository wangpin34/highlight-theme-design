import { Strong, Text } from '@radix-ui/themes'
import ColorPicker from 'components/color-picker'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentItemState } from 'states/theme'

export default function Category() {
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
    <div>
      <div className="px-2 py-4 border-b-2 border-solid border-slate-200">
        <Text size="3">
          <Strong className="capitalize">{item.category}</Strong>
        </Text>
      </div>
      <div className="flex pt-2 gap-2 items-center px-2">
        <ColorPicker color={item.color} onChange={(color) => setItem({ ...item, color })} />
        <Text size="1">Color</Text>
      </div>
    </div>
  ) : null
}
