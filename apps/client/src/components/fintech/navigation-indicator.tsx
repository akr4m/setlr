import { useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

export function NavigationIndicator({
  active,
  selector,
  className,
}: {
  active: string
  selector: string
  className: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [style, setStyle] = useState<CSSProperties>({ opacity: 0 })
  useLayoutEffect(() => {
    const parent = ref.current?.parentElement
    const target = parent?.querySelector<HTMLElement>(selector)
    if (!parent || !target) {
      setStyle((previous) => ({ ...previous, opacity: 0 }))
      return
    }
    const update = () => {
      const container = parent.getBoundingClientRect()
      const item = target.getBoundingClientRect()
      setStyle({
        width: item.width,
        height: item.height,
        opacity: item.width > 0 ? 1 : 0,
        transform: `translate3d(${item.left - container.left + parent.scrollLeft - parent.clientLeft}px, ${item.top - container.top + parent.scrollTop - parent.clientTop}px, 0)`,
      })
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(parent)
    observer.observe(target)
    return () => observer.disconnect()
  }, [active, selector])
  return (
    <span ref={ref} className={className} style={style} aria-hidden="true" />
  )
}
