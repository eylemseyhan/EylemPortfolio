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


        {/* --- PHOTO & MAP CUTOUTS --- */}
        <PolaroidCamera style={{ top: '8%', left: '18%', transform: 'rotate(-8deg)' }} />
        <EdirneMap style={{ bottom: '10%', right: '12%', transform: 'rotate(8deg)' }} />



        <motion.div className="absolute bottom-[28%] right-12 z-20"
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
        <div className="absolute bottom-[20%] left-[25%] rotate-[20deg] opacity-80 pointer-events-none"><DoodleClock /></div>
        <div className="absolute top-[18%] left-[45%] -rotate-[15deg] opacity-80 pointer-events-none"><DoodleArrow color="#ec4899" /></div>
        <div className="absolute bottom-[25%] right-[28%] rotate-[165deg] opacity-80 pointer-events-none"><DoodleArrow color="#3b82f6" /></div>

        {/* --- STARS --- */}
        <motion.span className="absolute top-32 left-16 text-yellow-300 text-3xl pointer-events-none"
          animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}>✦</motion.span>
        <motion.span className="absolute top-1/2 right-4 text-emerald-300 text-2xl pointer-events-none"
          animate={{ rotate: [360, 0] }} transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}>★</motion.span>
        <motion.span className="absolute bottom-32 right-12 text-pink-300 text-xl pointer-events-none"
          animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}>✧</motion.span>

        {/* --- NEW TACTILE ELEMENTS --- */}
        <TornTerminalPaper style={{ top: '12%', right: '14%', transform: 'rotate(7deg)' }} />


        {/* --- TITLE BLOCK --- */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
          <div className="relative">
            <h1 className="font-sketch text-6xl sm:text-8xl font-bold text-amber-50 leading-tight"
              style={{ textShadow: '3px 4px 0 rgba(0,0,0,0.2)' }}>
              Eylem's
            </h1>
            <h1 className="font-sketch text-6xl sm:text-8xl font-bold text-amber-50 leading-tight pb-4"
              style={{ textShadow: '3px 4px 0 rgba(0,0,0,0.2)', transform: 'rotate(-2deg)' }}>
              Portfolio
            </h1>
            {/* Wavy underline */}
            <svg width="280" height="24" viewBox="0 0 280 20" className="absolute -bottom-4 left-10">
              <path d="M5 12 Q70 5 140 12 Q210 19 275 10" stroke="#fde68a" strokeWidth="4" fill="none"
                strokeLinecap="round" style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.3))' }} />
            </svg>
          </div>

          {/* Subtitle */}
          <p className="font-hand text-[#faf7f2] text-xl sm:text-2xl mt-6 opacity-95" style={{ transform: 'rotate(1deg)' }}>
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



      </div>
    </div>
  )
}

/* --- NEW TACTILE ELEMENTS --- */

function TornTerminalPaper({ style }) {
  return (
    <div className="absolute z-10 pointer-events-auto" style={{ width: 150, height: 100, ...style }}>
      {/* Tape */}
      <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 tape tape-gray w-12 h-5 rotate-[-3deg] z-20" />

      {/* Torn Paper background */}
      <svg width="150" height="100" className="absolute inset-0 z-0" style={{ filter: 'drop-shadow(3px 4px 5px rgba(0,0,0,0.3))' }}>
        <path d="M 5 5 L 145 2 Q 148 20 145 40 Q 148 60 146 95 Q 110 98 80 94 Q 40 98 5 95 Z" fill="#1e1e1e" />
        {/* Torn edge effect at top */}
        <path d="M 5 5 Q 15 2 25 6 T 45 4 T 65 6 T 85 3 T 105 5 T 125 3 L 145 2 L 145 15 L 5 15 Z" fill="#2d2d2d" />
      </svg>

      {/* Terminal Content */}
      <div className="absolute inset-0 z-10 p-3 pt-5 pointer-events-none flex flex-col font-mono text-[9px] leading-tight text-green-400">
        <div><span className="text-pink-500">~</span>$ git status</div>
        <div className="text-gray-300 mt-1">On branch main</div>
        <div className="text-gray-300">Your branch is up to date.</div>
        <div className="mt-2 text-yellow-300">working tree clean</div>
        <div className="mt-1 animate-pulse font-bold">_</div>
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
    <div className="absolute shadow-lg z-10" style={{ width: 120, height: 140, border: '2px solid #dcd0c0', background: '#fffef9', ...style }}>
      <div className="absolute -top-3 left-3 tape tape-blue w-14 h-5 rotate-[8deg]" />
      {/* Photo area */}
      <div className="w-full" style={{ height: 100, background: 'linear-gradient(135deg, #fef3c7 0%, #dbeafe 50%, #fce7f3 100%)', position: 'relative', overflow: 'hidden' }}>
        {/* Camera doodle inside photo */}
        <svg width="120" height="100" viewBox="0 0 120 100" fill="none" style={{ position: 'absolute', inset: 0 }}>
          {/* Sky */}
          <rect width="120" height="100" fill="#bfdbfe" opacity="0.4" />
          {/* Sun */}
          <circle cx="95" cy="18" r="12" fill="#fde68a" opacity="0.9" />
          {/* Hills */}
          <ellipse cx="30" cy="95" rx="40" ry="25" fill="#bbf7d0" opacity="0.8" />
          <ellipse cx="90" cy="98" rx="45" ry="22" fill="#a7f3d0" opacity="0.7" />
          {/* Camera icon */}
          <rect x="40" y="35" width="40" height="30" rx="4" fill="#1e293b" opacity="0.85" />
          <circle cx="60" cy="50" r="9" fill="#374151" stroke="#60a5fa" strokeWidth="2" />
          <circle cx="60" cy="50" r="5" fill="#1e40af" />
          <circle cx="60" cy="50" r="2" fill="#93c5fd" />
          <rect x="52" y="31" width="10" height="6" rx="2" fill="#334155" />
          <circle cx="73" cy="40" r="2" fill="#ef4444" />
        </svg>
      </div>
      {/* Caption area */}
      <div style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="font-hand text-sm font-bold text-[#7a5a38]">📷 memories</span>
      </div>
    </div>
  )
}

// ... (Önceki import ve ana komponent yapısı aynı kalacak)

/* --- GÜNCELLEMİŞ EDİRNE PULU KOMPONENTİ --- */

function EdirneMap({ style }) {
  return (
    <div className="absolute z-10" style={{ width: 220, height: 220, ...style }}>
      <img
        src="/edirne-stamp.png"
        alt="Edirne stamp"
        className="w-full h-full pointer-events-none"
        style={{
          objectFit: 'contain',
          filter: 'drop-shadow(4px 6px 10px rgba(0,0,0,0.3))',
        }}
      />
    </div>
  )
}

/* --- SVG Doodles (Scribble/Hand-drawn style) --- */
function DoodleHeart() {
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
      {/* hand-drawn heart — slightly wobbly, sketchy double stroke */}
      <path d="M25 38 C14 28 6 22 7 14 C8 7 14 5 19 8 C21 9 23 11 25 13 C27 11 29 9 31 8 C36 5 42 7 43 14 C44 22 36 28 25 38 Z"
        fill="#fecaca" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* second rough pass for sketch feel */}
      <path d="M25 37 C14.5 27.5 6.5 22.5 7.5 14.5 C8.5 8 13.5 6 18.5 8.5"
        fill="none" stroke="#ef4444" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
    </svg>
  )
}
function DoodleLightbulb() {
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
      {/* Wobbly bulb outline */}
      <path d="M18 34 C14 30 11 24 13 17 C15 10 20 7 25 7 C30 7 35 10 37 17 C39 24 36 30 32 34 C31 36 19 36 18 34 Z"
        fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Filament scribble */}
      <path d="M20 22 Q22 18 25 22 Q28 26 30 22"
        fill="none" stroke="#eab308" strokeWidth="1.8" strokeLinecap="round" />
      {/* Base lines */}
      <path d="M19 36 Q19 38 20 39 L30 39 Q31 38 31 36" fill="none" stroke="#92400e" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M20.5 41 L29.5 41" stroke="#92400e" strokeWidth="1.8" strokeLinecap="round" />
      {/* Shine squiggle */}
      <path d="M15 16 Q13 13 15 10" fill="none" stroke="#fde047" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    </svg>
  )
}
function DoodleKey() {
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
      {/* Wobbly key ring */}
      <path d="M13 35 C8 35 5 31 5 26 C5 21 9 17 14 17 C19 17 23 21 23 26 C23 31 19 35 14 35"
        fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
      {/* second pass for sketch look */}
      <path d="M13 34 C8.5 34 6 30.5 6 26" fill="none" stroke="#7c3aed" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
      {/* Hole in key */}
      <path d="M14 29 C12.5 29 11.5 28 11.5 26.5 C11.5 25 12.5 24 14 24 C15.5 24 16.5 25 16.5 26.5"
        fill="none" stroke="#6d28d9" strokeWidth="1.5" strokeLinecap="round" />
      {/* Key shaft - slightly wobbly */}
      <path d="M22 24 L42 16" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22.3 24.5 L41.5 16.2" stroke="#7c3aed" strokeWidth="0.7" strokeLinecap="round" opacity="0.3" />
      {/* Teeth */}
      <path d="M36 18 L34 23" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 21 L28 26" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
function DoodleClock() {
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
      {/* Wobbly clock face */}
      <path d="M25 5 C36 5 45 14 45 25 C45 36 36 45 25 45 C14 45 5 36 5 25 C5 14 14 5 25 5"
        fill="#fff7ed" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
      {/* Second wobbly pass */}
      <path d="M25 6 C35.5 6 44 14.5 44 25"
        fill="none" stroke="#fb923c" strokeWidth="0.8" strokeLinecap="round" opacity="0.35" />
      {/* Hour hand */}
      <path d="M25 25 L25 14" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" />
      {/* Minute hand */}
      <path d="M25 25 L33 29" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
      {/* Center dot */}
      <path d="M24 25 C24 24.4 24.4 24 25 24 C25.6 24 26 24.4 26 25"
        fill="#ea580c" stroke="#ea580c" strokeWidth="1" />
      {/* Tick marks */}
      <line x1="25" y1="7.5" x2="25" y2="10.5" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="25" y1="39.5" x2="25" y2="42.5" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="7.5" y1="25" x2="10.5" y2="25" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="39.5" y1="25" x2="42.5" y2="25" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function DoodleArrow({ color }) {
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
      {/* Wobbly arrow shaft */}
      <path d="M6 28 C10 26 18 22 32 21 Q36 21 40 22"
        stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Second sketchy pass */}
      <path d="M6 29 C10 27 18 23 31 22"
        stroke={color} strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.35" />
      {/* Arrow head - hand drawn */}
      <path d="M34 15 C37 18 40 20 40 22 C40 24 37 27 34 30"
        stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

/* --- Existing Icons --- */
function TapeCorner({ position }) {
  const styles = {
    'top-right': { top: -4, right: 16, transform: 'rotate(45deg)' },
    'bottom-left': { bottom: -4, left: 24, transform: 'rotate(-30deg)' },
  }
  return <div className="absolute tape tape-stripes w-16 h-6" style={styles[position]} />
}


function PencilSVG() {
  return (
    <svg width="65" height="65" viewBox="0 0 50 50" fill="none">
      {/* Pencil body - rotated, slightly wobbly quad */}
      <path d="M18 4 C20 3 30 7 31 9 C32 27 30 32 28 34 C26 35 20 33 18 32 C16 30 14 25 16 6 Z"
        fill="#fde68a" stroke="#92400e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Eraser band */}
      <path d="M18 5 C20 4 30 8 31 10 L30 13 C28 12 20 9 18 9 Z"
        fill="#fca5a5" stroke="#92400e" strokeWidth="1" />
      {/* Eraser top */}
      <path d="M18 4 C20 3 30 7 31 9 L30 7 C28 6 20 3 18 4"
        fill="#f9a8d4" stroke="#92400e" strokeWidth="1" />
      {/* Wood tip */}
      <path d="M18 32 C19 33 27 35 28 34 L25 44 Z"
        fill="#d4a76a" stroke="#92400e" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Lead point */}
      <path d="M23 42 L25 44 L27 42" fill="#374151" stroke="#374151" strokeWidth="0.8" strokeLinejoin="round" />
      {/* Grain line on body */}
      <path d="M19 15 C21 15 29 17 30 17" fill="none" stroke="#92400e" strokeWidth="0.7" strokeLinecap="round" opacity="0.4" />
      <path d="M19 20 C21 20 29 22 30 22" fill="none" stroke="#92400e" strokeWidth="0.7" strokeLinecap="round" opacity="0.3" />
    </svg>
  )
}

function CodeBracketsSVG() {
  return (
    <svg width="85" height="60" viewBox="0 0 70 44" fill="none">
      {/* Left curly-ish bracket - wobbly */}
      <path d="M20 4 C17 4 15 6 15 9 L15 17 C15 19 13 21 11 21 C13 21 15 23 15 25 L15 35 C15 38 17 40 20 40"
        stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* second sketchy pass */}
      <path d="M20.5 5 C17.5 5 15.5 6.5 15.5 9.5 L15.5 17"
        stroke="#a78bfa" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" fill="none" />
      {/* Right curly-ish bracket - wobbly */}
      <path d="M50 4 C53 4 55 6 55 9 L55 17 C55 19 57 21 59 21 C57 21 55 23 55 25 L55 35 C55 38 53 40 50 40"
        stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Slash - wobble */}
      <path d="M40 5 C39 10 36 30 35 39"
        stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M40.5 6 C39.5 11 36.5 31 35.5 39"
        stroke="#f472b6" strokeWidth="0.7" strokeLinecap="round" opacity="0.3" fill="none" />
    </svg>
  )
}


