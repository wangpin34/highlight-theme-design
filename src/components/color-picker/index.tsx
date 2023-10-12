import { useState, useRef } from 'react'
import { SketchPicker } from 'react-color'

interface Props {
  color: string
  onChange: (color: string) => void
}

export default function ColorPicker({ color, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState<boolean>(false)
  return (
    <div>
      <div
        style={{ backgroundColor: color }}
        onClick={() => {
          setShow(true)
        }}
        className={`w-[20px] h-[20px] relative rounded border-2 border-slate-200 border-solid cursor-pointer`}
        ref={ref}
      ></div>
      {show ? (
        <div style={{ position: 'relative', zIndex: 2 }} className="popover">
          <div
            className="mask"
            style={{ position: 'fixed', top: 0, right: 0, left: 0, bottom: 0 }}
            onClick={() => {
              setShow(false)
            }}
          ></div>
          <div style={{ position: 'absolute', right: 40 }}>
            <SketchPicker
              color={color}
              onChangeComplete={(color) => {
                onChange(color.hex)
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}
