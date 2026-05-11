import { motion } from 'framer-motion'

const colorMap = {
  mint: { bg: '#C8F0DC', border: '#8fd4aa', shadow: '#a8dfc0' },
  lavender: { bg: '#E0D4F7', border: '#b8a8e0', shadow: '#c8bcef' },
  peach: { bg: '#FFD9C0', border: '#f0b898', shadow: '#f0c8a8' },
  butter: { bg: '#FFF3B0', border: '#e8d878', shadow: '#e8e090' },
  babyblue: { bg: '#C5E8F7', border: '#90c8e8', shadow: '#a8d8f0' },
  rose: { bg: '#FFD6E0', border: '#f0a8c0', shadow: '#f0c0d0' },
}

export default function ProjectCard({ project }) {
  const colors = colorMap[project.color] || colorMap.mint

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -8,
        rotate: 0,
        boxShadow: `6px 10px 0 ${colors.shadow}`,
        transition: { type: 'spring', stiffness: 280, damping: 20 }
      }}
      className="relative rounded-xl p-5 cursor-pointer"
      style={{
        background: colors.bg,
        border: `2px solid ${colors.border}`,
        boxShadow: `4px 6px 0 ${colors.shadow}`,
        transform: `rotate(${project.rotation}deg)`,
        transformOrigin: 'center',
      }}
    >
      {/* Tape top */}
      <div className="tape absolute -top-3 left-1/2 w-12 h-4"
        style={{ transform: 'translateX(-50%) rotate(-3deg)' }} />

      {/* Torn paper edge effect top */}
      <div className="absolute -top-0.5 left-0 right-0 h-1 overflow-hidden">
        <svg width="100%" height="4" preserveAspectRatio="none" viewBox="0 0 200 4">
          <path d="M0 2 Q10 0 20 2 Q30 4 40 2 Q50 0 60 2 Q70 4 80 2 Q90 0 100 2 Q110 4 120 2 Q130 0 140 2 Q150 4 160 2 Q170 0 180 2 Q190 4 200 2"
            fill={colors.bg} stroke={colors.border} strokeWidth="1" />
        </svg>
      </div>

      {/* Emoji + Title */}
      <div className="flex items-start gap-3 mb-3">
        <span className="text-3xl flex-shrink-0">{project.emoji}</span>
        <div>
          <h3 className="font-caveat font-bold text-xl text-[#3d2b1f] leading-tight">
            {project.title}
          </h3>
          <p className="font-patrick text-xs text-[#7a6a5a] mt-0.5">{project.type}</p>
        </div>
      </div>

      {/* Description */}
      <p className="font-nunito text-sm text-[#5a4a3a] leading-relaxed mb-4">
        {project.description}
      </p>

      {/* Stack tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.stack.map((s, i) => (
          <span key={i} className="font-patrick text-xs px-2 py-0.5 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.65)',
              border: `1.5px solid ${colors.border}`,
              transform: `rotate(${(i % 3 - 1) * 0.5}deg)`,
            }}>
            {s}
          </span>
        ))}
      </div>

      {/* GitHub button */}
      <motion.a
        href={`https://${project.github}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-2 font-caveat font-bold text-base px-4 py-2 rounded-lg"
        style={{
          background: 'rgba(255,255,255,0.7)',
          border: `2px solid ${colors.border}`,
          boxShadow: `2px 3px 0 ${colors.shadow}`,
          color: '#3d2b1f',
          textDecoration: 'none',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <GithubIcon />
        View on GitHub →
      </motion.a>

      {/* Corner scribble */}
      <svg className="absolute bottom-3 right-3 opacity-20" width="24" height="24" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" stroke="#7a6a5a" strokeWidth="1.5" fill="none" />
        <path d="M8 12 Q12 6 16 12" stroke="#7a6a5a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </svg>
    </motion.div>
  )
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}
