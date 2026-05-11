import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'

const projects = [
  {
    emoji: '🎟️',
    title: 'Eventura',
    type: 'Event Management Platform',
    description: 'Event discovery by city & category, ticket purchase with QR code generation, admin panel for backend control.',
    stack: ['.NET Core', 'Bootstrap', 'jQuery', 'PostgreSQL (Aiven)'],
    github: 'github.com/eylemseyhan/Eventura',
    color: 'mint',
    rotation: -2,
  },
  {
    emoji: '✅',
    title: 'Taskify',
    type: 'Task Management App',
    description: 'Task creation, editing, user assignment, real-time calendar view, subtask tracking.',
    stack: ['React', 'Firebase Firestore', 'Firebase Auth'],
    github: 'github.com/eylemseyhan/Taskify',
    color: 'lavender',
    rotation: 1.5,
  },
  {
    emoji: '⚡',
    title: 'Power Plant App',
    type: 'Energy Data Platform',
    description: 'Power plant data management with role-based access control. Admins only for sensitive ops 🔐',
    stack: ['.NET Core', 'EF Code First', 'SQL Server'],
    github: 'github.com/eylemseyhan/PowerPlantApp',
    color: 'peach',
    rotation: -1,
  },
  {
    emoji: '📋',
    title: 'E-Registration (DSİ)',
    type: 'Sports Club Registration',
    description: 'Online student registration, AJAX dynamic updates, real-time admin tracking.',
    stack: ['.NET MVC', 'SQL Server', 'Bootstrap', 'AJAX'],
    github: 'github.com/eylemseyhan/DSI-Sports-Registration',
    color: 'babyblue',
    rotation: 2,
  },
  {
    emoji: '🍎',
    title: 'NutriTrack',
    type: 'iOS Nutrition App',
    description: 'Track daily meals, monitor calorie intake. iOS native with Firebase backend.',
    stack: ['Swift', 'Firebase'],
    github: 'github.com/eylemseyhan/NutriTrack',
    color: 'rose',
    rotation: -1.5,
  },
]

export default function ProjectsPage() {
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
            Projects 🚀
          </h2>
          <p className="font-patrick text-[#7a6a5a] mt-1" style={{ transform: 'rotate(-0.5deg)' }}>
            — things I built (and was proud of) 📎
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
          className="mb-8 inline-block px-4 py-3 rounded-lg font-caveat text-base text-[#5a4a3a]"
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
          {projects.map((project, i) => (
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
            <span className="text-4xl mb-3">🌱</span>
            <p className="font-caveat text-xl text-[#9a8a7a]">more projects<br />coming soon...</p>
            <svg width="40" height="16" viewBox="0 0 40 16" className="mt-2">
              <path d="M5 8 Q15 3 35 8" stroke="#c8b8a0" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
