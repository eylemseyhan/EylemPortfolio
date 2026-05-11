import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      className="custom-cursor"
      style={{ left: pos.x, top: pos.y }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="5" stroke="#6b4f2e" strokeWidth="2" fill="rgba(255,243,176,0.6)" />
        <line x1="12" y1="2" x2="12" y2="7" stroke="#6b4f2e" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="12" y1="17" x2="12" y2="22" stroke="#6b4f2e" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="2" y1="12" x2="7" y2="12" stroke="#6b4f2e" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="17" y1="12" x2="22" y2="12" stroke="#6b4f2e" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}
