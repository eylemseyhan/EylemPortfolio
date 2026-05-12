import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const navItems = [
  { to: '/admin', label: '◎ Dashboard', end: true },
  { to: '/admin/projects', label: '★ Projects' },
  { to: '/admin/skills', label: '✦ Skills' },
  { to: '/admin/blog', label: '✎ Blog' },
  { to: '/admin/messages', label: '♡ Messages' },
  { to: '/admin/config', label: '◈ Site Config' },
]

export default function AdminLayout() {
  const { logout, getUser } = useAuth()
  const navigate = useNavigate()
  const user = getUser()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#faf7f2', fontFamily: 'system-ui, sans-serif' }}>
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 flex flex-col" style={{
        background: '#3d2b1f',
        borderRight: '2px solid #5a3e2e',
      }}>
        <div className="p-5 border-b border-[#5a3e2e]">
          <h1 className="text-amber-100 font-bold text-lg leading-tight">eylem's<br />admin panel ✿</h1>
          <p className="text-amber-200/60 text-xs mt-1">@{user?.username}</p>
        </div>

        <nav className="flex-1 p-3 flex flex-col gap-1">
          {navItems.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-amber-100/20 text-amber-100 font-semibold'
                    : 'text-amber-200/70 hover:text-amber-100 hover:bg-amber-100/10'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-[#5a3e2e]">
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 rounded-lg text-sm text-amber-200/70 hover:text-amber-100 hover:bg-amber-100/10 text-left transition-colors"
          >
            ← logout
          </button>
          <a
            href="/"
            className="block px-3 py-1 text-xs text-amber-200/40 hover:text-amber-200/70 transition-colors mt-1"
          >
            ↗ view portfolio
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  )
}
