import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CustomCursor from './components/CustomCursor'
import CoverPage from './components/CoverPage'
import Navigation from './components/Navigation'
import AboutPage from './components/AboutPage'
import TimelinePage from './components/TimelinePage'
import ProjectsPage from './components/ProjectsPage'
import SkillsPage from './components/SkillsPage'
import ContactPage from './components/ContactPage'

const pageVariants = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, x: -60, transition: { duration: 0.3 } },
}

const pageComponents = {
  about: AboutPage,
  timeline: TimelinePage,
  projects: ProjectsPage,
  skills: SkillsPage,
  contact: ContactPage,
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('cover')
  const [journalOpen, setJournalOpen] = useState(false)

  const handleOpen = () => {
    setJournalOpen(true)
    setCurrentPage('about')
  }

  const handleNavigate = (page) => {
    if (page === 'cover') {
      setJournalOpen(false)
      setCurrentPage('cover')
    } else {
      setCurrentPage(page)
    }
  }

  const ActivePage = pageComponents[currentPage]

  return (
    <div className="min-h-screen relative" style={{ background: '#f5f0e8' }}>
      <CustomCursor />

      {/* SVG filter for wobbly effect */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="wobbly">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="2" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <AnimatePresence mode="wait">
        {!journalOpen ? (
          <motion.div
            key="cover"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.4 } }}
          >
            <CoverPage onOpen={handleOpen} />
          </motion.div>
        ) : (
          <motion.div
            key="journal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen"
          >
            <Navigation activePage={currentPage} onNavigate={handleNavigate} />

            {/* Journal wrapper with page turn feel */}
            <div className="pt-16 relative">
              {/* Journal paper base */}
              <div className="min-h-screen relative" style={{
                background: 'linear-gradient(180deg, #faf7f2 0%, #f5f0e8 100%)',
              }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {ActivePage && <ActivePage />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
