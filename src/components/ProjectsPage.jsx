import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { useProjects } from '../hooks/useProjects'
import { usePageTracking } from '../hooks/useAnalytics'

export default function ProjectsPage() {
  const { projects } = useProjects()
  usePageTracking('projects')
  return (
    <div className="min-h-screen py-12 px-4 relative" style={{ background: '#faf7f2' }}>
      {/* Notebook lines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(100,149,237,0.1) 28px)',
        backgroundSize: '100% 28px',
      }} />
      <div className="absolute left-16 top-0 bottom-0 w-px hidden md:block" style={{ background: 'rgba(220,80,80,0.2)' }} />
      <div className="absolute left-4 top-0 bottom-0 hidden md:flex flex-col items-center justify-around py-8">
        {[...Array(10)].map((_, i) => <div key={i} className="ring-hole mb-2" />)}
      </div>

      {/* Dog-eared top-right corner */}
      <div className="worn-corner-tr" />

      {/* Coffee ring stain near top-right */}
      <div className="absolute top-10 right-24 pointer-events-none opacity-60"
        style={{ width: 64, height: 64 }}>
        <div className="coffee-ring w-full h-full" />
      </div>

      {/* Ink blot near margin */}
      <div className="absolute top-40 left-11 ink-blot pointer-events-none"
        style={{ width: 9, height: 8, opacity: 0.55 }} />

      {/* Graphite smudge near top */}
      <div className="absolute top-24 left-28 pointer-events-none graphite-smudge"
        style={{ width: 100, height: 40, opacity: 0.6 }} />

      {/* "Deployed on Friday" stamp — rotated, worn */}
      <div className="absolute bottom-32 right-4 pointer-events-none hidden md:block"
        style={{ transform: 'rotate(-12deg)', opacity: 0.18 }}>
        <div className="font-sketch text-3xl text-red-600 px-2 py-1 rounded"
          style={{
            border: '2.5px solid rgba(180,40,40,0.5)',
            letterSpacing: '0.1em',
          }}>
          SHIPPED ✓
        </div>
      </div>

      {/* Right margin annotation */}
      <div className="absolute top-1/2 right-3 pointer-events-none hidden md:block"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
        <p className="font-hand text-xs text-[#8a6a5a] opacity-45 whitespace-nowrap">
          TODO: add tests (eventually)
        </p>
      </div>

      {/* ── Floating SVG doodles ────────────────────────────── */}

      {/* Code brackets — top-right, developer identity */}
      <motion.img
        src="/doodles/code-brackets.svg"
        className="absolute pointer-events-none hidden lg:block"
        style={{ top: 28, right: 36, width: 66, height: 42, opacity: 0.35, transform: 'rotate(-5deg)' }}
        animate={{ rotate: [-5, -3, -5], y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
      />

      {/* Lightning bolt — mid-right, energy / shipping */}
      <motion.img
        src="/doodles/lightning.svg"
        className="absolute pointer-events-none hidden xl:block"
        style={{ top: '45%', right: 20, width: 32, height: 50, opacity: 0.28, transform: 'rotate(8deg)' }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.28, 0.35, 0.28] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
      />

      {/* Bug — bottom-right, humour */}
      <motion.img
        src="/doodles/bug.svg"
        className="absolute pointer-events-none hidden xl:block"
        style={{ bottom: 180, right: 12, width: 44, height: 50, opacity: 0.25, transform: 'rotate(-12deg)' }}
        animate={{ y: [0, -4, 0], rotate: [-12, -10, -12] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      />

      <div className="max-w-5xl mx-auto px-4 md:pl-16 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h2 className="font-sketch text-4xl sm:text-5xl font-bold text-[#3d2b1f]"
            style={{ transform: 'rotate(-1deg)' }}>
            Projects ★
          </h2>
          <p className="font-nunito text-[#7a6a5a] mt-1" style={{ transform: 'rotate(-0.5deg)' }}>
            — things I built (and was proud of) ✦
          </p>
          <svg width="160" height="14" viewBox="0 0 160 14" className="mt-1">
            <path d="M4 10 Q40 3 80 10 Q120 17 156 8"
              stroke="#c8b8a0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* Scattered note */}
        <motion.div
          initial={{ opacity: 0, rotate: -3 }}
          animate={{ opacity: 1, rotate: -3 }}
          transition={{ delay: 0.3 }}
          className="mb-8 inline-block px-4 py-3 rounded-lg font-hand text-base text-[#5a4a3a]"
          style={{
            background: '#FFF3B0',
            border: '1.5px solid #e8d878',
            boxShadow: '3px 4px 0 rgba(0,0,0,0.08)',
            transform: 'rotate(-2deg)',
          }}
        >
          hover the cards to lift them ✨
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}

          {/* "More coming soon" card */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-xl p-5 flex flex-col items-center justify-center text-center"
            style={{
              border: '2px dashed #c8b8a0',
              minHeight: 200,
              background: 'rgba(200,184,160,0.08)',
              transform: 'rotate(1deg)',
            }}
          >
            <span className="text-4xl mb-3">✿</span>
            <p className="font-hand text-xl text-[#9a8a7a]">more projects<br />coming soon...</p>
            <svg width="40" height="16" viewBox="0 0 40 16" className="mt-2">
              <path d="M5 8 Q15 3 35 8" stroke="#c8b8a0" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
