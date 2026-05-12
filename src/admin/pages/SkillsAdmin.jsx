import { useState, useEffect } from 'react'
import { skillsApi } from '../../api/skills'

const EMPTY = { name: '', category: 'Backend', level: 3, sortOrder: 0 }

export default function SkillsAdmin() {
  const [skills, setSkills] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)

  useEffect(() => { skillsApi.getAll().then(setSkills).catch(() => {}) }, [])

  const openNew = () => { setEditing('new'); setForm(EMPTY) }
  const openEdit = (s) => { setEditing(s.id); setForm({ ...s }) }
  const closeForm = () => setEditing(null)

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editing === 'new') {
        const created = await skillsApi.create(form)
        setSkills(prev => [...prev, created])
      } else {
        const updated = await skillsApi.update(editing, form)
        setSkills(prev => prev.map(s => s.id === editing ? updated : s))
      }
      setEditing(null)
    } catch (err) {
      alert('Save failed: ' + (err.response?.data?.message || err.message))
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return
    await skillsApi.delete(id)
    setSkills(prev => prev.filter(s => s.id !== id))
  }

  const categories = [...new Set(skills.map(s => s.category))]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#3d2b1f]" style={{ fontFamily: 'system-ui' }}>Skills</h1>
        <button onClick={openNew} className="px-4 py-2 rounded-lg text-sm font-medium"
          style={{ background: '#C8F0DC', border: '1.5px solid #8fd4aa', fontFamily: 'system-ui', cursor: 'pointer' }}>
          + Add Skill
        </button>
      </div>

      {editing !== null && (
        <div className="mb-8 p-6 rounded-xl" style={{ background: '#fff', border: '1.5px solid #c8b8a0' }}>
          <h2 className="font-semibold text-[#3d2b1f] mb-4" style={{ fontFamily: 'system-ui' }}>
            {editing === 'new' ? 'New Skill' : 'Edit Skill'}
          </h2>
          <form onSubmit={handleSave} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-[#5a4a3a] mb-1" style={{ fontFamily: 'system-ui' }}>Name</label>
              <input className="w-full px-3 py-2 rounded-lg text-sm outline-none" required
                style={{ border: '1.5px solid #c8b8a0', fontFamily: 'system-ui' }}
                value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#5a4a3a] mb-1" style={{ fontFamily: 'system-ui' }}>Category</label>
              <input className="w-full px-3 py-2 rounded-lg text-sm outline-none" list="cats"
                style={{ border: '1.5px solid #c8b8a0', fontFamily: 'system-ui' }}
                value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
              <datalist id="cats">{categories.map(c => <option key={c} value={c} />)}</datalist>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#5a4a3a] mb-1" style={{ fontFamily: 'system-ui' }}>Level (1–5)</label>
              <input type="number" min={1} max={5} className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={{ border: '1.5px solid #c8b8a0', fontFamily: 'system-ui' }}
                value={form.level} onChange={e => setForm(f => ({ ...f, level: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#5a4a3a] mb-1" style={{ fontFamily: 'system-ui' }}>Sort Order</label>
              <input type="number" className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={{ border: '1.5px solid #c8b8a0', fontFamily: 'system-ui' }}
                value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: Number(e.target.value) }))} />
            </div>
            <div className="col-span-2 md:col-span-4 flex gap-3 pt-1">
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

      <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid #c8b8a0' }}>
        <table className="w-full text-sm" style={{ fontFamily: 'system-ui' }}>
          <thead style={{ background: '#f5f0ea' }}>
            <tr>
              <th className="text-left px-4 py-3 text-[#5a4a3a] font-medium">Name</th>
              <th className="text-left px-4 py-3 text-[#5a4a3a] font-medium">Category</th>
              <th className="text-left px-4 py-3 text-[#5a4a3a] font-medium">Level</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {skills.map((s, i) => (
              <tr key={s.id} style={{ borderTop: i > 0 ? '1px solid #e8e0d8' : undefined }}>
                <td className="px-4 py-3 font-medium text-[#3d2b1f]">{s.name}</td>
                <td className="px-4 py-3 text-[#7a6a5a]">{s.category}</td>
                <td className="px-4 py-3 text-[#7a6a5a]">{'★'.repeat(s.level)}{'☆'.repeat(5 - s.level)}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(s)} className="text-xs px-3 py-1 rounded mr-2"
                    style={{ background: '#E0D4F7', border: '1px solid #b8a8e0', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(s.id)} className="text-xs px-3 py-1 rounded"
                    style={{ background: '#FFD6E0', border: '1px solid #f0a8c0', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
            {skills.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-[#9a8a7a]">No skills yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
