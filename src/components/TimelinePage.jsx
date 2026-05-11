import { motion } from 'framer-motion'
import TimelineEntry from './TimelineEntry'

const entries = [
  {
    year: '2021',
    emoji: '✦',
    title: 'Started Computer Engineering',
    subtitle: 'Trakya University, Edirne',
    quote: 'First line of code. Hello world. I was terrified and excited at once.',
    color: 'mint',
  },
  {
    year: '2022',
    emoji: '✿',
    title: 'Yetkin Gençler Program',
    period: '09/2022 – 12/2022',
    quote: 'Learned teamwork and how to actually survive a hackathon.',
    color: 'lavender',
  },
  {
    year: '2023',
    emoji: '♡',
    title: 'Ders Ortağım – Volunteer',
    quote: 'Vocalized test books for visually impaired students. Most meaningful thing I did that year.',
    color: 'rose',
  },
  {
    year: '2023',
    emoji: '◎',
    title: 'Yarınlar Seninle Mümkün',
    period: '11/2023 – 03/2024',
    subtitle: 'Trainee',
    quote: "Discovered my passion for AI and what's possible when you combine tech with purpose.",
    color: 'peach',
  },
  {
    year: '2024',
    emoji: '✎',
    title: 'Abdi Business Technologies',
    period: '03/2024 – 06/2024',
    subtitle: 'Long Term AI Intern',
    quote: 'Built an AI Q&A system with LangChain + OpenAI. My first real AI project!',
    stack: ['Python', 'LangChain', 'OpenAI API'],
    color: 'babyblue',
  },
  {
    year: '2024',
    emoji: '◈',
    title: 'DSI – State Hydraulic Works',
    period: '07/2024 – 08/2024',
    subtitle: 'Intern',
    quote: 'CRUD operations with .NET. Learned to read legacy code and not cry.',
    stack: ['.NET'],
    color: 'butter',
  },
  {
    year: '2024',
    emoji: '★',
    title: 'Enerjisa Uretim, Istanbul',
    period: '08/2024 – 09/2024',
    subtitle: 'Software Intern',
    quote: 'Auth + CRUD with .NET Core. First time working in a corporate setting!',
    stack: ['.NET Core'],
    color: 'peach',
  },
  {
    year: '2025',
    emoji: '✿',
    title: 'Trakya University – Assistant',
    period: '03/2025 – 04/2025',
    subtitle: 'Student Affairs Dept.',
    quote: 'Helping students while finishing my own degree — full circle moment.',
    color: 'lavender',
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
    emoji: '✦',
    title: 'Graduated!',
    subtitle: 'B.Sc. Computer Engineering',
    quote: 'Finally. Officially a computer engineer (still debugging though).',
    color: 'butter',
    polaroid: true,
  },
  {
    year: '2025',
    emoji: '★',
    title: 'Senswise',
    period: '09/2025 – present',
    subtitle: 'Backend Developer',
    quote: 'CQRS, Event-Driven Architecture, RabbitMQ, ElasticSearch. Building real distributed systems!',
    stack: ['.NET', 'RabbitMQ', 'ElasticSearch', 'PostgreSQL', 'CQRS'],
    color: 'rose',
    current: true,
  },
]

export default function TimelinePage() {
  const years = [...new Set(entries.map(e => e.year))]

  return (
    <div className="min-h-screen py-12 px-4 relative" style={{ background: '#faf7f2' }}>
      {/* Notebook lines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(100,149,237,0.1) 28px)',
        backgroundSize: '100% 28px',
      }} />

      {/* Left margin */}
      <div className="absolute left-16 top-0 bottom-0 w-px" style={{ background: 'rgba(220,80,80,0.2)' }} />

      {/* Ring holes */}
      <div className="absolute left-4 top-0 bottom-0 flex flex-col items-center justify-around py-8">
        {[...Array(10)].map((_, i) => <div key={i} className="ring-hole mb-2" />)}
      </div>

      {/* Dog-eared top-right corner */}
      <div className="worn-corner-tr" />

      {/* Coffee ring stain — middle of the page, clearly been sitting here a while */}
      <div className="absolute top-1/3 right-16 pointer-events-none opacity-70"
        style={{ width: 80, height: 80 }}>
        <div className="coffee-ring w-full h-full" />
        <div className="absolute inset-5 coffee-ring opacity-50" />
      </div>

      {/* Ink blot near left margin */}
      <div className="absolute top-2/3 left-11 ink-blot pointer-events-none"
        style={{ width: 12, height: 10, opacity: 0.6 }} />
      <div className="absolute top-1/4 left-13 ink-blot pointer-events-none"
        style={{ width: 7, height: 6, opacity: 0.4 }} />

      {/* Margin annotation — developer humor */}
      <div className="absolute top-1/2 right-1 pointer-events-none hidden md:block"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
        <p className="font-sketch text-[9px] text-[#b8987a] opacity-40 whitespace-nowrap">
          why is RabbitMQ angry again? 🤔
        </p>
      </div>



      {/* Graphite smudge near header */}
      <div className="absolute top-20 left-32 pointer-events-none graphite-smudge"
        style={{ width: 120, height: 50, opacity: 0.7 }} />

      {/* ── Floating SVG doodles ────────────────────────────── */}

      {/* Bookmark — top-right, like it marks the current chapter */}
      <motion.img
        src="/doodles/bookmark.svg"
        className="absolute pointer-events-none hidden lg:block"
        style={{ top: 0, right: 40, width: 38, height: 60, opacity: 0.4, transform: 'rotate(4deg)' }}
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      />

      {/* Sparkle star — floating mid-right, accent */}
      <motion.img
        src="/doodles/sparkle-star.svg"
        className="absolute pointer-events-none hidden xl:block"
        style={{ top: '38%', right: 28, width: 32, height: 32, opacity: 0.28, transform: 'rotate(-10deg)' }}
        animate={{ rotate: [-10, -5, -10], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
      />

      {/* Curved arrow — bottom-right, pointing up at timeline */}
      <motion.img
        src="/doodles/curved-arrow.svg"
        className="absolute pointer-events-none hidden xl:block"
        style={{ bottom: 160, right: 16, width: 72, height: 38, opacity: 0.22, transform: 'rotate(170deg)' }}
        animate={{ x: [0, 3, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      />

      {/* Hidden sleeping cat easter egg */}
      <motion.div
        className="absolute right-4 bottom-40 opacity-30 hover:opacity-100 transition-opacity"
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        title="Found the secret cat! 🐱"
      >
        <svg width="48" height="32" viewBox="0 0 48 32" fill="none">
          <ellipse cx="24" cy="22" rx="18" ry="10" fill="#c8b8a0" stroke="#9a8a7a" strokeWidth="1.5" />
          <path d="M8 16 L4 8 L12 14 Z" fill="#c8b8a0" stroke="#9a8a7a" strokeWidth="1" />
          <path d="M40 16 L44 8 L36 14 Z" fill="#c8b8a0" stroke="#9a8a7a" strokeWidth="1" />
          <path d="M18 20 Q24 17 30 20" stroke="#7a6a5a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M14 22 L11 22 M17 24 L13 25 M20 25.5 L17 27" stroke="#7a6a5a" strokeWidth="1" strokeLinecap="round" />
          <path d="M34 22 L37 22 M31 24 L35 25 M28 25.5 L31 27" stroke="#7a6a5a" strokeWidth="1" strokeLinecap="round" />
          <path d="M21 19 Q22 17 23 19" stroke="#7a6a5a" strokeWidth="1.2" fill="none" />
          <path d="M25 19 Q26 17 27 19" stroke="#7a6a5a" strokeWidth="1.2" fill="none" />
          <text x="18" y="23" fontSize="7" fill="#7a6a5a" fontFamily="sans-serif">z z z</text>
          <path d="M38 28 Q42 26 44 30" stroke="#c8b8a0" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      </motion.div>

      <div className="max-w-4xl mx-auto pl-10 sm:pl-16 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h2 className="font-sketch text-4xl sm:text-5xl font-bold text-[#3d2b1f]"
            style={{ transform: 'rotate(-1deg)' }}>
            My Journey ✦
          </h2>
          <p className="font-nunito text-[#7a6a5a] mt-1"
            style={{ transform: 'rotate(-0.5deg)' }}>
            a winding road, lovingly documented ✎
          </p>
          {/* Underline */}
          <svg width="180" height="14" viewBox="0 0 180 14" className="mt-1">
            <path d="M4 10 Q50 3 90 10 Q130 17 176 8"
              stroke="#c8b8a0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical winding line */}
          <svg className="absolute left-1/2 top-0 -translate-x-1/2 h-full" width="60" style={{ zIndex: 0 }}>
            <path
              d="M30 0 Q40 120 20 240 Q10 360 30 480 Q50 600 30 720 Q10 840 30 960 Q50 1080 30 1200 Q10 1320 30 1440 Q50 1560 30 1680 Q10 1800 30 1920 Q50 2040 30 2160 Q10 2280 30 2400 Q50 2520 30 2640 Q10 2760 30 2880 Q50 3000 30 3120 Q10 3240 30 3360 Q50 3480 30 3600 Q10 3720 30 3840 Q50 3960 30 4080"
              stroke="#c8b8a0" strokeWidth="2" fill="none" strokeDasharray="6 4"
            />
          </svg>

          {/* Group by year */}
          {years.map((year, yi) => {
            const yearEntries = entries.filter(e => e.year === year)
            return (
              <div key={year} className="mb-4">
                {/* Year label */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 mb-4"
                >
                  <div className="font-hand text-2xl font-bold px-4 py-1 rounded-full"
                    style={{
                      background: '#3d2b1f',
                      color: '#fde68a',
                      boxShadow: '2px 3px 0 rgba(0,0,0,0.2)',
                    }}>
                    ── {year} ──
                  </div>
                  <svg width="30" height="14" viewBox="0 0 30 14">
                    <path d="M2 7 Q15 2 28 7" stroke="#9a8a7a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                </motion.div>

                {/* Entries for this year */}
                <div className="flex flex-col gap-0">
                  {yearEntries.map((entry, i) => (
                    <TimelineEntry
                      key={`${year}-${i}`}
                      entry={entry}
                      index={yi * 4 + i}
                      side={((yi + i) % 2 === 0) ? 'left' : 'right'}
                    />
                  ))}
                </div>
              </div>
            )
          })}

          {/* End of timeline marker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mt-4 mb-8 flex-wrap"
          >
            <div className="font-hand text-lg text-[#7a6a5a] italic">
              — to be continued... 🌱
            </div>
            {/* Margin post-it note */}
            <div className="relative inline-block px-3 py-2 rounded font-sketch text-xs text-[#7a5a38] opacity-60"
              style={{
                background: 'rgba(255,243,176,0.6)',
                border: '1px solid rgba(200,176,80,0.3)',
                transform: 'rotate(-3deg)',
                boxShadow: '1px 2px 0 rgba(0,0,0,0.06)',
              }}>
              <span style={{ textDecoration: 'line-through', opacity: 0.5 }}>TODO: be less ambitious</span>
              <br />→ nah, keep going ✦
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
