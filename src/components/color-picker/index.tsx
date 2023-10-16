import { useRef } from 'react'
import { SketchPicker } from 'react-color'
import { Popover } from '@radix-ui/themes'

interface Props {
  color: string
  onChange: (color: string) => void
}

export default function ColorPicker({ color, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <Popover.Root>
      <Popover.Trigger>
      <div
        style={{ backgroundColor: color }}
        className={`w-[20px] h-[20px] relative rounded border-2 border-slate-200 border-solid cursor-pointer`}
        ref={ref}
      ></div>
      </Popover.Trigger>
      <Popover.Content>
            <SketchPicker
              color={color}
              onChangeComplete={(color) => {
                onChange(color.hex)
              }}
            />
      
    </Popover.Content>
    </Popover.Root>
  )
}
