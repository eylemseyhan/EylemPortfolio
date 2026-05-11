import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
}

export default function ContactPage() {
  const formRef = useRef(null)
  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        { from_name: form.name, reply_to: form.email, message: form.message },
        'YOUR_PUBLIC_KEY'
      )
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    } finally {
      setSending(false)
    }
  }

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

      {/* Worn bottom-right corner */}
      <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, transparent 60%, rgba(200,184,160,0.3) 100%)',
          borderRadius: '0 0 0 100%',
        }} />

      <div className="max-w-3xl mx-auto pl-10 sm:pl-16 relative">
        {/* Envelope illustration */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-6"
        >
          <EnvelopeSVG />
        </motion.div>

        {/* Header */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={0}
          className="mb-2 text-center"
        >
          <h2 className="font-caveat text-4xl sm:text-5xl font-bold text-[#3d2b1f]"
            style={{ transform: 'rotate(-1deg)', display: 'inline-block' }}>
            Let's talk! ✉️
          </h2>
          <p className="font-patrick text-[#7a6a5a] text-lg mt-2"
            style={{ transform: 'rotate(-0.5deg)' }}>
            I don't bite, I promise.<br />
            <span className="text-sm">(unless you write spaghetti code)</span>
          </p>
          <svg width="160" height="14" viewBox="0 0 160 14" className="mt-2 mx-auto">
            <path d="M4 10 Q40 3 80 10 Q120 17 156 8"
              stroke="#c8b8a0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 mt-8">
          {/* Form */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="flex-1"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="relative">
                <label className="font-caveat text-lg text-[#5a4a3a] block mb-1"
                  style={{ transform: 'rotate(-0.5deg)', display: 'inline-block' }}>
                  Your Name ✏️
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="what should I call you?"
                  className="w-full font-patrick text-base text-[#3d2b1f] px-4 py-3 rounded-lg outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                    border: '2px solid #c8b8a0',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)',
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(100,149,237,0.12) 28px)',
                    backgroundSize: '100% 28px',
                  }}
                />
              </div>

              {/* Email */}
              <div className="relative">
                <label className="font-caveat text-lg text-[#5a4a3a] block mb-1"
                  style={{ transform: 'rotate(0.5deg)', display: 'inline-block' }}>
                  Your Email 📧
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="so I can write back :)"
                  className="w-full font-patrick text-base text-[#3d2b1f] px-4 py-3 rounded-lg outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                    border: '2px solid #c8b8a0',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)',
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(100,149,237,0.12) 28px)',
                    backgroundSize: '100% 28px',
                  }}
                />
              </div>

              {/* Message */}
              <div className="relative">
                <label className="font-caveat text-lg text-[#5a4a3a] block mb-1"
                  style={{ transform: 'rotate(-0.3deg)', display: 'inline-block' }}>
                  Message 💬
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="say hello, talk code, ask about CQRS... anything goes!"
                  className="w-full font-patrick text-base text-[#3d2b1f] px-4 py-3 rounded-lg outline-none resize-none"
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                    border: '2px solid #c8b8a0',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)',
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(100,149,237,0.12) 28px)',
                    backgroundSize: '100% 28px',
                  }}
                />
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: 1.03, rotate: 1 }}
                whileTap={{ scale: 0.97 }}
                className="font-caveat text-xl font-bold px-8 py-3 rounded-lg relative"
                style={{
                  background: '#C8F0DC',
                  border: '2px solid #8fd4aa',
                  boxShadow: '3px 4px 0 rgba(0,0,0,0.1)',
                  color: '#3d2b1f',
                  cursor: sending ? 'not-allowed' : 'pointer',
                  opacity: sending ? 0.7 : 1,
                }}
              >
                {sending ? 'Sending... ✈️' : 'Send → ✉️'}
              </motion.button>

              {/* Status */}
              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-caveat text-lg text-green-700"
                  style={{ transform: 'rotate(-0.5deg)' }}
                >
                  Sent! I'll get back to you soon 🎉
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-caveat text-lg text-red-600"
                >
                  Oops! Something went wrong. Try emailing me directly 🙏
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="lg:w-64 flex flex-col gap-4"
          >
            <h3 className="font-caveat text-2xl text-[#3d2b1f]" style={{ transform: 'rotate(-1deg)' }}>
              Find me here ↓
            </h3>

            {[
              { icon: '📧', label: 'eylemseyhaann@gmail.com', href: 'mailto:eylemseyhaann@gmail.com', color: '#FFD9C0', border: '#f0b898' },
              { icon: '💼', label: 'linkedin.com/in/eylemseyhan', href: 'https://linkedin.com/in/eylemseyhan', color: '#C5E8F7', border: '#90c8e8' },
              { icon: '🐙', label: 'github.com/eylemseyhan', href: 'https://github.com/eylemseyhan', color: '#E0D4F7', border: '#b8a8e0' },
            ].map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                whileHover={{ x: 5, rotate: 1, scale: 1.02 }}
                className="flex items-start gap-3 px-4 py-3 rounded-xl font-patrick text-sm text-[#3d2b1f] no-underline"
                style={{
                  background: link.color,
                  border: `1.5px solid ${link.border}`,
                  boxShadow: '2px 3px 0 rgba(0,0,0,0.08)',
                  transform: `rotate(${[-1, 1, -0.5][i]}deg)`,
                  textDecoration: 'none',
                }}
              >
                <span className="text-xl flex-shrink-0">{link.icon}</span>
                <span className="break-all">{link.label}</span>
              </motion.a>
            ))}

            {/* Hand-drawn doodle decoration */}
            <div className="mt-4">
              <svg width="120" height="60" viewBox="0 0 120 60" className="opacity-30">
                <path d="M10 50 Q30 20 50 35 Q70 50 90 20 Q100 10 110 15"
                  stroke="#9a8a7a" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="5 3" />
                <circle cx="10" cy="50" r="3" fill="#9a8a7a" />
                <circle cx="110" cy="15" r="3" fill="#9a8a7a" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Footer note */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={4}
          className="mt-16 text-center pb-8"
        >
          <p className="font-caveat text-sm text-[#9a8a7a]" style={{ transform: 'rotate(-0.5deg)' }}>
            crafted with ☕ & .NET somewhere between Edirne and İstanbul
          </p>
          <svg width="200" height="16" viewBox="0 0 200 16" className="mx-auto mt-2">
            <path d="M10 8 Q50 2 100 8 Q150 14 190 8"
              stroke="#c8b8a0" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="4 3" />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}

function EnvelopeSVG() {
  return (
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
      <rect x="8" y="16" width="104" height="56" rx="6" fill="#FFF3B0" stroke="#c8b8a0" strokeWidth="2" />
      <path d="M8 20 L60 52 L112 20" stroke="#c8b8a0" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 68 L42 44" stroke="#c8b8a0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M112 68 L78 44" stroke="#c8b8a0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="60" cy="8" r="6" fill="#FFD6E0" stroke="#f0a8c0" strokeWidth="1.5" />
      <text x="57" y="12" fontSize="7" fill="#f0a8c0">♥</text>
      <path d="M60 14 L60 20" stroke="#f0a8c0" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
