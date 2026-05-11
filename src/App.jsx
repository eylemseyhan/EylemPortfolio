import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CustomCursor from './components/CustomCursor'
import CoverPage from './components/CoverPage'
import BookViewer from './components/BookViewer'

export default function App() {
  const [coverVisible, setCoverVisible] = useState(true)

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col" style={{ background: '#faf7f2' }}>
      <CustomCursor />
      <BookViewer />
    </div>
  )
}
