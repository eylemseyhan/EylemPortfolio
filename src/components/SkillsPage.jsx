import { motion } from 'framer-motion'

const skillCategories = [
  {
    label: 'Backend',
    marker: '✎',
    color: 'mint',
    bg: '#C8F0DC',
    border: '#8fd4aa',
    skills: ['C#', '.NET Core', '.NET MVC', 'RabbitMQ', 'Entity Framework', 'REST API'],
  },
  {
    label: 'Frontend',
    marker: '✿',
    color: 'lavender',
    bg: '#E0D4F7',
    border: '#b8a8e0',
    skills: ['React', 'HTML', 'CSS', 'Bootstrap'],
  },
  {
    label: 'Databases',
    marker: '◈',
    color: 'peach',
    bg: '#FFD9C0',
    border: '#f0b898',
    skills: ['PostgreSQL', 'SQL Server', 'Firebase Firestore'],
  },
  {
    label: 'AI / ML',
    marker: '✦',
    color: 'babyblue',
    bg: '#C5E8F7',
    border: '#90c8e8',
    skills: ['LangChain'],
  },
  {
    label: 'Tools & Infra',
    marker: '◎',
    color: 'butter',
    bg: '#FFF3B0',
    border: '#e8d878',
    skills: ['Git', 'Postman', 'ElasticSearch', 'Docker', 'Aiven', 'GitHub'],
  },
  {
    label: 'Languages',
    marker: '♡',
    color: 'rose',
    bg: '#FFD6E0',
    border: '#f0a8c0',
    skills: ['Turkish — native', 'English — B2', 'German — A2'],
  },
]

const rotations = [-2, 1, -1, 2, -1.5, 0.5, -0.8, 1.2, -0.5, 1.8, -1.3, 0.7, -2.1, 1.5, -0.3]

export default function SkillsPage() {
  return (
    <div className="min-h-screen py-12 px-4 relative" style={{ background: '#faf7f2' }}>
      {/* Notebook lines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(100,149,237,0.1) 28px)',
        backgroundSize: '100% 28px',
      }} />
      <div className="absolute left-16 top-0 bottom-0 w-px" style={{ background: 'rgba(220,80,80,0.2)' }} />
      <div className="absolute left-4 top-0 bottom-0 flex flex-col items-center justify-around py-8">
        {[...Array(10)].map((_, i) => <div key={i} className="ring-hole mb-2" />)}
      </div>

      {/* Dog-eared top-right corner */}
      <div className="worn-corner-tr" />

      {/* Scattered pencil stars — notebook doodles */}
      {[
        { top: '8%', left: '78%', rot: 15, size: 10, opacity: 0.2 },
        { top: '22%', left: '92%', rot: -8, size: 8, opacity: 0.15 },
        { top: '45%', left: '88%', rot: 22, size: 12, opacity: 0.18 },
        { top: '60%', left: '75%', rot: -5, size: 9, opacity: 0.14 },
        { top: '78%', left: '85%', rot: 30, size: 11, opacity: 0.17 },
        { top: '35%', left: '96%', rot: -20, size: 7, opacity: 0.12 },
      ].map((s, i) => (
        <span key={i} className="absolute pointer-events-none font-sketch text-[#7a6a5a] hidden md:block"
          style={{ top: s.top, left: s.left, fontSize: s.size, transform: `rotate(${s.rot}deg)`, opacity: s.opacity }}>
          ✦
        </span>
      ))}

      {/* Margin annotation */}
      <div className="absolute top-1/3 right-1 pointer-events-none hidden md:block"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
        <p className="font-sketch text-[9px] text-[#b8987a] opacity-35 whitespace-nowrap">
          still googling half of these ngl
        </p>
      </div>

      {/* Coffee ring — near top right */}
      <div className="absolute top-6 right-20 pointer-events-none opacity-50"
        style={{ width: 56, height: 56 }}>
        <div className="coffee-ring w-full h-full" />
        <div className="absolute inset-4 coffee-ring opacity-60" />
      </div>

      {/* Graphite smudge near header */}
      <div className="absolute top-14 left-32 pointer-events-none graphite-smudge"
        style={{ width: 130, height: 55, opacity: 0.7 }} />

      {/* Small ink blot */}
      <div className="absolute top-2/3 left-12 ink-blot pointer-events-none"
        style={{ width: 8, height: 7, opacity: 0.5 }} />

      {/* ── Floating SVG doodles ────────────────────────────── */}

      {/* Crown — top-right, "wall of achievements" energy */}
      <motion.img
        src="/doodles/crown.svg"
        className="absolute pointer-events-none hidden lg:block"
        style={{ top: 24, right: 36, width: 60, height: 44, opacity: 0.38, transform: 'rotate(-6deg)' }}
        animate={{ y: [0, -5, 0], rotate: [-6, -4, -6] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
      />

      {/* Flower — mid-right, softens the technical wall */}
      <motion.img
        src="/doodles/flower.svg"
        className="absolute pointer-events-none hidden xl:block"
        style={{ top: '40%', right: 18, width: 48, height: 48, opacity: 0.28, transform: 'rotate(12deg)' }}
        animate={{ rotate: [12, 16, 12], scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      />

      {/* Heart — bottom-right, "Languages" section companion */}
      <motion.img
        src="/doodles/heart.svg"
        className="absolute pointer-events-none hidden xl:block"
        style={{ bottom: 100, right: 28, width: 40, height: 36, opacity: 0.3, transform: 'rotate(-8deg)' }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
      />

      <div className="max-w-5xl mx-auto pl-10 sm:pl-16 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h2 className="font-sketch text-4xl sm:text-5xl font-bold text-[#3d2b1f]"
            style={{ transform: 'rotate(-1deg)' }}>
            Skills & Tools ◎
          </h2>
          <p className="font-nunito text-[#7a6a5a] mt-1" style={{ transform: 'rotate(-0.5deg)' }}>
            — my wall of sticky notes ◈
          </p>
          <svg width="160" height="14" viewBox="0 0 160 14" className="mt-1">
            <path d="M4 10 Q40 3 80 10 Q120 17 156 8"
              stroke="#c8b8a0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* Hover tip */}
        <motion.div
          initial={{ opacity: 0, rotate: 2 }}
          animate={{ opacity: 1, rotate: 2 }}
          transition={{ delay: 0.4 }}
          className="mb-8 inline-block px-4 py-2 rounded-lg font-hand text-sm text-[#5a4a3a]"
          style={{
            background: '#C8F0DC',
            border: '1.5px solid #8fd4aa',
            boxShadow: '2px 3px 0 rgba(0,0,0,0.08)',
            transform: 'rotate(2deg)',
          }}
        >
          wiggle the stickies! ✿
        </motion.div>

        {/* Skill sections */}
        <div className="space-y-10">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: ci * 0.05 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="font-hand text-xl font-bold px-4 py-1.5 rounded-lg"
                  style={{
                    background: cat.bg,
                    border: `2px solid ${cat.border}`,
                    boxShadow: `2px 3px 0 rgba(0,0,0,0.08)`,
                    transform: 'rotate(-0.5deg)',
                  }}>
                  {cat.marker} {cat.label}
                </div>
                {/* Marker underline */}
                <svg width="50" height="12" viewBox="0 0 50 12">
                  <path d="M2 8 Q25 3 48 8" stroke={cat.border} strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </svg>
              </div>

              {/* Sticky notes wall */}
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill, si) => {
                  const rot = rotations[(ci * 5 + si) % rotations.length]
                  return (
                    <StickyNote
                      key={skill}
                      label={skill}
                      bg={cat.bg}
                      border={cat.border}
                      rotation={rot}
                      delay={ci * 0.05 + si * 0.04}
                    />
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 font-hand text-[#9a8a7a] text-lg"
          style={{ transform: 'rotate(-1deg)' }}
        >
          always learning more... ✎ ✨
        </motion.div>
      </div>
    </div>
  )
}

function StickyNote({ label, bg, border, rotation, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: rotation }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{
        rotate: rotation + (rotation > 0 ? 3 : -3),
        y: -6,
        scale: 1.08,
        boxShadow: `3px 6px 0 rgba(0,0,0,0.12)`,
        transition: { type: 'spring', stiffness: 300, damping: 15 }
      }}
      className="relative px-4 py-3 rounded-sm cursor-pointer select-none"
      style={{
        background: bg,
        border: `1.5px solid ${border}`,
        boxShadow: `2px 4px 0 rgba(0,0,0,0.08)`,
        transform: `rotate(${rotation}deg)`,
        '--rot': `${rotation}deg`,
        minWidth: 80,
        textAlign: 'center',
      }}
    >
      {/* Top fold */}
      <div className="absolute top-0 left-0 w-full h-1.5 rounded-sm"
        style={{ background: `rgba(0,0,0,0.06)` }} />
      <p className="font-nunito text-sm text-[#3d2b1f] font-medium leading-tight">
        {label}
      </p>
    </motion.div>
  )
}
