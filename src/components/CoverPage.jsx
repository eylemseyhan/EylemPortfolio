import React from 'react'
import { motion } from 'framer-motion'

export default function CoverPage() {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #b5906a 0%, #9a7550 30%, #c4a07a 60%, #a88060 100%)',
      }}>
      {/* Cardboard texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 4px)',
      }} />

      {/* Left binding strip with ring holes */}
      <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col items-center justify-around py-4"
        style={{ background: 'rgba(0,0,0,0.2)', borderRight: '2px solid rgba(0,0,0,0.15)', zIndex: 50 }}>
        {[...Array(10)].map((_, i) => <div key={i} className="ring-hole" />)}
      </div>

      {/* Coffee stains */}
      <div className="coffee-stain absolute top-8 right-12 w-24 h-20 opacity-50 pointer-events-none" />
      <div className="coffee-stain absolute bottom-12 left-20 w-32 h-24 opacity-30 pointer-events-none" />

      {/* Tape corners */}
      <TapeCorner position="top-right" />
      <TapeCorner position="bottom-left" />

      {/* Content Canvas */}
      <div className="absolute inset-0 pl-16 pr-8 py-12">

        {/* --- TIMELINE POST-ITS & SCRAPS --- */}
        <ScrapPostIt text="to-do: fix bugs 🐛" color="#FFD9C0" tapeClass="tape-pink tape-stripes" style={{ top: '6%', right: '6%', transform: 'rotate(5deg)' }} />
        <ScrapPostIt text="git commit -m 'oops'" color="#C8F0DC" tapeClass="tape-yellow" style={{ bottom: '15%', left: '16%', transform: 'rotate(4deg)' }} />

        {/* --- PHOTO & MAP CUTOUTS --- */}
        <PolaroidCamera style={{ top: '8%', left: '18%', transform: 'rotate(-8deg)' }} />
        <IstanbulMap style={{ bottom: '10%', right: '12%', transform: 'rotate(8deg)' }} />

        {/* --- FLOATING DOODLES (Existing) --- */}
        <motion.div className="absolute top-12 right-[25%]"
          animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}>
          <CoffeeCupSVG />
        </motion.div>

        <motion.div className="absolute bottom-[28%] right-8"
          animate={{ y: [0, -8, 0], rotate: [1, -2, 1] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}>
          <PencilSVG />
        </motion.div>

        <motion.div className="absolute bottom-8 left-[35%]"
          animate={{ y: [0, -6, 0], rotate: [-1, 3, -1] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}>
          <CodeBracketsSVG />
        </motion.div>

        {/* --- COLORED PEN DOODLES (New) --- */}
        <div className="absolute top-[25%] right-[8%] rotate-12 opacity-80 pointer-events-none"><DoodleHeart /></div>
        <div className="absolute bottom-[45%] left-[8%] -rotate-12 opacity-80 pointer-events-none"><DoodleLightbulb /></div>
        <div className="absolute top-[45%] right-[5%] rotate-45 opacity-80 pointer-events-none"><DoodleKey /></div>
        <div className="absolute bottom-[15%] left-[55%] rotate-[20deg] opacity-80 pointer-events-none"><DoodleClock /></div>
        <div className="absolute top-[18%] left-[45%] -rotate-[15deg] opacity-80 pointer-events-none"><DoodleArrow color="#ec4899" /></div>
        <div className="absolute bottom-[25%] right-[28%] rotate-[165deg] opacity-80 pointer-events-none"><DoodleArrow color="#3b82f6" /></div>

        {/* --- STARS --- */}
        <motion.span className="absolute top-32 left-16 text-yellow-300 text-3xl pointer-events-none"
          animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}>✦</motion.span>
        <motion.span className="absolute top-1/2 right-4 text-emerald-300 text-2xl pointer-events-none"
          animate={{ rotate: [360, 0] }} transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}>★</motion.span>
        <motion.span className="absolute bottom-32 right-12 text-pink-300 text-xl pointer-events-none"
          animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}>✧</motion.span>

        {/* --- TITLE BLOCK --- */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
          <div className="relative">
            <h1 className="font-sketch text-6xl sm:text-8xl font-bold text-amber-50 leading-tight"
              style={{ textShadow: '3px 4px 0 rgba(0,0,0,0.2)' }}>
              Eylem's
            </h1>
            <h1 className="font-sketch text-6xl sm:text-8xl font-bold text-amber-50 leading-tight"
              style={{ textShadow: '3px 4px 0 rgba(0,0,0,0.2)', transform: 'rotate(-2deg)' }}>
              Sketchbook
            </h1>
            {/* Wavy underline */}
            <svg width="280" height="24" viewBox="0 0 280 20" className="absolute -bottom-4 left-4">
              <path d="M5 12 Q70 5 140 12 Q210 19 275 10" stroke="#fde68a" strokeWidth="4" fill="none"
                strokeLinecap="round" style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.3))' }} />
            </svg>
          </div>

          {/* Subtitle */}
          <p className="font-nunito text-[#7a6a5a] text-xl sm:text-2xl mt-6 opacity-95" style={{ transform: 'rotate(1deg)' }}>
            a messy little timeline of my journey ✿
          </p>

          {/* --- STICKERS --- */}
          <div className="flex gap-4 mt-8">
            <div className="px-4 py-2 rounded-lg font-hand text-xl text-amber-950 font-bold"
              style={{
                background: '#fde68a',
                border: '2px solid rgba(120,80,20,0.4)',
                transform: 'rotate(-3deg)',
                boxShadow: '2px 4px 0 rgba(0,0,0,0.15)',
              }}>
              let it happen.
            </div>
            <div className="px-4 py-2 rounded-lg font-hand text-xl text-emerald-950 font-bold"
              style={{
                background: '#a7f3d0',
                border: '2px solid rgba(20,100,60,0.4)',
                transform: 'rotate(4deg) translateY(4px)',
                boxShadow: '2px 4px 0 rgba(0,0,0,0.15)',
              }}>
              made with ☕
            </div>
          </div>
        </div>

        {/* --- DRAG TO PEEL HINT --- */}
        <div className="absolute bottom-8 right-6 font-hand text-amber-200/80 text-xl pointer-events-none" style={{ transform: 'rotate(-4deg)' }}>
          drag to peel &lt;
        </div>

      </div>
    </div>
  )
}

function ScrapPostIt({ text, color, tapeClass, style }) {
  return (
    <div className="absolute paper-scrap p-3 w-40 z-10 flex items-center justify-center min-h-[80px]" style={{ background: color, boxShadow: '2px 3px 8px rgba(0,0,0,0.1)', ...style }}>
      <div className={`absolute -top-3 left-1/2 -translate-x-1/2 tape w-14 h-5 ${tapeClass}`} style={{ transform: 'rotate(-2deg)' }} />
      <div className="font-hand lowercase-all text-xl font-bold leading-tight text-[#3d2b1f] text-center">{text}</div>
    </div>
  )
}

function PolaroidCamera({ style }) {
  return (
    <div className="absolute p-2 pb-8 bg-amber-50 shadow-lg z-10" style={{ width: 110, height: 130, border: '1px solid #dcd0c0', ...style }}>
      <div className="absolute -top-2 left-2 tape tape-blue w-12 h-5 rotate-[12deg]" />
      <div className="absolute -bottom-2 right-2 tape tape-yellow w-12 h-5 rotate-[-8deg]" />
      <div className="w-full h-full bg-[#f0e6d2] flex items-center justify-center relative shadow-inner">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#5a4a3a" strokeWidth="1.5">
          <rect x="3" y="7" width="18" height="13" rx="2" fill="#fff" />
          <circle cx="12" cy="13" r="4" fill="#e8dfd0" />
          <circle cx="12" cy="13" r="2" fill="#5a4a3a" />
          <path d="M7 7 V5 a2 2 0 0 1 2 -2 h6 a2 2 0 0 1 2 2 v2" fill="#dcd0c0" />
          <circle cx="18" cy="10" r="1" fill="#ef4444" stroke="none" />
        </svg>
      </div>
    </div>
  )
}

function IstanbulMap({ style }) {
  return (
    <div className="absolute p-2 bg-[#f4e8d8] paper-scrap shadow-md z-10" style={{ width: 120, height: 100, ...style }}>
      <div className="absolute top-1 -right-4 tape tape-pink w-12 h-5 rotate-[-15deg]" />
      <div className="absolute bottom-2 -left-2 tape tape-mint w-10 h-4 rotate-[10deg]" />
      <div className="w-full h-full border-2 border-dashed border-[#c0b0a0] flex flex-col items-center justify-center relative overflow-hidden">
        <svg width="100" height="60" viewBox="0 0 100 60" fill="none">
          <path d="M20 0 Q40 30 80 60" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
          <path d="M45 25 L55 35" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="3 3" />
          <circle cx="45" cy="25" r="4" fill="#ef4444" />
        </svg>
        <span className="font-caveat text-sm text-[#7a6a5a] absolute bottom-1 right-2">istanbul ♥</span>
      </div>
    </div>
  )
}

/* --- SVG Doodles --- */
function DoodleHeart() { return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg> }
function DoodleLightbulb() { return <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2.5"><path d="M9 18h6" /> <path d="M10 22h4" /> <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A6 6 0 1 0 7.5 11.5c.76.76 1.23 1.52 1.41 2.5" /></svg> }
function DoodleKey() { return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2.5"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" /></svg> }
function DoodleClock() { return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /> <polyline points="12 6 12 12 16 14" /></svg> }
function DoodleArrow({ color }) { return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /> <polyline points="12 5 19 12 12 19" /></svg> }

/* --- Existing Icons --- */
function TapeCorner({ position }) {
  const styles = {
    'top-right': { top: -4, right: 16, transform: 'rotate(45deg)' },
    'bottom-left': { bottom: -4, left: 24, transform: 'rotate(-30deg)' },
  }
  return <div className="absolute tape tape-stripes w-16 h-6" style={styles[position]} />
}

function CoffeeCupSVG() {
  return (
    <svg width="55" height="55" viewBox="0 0 44 44" fill="none">
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
    <svg width="48" height="48" viewBox="0 0 38 38" fill="none">
      <rect x="16" y="4" width="8" height="24" rx="2" transform="rotate(30 19 19)" stroke="#7a5a38" strokeWidth="2" fill="rgba(255,243,176,0.6)" />
      <path d="M22 28 L18 34 L26 30 Z" fill="#7a5a38" />
      <line x1="16" y1="8" x2="24" y2="6" stroke="#7a5a38" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CodeBracketsSVG() {
  return (
    <svg width="60" height="44" viewBox="0 0 50 36" fill="none">
      <path d="M14 8 L6 18 L14 28" stroke="#7a5a38" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 8 L44 18 L36 28" stroke="#7a5a38" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 6 L22 30" stroke="#7a5a38" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}
