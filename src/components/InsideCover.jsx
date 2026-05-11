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
              whileHover={{ x: 5, color: '#d97757' }}
              className="text-left font-caveat text-2xl text-[#5a4a3a] transition-colors flex items-center group"
            >
              <span className="opacity-0 group-hover:opacity-100 text-[#d97757] text-lg mr-2 transition-opacity">→</span>
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

      {/* --- RESUME / CV (TUCKED PAPER) --- */}
      <motion.a
        href="/EylemSeyhan_CV.pdf"
        download="EylemSeyhan_CV.pdf"
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-[20%] left-[20%] w-[45%] p-2 z-10 cursor-pointer block"
        style={{
          background: '#fdfbf7',
          border: '1px solid #dcd0c0',
          boxShadow: '1px 3px 6px rgba(0,0,0,0.1)',
          transformOrigin: 'bottom left',
        }}
        initial={{ rotate: 12 }}
        whileHover={{ rotate: 18, y: -10, x: 5, zIndex: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="w-full h-full border border-dashed border-[#e0d6c8] py-2 flex items-center justify-center relative bg-[#faf7f0]">
          <div className="font-hand font-bold text-sm sm:text-base text-[#5a4a3a] text-center leading-tight flex flex-col items-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            grab my<br />resume (pdf)
          </div>
          {/* Folded corner illusion */}
          <div className="absolute top-0 right-0 border-b-[12px] border-l-[12px] border-b-[#e8dfd0] border-l-transparent w-0 h-0" style={{ boxShadow: '-1px 1px 2px rgba(0,0,0,0.1)' }} />
        </div>
      </motion.a>

      {/* --- BUSINESS CARD / SOCIALS --- */}


    </div>
  )
}
