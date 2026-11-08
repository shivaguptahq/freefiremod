import { useEffect, useState } from 'react'

export default function useViewportWidth() {
  const getWidth = () => (typeof window !== 'undefined' ? window.innerWidth : 1024)
  const [width, setWidth] = useState(getWidth)

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
