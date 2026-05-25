import { motion } from 'framer-motion'
import { cvApi } from '../api/cv'
import { usePageTracking, useAnalytics } from '../hooks/useAnalytics'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
}

export default function AboutPage() {
  usePageTracking('about')
  const { trackClick } = useAnalytics()

  const handleCvDownload = () => {
    trackClick('cv_download', 'about')
    window.open(cvApi.getDownloadUrl(), '_blank')
  }

  return (
    <div className="min-h-screen py-12 px-4 relative" style={{ background: '#faf7f2' }}>
      {/* Notebook lines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(100,149,237,0.1) 28px)',
        backgroundSize: '100% 28px',
      }} />

      {/* Left margin red line */}
      <div className="absolute left-16 top-0 bottom-0 w-px" style={{ background: 'rgba(220,80,80,0.25)' }} />

      {/* Ring holes */}
      <div className="absolute left-4 top-0 bottom-0 flex flex-col items-center justify-around py-8">
        {[...Array(10)].map((_, i) => <div key={i} className="ring-hole mb-2" />)}
      </div>

      {/* Dog-eared top-right corner */}
      <div className="worn-corner-tr" />

      {/* Graphite smudge */}
      <div className="absolute top-16 left-32 pointer-events-none graphite-smudge"
        style={{ width: 140, height: 60, opacity: 0.8 }} />

      {/* Ink blots near margin */}
      <div className="absolute top-48 left-12 ink-blot pointer-events-none"
        style={{ width: 10, height: 8, opacity: 0.7 }} />
      <div className="absolute top-80 left-14 ink-blot pointer-events-none"
        style={{ width: 6, height: 5, opacity: 0.5 }} />

      {/* Erased pencil mark */}
      <div className="absolute top-44 left-24 pointer-events-none erased-mark"
        style={{ width: 80, height: 20, opacity: 0.6 }} />

      {/* ── Floating SVG doodles ──────────────────────────────────── */}

      {/* Coffee cup — hovers in top-right margin */}
      <motion.img
        src="/doodles/coffee-cup.svg"
        className="absolute pointer-events-none hidden lg:block"
        style={{ top: 32, right: 32, width: 64, height: 76, opacity: 0.55, transform: 'rotate(8deg)' }}
        animate={{ y: [0, -6, 0], rotate: [8, 11, 8] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
      />

      {/* Second coffee ring — fainter, bottom left */}
      <div className="absolute bottom-20 left-32 pointer-events-none opacity-40"
        style={{ width: 120, height: 120 }}>
        <div className="coffee-ring w-full h-full" />
      </div>

      {/* Micro post-it 1: Mint Green */}
      <motion.div
        className="absolute top-64 right-16 hidden 2xl:block p-3 w-32 sticky-note paper-scrap"
        style={{ background: '#C8F0DC', transform: 'rotate(6deg)', boxShadow: '2px 4px 8px rgba(0,0,0,0.06)' }}
        whileHover={{ rotate: 8, scale: 1.05 }}
      >
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 tape w-8 h-3 rotate-[-5deg]" />
        <p className="font-hand sticky-note-text text-lg text-[#4a5a4c] leading-tight text-center">
          to-do: drink coffee ☕
        </p>
      </motion.div>


      {/* Pencil — leans in lower-left margin */}
      <motion.img
        src="/doodles/pencil.svg"
        className="absolute pointer-events-none hidden lg:block"
        style={{ bottom: 180, left: 28, width: 28, height: 38, opacity: 0.38, transform: 'rotate(-28deg)' }}
        animate={{ rotate: [-28, -26, -28] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
      />

      {/* Sparkle stars and doodle rain in right margin */}
      <div className="absolute right-24 top-0 bottom-0 w-16 pointer-events-none hidden lg:flex flex-col justify-around py-20 opacity-30 text-[#9a8a7a] text-sm">
        <span style={{ transform: 'rotate(15deg)' }}>✦</span>
        <span style={{ transform: 'translateX(-20px)' }}>〰️</span>
        <span style={{ transform: 'rotate(-10deg) scale(0.8)' }}>✧</span>
        <span style={{ transform: 'translateX(10px) rotate(45deg)' }}>✕</span>
        <span>•</span>
        <span style={{ transform: 'rotate(20deg) scale(1.2)' }}>✦</span>
        <span style={{ transform: 'translateX(-10px)' }}>〰️</span>
      </div>

      {/* Right margin handwritten notes — clearly readable in the side margin */}
      <div className="absolute right-4 top-36 pointer-events-none hidden xl:flex flex-col gap-10">
        {[
          { text: 'loves .NET ♥', rot: -1 },
          { text: 'coffee = fuel ☕', rot: 1 },
          { text: 'ask me about CQRS!', rot: -0.5 },
          { text: 'always learning 📚', rot: 2 },
          { text: 'clean code enthusiast', rot: -1.5 },
          { text: 'debugging... 🐛', rot: 0.5 },
          { text: 'git commit -m "fix"', rot: -2 },
        ].map((n, i) => (
          <div key={i} className="flex items-center gap-2">
            {i % 2 === 0 && <span className="text-[#c8b8a0] text-xs">✨</span>}
            <p
              className="font-hand text-lg text-[#7a5a38] opacity-70 whitespace-nowrap"
              style={{ writingMode: 'vertical-rl', transform: `rotate(180deg) rotate(${n.rot}deg)` }}>
              {n.text}
            </p>
            {i % 3 === 0 && <span className="text-[#c8b8a0] text-[10px]">✕</span>}
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto pl-10 sm:pl-16 relative">
        {/* Page header */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="mb-8">
          <div className="flex items-center gap-3">
            <h2 className="font-sketch text-4xl sm:text-5xl font-bold text-[#3d2b1f]" style={{ transform: 'rotate(-1deg)' }}>
              About Me
            </h2>
            <svg width="60" height="20" viewBox="0 0 60 20" className="mt-2">
              <path d="M5 15 Q20 5 40 12 Q50 15 55 10" stroke="#c8b8a0" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <p className="font-hand lowercase-all text-[#7a6a5a] text-xl mt-1" style={{ transform: 'rotate(-0.5deg)' }}>
            — page 1 of many ✏️
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left: Avatar + Photo placeholder */}
          <div className="flex flex-col gap-4 items-center lg:items-start flex-shrink-0">


            {/* Photo placeholder */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
              whileHover={{ rotate: -2, scale: 1.03 }}
              className="relative"
            >
              <div className="absolute -top-2 left-4 tape w-12 h-4 rotate-[-15deg]" />


            </motion.div>

            {/* Info stickers */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
              className="flex flex-col gap-3 mt-4">
              {[
                { emoji: '♦', text: 'Edirne / İstanbul', color: '#FFD9C0' },
                { emoji: '✦', text: 'Trakya Univ, 2025', color: '#E0D4F7' },
                { emoji: '◈', text: 'Fullstack Developer', color: '#C8F0DC' },
                { emoji: '○', text: 'EN / TR', color: '#C5E8F7' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 4, rotate: 1 }}
                  className="font-hand text-xl px-4 py-2 relative paper-scrap"
                  style={{
                    background: s.color,
                    boxShadow: '2px 2px 0 rgba(0,0,0,0.06)',
                    transform: `rotate(${[-1.5, 1.5, -0.5, 2][i]}deg)`,
                  }}
                >
                  <div className="absolute -top-1.5 right-2 tape w-8 h-3" style={{ transform: `rotate(${[-12, 15, -8, 10][i]}deg)` }} />
                  {s.emoji} {s.text}
                </motion.div>
              ))}
            </motion.div>

            {/* CV Download button */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} className="mt-4">
              <motion.button
                onClick={handleCvDownload}
                whileHover={{ scale: 1.04, rotate: -1 }}
                whileTap={{ scale: 0.97 }}
                className="relative font-hand text-xl font-bold px-5 py-2.5 rounded-lg"
                style={{
                  background: '#C8F0DC',
                  border: '2px solid #8fd4aa',
                  boxShadow: '3px 4px 0 rgba(0,0,0,0.1)',
                  color: '#3d2b1f',
                  cursor: 'pointer',
                }}
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 tape w-10 h-3 rotate-[3deg]" />
                ↓ download CV ✎
              </motion.button>
            </motion.div>

            {/* Skills quick view */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5} className="relative mt-4">
              <h3 className="font-hand text-2xl text-[#3d2b1f] mb-4 flex items-center gap-2">
                quick stack
                <svg width="40" height="16" viewBox="0 0 40 16">
                  <path d="M2 10 Q15 4 35 10" stroke="#c8b8a0" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              </h3>
              <div className="flex flex-wrap gap-2 w-full lg:w-48">
                {[
                  { label: '.NET Core', bg: '#C8F0DC' },
                  { label: 'C#', bg: '#C8F0DC' },
                  { label: 'RabbitMQ', bg: '#C8F0DC' },
                  { label: 'PostgreSQL', bg: '#FFD9C0' },
                  { label: 'ElasticSearch', bg: '#FFD9C0' },
                  { label: 'React', bg: '#E0D4F7' },
                  { label: 'Python', bg: '#C5E8F7' },
                  { label: 'Swift', bg: '#FFD6E0' },
                ].map((skill, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="relative paper-scrap"
                    style={{
                      transform: `rotate(${(i % 3 - 1) * 1.5}deg)`,
                    }}
                  >
                    <div className="absolute -top-1.5 left-1 tape w-5 h-2" style={{ transform: `rotate(${[-10, 12, -15][i % 3]}deg)` }} />
                    <span
                      className="font-nunito text-xs font-semibold px-2 py-1 block lowercase-all"
                      style={{ background: skill.bg }}
                    >
                      {skill.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Main text scattered notes */}
          <div className="flex-1 relative flex flex-col gap-5">
            {/* Intro text (Note 1) */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
              className="p-5 rounded-sm relative sticky-note wobbly-border z-10"
              style={{
                background: 'rgba(255,243,176,0.9)',
                border: '1.5px solid rgba(200,176,100,0.4)',
                boxShadow: '2px 4px 12px rgba(0,0,0,0.08)',
                transform: 'rotate(-1deg)',
              }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 tape w-16 h-5 rotate-[-2deg]" />
              {/* Coffee ring on this note */}
              <div className="absolute -top-4 -right-4 pointer-events-none opacity-70"
                style={{ width: 40, height: 50 }}>
                <div className="coffee-ring w-full h-full" />
              </div>
              <p className="font-hand sticky-note-text text-[#3d2b1f] text-3xl font-bold leading-snug">
                hey! i'm eylem ✿
              </p>
              <p className="font-nunito text-[#5a4a3a] text-lg leading-relaxed mt-2">
                backend developer from türkiye, obsessed with clean code,
                scalable systems, and making things actually work ✎
              </p>
              {/* Corner decoration */}
              <svg className="absolute bottom-2 right-2 opacity-50" width="30" height="30" viewBox="0 0 30 30">
                <path d="M5 25 Q15 5 25 5" stroke="#c8b8a0" strokeWidth="1.5" fill="none" />
                <circle cx="5" cy="25" r="2" fill="#c8b8a0" />
              </svg>
            </motion.div>

            {/* Current Work text (Note 2) */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={3}
              className="mb-8 p-5 rounded-sm relative sticky-note wobbly-border self-end max-w-[95%] -mt-3 z-20"
              style={{
                background: '#e0f2fe', // light blue note
                border: '1.5px solid rgba(125,180,220,0.4)',
                boxShadow: '2px 4px 12px rgba(0,0,0,0.08)',
                transform: 'rotate(2deg)',
              }}
            >
              <div className="absolute -top-3 left-1/4 tape tape-blue w-14 h-5 rotate-[4deg]" />
              <p className="font-nunito text-[#2c3e50] text-lg leading-relaxed">
                currently building distributed systems with .net & rabbitmq.
              </p>
              <p className="font-nunito text-[#4a5a6a] text-sm mt-3 italic opacity-80" style={{ transform: 'rotate(-0.5deg)' }}>
                "i believe good software is both art and engineering."
              </p>
            </motion.div>

            {/* Side margin notes — small screens only */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={3}
              className="flex flex-wrap gap-2 mb-6 xl:hidden"
            >
              {['loves .NET ♥', 'coffee = fuel ☕', 'ask me about CQRS!'].map((n, i) => (
                <span key={i} className="font-hand text-sm text-[#9a7a6a] bg-white/50 px-2 py-1 rounded"
                  style={{ transform: `rotate(${[-1, 1, -0.5][i]}deg)` }}>
                  → {n}
                </span>
              ))}
            </motion.div>


          </div>
        </div>
      </div>
    </div>
  )
}

function AvatarSVG() {
  return (
    <svg width="140" height="160" viewBox="0 0 140 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <rect x="35" y="100" width="70" height="55" rx="8" fill="#C8F0DC" stroke="#6b8f71" strokeWidth="2" />
      {/* Shirt details */}
      <path d="M55 105 L70 115 L85 105" stroke="#6b8f71" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Neck */}
      <rect x="58" y="90" width="24" height="16" rx="4" fill="#f5d0a9" stroke="#c4956a" strokeWidth="1.5" />
      {/* Head */}
      <ellipse cx="70" cy="75" rx="32" ry="34" fill="#f5d0a9" stroke="#c4956a" strokeWidth="2" />
      {/* Hair - dark, long */}
      <ellipse cx="70" cy="55" rx="32" ry="22" fill="#2d1b0e" />
      <path d="M38 55 Q30 75 36 100" stroke="#2d1b0e" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M102 55 Q110 75 104 100" stroke="#2d1b0e" strokeWidth="10" fill="none" strokeLinecap="round" />
      <ellipse cx="70" cy="48" rx="32" ry="14" fill="#2d1b0e" />
      {/* Eyes */}
      <ellipse cx="58" cy="76" rx="4.5" ry="5" fill="white" />
      <ellipse cx="82" cy="76" rx="4.5" ry="5" fill="white" />
      <circle cx="59" cy="77" r="3" fill="#3d2b1f" />
      <circle cx="83" cy="77" r="3" fill="#3d2b1f" />
      <circle cx="60" cy="76" r="1" fill="white" />
      <circle cx="84" cy="76" r="1" fill="white" />
      {/* Eyebrows */}
      <path d="M53 70 Q58 67 63 70" stroke="#2d1b0e" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M77 70 Q82 67 87 70" stroke="#2d1b0e" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Nose */}
      <path d="M68 82 Q70 87 72 82" stroke="#c4956a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Smile */}
      <path d="M62 92 Q70 98 78 92" stroke="#c4956a" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <circle cx="52" cy="87" r="6" fill="#ffb6c1" opacity="0.4" />
      <circle cx="88" cy="87" r="6" fill="#ffb6c1" opacity="0.4" />
      {/* Laptop hint */}
      <rect x="20" y="128" width="100" height="4" rx="2" fill="#a0b8c8" stroke="#7a98a8" strokeWidth="1" />
      <rect x="28" y="112" width="84" height="18" rx="3" fill="#c5e8f7" stroke="#7a98a8" strokeWidth="1.5" />
    </svg>
  )
}
