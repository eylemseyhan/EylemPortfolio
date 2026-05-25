import { motion } from 'framer-motion'
import TimelineEntry from './TimelineEntry'

const entries = [
  {
    year: '2024',
    emoji: '✎',
    title: 'Abdi Business Technologies',
    period: '03/2024 – 06/2024',
    subtitle: 'Long Term AI Intern',
    quote: 'Built an AI Q&A system with LangChain + OpenAI. My first real AI project — and I was hooked.',
    stack: ['Python', 'LangChain', 'OpenAI API'],
    color: 'babyblue',
  },
  {
    year: '2024',
    emoji: '◎',
    title: 'DSI – State Hydraulic Works',
    period: '07/2024 – 08/2024',
    subtitle: 'Intern',
    quote: 'CRUD with .NET in a government-scale system. Learned to appreciate well-named variables.',
    stack: ['.NET'],
    color: 'butter',
  },
  {
    year: '2024',
    emoji: '★',
    title: 'Enerjisa Üretim',
    period: '08/2024 – 09/2024',
    subtitle: 'Software Intern',
    quote: 'Auth + CRUD with .NET Core. First time working in a real corporate environment — exciting and slightly terrifying.',
    stack: ['.NET Core'],
    color: 'peach',
  },
  {
    year: '2025',
    emoji: '✎',
    title: 'DDI Technology',
    period: '04/2025 – 06/2025',
    subtitle: 'Software Developer',
    quote: 'Unit & integration tests for NLua .NET modules. Documentation writing mode: ON.',
    stack: ['.NET', 'NLua'],
    color: 'mint',
  },
  {
    year: '2025',
    emoji: '★',
    title: 'Senswise',
    period: '09/2025 – 05/2026',
    subtitle: 'Backend Developer',
    quote: 'CQRS, event-driven architecture, RabbitMQ, ElasticSearch. Building real distributed systems — and learning something new every week.',
    stack: ['.NET', 'RabbitMQ', 'ElasticSearch', 'PostgreSQL', 'CQRS'],
    color: 'rose',
    current: true,
  },
]

export default function TimelineExperiencePage() {
  const years = [...new Set(entries.map(e => e.year))]

  return (
    <div className="min-h-screen py-12 px-4 relative" style={{ background: '#faf7f2' }}>
      {/* Notebook lines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(100,149,237,0.1) 28px)',
        backgroundSize: '100% 28px',
      }} />

      {/* Left margin */}
      <div className="absolute left-16 top-0 bottom-0 w-px hidden md:block" style={{ background: 'rgba(220,80,80,0.2)' }} />

      {/* Ring holes */}
      <div className="absolute left-4 top-0 bottom-0 hidden md:flex flex-col items-center justify-around py-8">
        {[...Array(10)].map((_, i) => <div key={i} className="ring-hole mb-2" />)}
      </div>

      {/* Dog-eared top-right corner */}
      <div className="worn-corner-tr" />

      {/* Coffee ring stain */}
      <div className="absolute top-1/3 right-16 pointer-events-none opacity-70" style={{ width: 80, height: 80 }}>
        <div className="coffee-ring w-full h-full" />
        <div className="absolute inset-5 coffee-ring opacity-50" />
      </div>

      {/* Ink blot near left margin */}
      <div className="absolute top-2/3 left-11 ink-blot pointer-events-none" style={{ width: 12, height: 10, opacity: 0.6 }} />
      <div className="absolute top-1/4 left-13 ink-blot pointer-events-none" style={{ width: 7, height: 6, opacity: 0.4 }} />

      {/* Margin annotation */}
      <div className="absolute top-1/2 right-1 pointer-events-none hidden md:block"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
        <p className="font-sketch text-[9px] text-[#b8987a] opacity-40 whitespace-nowrap">
          every job taught me something ✎
        </p>
      </div>

      {/* Graphite smudge near header */}
      <div className="absolute top-20 left-32 pointer-events-none graphite-smudge"
        style={{ width: 120, height: 50, opacity: 0.7 }} />

      {/* Floating doodles */}
      <motion.img
        src="/doodles/bookmark.svg"
        className="absolute pointer-events-none hidden lg:block"
        style={{ top: 0, right: 40, width: 38, height: 60, opacity: 0.4, transform: 'rotate(4deg)' }}
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      />
      <motion.img
        src="/doodles/sparkle-star.svg"
        className="absolute pointer-events-none hidden xl:block"
        style={{ top: '38%', right: 28, width: 32, height: 32, opacity: 0.28, transform: 'rotate(-10deg)' }}
        animate={{ rotate: [-10, -5, -10], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
      />

      <div className="max-w-4xl mx-auto px-4 md:pl-16 relative">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h2 className="font-sketch text-3xl sm:text-5xl font-bold text-[#3d2b1f]"
            style={{ transform: 'rotate(-1deg)' }}>
            Internships & Work Experience ◈
          </h2>
          <p className="font-nunito text-[#7a6a5a] mt-1" style={{ transform: 'rotate(-0.5deg)' }}>
            the jobs that made me a developer ✎
          </p>
          <svg width="220" height="14" viewBox="0 0 220 14" className="mt-1">
            <path d="M4 10 Q60 3 110 10 Q160 17 216 8"
              stroke="#c8b8a0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <svg className="absolute left-1/2 top-0 -translate-x-1/2 h-full" width="60" style={{ zIndex: 0 }}>
            <path
              d="M30 0 Q40 120 20 240 Q10 360 30 480 Q50 600 30 720 Q10 840 30 960 Q50 1080 30 1200 Q10 1320 30 1440"
              stroke="#c8b8a0" strokeWidth="2" fill="none" strokeDasharray="6 4"
            />
          </svg>

          {years.map((year, yi) => {
            const yearEntries = entries.filter(e => e.year === year)
            return (
              <div key={year} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 mb-4"
                >
                  <div className="font-hand text-2xl font-bold px-4 py-1 rounded-full"
                    style={{ background: '#3d2b1f', color: '#fde68a', boxShadow: '2px 3px 0 rgba(0,0,0,0.2)' }}>
                    ── {year} ──
                  </div>
                  <svg width="30" height="14" viewBox="0 0 30 14">
                    <path d="M2 7 Q15 2 28 7" stroke="#9a8a7a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                </motion.div>
                <div className="flex flex-col gap-0">
                  {yearEntries.map((entry, i) => (
                    <div key={`${year}-${i}`} className="relative">
                      {entry.current && (
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="absolute -top-1 -right-1 z-10"
                        >
                          <span className="font-nunito text-[10px] px-2 py-0.5 rounded-full font-bold"
                            style={{ background: '#ff9999', color: '#fff', boxShadow: '0 1px 4px rgba(255,100,100,0.4)' }}>
                            current ✦
                          </span>
                        </motion.div>
                      )}
                      <TimelineEntry
                        entry={entry}
                        index={yi * 4 + i}
                        side={((yi + i) % 2 === 0) ? 'left' : 'right'}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mt-4 mb-8 flex-wrap"
          >
            <div className="font-hand text-lg text-[#7a6a5a] italic">— still writing the next chapter... ✦</div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
