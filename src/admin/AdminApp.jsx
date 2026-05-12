import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLogin from './pages/AdminLogin'
import AdminLayout from './AdminLayout'
import Dashboard from './pages/Dashboard'
import ProjectsAdmin from './pages/ProjectsAdmin'
import SkillsAdmin from './pages/SkillsAdmin'
import BlogAdmin from './pages/BlogAdmin'
import MessagesAdmin from './pages/MessagesAdmin'
import SiteConfigAdmin from './pages/SiteConfigAdmin'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('admin_token')
  return token ? children : <Navigate to="/admin/login" replace />
}

export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route path="/*" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<ProjectsAdmin />} />
        <Route path="skills" element={<SkillsAdmin />} />
        <Route path="blog" element={<BlogAdmin />} />
        <Route path="messages" element={<MessagesAdmin />} />
        <Route path="config" element={<SiteConfigAdmin />} />
      </Route>
    </Routes>
  )
}
