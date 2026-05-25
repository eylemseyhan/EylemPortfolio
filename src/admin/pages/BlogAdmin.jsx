import { useState, useEffect } from 'react'
import { blogApi } from '../../api/blog'

const EMPTY = { title: '', content: '', summary: '', coverImageUrl: '', tags: [], category: 'general', isPublished: false }

export default function BlogAdmin() {
  const [posts, setPosts] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [tagInput, setTagInput] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => { blogApi.getAll().then(setPosts).catch(() => {}) }, [])

  const openNew = () => { setEditing('new'); setForm(EMPTY); setTagInput('') }
  const openEdit = async (id) => {
    const post = await blogApi.getById(id)
    setEditing(id)
    setForm({ ...post })
    setTagInput((post.tags ?? []).join(', '))
  }
  const closeForm = () => setEditing(null)

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    const payload = { ...form, tags: tagInput.split(',').map(t => t.trim()).filter(Boolean) }
    try {
      if (editing === 'new') {
        const created = await blogApi.create(payload)
        setPosts(prev => [created, ...prev])
      } else {
        const updated = await blogApi.update(editing, payload)
        setPosts(prev => prev.map(p => p.id === editing ? updated : p))
      }
      setEditing(null)
    } catch (err) {
      alert('Save failed: ' + (err.response?.data?.message || err.message))
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return
    await blogApi.delete(id)
    setPosts(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#3d2b1f]" style={{ fontFamily: 'system-ui' }}>Blog</h1>
        <button onClick={openNew} className="px-4 py-2 rounded-lg text-sm font-medium"
          style={{ background: '#C8F0DC', border: '1.5px solid #8fd4aa', fontFamily: 'system-ui', cursor: 'pointer' }}>
          + New Post
        </button>
      </div>

      {editing !== null && (
        <div className="mb-8 p-6 rounded-xl" style={{ background: '#fff', border: '1.5px solid #c8b8a0' }}>
          <h2 className="font-semibold text-[#3d2b1f] mb-4" style={{ fontFamily: 'system-ui' }}>
            {editing === 'new' ? 'New Post' : 'Edit Post'}
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-[#5a4a3a] mb-1" style={{ fontFamily: 'system-ui' }}>Title</label>
                <input required className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ border: '1.5px solid #c8b8a0', fontFamily: 'system-ui' }}
                  value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#5a4a3a] mb-1" style={{ fontFamily: 'system-ui' }}>Category</label>
                <input className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ border: '1.5px solid #c8b8a0', fontFamily: 'system-ui' }}
                  value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#5a4a3a] mb-1" style={{ fontFamily: 'system-ui' }}>Tags (comma-separated)</label>
                <input className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ border: '1.5px solid #c8b8a0', fontFamily: 'system-ui' }}
                  value={tagInput} onChange={e => setTagInput(e.target.value)} placeholder=".NET, performance, tips" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-[#5a4a3a] mb-1" style={{ fontFamily: 'system-ui' }}>Summary</label>
                <input className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ border: '1.5px solid #c8b8a0', fontFamily: 'system-ui' }}
                  value={form.summary ?? ''} onChange={e => setForm(f => ({ ...f, summary: e.target.value }))} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#5a4a3a] mb-1" style={{ fontFamily: 'system-ui' }}>
                Content (Markdown supported)
              </label>
              <textarea required rows={12} className="w-full px-3 py-2 rounded-lg text-sm outline-none font-mono"
                style={{ border: '1.5px solid #c8b8a0' }}
                value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="published" checked={form.isPublished}
                onChange={e => setForm(f => ({ ...f, isPublished: e.target.checked }))} />
              <label htmlFor="published" className="text-sm text-[#5a4a3a]" style={{ fontFamily: 'system-ui' }}>Publish immediately</label>
            </div>
            <div className="flex gap-3">
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
              <th className="text-left px-4 py-3 text-[#5a4a3a] font-medium">Title</th>
              <th className="text-left px-4 py-3 text-[#5a4a3a] font-medium hidden md:table-cell">Category</th>
              <th className="text-left px-4 py-3 text-[#5a4a3a] font-medium hidden md:table-cell">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p, i) => (
              <tr key={p.id} style={{ borderTop: i > 0 ? '1px solid #e8e0d8' : undefined }}>
                <td className="px-4 py-3 font-medium text-[#3d2b1f]">{p.title}</td>
                <td className="px-4 py-3 text-[#7a6a5a] hidden md:table-cell">{p.category}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: p.isPublished ? '#C8F0DC' : '#FFD9C0', border: '1px solid rgba(0,0,0,0.1)' }}>
                    {p.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(p.id)} className="text-xs px-3 py-1 rounded mr-2"
                    style={{ background: '#E0D4F7', border: '1px solid #b8a8e0', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-xs px-3 py-1 rounded"
                    style={{ background: '#FFD6E0', border: '1px solid #f0a8c0', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-[#9a8a7a]">No posts yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
