import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
}

export default function AboutPage() {
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

      <div className="max-w-4xl mx-auto pl-10 sm:pl-16 relative">
        {/* Page header */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="mb-8">
          <div className="flex items-center gap-3">
            <h2 className="font-caveat text-4xl sm:text-5xl font-bold text-[#3d2b1f]" style={{ transform: 'rotate(-1deg)' }}>
              About Me
            </h2>
            <svg width="60" height="20" viewBox="0 0 60 20" className="mt-2">
              <path d="M5 15 Q20 5 40 12 Q50 15 55 10" stroke="#c8b8a0" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <p className="font-patrick text-[#7a6a5a] text-sm mt-1" style={{ transform: 'rotate(-0.5deg)' }}>
            — page 1 of many ✏️
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left: Avatar + Photo placeholder */}
          <div className="flex flex-col gap-4 items-center lg:items-start flex-shrink-0">
            {/* SVG Avatar */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
              whileHover={{ rotate: 2, scale: 1.03 }}
              className="relative"
            >
              <div className="absolute -top-2 -left-2 tape w-10 h-4 rotate-[-30deg]" />
              <div className="absolute -top-2 -right-2 tape w-10 h-4 rotate-[30deg]" />
              <div className="rounded-xl overflow-hidden" style={{
                border: '2px solid #c8b8a0',
                boxShadow: '3px 4px 0 rgba(0,0,0,0.1)',
                background: '#e8dfd0',
                width: 140, height: 160,
              }}>
                <AvatarSVG />
              </div>
            </motion.div>

            {/* Photo placeholder */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
              whileHover={{ rotate: -2, scale: 1.03 }}
              className="relative"
            >
              <div className="absolute -top-2 left-4 tape w-12 h-4 rotate-[-15deg]" />
              <div className="flex flex-col items-center justify-center rounded" style={{
                width: 140, height: 100,
                border: '2px dashed #c8b8a0',
                background: 'rgba(200,176,160,0.1)',
              }}>
                <span className="text-3xl">📷</span>
                <p className="font-caveat text-[#9a8a7a] text-xs text-center mt-1 px-2">
                  add your photo here
                </p>
              </div>
              <p className="font-patrick text-[#7a6a5a] text-xs mt-1 text-center" style={{ transform: 'rotate(-1deg)' }}>
                ← me, probably debugging something 🐛
              </p>
            </motion.div>

            {/* Info stickers */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
              className="flex flex-col gap-2 mt-2">
              {[
                { emoji: '📍', text: 'Edirne / İstanbul', color: '#FFD9C0' },
                { emoji: '🎓', text: 'Trakya Univ, 2025', color: '#E0D4F7' },
                { emoji: '💼', text: 'Backend Dev @ Senswise', color: '#C8F0DC' },
                { emoji: '🌍', text: 'EN / DE / TR', color: '#C5E8F7' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 4, rotate: 1 }}
                  className="font-patrick text-sm px-3 py-1.5 rounded-lg"
                  style={{
                    background: s.color,
                    border: '1.5px solid rgba(0,0,0,0.08)',
                    boxShadow: '2px 2px 0 rgba(0,0,0,0.06)',
                    transform: `rotate(${[-1, 1, -0.5, 0.5][i]}deg)`,
                  }}
                >
                  {s.emoji} {s.text}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Main text */}
          <div className="flex-1 relative">
            {/* Margin notes */}
            <div className="absolute -right-2 top-4 hidden xl:flex flex-col gap-6">
              {[
                { text: 'loves .NET ♥', rot: 90 },
                { text: 'coffee = fuel ☕', rot: 90 },
                { text: 'ask me about CQRS!', rot: 90 },
              ].map((n, i) => (
                <p key={i} className="font-caveat text-xs text-[#9a7a6a] whitespace-nowrap"
                  style={{ writingMode: 'vertical-rl', transform: `rotate(180deg) rotate(${n.rot === 90 ? 0 : n.rot}deg)` }}>
                  → {n.text}
                </p>
              ))}
            </div>

            {/* Intro text */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
              className="mb-6 p-5 rounded-xl relative"
              style={{
                background: 'rgba(255,243,176,0.4)',
                border: '1.5px solid rgba(200,176,100,0.3)',
                boxShadow: '2px 3px 0 rgba(0,0,0,0.06)',
              }}
            >
              <p className="font-patrick text-[#3d2b1f] text-lg leading-relaxed">
                Hey! I'm Eylem 👋
              </p>
              <p className="font-nunito text-[#5a4a3a] text-base leading-relaxed mt-2">
                Backend developer from Türkiye, obsessed with clean code,
                scalable systems, and making things actually work ⚙️
              </p>
              <p className="font-nunito text-[#5a4a3a] text-base leading-relaxed mt-2">
                Currently building distributed systems with .NET & RabbitMQ.
              </p>
              <p className="font-caveat text-[#7a5a38] text-lg mt-3 italic">
                "I believe good software is both art and engineering."
              </p>

              {/* Corner decoration */}
              <svg className="absolute bottom-2 right-2" width="30" height="30" viewBox="0 0 30 30">
                <path d="M5 25 Q15 5 25 5" stroke="#c8b8a0" strokeWidth="1.5" fill="none" />
                <circle cx="5" cy="25" r="2" fill="#c8b8a0" />
              </svg>
            </motion.div>

            {/* Side margin notes visible on smaller screens */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={3}
              className="flex flex-wrap gap-2 mb-6 xl:hidden"
            >
              {['loves .NET ♥', 'coffee = fuel ☕', 'ask me about CQRS!'].map((n, i) => (
                <span key={i} className="font-caveat text-sm text-[#9a7a6a] bg-white/50 px-2 py-1 rounded"
                  style={{ transform: `rotate(${[-1, 1, -0.5][i]}deg)` }}>
                  → {n}
                </span>
              ))}
            </motion.div>

            {/* Skills quick view */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}>
              <h3 className="font-caveat text-2xl text-[#3d2b1f] mb-3 flex items-center gap-2">
                Quick Stack
                <svg width="40" height="16" viewBox="0 0 40 16">
                  <path d="M2 10 Q15 4 35 10" stroke="#c8b8a0" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: '.NET Core', bg: '#C8F0DC' },
                  { label: 'C#', bg: '#C8F0DC' },
                  { label: 'RabbitMQ', bg: '#C8F0DC' },
                  { label: 'CQRS', bg: '#C8F0DC' },
                  { label: 'PostgreSQL', bg: '#FFD9C0' },
                  { label: 'ElasticSearch', bg: '#FFD9C0' },
                  { label: 'React', bg: '#E0D4F7' },
                  { label: 'Python', bg: '#C5E8F7' },
                  { label: 'LangChain', bg: '#C5E8F7' },
                  { label: 'Swift', bg: '#FFD6E0' },
                ].map((skill, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.08, rotate: 1 }}
                    className="font-patrick text-sm px-3 py-1 rounded-full"
                    style={{
                      background: skill.bg,
                      border: '1.5px solid rgba(0,0,0,0.08)',
                      transform: `rotate(${(i % 3 - 1) * 0.8}deg)`,
                    }}
                  >
                    {skill.label}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Hand-drawn arrow to skills section */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5}
              className="mt-6 flex items-center gap-2">
              <svg width="60" height="30" viewBox="0 0 60 30">
                <path d="M5 10 Q30 5 50 20" stroke="#9a8a7a" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="4 3" />
                <path d="M44 16 L52 22 L46 26" stroke="#9a8a7a" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-caveat text-[#9a8a7a] text-sm" style={{ transform: 'rotate(-1deg)' }}>
                more skills below ↓
              </span>
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
      {/* Face */}
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
