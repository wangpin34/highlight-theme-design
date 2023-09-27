import React, { useEffect, useState } from 'react'
import { TwitterPicker } from 'react-color'

interface Props {
  color: string
  onChange: (color: string) => void
}

export default function ColorPicker({ color, onChange }: Props) {
  const [show, setShow] = useState<boolean>(false)
  useEffect(() => {
    const listener = () => {
      console.log('hide from doc')
      setShow(false)
    }
    if (show) {
      document.body.addEventListener('click', listener, { once: true })
      return () => {
        document.body.removeEventListener('click', listener)
      }
    }
  }, [show])
  return (
    <div
      style={{ backgroundColor: color }}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation()
        setShow(true)
      }}
      className={`w-[20px] h-[20px] relative rounded border-2 border-slate-200 border-solid cursor-pointer`}
    >
      {show ? (
        <TwitterPicker
          onChange={(_, e) => {
            e.stopPropagation()
          }}
          onChangeComplete={(color, e) => {
            e.stopPropagation()
            onChange(color.hex)
            console.log('onchange completed')
          }}
          styles={{
            default: {
              card: {
                zIndex: 10,
                position: 'absolute',
                top: '30px',
                left: '-10px',
              },
            },
          }}
        />
      ) : null}
    </div>
  )
}
