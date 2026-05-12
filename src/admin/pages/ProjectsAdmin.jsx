import { useState, useEffect } from 'react'
import { projectsApi } from '../../api/projects'

const EMPTY = { title: '', type: '', description: '', gitHubUrl: '', liveDemoUrl: '', category: 'fullstack', emoji: '✦', color: 'mint', rotation: 0, isFeatured: false, sortOrder: 0, technologies: [] }

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [techInput, setTechInput] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => { projectsApi.getAll().then(setProjects).catch(() => {}) }, [])

  const openNew = () => { setEditing('new'); setForm(EMPTY); setTechInput('') }
  const openEdit = (p) => {
    setEditing(p.id)
    setForm({ ...p, technologies: p.technologies ?? [] })
    setTechInput((p.technologies ?? []).join(', '))
  }
  const closeForm = () => { setEditing(null) }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    const payload = { ...form, technologies: techInput.split(',').map(t => t.trim()).filter(Boolean) }
    try {
      if (editing === 'new') {
        const created = await projectsApi.create(payload)
        setProjects(prev => [...prev, created])
      } else {
        const updated = await projectsApi.update(editing, payload)
        setProjects(prev => prev.map(p => p.id === editing ? updated : p))
      }
      setEditing(null)
    } catch (err) {
      alert('Save failed: ' + (err.response?.data?.message || err.message))
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    await projectsApi.delete(id)
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#3d2b1f]" style={{ fontFamily: 'system-ui' }}>Projects</h1>
        <button onClick={openNew} className="px-4 py-2 rounded-lg text-sm font-medium"
          style={{ background: '#C8F0DC', border: '1.5px solid #8fd4aa', fontFamily: 'system-ui', cursor: 'pointer' }}>
          + Add Project
        </button>
      </div>

      {/* Form */}
      {editing !== null && (
        <div className="mb-8 p-6 rounded-xl" style={{ background: '#fff', border: '1.5px solid #c8b8a0' }}>
          <h2 className="font-semibold text-[#3d2b1f] mb-4" style={{ fontFamily: 'system-ui' }}>
            {editing === 'new' ? 'New Project' : 'Edit Project'}
          </h2>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Title" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} required />
            <Field label="Type" value={form.type} onChange={v => setForm(f => ({ ...f, type: v }))} required />
            <div className="md:col-span-2">
              <Field label="Description" value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} textarea required />
            </div>
            <Field label="GitHub URL" value={form.gitHubUrl ?? ''} onChange={v => setForm(f => ({ ...f, gitHubUrl: v }))} />
            <Field label="Live Demo URL" value={form.liveDemoUrl ?? ''} onChange={v => setForm(f => ({ ...f, liveDemoUrl: v }))} />
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-[#5a4a3a] mb-1" style={{ fontFamily: 'system-ui' }}>
                Technologies (comma-separated)
              </label>
              <input
                className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={{ border: '1.5px solid #c8b8a0', fontFamily: 'system-ui' }}
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
                placeholder=".NET Core, PostgreSQL, React"
              />
            </div>
            <SelectField label="Category" value={form.category} onChange={v => setForm(f => ({ ...f, category: v }))}
              options={['fullstack', 'backend', 'frontend', 'mobile', 'other']} />
            <SelectField label="Color" value={form.color} onChange={v => setForm(f => ({ ...f, color: v }))}
              options={['mint', 'lavender', 'peach', 'butter', 'babyblue', 'rose']} />
            <Field label="Emoji" value={form.emoji} onChange={v => setForm(f => ({ ...f, emoji: v }))} />
            <Field label="Sort Order" value={String(form.sortOrder)} onChange={v => setForm(f => ({ ...f, sortOrder: Number(v) }))} type="number" />
            <div className="flex items-center gap-2">
              <input type="checkbox" id="featured" checked={form.isFeatured}
                onChange={e => setForm(f => ({ ...f, isFeatured: e.target.checked }))} />
              <label htmlFor="featured" className="text-sm text-[#5a4a3a]" style={{ fontFamily: 'system-ui' }}>Featured</label>
            </div>

            <div className="md:col-span-2 flex gap-3 pt-2">
              <button type="submit" disabled={saving}
                className="px-5 py-2 rounded-lg text-sm font-medium"
                style={{ background: '#C8F0DC', border: '1.5px solid #8fd4aa', fontFamily: 'system-ui', cursor: 'pointer' }}>
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button type="button" onClick={closeForm}
                className="px-5 py-2 rounded-lg text-sm"
                style={{ background: '#f0ede8', border: '1.5px solid #c8b8a0', fontFamily: 'system-ui', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid #c8b8a0' }}>
        <table className="w-full text-sm" style={{ fontFamily: 'system-ui' }}>
          <thead style={{ background: '#f5f0ea' }}>
            <tr>
              <th className="text-left px-4 py-3 text-[#5a4a3a] font-medium">Project</th>
              <th className="text-left px-4 py-3 text-[#5a4a3a] font-medium hidden md:table-cell">Category</th>
              <th className="text-left px-4 py-3 text-[#5a4a3a] font-medium hidden lg:table-cell">Views</th>
              <th className="text-left px-4 py-3 text-[#5a4a3a] font-medium hidden lg:table-cell">Featured</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => (
              <tr key={p.id} style={{ borderTop: i > 0 ? '1px solid #e8e0d8' : undefined }}>
                <td className="px-4 py-3">
                  <span className="mr-2">{p.emoji}</span>
                  <span className="font-medium text-[#3d2b1f]">{p.title}</span>
                  <span className="ml-2 text-xs text-[#9a8a7a]">{p.type}</span>
                </td>
                <td className="px-4 py-3 text-[#7a6a5a] hidden md:table-cell">{p.category}</td>
                <td className="px-4 py-3 text-[#7a6a5a] hidden lg:table-cell">{p.viewCount}</td>
                <td className="px-4 py-3 hidden lg:table-cell">{p.isFeatured ? '★' : '—'}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(p)} className="text-xs px-3 py-1 rounded mr-2"
                    style={{ background: '#E0D4F7', border: '1px solid #b8a8e0', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-xs px-3 py-1 rounded"
                    style={{ background: '#FFD6E0', border: '1px solid #f0a8c0', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-[#9a8a7a]">No projects yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, required, textarea, type = 'text' }) {
  const cls = "w-full px-3 py-2 rounded-lg text-sm outline-none"
  const sty = { border: '1.5px solid #c8b8a0', fontFamily: 'system-ui' }
  return (
    <div>
      <label className="block text-xs font-medium text-[#5a4a3a] mb-1" style={{ fontFamily: 'system-ui' }}>{label}</label>
      {textarea
        ? <textarea className={cls} style={sty} rows={3} value={value} onChange={e => onChange(e.target.value)} required={required} />
        : <input type={type} className={cls} style={sty} value={value} onChange={e => onChange(e.target.value)} required={required} />
      }
    </div>
  )
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#5a4a3a] mb-1" style={{ fontFamily: 'system-ui' }}>{label}</label>
      <select className="w-full px-3 py-2 rounded-lg text-sm outline-none"
        style={{ border: '1.5px solid #c8b8a0', fontFamily: 'system-ui' }}
        value={value} onChange={e => onChange(e.target.value)}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}
