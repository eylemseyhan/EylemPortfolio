import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ok = await login(username, password)
    if (ok) navigate('/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#faf7f2' }}>
      <div className="w-full max-w-sm">
        {/* Notebook card */}
        <div className="relative px-8 py-10 rounded-xl" style={{
          background: '#fff',
          border: '2px solid #c8b8a0',
          boxShadow: '4px 6px 0 #c8b8a0',
          transform: 'rotate(-0.5deg)',
        }}>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 rounded"
            style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid #c8b8a0', transform: 'rotate(2deg)' }} />

          <h1 className="font-sketch text-3xl text-[#3d2b1f] text-center mb-1">admin login</h1>
          <p className="text-center text-sm text-[#9a8a7a] mb-8" style={{ fontFamily: 'system-ui' }}>
            eylem's portfolio CMS ✿
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#5a4a3a] mb-1" style={{ fontFamily: 'system-ui' }}>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={{
                  border: '2px solid #c8b8a0',
                  background: 'rgba(255,255,255,0.8)',
                  fontFamily: 'system-ui',
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5a4a3a] mb-1" style={{ fontFamily: 'system-ui' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={{
                  border: '2px solid #c8b8a0',
                  background: 'rgba(255,255,255,0.8)',
                  fontFamily: 'system-ui',
                }}
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center" style={{ fontFamily: 'system-ui' }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg font-semibold text-sm transition-opacity"
              style={{
                background: '#C8F0DC',
                border: '2px solid #8fd4aa',
                boxShadow: '3px 3px 0 #8fd4aa',
                color: '#3d2b1f',
                fontFamily: 'system-ui',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'logging in...' : 'Login →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
