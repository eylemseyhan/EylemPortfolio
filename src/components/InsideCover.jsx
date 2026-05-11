import React from 'react'
import { motion } from 'framer-motion'

export default function InsideCover({ onNavigate }) {
  const links = [
    { id: 'about', label: '1. about me ✿' },
    { id: 'timeline', label: '2. journey 🚀' },
    { id: 'projects', label: '3. projects 💻' },
    { id: 'skills', label: '4. skills 🛠️' },
    { id: 'contact', label: '5. contact ✉️' }
  ]

  return (
    <div className="w-full h-full relative overflow-hidden" style={{
      background: '#d8cdba', // cardboard back color
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.02) 4px)'
    }}>
      {/* Binding ring holes on the right edge (spine) */}
      <div className="absolute right-0 top-0 bottom-0 w-12 flex flex-col items-center justify-around py-4 z-50"
        style={{ background: 'rgba(0,0,0,0.05)', borderLeft: '2px solid rgba(0,0,0,0.05)' }}>
        {[...Array(10)].map((_, i) => <div key={i} className="ring-hole" />)}
      </div>

      {/* Background Coffee Stains */}
      <div className="coffee-stain absolute top-20 left-10 w-24 h-24 opacity-20 pointer-events-none" />
      <div className="coffee-stain absolute bottom-32 right-20 w-32 h-20 opacity-30 pointer-events-none" />

      {/* --- "IF FOUND" STICKER --- */}
      <div className="absolute top-8 left-8 p-3 rounded-sm shadow-sm"
        style={{ background: '#fdfbf7', border: '1px solid #dcd0c0', transform: 'rotate(-2deg)' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 tape tape-pink w-10 h-4 rotate-[5deg]" />
        <p className="font-sketch text-[#a09080] text-xs uppercase tracking-widest mb-1">If Found, Please Return To:</p>
        <p className="font-caveat text-xl text-[#3d2b1f] leading-none">Eylem Seyhan</p>
        <p className="font-caveat text-sm text-[#7a6a5a] mt-1">(will reward with coffee ☕)</p>
      </div>

      {/* --- TABLE OF CONTENTS (TORN PAPER) --- */}
      <div className="absolute top-[25%] left-[10%] w-[65%] paper-scrap p-6 z-10"
        style={{ background: '#faf7f2', boxShadow: '2px 4px 12px rgba(0,0,0,0.08)', transform: 'rotate(1.5deg)' }}>

        {/* Tapes */}
        <div className="absolute -top-3 -left-3 tape tape-stripes w-14 h-5 rotate-[-45deg]" />
        <div className="absolute -bottom-3 right-4 tape tape-yellow w-12 h-5 rotate-[15deg]" />

        <h2 className="font-sketch text-3xl font-bold text-[#5a4a3a] mb-4 text-center underline decoration-wavy decoration-[#c8b8a0]">
          Index
        </h2>

        <div className="flex flex-col gap-3 pl-2">
          {links.map(link => (
            <motion.button
              key={link.id}
              onClick={() => onNavigate && onNavigate(link.id)}
              whileHover={{ x: 6, color: '#d97757' }}
              className="text-left font-hand text-xl text-[#3d2b1f] transition-colors flex items-center group gap-2"
            >
              <span className="opacity-0 group-hover:opacity-100 text-[#d97757] transition-opacity">→</span>
              {link.label}
            </motion.button>
          ))}
        </div>

        {/* Decorative arrow doodle pointing to links */}
        <svg className="absolute bottom-6 right-6 opacity-40" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M5 30 Q15 5 35 15" stroke="#5a4a3a" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M25 10 L35 15 L30 25" stroke="#5a4a3a" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

    </div>
  )
}
