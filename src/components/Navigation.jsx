import { motion } from 'framer-motion'

const pages = [
  { id: 'about', label: 'About', emoji: '✿' },
  { id: 'timeline', label: 'Journey', emoji: '✎' },
  { id: 'projects', label: 'Projects', emoji: '★' },
  { id: 'skills', label: 'Skills', emoji: '◎' },
  { id: 'contact', label: 'Contact', emoji: '♡' },
]

export default function Navigation({ activePage, onNavigate }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-4 sm:px-8 py-3"
      style={{
        background: 'rgba(250, 247, 242, 0.92)',
        backdropFilter: 'blur(8px)',
        borderBottom: '2px solid rgba(200, 184, 160, 0.4)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}
    >
      {/* Logo */}
      <motion.button
        onClick={() => onNavigate('cover')}
        whileHover={{ rotate: -2, scale: 1.05 }}
        className="font-hand text-xl font-bold text-[#3d2b1f] flex items-center gap-2"
      >
        <span>✎</span>
        <span>Eylem's Portfolio</span>
      </motion.button>

      {/* Nav links */}
      <div className="hidden sm:flex items-center gap-1">
        {pages.map((page, i) => (
          <motion.button
            key={page.id}
            onClick={() => onNavigate(page.id)}
            whileHover={{ y: -2, rotate: (i % 2 === 0 ? -1 : 1) }}
            whileTap={{ scale: 0.95 }}
            className="font-hand text-base px-3 py-1.5 rounded-lg transition-all"
            style={{
              background: activePage === page.id ? '#C8F0DC' : 'transparent',
              border: activePage === page.id ? '1.5px solid #8fd4aa' : '1.5px solid transparent',
              color: '#3d2b1f',
              transform: `rotate(${(i % 3 - 1) * 0.5}deg)`,
            }}
          >
            {page.emoji} {page.label}
          </motion.button>
        ))}
      </div>

      {/* Mobile: hamburger dots */}
      <div className="flex sm:hidden items-center gap-1">
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => onNavigate(page.id)}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              background: activePage === page.id ? '#8fd4aa' : '#c8b8a0',
            }}
            title={page.label}
          />
        ))}
      </div>
    </motion.nav>
  )
}
