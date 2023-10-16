import ColorPicker from 'components/color-picker'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentItemState } from 'states/theme'
import classnames from 'classnames'

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
    <div className="h-screen flex justify-center items-center" onClick={(e) => e.stopPropagation()}>
      <div className="min-w-min min-h-min p-2 bg-slate-100 rounded-md">
      <div className={classnames('px-2 py-4 border-b-2 border-solid border-slate-200')}>
        <span>
          <strong className="capitalize">{item.category}</strong>
        </span>
      </div>
      <div className="flex pt-2 gap-2 items-center px-2">
        <ColorPicker color={item.color} onChange={(color) => setItem({ ...item, color })} />
        <span>Color</span>
      </div>
      </div>
    </div>
  ) : null
}
