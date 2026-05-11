import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

export default function CoverPage({ onOpen }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-300, 300], [6, -6])
  const rotateY = useTransform(x, [-300, 300], [-6, 6])
  const [flipping, setFlipping] = useState(false)

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const handleOpen = () => {
    setFlipping(true)
    setTimeout(() => onOpen(), 700)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e8dfd0] paper-texture overflow-hidden relative">
      {/* Background doodles */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="wobbly">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="2" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        {[...Array(12)].map((_, i) => (
          <circle key={i} cx={`${(i * 17 + 5) % 100}%`} cy={`${(i * 13 + 10) % 100}%`}
            r={Math.random() * 3 + 1} fill="#6b4f2e" opacity="0.4" />
        ))}
        <text x="5%" y="15%" fontFamily="Caveat" fontSize="18" fill="#6b4f2e" opacity="0.3" transform="rotate(-15, 50, 50)">✦</text>
        <text x="90%" y="80%" fontFamily="Caveat" fontSize="22" fill="#6b4f2e" opacity="0.3" transform="rotate(10, 400, 400)">✦</text>
        <text x="85%" y="12%" fontFamily="Caveat" fontSize="16" fill="#6b4f2e" opacity="0.3">⋆</text>
        <text x="12%" y="88%" fontFamily="Caveat" fontSize="16" fill="#6b4f2e" opacity="0.3">⋆</text>
      </svg>

      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1200 }}
        animate={flipping ? {
          rotateY: -180,
          transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
        } : {}}
        className="relative w-[420px] sm:w-[480px] md:w-[540px] max-w-[90vw]"
      >
        {/* Book cover card */}
        <div
          className="relative rounded-lg overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(145deg, #b5906a 0%, #9a7550 30%, #c4a07a 60%, #a88060 100%)',
            border: '3px solid #7a5a38',
            minHeight: 520,
          }}
        >
          {/* Cardboard texture lines */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 4px)',
          }} />

          {/* Left binding strip */}
          <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col items-center justify-around py-4"
            style={{ background: 'rgba(0,0,0,0.2)', borderRight: '2px solid rgba(0,0,0,0.15)' }}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="ring-hole" />
            ))}
          </div>

          {/* Coffee stain top-right */}
          <div className="coffee-stain absolute top-8 right-12 w-20 h-16 opacity-50" />
          <div className="coffee-stain absolute top-10 right-14 w-12 h-10 opacity-30" />

          {/* Tape corners */}
          <TapeCorner position="top-right" />
          <TapeCorner position="bottom-left" />

          {/* Main content */}
          <div className="pl-14 pr-6 py-8 flex flex-col items-start relative z-10">
            {/* Floating doodles */}
            <motion.div
              className="absolute top-6 right-8 float-doodle"
              animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              <CoffeeCupSVG />
            </motion.div>

            <motion.div
              className="absolute bottom-28 right-6 float-doodle-2"
              animate={{ y: [0, -8, 0], rotate: [1, -2, 1] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            >
              <PencilSVG />
            </motion.div>

            <motion.div
              className="absolute bottom-16 left-16 float-doodle-3"
              animate={{ y: [0, -6, 0], rotate: [-1, 3, -1] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
            >
              <CodeBracketsSVG />
            </motion.div>

            {/* Stars scattered */}
            <motion.span className="absolute top-20 left-16 text-yellow-200 text-2xl"
              animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}>✦</motion.span>
            <motion.span className="absolute top-40 right-20 text-yellow-100 text-lg"
              animate={{ rotate: [360, 0] }} transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}>★</motion.span>
            <motion.span className="absolute bottom-40 right-14 text-amber-200 text-sm"
              animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>✧</motion.span>

            {/* Title */}
            <div className="mt-16 mb-2">
              <h1 className="font-caveat text-5xl sm:text-6xl font-bold text-amber-100"
                style={{ textShadow: '2px 3px 0 rgba(0,0,0,0.15)', lineHeight: 1.1 }}>
                Eylem's
              </h1>
              <h1 className="font-caveat text-5xl sm:text-6xl font-bold text-amber-100"
                style={{ textShadow: '2px 3px 0 rgba(0,0,0,0.15)', transform: 'rotate(-1deg)' }}>
                Sketchbook
              </h1>
            </div>

            {/* Underline doodle */}
            <svg width="200" height="16" viewBox="0 0 200 16" className="mb-4 -mt-1">
              <path d="M5 10 Q50 4 100 10 Q150 16 195 8" stroke="#fde68a" strokeWidth="2.5" fill="none"
                strokeLinecap="round" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }} />
            </svg>

            {/* Subtitle */}
            <p className="font-patrick text-amber-200 text-lg sm:text-xl mb-6"
              style={{ transform: 'rotate(-0.5deg)' }}>
              a messy little timeline of my journey 🌱
            </p>

            {/* Made with sticker */}
            <div className="mb-6 px-3 py-2 rounded-lg font-caveat text-base text-amber-900 font-bold"
              style={{
                background: '#fde68a',
                border: '2px solid rgba(120, 80, 20, 0.3)',
                transform: 'rotate(2deg)',
                boxShadow: '2px 3px 0 rgba(0,0,0,0.12)',
              }}>
              Made with ☕ + C# ✨
            </div>

            {/* .NET doodle sketch */}
            <div className="flex gap-3 mb-8 flex-wrap">
              <span className="font-caveat text-amber-100 text-sm border border-amber-200/40 rounded px-2 py-1"
                style={{ transform: 'rotate(-1deg)' }}>.NET</span>
              <span className="font-caveat text-amber-100 text-sm border border-amber-200/40 rounded px-2 py-1"
                style={{ transform: 'rotate(1deg)' }}>C#</span>
              <span className="font-caveat text-amber-100 text-sm border border-amber-200/40 rounded px-2 py-1"
                style={{ transform: 'rotate(-0.5deg)' }}>🚀</span>
            </div>

            {/* Open button */}
            <motion.button
              onClick={handleOpen}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.97 }}
              className="font-caveat text-xl font-bold text-amber-900 px-6 py-3 rounded-lg relative"
              style={{
                background: '#fde68a',
                border: '2px solid rgba(120,80,20,0.4)',
                boxShadow: '3px 4px 0 rgba(0,0,0,0.15)',
              }}
            >
              Open →
              {/* Arrow doodle */}
              <svg className="absolute -right-8 top-1/2 -translate-y-1/2" width="28" height="18" viewBox="0 0 28 18">
                <path d="M2 9 Q12 5 22 9" stroke="#fde68a" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M18 5 L24 9 L18 13" stroke="#fde68a" strokeWidth="2" fill="none"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>

            {/* Small pencil scribble at bottom */}
            <div className="mt-8 font-caveat text-amber-200/60 text-sm" style={{ transform: 'rotate(-1deg)' }}>
              — click to begin ✏️
            </div>
          </div>
        </div>

        {/* Book shadow */}
        <div className="absolute -bottom-4 left-4 right-4 h-6 rounded-full blur-md"
          style={{ background: 'rgba(0,0,0,0.25)' }} />
      </motion.div>
    </div>
  )
}

function TapeCorner({ position }) {
  const styles = {
    'top-right': { top: -4, right: 16, transform: 'rotate(45deg)' },
    'bottom-left': { bottom: -4, left: 24, transform: 'rotate(-30deg)' },
  }
  return (
    <div className="absolute tape w-14 h-5" style={styles[position]} />
  )
}

function CoffeeCupSVG() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="8" y="18" width="22" height="18" rx="3" stroke="#7a5a38" strokeWidth="2" fill="rgba(255,243,176,0.6)" />
      <path d="M30 22 Q36 22 36 27 Q36 32 30 32" stroke="#7a5a38" strokeWidth="2" fill="none" />
      <path d="M8 18 Q10 10 18 10 Q24 10 26 18" stroke="#7a5a38" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M14 12 Q13 8 15 5" stroke="#7a5a38" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M20 11 Q19 7 21 4" stroke="#7a5a38" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <rect x="6" y="36" width="26" height="3" rx="1.5" stroke="#7a5a38" strokeWidth="1.5" fill="rgba(255,243,176,0.4)" />
    </svg>
  )
}

function PencilSVG() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <rect x="16" y="4" width="8" height="24" rx="2" transform="rotate(30 19 19)" stroke="#7a5a38" strokeWidth="2" fill="rgba(255,243,176,0.6)" />
      <path d="M22 28 L18 34 L26 30 Z" fill="#7a5a38" />
      <line x1="16" y1="8" x2="24" y2="6" stroke="#7a5a38" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CodeBracketsSVG() {
  return (
    <svg width="50" height="36" viewBox="0 0 50 36" fill="none">
      <path d="M14 8 L6 18 L14 28" stroke="#7a5a38" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 8 L44 18 L36 28" stroke="#7a5a38" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 6 L22 30" stroke="#7a5a38" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}
