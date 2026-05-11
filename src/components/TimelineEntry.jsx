import { motion } from 'framer-motion'

const colorMap = {
  mint: { bg: '#C8F0DC', border: '#8fd4aa', shadow: '#a8dfc0' },
  lavender: { bg: '#E0D4F7', border: '#b8a8e0', shadow: '#c8bcef' },
  peach: { bg: '#FFD9C0', border: '#f0b898', shadow: '#f0c8a8' },
  butter: { bg: '#FFF3B0', border: '#e8d878', shadow: '#e8e090' },
  babyblue: { bg: '#C5E8F7', border: '#90c8e8', shadow: '#a8d8f0' },
  rose: { bg: '#FFD6E0', border: '#f0a8c0', shadow: '#f0c0d0' },
}

export default function TimelineEntry({ entry, index, side }) {
  const colors = colorMap[entry.color] || colorMap.mint
  const isLeft = side === 'left'

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: 0.05 }}
      className={`flex ${isLeft ? 'flex-row' : 'flex-row-reverse'} items-start gap-4 mb-6`}
    >
      {/* Entry card */}
      <motion.div
        whileHover={{ y: -5, rotate: isLeft ? 1 : -1, boxShadow: `4px 8px 0 ${colors.shadow}` }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative rounded-xl p-4 max-w-[280px] sm:max-w-[320px] cursor-pointer"
        style={{
          background: colors.bg,
          border: `2px solid ${colors.border}`,
          boxShadow: `3px 5px 0 ${colors.shadow}`,
          transform: `rotate(${isLeft ? -1 : 1}deg)`,
        }}
      >
        {/* Tape decoration */}
        <div className="tape absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-4" style={{ transform: 'translateX(-50%) rotate(-5deg)' }} />

        {/* Current label */}
        {entry.current && (
          <div className="absolute -top-2 -right-2 bg-rose-400 text-white font-hand text-xs px-2 py-0.5 rounded-full rotate-12"
            style={{ background: '#ff8fab', boxShadow: '1px 2px 0 rgba(0,0,0,0.15)' }}>
            ★ CURRENT
          </div>
        )}

        {/* Emoji + Title */}
        <div className="flex items-start gap-2 mb-2">
          <span className="text-2xl flex-shrink-0">{entry.emoji}</span>
          <div>
            <h3 className="font-hand font-bold text-lg text-[#3d2b1f] leading-tight">
              {entry.title}
            </h3>
            {entry.period && (
              <p className="font-nunito text-xs text-[#7a6a5a]">{entry.period}</p>
            )}
            {entry.subtitle && (
              <p className="font-nunito text-xs text-[#7a6a5a]">{entry.subtitle}</p>
            )}
          </div>
        </div>

        {/* Quote */}
        <p className="font-nunito text-sm text-[#5a4a3a] leading-relaxed italic mb-2">
          "{entry.quote}"
        </p>

        {/* Stack */}
        {entry.stack && (
          <div className="flex flex-wrap gap-1 mt-2">
            {entry.stack.map((s, i) => (
              <span key={i} className="font-nunito text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.6)', border: `1px solid ${colors.border}` }}>
                {s}
              </span>
            ))}
          </div>
        )}

        {/* Pencil scribble corner */}
        <svg className="absolute bottom-2 right-2 opacity-30" width="20" height="20" viewBox="0 0 20 20">
          <path d="M4 16 L8 4 L12 12 L16 6" stroke="#7a6a5a" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>

      {/* Connecting dot */}
      <div className="flex flex-col items-center mt-4 flex-shrink-0">
        <div className="w-3 h-3 rounded-full border-2 border-[#9a8a7a]"
          style={{ background: colors.bg }} />
      </div>
    </motion.div>
  )
}
