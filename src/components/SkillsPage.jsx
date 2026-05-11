import { motion } from 'framer-motion'

const skillCategories = [
  {
    label: 'Backend',
    marker: '⚙️',
    color: 'mint',
    bg: '#C8F0DC',
    border: '#8fd4aa',
    skills: ['C#', '.NET Core', '.NET MVC', 'CQRS', 'Event-Driven Arch.', 'RabbitMQ', 'Entity Framework', 'REST API'],
  },
  {
    label: 'Frontend',
    marker: '🎨',
    color: 'lavender',
    bg: '#E0D4F7',
    border: '#b8a8e0',
    skills: ['React', 'HTML', 'CSS', 'Bootstrap', 'jQuery'],
  },
  {
    label: 'Databases',
    marker: '🗄️',
    color: 'peach',
    bg: '#FFD9C0',
    border: '#f0b898',
    skills: ['PostgreSQL', 'SQL Server', 'Firebase Firestore'],
  },
  {
    label: 'AI / ML',
    marker: '🤖',
    color: 'babyblue',
    bg: '#C5E8F7',
    border: '#90c8e8',
    skills: ['LangChain', 'OpenAI API', 'Vector Indexing', 'Prompt Engineering'],
  },
  {
    label: 'Tools & Infra',
    marker: '🛠️',
    color: 'butter',
    bg: '#FFF3B0',
    border: '#e8d878',
    skills: ['Git', 'Postman', 'ElasticSearch', 'Docker', 'Aiven', 'GitHub'],
  },
  {
    label: 'Other',
    marker: '✨',
    color: 'rose',
    bg: '#FFD6E0',
    border: '#f0a8c0',
    skills: ['Swift (iOS)', 'Python', 'JavaScript', 'English B2', 'German A2'],
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

      <div className="max-w-5xl mx-auto pl-10 sm:pl-16 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h2 className="font-caveat text-4xl sm:text-5xl font-bold text-[#3d2b1f]"
            style={{ transform: 'rotate(-1deg)' }}>
            Skills & Tools 🧰
          </h2>
          <p className="font-patrick text-[#7a6a5a] mt-1" style={{ transform: 'rotate(-0.5deg)' }}>
            — my wall of sticky notes 📌
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
          className="mb-8 inline-block px-4 py-2 rounded-lg font-caveat text-sm text-[#5a4a3a]"
          style={{
            background: '#C8F0DC',
            border: '1.5px solid #8fd4aa',
            boxShadow: '2px 3px 0 rgba(0,0,0,0.08)',
            transform: 'rotate(2deg)',
          }}
        >
          wiggle the stickies! 🖐️
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
                <div className="font-caveat text-xl font-bold px-4 py-1.5 rounded-lg"
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
          className="mt-12 font-caveat text-[#9a8a7a] text-lg"
          style={{ transform: 'rotate(-1deg)' }}
        >
          always learning more... 📚 ✨
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
      <p className="font-patrick text-sm text-[#3d2b1f] font-medium leading-tight">
        {label}
      </p>
    </motion.div>
  )
}
