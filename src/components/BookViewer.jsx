import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import HTMLFlipBook from 'react-pageflip'
import CoverPage from './CoverPage'
import AboutPage from './AboutPage'
import TimelinePage from './TimelinePage'
import ProjectsPage from './ProjectsPage'
import SkillsPage from './SkillsPage'
import ContactPage from './ContactPage'
import Navigation from './Navigation'
import InsideCover from './InsideCover'

const PAGES = [
  { id: 'cover', label: 'Cover', Component: CoverPage, density: 'hard' },
  { id: 'inside', label: '', Component: InsideCover, density: 'hard' },
  { id: 'about', label: 'About', Component: AboutPage, density: 'soft' },
  { id: 'timeline', label: 'Journey', Component: TimelinePage, density: 'soft' },
  { id: 'projects', label: 'Projects', Component: ProjectsPage, density: 'soft' },
  { id: 'skills', label: 'Skills', Component: SkillsPage, density: 'soft' },
  { id: 'contact', label: 'Contact', Component: ContactPage, density: 'soft' },
  { id: 'back', label: '', Component: () => <div className="min-h-full flex items-center justify-center font-caveat text-3xl text-[#c8b8a0]">the end ✿</div>, density: 'hard' },
  { id: 'backcover', label: '', Component: () => <div className="w-full h-full" style={{ background: '#b5906a' }}></div>, density: 'hard' }
]

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page bg-[#faf7f2] overflow-hidden" ref={ref} data-density={props.density || "soft"} style={{ boxShadow: 'inset -2px 0 10px rgba(0,0,0,0.03)' }}>
      {/* Spine shadow for the pages */}
      <div className="absolute top-0 bottom-0 left-0 w-8 pointer-events-none z-30" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.1), transparent)' }} />
      <div className="h-full overflow-y-auto overflow-x-hidden w-full custom-scrollbar relative">
        {props.children}
      </div>
    </div>
  );
});

export default function BookViewer() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const bookRef = useRef()

  const onFlip = useCallback((e) => {
    setCurrentIdx(e.data)
  }, [])

  const goTo = useCallback((idx) => {
    if (idx < 0 || idx >= PAGES.length) return
    bookRef.current?.pageFlip()?.turnToPage(idx)
  }, [])

  const goNext = useCallback(() => {
    bookRef.current?.pageFlip()?.flipNext()
  }, [])

  const goPrev = useCallback(() => {
    bookRef.current?.pageFlip()?.flipPrev()
  }, [])

  // Fix window resize to update flipbook
  useEffect(() => {
    const handleResize = () => {
      bookRef.current?.pageFlip()?.update()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen relative flex flex-col"
      style={{
        backgroundColor: '#5c4033', // Dark walnut wood base
        backgroundImage: `
          radial-gradient(circle at 50% 30%, rgba(255, 240, 210, 0.25) 0%, rgba(15, 10, 5, 0.85) 100%),
          repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(0,0,0,0.06) 80px, rgba(0,0,0,0.06) 82px),
          repeating-linear-gradient(90deg, transparent, transparent 120px, rgba(0,0,0,0.03) 120px, rgba(0,0,0,0.03) 122px)
        `
      }}
    >
      <Navigation
        activePage={PAGES[currentIdx]?.id || 'cover'}
        onNavigate={(id) => {
          const idx = PAGES.findIndex(p => p.id === id)
          if (idx !== -1) goTo(idx)
        }}
      />

      <div className="pt-20 flex-1 w-full flex items-center justify-center p-4 lg:p-12 relative overflow-hidden">

        {/* Scattered Desk Items */}
        <DeskEnvironment currentIdx={currentIdx} />

        {/* MP3 Player - lives OUTSIDE DeskEnvironment so pointer-events always work */}
        {currentIdx === 0 && (
          <div className="absolute top-[22%] left-[2%] sm:left-[5%] md:left-[7%] pointer-events-auto hidden lg:block" style={{ transform: 'rotateZ(-12deg)', zIndex: 60 }}>
            <RetroMP3Player />
            {/* Visual cue to click */}
            <motion.div
              className="absolute -bottom-10 left-15 pointer-events-none flex flex-col items-center"
              animate={{ x: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              style={{ transform: 'scaleX(-1)' }}
            >
              <span className="font-hand text-white text-base font-bold whitespace-nowrap" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>click for vibes!</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ transform: 'rotate(-40deg)' }}>
                <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>
        )}

        {/* Vintage Stamp - lives OUTSIDE DeskEnvironment, positioned below MP3 */}
        {currentIdx === 0 && (
          <div className="absolute top-[49%] left-[11%] hidden lg:block" style={{ transform: 'rotate(-12deg)', zIndex: 55 }}>
            <VintageStampSVG />
          </div>
        )}

        {/* Napkin Scribble - right side, outside DeskEnvironment */}
        {currentIdx === 0 && (
          <div className="absolute top-[45%] right-[50%] hidden lg:block" style={{ transform: 'rotate(8deg)', zIndex: 45 }}>
            <NapkinScribbleSVG />
          </div>
        )}

        {/* USB Hub - right side, below napkin */}
        {currentIdx === 0 && (
          <div className="absolute top-[65%] right-[76%] hidden lg:block" style={{ transform: 'rotate(-4deg)', zIndex: 45 }}>
            <UsbHubSVG />
          </div>
        )}

        {/* The actual flipbook */}
        <HTMLFlipBook
          width={550}
          height={800}
          size="stretch"
          minWidth={315}
          maxWidth={800}
          minHeight={400}
          maxHeight={1100}
          maxShadowOpacity={0.4}
          showCover={true}
          mobileScrollSupport={true}
          useMouseEvents={true}
          drawShadow={true}
          flippingTime={1200}
          onFlip={onFlip}
          ref={bookRef}
          className="book-container drop-shadow-2xl relative z-[100]"
          style={{ margin: '0 auto', border: '1px solid #d8cdba', borderRadius: '4px' }}
        >
          {PAGES.map((p, i) => (
            <Page key={i} density={p.density}>
              <p.Component onNavigate={(id) => {
                const idx = PAGES.findIndex(page => page.id === id);
                if (idx !== -1) goTo(idx);
              }} />
            </Page>
          ))}
        </HTMLFlipBook>

        {/* Drag handle hints */}
        {currentIdx === 0 && (
          <motion.div
            className="absolute right-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none hidden md:flex items-center gap-2"
            animate={{ x: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          >

            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#7a6a5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        )}
      </div>

      {/* Bottom navigation bar */}
      <div
        className="relative z-20 flex items-center justify-between px-6 py-3 border-t backdrop-blur-md"
        style={{
          background: 'rgba(30, 20, 15, 0.7)',
          borderColor: 'rgba(255, 255, 255, 0.05)',
        }}
      >
        <button
          onClick={goPrev}
          disabled={currentIdx === 0}
          className="font-caveat lowercase-all text-xl px-4 py-1.5 rounded-lg transition-all hover:-translate-x-1"
          style={{
            background: currentIdx === 0 ? 'transparent' : '#C8F0DC',
            border: `1.5px solid ${currentIdx === 0 ? 'transparent' : '#8fd4aa'}`,
            color: currentIdx === 0 ? '#c8b8a0' : '#3d2b1f',
            cursor: currentIdx === 0 ? 'default' : 'pointer',
          }}
        >
          ← prev
        </button>

        {/* Page position dots */}
        <div className="flex items-center gap-2">
          {PAGES.filter(p => !['back', 'backcover', 'inside', 'cover'].includes(p.id)).map((p, i) => {
            // Find the actual index in the PAGES array
            const realIdx = PAGES.findIndex(page => page.id === p.id)
            const isActive = (realIdx === currentIdx || realIdx === currentIdx - 1)

            return (
              <button
                key={p.id}
                onClick={() => goTo(realIdx)}
                className="rounded-full transition-all"
                style={{
                  width: isActive ? 20 : 8,
                  height: 8,
                  background: isActive ? '#8fd4aa' : '#c8b8a0',
                  border: 'none',
                  cursor: 'pointer',
                }}
                title={p.label}
              />
            )
          })}
        </div>

        <button
          onClick={goNext}
          disabled={currentIdx >= PAGES.length - 2} // -2 because a spread shows 2 pages, and we added a dummy back page
          className="font-caveat lowercase-all text-xl px-4 py-1.5 rounded-lg transition-all hover:translate-x-1"
          style={{
            background: currentIdx >= PAGES.length - 2 ? 'transparent' : '#C8F0DC',
            border: `1.5px solid ${currentIdx >= PAGES.length - 2 ? 'transparent' : '#8fd4aa'}`,
            color: currentIdx >= PAGES.length - 2 ? '#c8b8a0' : '#3d2b1f',
            cursor: currentIdx >= PAGES.length - 2 ? 'default' : 'pointer',
          }}
        >
          next →
        </button>
      </div>
    </motion.div>
  )
}

/* --- DESK ENVIRONMENT --- */
function DeskEnvironment({ currentIdx }) {
  // Deepen shadows and fade out heavily when reading to maintain focus on the bright pages
  const opacity = currentIdx === 0 ? 0.95 : 0.1;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block transition-opacity duration-1000" style={{ opacity }}>
      <div className="relative w-full h-full max-w-[1200px] mx-auto">

        {/* Coffee Cup with Steam (top-left) */}
        <div className="absolute top-[8%] left-[3%] rotate-[-15deg]">
          <CoffeeRing />
          <div className="absolute top-2 left-3">
            <CoffeeMug />
          </div>
        </div>

        {/* Vintage Stamp was moved outside DeskEnvironment */}

        {/* Crumpled Paper */}
        <div className="absolute top-[40%] right-[3%] rotate-[35deg]">
          <CrumpledPaperSVG />
        </div>

        {/* Pink Sticky Note */}
        <div className="absolute top-[18%] left-[25%] rotate-[14deg]">
          <div className="paper-scrap p-4 w-44 shadow-2xl flex flex-col items-center" style={{ background: '#fce4ec', filter: 'drop-shadow(6px 12px 10px rgba(0,0,0,0.3))' }}>
            <div className="absolute -top-3 tape tape-stripes w-14 h-6 rotate-[-8deg]" />
            <span className="font-hand text-3xl font-bold text-pink-500 mt-2 text-center leading-tight">don't forget<br />to commit!</span>
          </div>
        </div>

        {/* Napkin and USB moved outside DeskEnvironment */}

        {/* Ray-Ban Sunglasses */}
        <div className="absolute top-[62%] left-[20%] rotate-[-12deg]">
          <RaybanSVG />
        </div>

        {/* Fineliner Pen */}
        <div className="absolute bottom-[20%] left-[30%] rotate-[-70deg]">
          <FinelinerSVG />
        </div>

        {/* AirPods Case */}
        <div className="absolute bottom-[45%] left-[20%] rotate-[25deg]">
          <AirPodsSVG />
        </div>
        {/* Scattered Paperclips */}
        <PaperclipSVG style={{ top: '65%', left: '38%', transform: 'rotate(45deg)' }} />
        <PaperclipSVG style={{ top: '70%', left: '35%', transform: 'rotate(-20deg)' }} />

      </div>
    </div>
  )
}

/* --- SVG ASSETS --- */
function UsbHubSVG() {
  return (
    <svg width="240" height="160" viewBox="0 0 150 100" style={{ filter: 'drop-shadow(4px 8px 6px rgba(0,0,0,0.3))' }}>
      {/* Hub body */}
      <rect x="5" y="30" width="90" height="32" rx="7" fill="#2d3748" stroke="#1a202c" strokeWidth="2" />
      {/* Glossy stripe */}
      <rect x="7" y="31" width="86" height="10" rx="5" fill="rgba(255,255,255,0.07)" />

      {/* USB ports x4 */}
      <rect x="14" y="38" width="12" height="9" rx="2" fill="#0d1117" stroke="#4a5568" strokeWidth="1" />
      <rect x="16" y="40" width="8" height="4" rx="0.5" fill="#4a5568" />
      <rect x="32" y="38" width="12" height="9" rx="2" fill="#0d1117" stroke="#4a5568" strokeWidth="1" />
      <rect x="34" y="40" width="8" height="4" rx="0.5" fill="#4a5568" />
      <rect x="50" y="38" width="12" height="9" rx="2" fill="#0d1117" stroke="#4a5568" strokeWidth="1" />
      <rect x="52" y="40" width="8" height="4" rx="0.5" fill="#4a5568" />
      <rect x="68" y="38" width="12" height="9" rx="2" fill="#0d1117" stroke="#4a5568" strokeWidth="1" />
      <rect x="70" y="40" width="8" height="4" rx="0.5" fill="#4a5568" />

      {/* LEDs - clearly visible */}
      <circle cx="86" cy="35" r="3" fill="#22c55e" style={{ filter: 'drop-shadow(0 0 3px #22c55e)' }} />
      <circle cx="93" cy="35" r="3" fill="#3b82f6" style={{ filter: 'drop-shadow(0 0 3px #3b82f6)' }} />

      {/* USB 3.0 label */}


      {/* Main power cable (thick, dark) going left */}
      <path d="M 5 46 C -10 46 -15 70 -5 80" fill="none" stroke="#1a1a1a" strokeWidth="7" strokeLinecap="round" />
      <path d="M 5 46 C -10 46 -15 70 -5 80" fill="none" stroke="#374151" strokeWidth="4" strokeLinecap="round" />

      {/* Red cable - tangled */}
      <path d="M 95 40 C 115 30 140 45 135 62 C 130 75 112 68 118 55 C 124 42 142 38 148 55" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />

      {/* Blue cable - looping */}
      <path d="M 95 46 C 118 38 145 55 140 70 C 136 82 118 76 124 63" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" opacity="0.9" />

      {/* Yellow cable - shorter */}
      <path d="M 95 52 C 112 48 130 60 128 72 Q 125 80 115 78" fill="none" stroke="#eab308" strokeWidth="3" strokeLinecap="round" opacity="0.9" />

      {/* USB-A connector on red cable end */}
      <rect x="143" y="51" width="9" height="7" rx="1.5" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
      <rect x="144.5" y="53" width="6" height="3" rx="0.5" fill="#1e293b" />
    </svg>
  )
}


function CoffeeMug() {
  return (
    <svg width="220" height="220" viewBox="0 0 100 100" style={{ filter: 'drop-shadow(15px 25px 12px rgba(0,0,0,0.4))' }}>
      {/* Handle */}
      <path d="M 70 30 C 95 30 95 70 70 70" fill="none" stroke="#fdfbf7" strokeWidth="12" strokeLinecap="round" />
      {/* Cup body */}
      <circle cx="50" cy="50" r="40" fill="#fdfbf7" stroke="#e0d5c1" strokeWidth="2" />
      {/* Coffee inside */}
      <circle cx="50" cy="50" r="34" fill="#1a1005" />
      {/* Foam/crema */}
      <path d="M 30 50 Q 50 30 70 50 T 40 70" stroke="#8b5a2b" strokeWidth="4" fill="none" opacity="0.6" />
      <path d="M 45 35 Q 60 25 75 40" stroke="#8b5a2b" strokeWidth="2" fill="none" opacity="0.4" />
      {/* Steam */}
      <path d="M 40 40 Q 35 25 45 10" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.4" className="animate-pulse" />
      <path d="M 60 50 Q 55 30 65 15" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.3" className="animate-pulse" style={{ animationDelay: '1s' }} />
    </svg>
  )
}

function CoffeeRing() {
  return (
    <svg width="180" height="180" viewBox="0 0 120 120" className="opacity-60">
      <circle cx="60" cy="60" r="42" fill="none" stroke="#5c3a21" strokeWidth="3" strokeDasharray="10 5 40 2" opacity="0.8" />
      <circle cx="58" cy="62" r="38" fill="none" stroke="#5c3a21" strokeWidth="1.5" strokeDasharray="20 10" opacity="0.5" />
    </svg>
  )
}


function RaybanSVG() {
  return (
    <svg width="300" height="170" viewBox="0 0 160 90" style={{ filter: 'drop-shadow(12px 18px 10px rgba(0,0,0,0.4))' }}>
      <g transform="translate(10, 10)">
        <path d="M 10 15 L 55 5" stroke="#111" strokeWidth="8" strokeLinecap="round" opacity="0.9" />
        <path d="M 130 15 L 85 5" stroke="#111" strokeWidth="8" strokeLinecap="round" opacity="0.9" />
        <path d="M 5 20 Q 35 18 65 22 Q 70 23 75 22 Q 105 18 135 20" stroke="#1a1a1a" strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d="M 10 22 L 15 50 Q 25 58 45 55 Q 55 50 60 25 Z" fill="#0f0f0f" stroke="#1a1a1a" strokeWidth="8" strokeLinejoin="round" />
        <path d="M 130 22 L 125 50 Q 115 58 95 55 Q 85 50 80 25 Z" fill="#0f0f0f" stroke="#1a1a1a" strokeWidth="8" strokeLinejoin="round" />
        <path d="M 60 25 Q 70 20 80 25" stroke="#1a1a1a" strokeWidth="10" fill="none" />
        <ellipse cx="12" cy="22" rx="4" ry="2" fill="#e5e7eb" transform="rotate(-20 12 22)" />
        <ellipse cx="128" cy="22" rx="4" ry="2" fill="#e5e7eb" transform="rotate(20 128 22)" />
      </g>
    </svg>
  )
}



function AirPodsSVG() {
  return (
    <svg width="100" height="85" viewBox="0 0 60 50" style={{ filter: 'drop-shadow(6px 12px 6px rgba(0,0,0,0.3))' }}>
      {/* Case */}
      <rect x="2" y="2" width="56" height="46" rx="14" fill="#fdfcfb" stroke="#d5d5d5" strokeWidth="1" />
      {/* Lid line */}
      <line x1="2" y1="14" x2="58" y2="14" stroke="#d5d5d5" strokeWidth="1" />
      {/* LED */}
      <circle cx="30" cy="24" r="1.5" fill="#4ade80" />
      {/* Indent */}
      <path d="M 24 14 Q 30 18 36 14" fill="#e5e5e5" />
    </svg>
  )
}

function NapkinScribbleSVG() {
  return (
    <svg width="200" height="200" viewBox="0 0 100 100" style={{ filter: 'drop-shadow(5px 10px 8px rgba(0,0,0,0.2))' }}>
      {/* Peçete Gövdesi - Buruşuk ve düzensiz kenarlar */}
      <path
        d="M 12 15 Q 10 45 15 85 Q 45 90 85 82 Q 92 45 88 12 Q 50 8 12 15 Z"
        fill="#ffffff"
        stroke="#e5e5e5"
        strokeWidth="0.5"
      />

      {/* Buruşukluk/Katlanma İzleri */}
      <g opacity="0.3" stroke="#ccc" strokeWidth="0.3" fill="none">
        <path d="M 15 30 Q 30 35 35 15" />
        <path d="M 70 85 Q 65 60 88 55" />
        <path d="M 20 75 Q 45 70 50 90" />
      </g>

      {/* ER Diyagramı Karalamaları (Mavi Tükenmez Kalem Rengi) */}
      <g stroke="#2b4570" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Tablo 1 */}
        <rect x="25" y="25" width="18" height="12" transform="rotate(-5 34 31)" opacity="0.8" />
        <line x1="26" y1="29" x2="42" y2="28" strokeWidth="0.5" /> {/* Tablo başlık çizgisi */}

        {/* Tablo 2 */}
        <rect x="55" y="50" width="20" height="14" transform="rotate(8 65 57)" opacity="0.8" />
        <line x1="57" y1="55" x2="73" y2="57" strokeWidth="0.5" />

        {/* Bağlantı Oku (İlişki) */}
        <path d="M 43 35 Q 50 45 55 52" strokeDasharray="1 1" opacity="0.7" />
        {/* Ok ucu */}
        <path d="M 52 52 L 56 53 L 55 49" strokeWidth="0.8" />

        {/* Küçük notlar/karalamalar */}
        <path d="M 28 42 L 38 41 M 28 46 L 35 45" strokeWidth="0.4" opacity="0.6" />
        <circle cx="60" cy="35" r="3" strokeWidth="0.5" opacity="0.4" /> {/* Kahve damlası lekesi gibi */}
      </g>

      {/* Peçete dokusu/noktaları */}
      <g fill="#000" opacity="0.05">
        <circle cx="20" cy="20" r="0.2" /><circle cx="24" cy="20" r="0.2" />
        <circle cx="20" cy="24" r="0.2" /><circle cx="24" cy="24" r="0.2" />
      </g>
    </svg>
  );
}


function FinelinerSVG() {
  return (
    <svg width="340" height="30" viewBox="0 0 200 20" style={{ filter: 'drop-shadow(8px 12px 6px rgba(0,0,0,0.35))' }}>
      {/* Back cap */}
      <rect x="2" y="6" width="10" height="8" rx="2" fill="#111" />
      {/* Body */}
      <rect x="12" y="5" width="140" height="10" fill="#fdfdfd" stroke="#d5d5d5" strokeWidth="1" />
      <rect x="12" y="7" width="140" height="6" fill="#f0f0f0" />
      {/* Brand text hint */}
      <line x1="30" y1="10" x2="100" y2="10" stroke="#888" strokeWidth="1.5" strokeDasharray="10 5 2 2" />
      {/* Grip */}
      <rect x="152" y="6" width="20" height="8" fill="#d1d5db" />
      {/* Metal Tip holder */}
      <polygon points="172,6 182,8 182,12 172,14" fill="#6b7280" />
      {/* Fineliner tip */}
      <rect x="182" y="9" width="10" height="2" fill="#111" />
      {/* Ink dot */}
      <circle cx="193" cy="10" r="1.5" fill="#111" />
    </svg>
  )
}

function CrumpledPaperSVG() {
  return (
    <svg width="150" height="150" viewBox="0 0 100 100" style={{ filter: 'drop-shadow(8px 16px 8px rgba(0,0,0,0.3))' }}>
      <path d="M 20 30 Q 10 50 25 70 Q 40 95 65 85 Q 90 70 85 45 Q 80 15 50 20 Q 30 15 20 30 Z" fill="#fcfcfc" stroke="#dcd0c0" strokeWidth="1" />
      <path d="M 30 40 Q 40 30 50 50 T 70 40 M 40 60 Q 60 70 80 50" stroke="#e0e0e0" strokeWidth="2" fill="none" />
      <path d="M 25 50 Q 35 45 30 65 M 65 30 Q 75 40 60 60" stroke="#e5e5e5" strokeWidth="1.5" fill="none" />
      <path d="M 35 25 Q 45 35 55 25" stroke="#e5e5e5" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

function VintageStampSVG() {
  return (
    <div className="relative group" title="kız kulesi, istanbul">
      {/* Piece of tape holding the stamp */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 tape tape-yellow w-12 h-4 rotate-[5deg] z-20" />

      <svg width="120" height="150" viewBox="0 0 140 180" style={{ filter: 'drop-shadow(3px 6px 5px rgba(0,0,0,0.2))' }}>
        <defs>
          <mask id="stamp-mask">
            {/* Base white shape means 'visible' */}
            <rect x="0" y="0" width="140" height="180" fill="white" />
            {/* Black dotted border means 'cut holes here' */}
            <rect x="0" y="0" width="140" height="180" fill="none" stroke="black" strokeWidth="12" strokeDasharray="0 14.5" strokeLinecap="round" />
          </mask>
        </defs>

        {/* Stamp Paper */}
        <rect x="0" y="0" width="140" height="180" fill="#fdfaf3" mask="url(#stamp-mask)" />

        {/* Inner Frame */}
        <rect x="12" y="12" width="116" height="156" fill="none" stroke="#d97757" strokeWidth="1.5" mask="url(#stamp-mask)" />
        <rect x="16" y="16" width="108" height="120" fill="#f6efe1" mask="url(#stamp-mask)" />

        {/* --- MAIDEN'S TOWER (Kız Kulesi) DRAWING --- */}
        <g transform="translate(20, 20)" mask="url(#stamp-mask)">
          {/* Sun */}
          <circle cx="50" cy="30" r="14" fill="#fca5a5" />

          {/* Sea / Waves */}
          <path d="M 0 90 Q 10 85 20 90 T 40 90 T 60 90 T 80 90 T 100 90" fill="none" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
          <path d="M 0 100 Q 10 95 20 100 T 40 100 T 60 100 T 80 100 T 100 100" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
          <path d="M 0 110 Q 10 105 20 110 T 40 110 T 60 110 T 80 110 T 100 110" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />

          {/* Island Rock */}
          <path d="M 35 90 C 35 85, 65 85, 65 90 Z" fill="#4b5563" />

          {/* Tower Base */}
          <rect x="42" y="65" width="16" height="25" fill="#e5e7eb" stroke="#374151" strokeWidth="1.5" />
          <path d="M 40 65 L 60 65 L 56 50 L 44 50 Z" fill="#d1d5db" stroke="#374151" strokeWidth="1.5" />

          {/* Tower Balcony */}
          <rect x="43" y="48" width="14" height="3" fill="#374151" />

          {/* Tower Upper Section */}
          <rect x="45" y="35" width="10" height="13" fill="#e5e7eb" stroke="#374151" strokeWidth="1.5" />

          {/* Roof (Dome & Spire) */}
          <path d="M 43 35 C 43 25, 57 25, 57 35 Z" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1.5" />
          <line x1="50" y1="28" x2="50" y2="15" stroke="#374151" strokeWidth="1.5" />
          <circle cx="50" cy="15" r="1.5" fill="#fde68a" />

          {/* Windows */}
          <rect x="48" y="70" width="4" height="6" fill="#374151" />
          <rect x="48" y="38" width="4" height="6" fill="#374151" />

          {/* Seagulls */}
          <path d="M 15 20 Q 18 15 21 20 Q 24 15 27 20" fill="none" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 75 25 Q 78 20 81 25 Q 84 20 87 25" fill="none" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Stamp Value & Text */}
        <text x="16" y="162" fontFamily="serif" fontSize="24" fontWeight="bold" fill="#d97757" mask="url(#stamp-mask)">10</text>
        <text x="50" y="152" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#5a4a3a" letterSpacing="2" mask="url(#stamp-mask)">TÜRKİYE</text>


        {/* Cancellation Mark (Postmark) overlaying the drawing */}
        <g stroke="#1a1a1a" opacity="0.4" fill="none" strokeWidth="1.5" mask="url(#stamp-mask)">
          {/* Circle postmarks */}
          <circle cx="105" cy="50" r="25" />
          <circle cx="105" cy="50" r="23" />
          <text x="105" y="45" fontFamily="sans-serif" fontSize="7" fontWeight="bold" fill="#1a1a1a" textAnchor="middle" stroke="none">ISTANBUL</text>
          <text x="105" y="58" fontFamily="sans-serif" fontSize="7" fontWeight="bold" fill="#1a1a1a" textAnchor="middle" stroke="none">19 05 26</text>

          {/* Wavy cancellation lines */}
          <path d="M 105 50 Q 115 40 125 50 T 145 50" strokeWidth="2" />
          <path d="M 105 45 Q 115 35 125 45 T 145 45" strokeWidth="2" />
          <path d="M 105 55 Q 115 45 125 55 T 145 55" strokeWidth="2" />
        </g>
      </svg>
    </div>
  )
}

function RulerSVG() {
  return (
    <svg width="80" height="400" viewBox="0 0 40 200" style={{ filter: 'drop-shadow(6px 12px 6px rgba(0,0,0,0.35))' }}>
      <rect x="0" y="0" width="40" height="200" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="1" />
      <rect x="35" y="0" width="5" height="200" fill="#9ca3af" />
      {/* Ticks */}
      {[...Array(20)].map((_, i) => (
        <line key={i} x1="0" y1={i * 10} x2={i % 5 === 0 ? 15 : 8} y2={i * 10} stroke="#4b5563" strokeWidth="1" />
      ))}
    </svg>
  )
}

function PaperclipSVG({ style }) {
  return (
    <svg width="40" height="40" viewBox="0 0 20 50" className="absolute" style={style}>
      <path d="M 10 5 L 10 40 A 5 5 0 0 0 18 40 L 18 10 A 3 3 0 0 0 12 10 L 12 35 A 1 1 0 0 0 14 35 L 14 15" stroke="#9ca3af" strokeWidth="2.5" fill="none" strokeLinecap="round" style={{ filter: 'drop-shadow(1px 2px 1px rgba(0,0,0,0.2))' }} />
    </svg>
  )
}

function RetroMP3Player() {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const audioRef = React.useRef(null)

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5
    }
  }, [])

  const togglePlay = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      }
      setIsPlaying(true);
    }
  }

  return (
    <button
      className="relative z-50 cursor-pointer pointer-events-auto border-none bg-transparent p-0 outline-none block"
      onClick={togglePlay}
      title="click to play lofi beats"
      style={{ filter: 'drop-shadow(6px 12px 8px rgba(0,0,0,0.3))' }}
      type="button"
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        {/* Actual audio element for robust browser playback */}
        <audio ref={audioRef} src="/sounds/lofi.mp3" loop preload="auto" />

        {/* MP3 Player Body */}
        <svg width="120" height="240" viewBox="0 0 120 240">
          {/* Main Body */}
          <rect x="10" y="10" width="100" height="220" rx="15" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
          <rect x="10" y="10" width="100" height="220" rx="15" fill="url(#mp3Grad)" />

          <defs>
            <linearGradient id="mp3Grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
            </linearGradient>
            <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#4ade80" />
            </linearGradient>
          </defs>

          {/* Screen Bezel */}
          <rect x="15" y="20" width="90" height="70" rx="8" fill="#1e293b" />
          {/* Screen LCD */}
          <rect x="22" y="27" width="76" height="56" rx="4" fill="url(#screenGrad)" stroke="#0f172a" strokeWidth="2" />

          {/* Play Wheel */}
          <circle cx="60" cy="150" r="35" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
          <circle cx="60" cy="150" r="12" fill="#cbd5e1" />

          {/* Button icons */}
          <text x="48" y="130" fontSize="12" fill="#64748b" fontFamily="sans-serif" fontWeight="bold">MENU</text>
          <polygon points="78,146 78,154 84,150" fill="#64748b" />
          <polygon points="84,146 84,154 90,150" fill="#64748b" />
          <polygon points="42,146 42,154 36,150" fill="#64748b" />
          <polygon points="36,146 36,154 30,150" fill="#64748b" />
          <text x="54" y="178" fontSize="12" fill="#64748b" fontFamily="sans-serif" fontWeight="bold">▶II</text>

          {/* Headphones wire */}
          <path d="M 90 10 C 90 -15, 130 -10, 130 -30" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
          <path d="M 90 10 L 90 0" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
        </svg>

        {/* HTML Overlay for the Screen Text */}
        <div className="absolute top-[27px] left-[22px] w-[76px] h-[56px] overflow-hidden flex flex-col justify-center items-center rounded-sm pointer-events-none">
          <p className="font-sketch text-[10px] leading-none mb-1 text-green-950 opacity-70 border-b border-green-800/30 w-full text-center pb-1">
            {isPlaying ? "NOW PLAYING" : "IPOD NANO"}
          </p>

          <div className="w-[66px] overflow-hidden whitespace-nowrap mt-1 relative">
            <motion.div
              animate={isPlaying ? { x: [66, -80] } : { x: 0 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="text-[11px] font-mono font-bold text-green-950 tracking-tighter"
            >
              {isPlaying ? "▶ LOFI_BEATS.MP3" : "II PAUSED"}
            </motion.div>
          </div>

          {/* Progress bar fake */}
          <div className="w-[60px] h-[3px] bg-green-800/30 rounded-full mt-2 overflow-hidden">
            {isPlaying && (
              <motion.div
                className="h-full bg-green-950"
                animate={{ width: ["0%", "100%"] }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              />
            )}
          </div>
        </div>

        {/* Musical notes when playing */}
        {isPlaying && (
          <motion.div
            className="absolute -top-10 -right-4 text-[#1e293b] font-sketch text-2xl z-30 pointer-events-none"
            animate={{ y: [0, -20, -40], x: [0, 10, -5], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            ♪
          </motion.div>
        )}
        {isPlaying && (
          <motion.div
            className="absolute -top-8 right-4 text-[#334155] font-sketch text-xl z-30 pointer-events-none"
            animate={{ y: [0, -20, -40], x: [0, -10, 5], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
          >
            ♫
          </motion.div>
        )}
      </motion.div>
    </button>
  )
}
