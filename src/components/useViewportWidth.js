import { useEffect, useState } from 'react'

export default function useViewportWidth() {
  const [width, setWidth] = useState(typeof window === 'undefined' ? 1024 : window.innerWidth)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    let frame = 0
    const onResize = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setWidth(window.innerWidth))
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return width
}
