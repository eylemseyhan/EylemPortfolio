import { useState, useEffect } from 'react'
import { contactApi } from '../../api/contact'

export default function MessagesAdmin() {
  const [messages, setMessages] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => { contactApi.getAll().then(setMessages).catch(() => {}) }, [])

  const handleRead = async (id) => {
    await contactApi.markRead(id)
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m))
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return
    await contactApi.delete(id)
    setMessages(prev => prev.filter(m => m.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  const openMessage = (msg) => {
    setSelected(msg)
    if (!msg.isRead) handleRead(msg.id)
  }

  const unread = messages.filter(m => !m.isRead).length

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-[#3d2b1f]" style={{ fontFamily: 'system-ui' }}>Messages</h1>
        {unread > 0 && (
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
            style={{ background: '#FFD6E0', border: '1px solid #f0a8c0', fontFamily: 'system-ui' }}>
            {unread} unread
          </span>
        )}
      </div>

      <div className="flex gap-4 h-[600px]">
        {/* List */}
        <div className="w-72 flex-shrink-0 rounded-xl overflow-y-auto" style={{ border: '1.5px solid #c8b8a0' }}>
          {messages.length === 0 && (
            <p className="p-6 text-sm text-[#9a8a7a] text-center" style={{ fontFamily: 'system-ui' }}>No messages yet</p>
          )}
          {messages.map((m, i) => (
            <button
              key={m.id}
              onClick={() => openMessage(m)}
              className="w-full text-left p-4 block transition-colors"
              style={{
                borderTop: i > 0 ? '1px solid #e8e0d8' : undefined,
                background: selected?.id === m.id ? '#f5f0ea' : m.isRead ? '#fff' : '#fffbf5',
                fontFamily: 'system-ui',
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm text-[#3d2b1f]">
                  {!m.isRead && <span className="inline-block w-2 h-2 rounded-full bg-[#f0b898] mr-1.5 mb-0.5" />}
                  {m.name}
                </span>
                <span className="text-xs text-[#9a8a7a]">
                  {new Date(m.receivedAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-[#7a6a5a] truncate">{m.message}</p>
            </button>
          ))}
        </div>

        {/* Detail */}
        <div className="flex-1 rounded-xl p-6 overflow-y-auto" style={{ border: '1.5px solid #c8b8a0', background: '#fff' }}>
          {selected ? (
            <div style={{ fontFamily: 'system-ui' }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-semibold text-lg text-[#3d2b1f]">{selected.name}</h2>
                  <a href={`mailto:${selected.email}`} className="text-sm text-[#7a6a5a] hover:text-[#3d2b1f]">
                    {selected.email}
                  </a>
                  <p className="text-xs text-[#9a8a7a] mt-1">
                    {new Date(selected.receivedAt).toLocaleString()}
                    {selected.ipAddress && ` · ${selected.ipAddress}`}
                  </p>
                </div>
                <button onClick={() => handleDelete(selected.id)}
                  className="text-xs px-3 py-1.5 rounded"
                  style={{ background: '#FFD6E0', border: '1px solid #f0a8c0', cursor: 'pointer' }}>
                  Delete
                </button>
              </div>
              <div className="p-4 rounded-lg text-sm text-[#3d2b1f] leading-relaxed whitespace-pre-wrap"
                style={{ background: '#faf7f2', border: '1px solid #e8e0d8' }}>
                {selected.message}
              </div>
              <a
                href={`mailto:${selected.email}?subject=Re: your message&body=Hi ${selected.name},%0A%0A`}
                className="inline-block mt-4 px-4 py-2 rounded-lg text-sm font-medium"
                style={{ background: '#C5E8F7', border: '1.5px solid #90c8e8', color: '#3d2b1f', textDecoration: 'none' }}
              >
                ↗ Reply via email
              </a>
            </div>
          ) : (
            <p className="text-sm text-[#9a8a7a] text-center mt-20" style={{ fontFamily: 'system-ui' }}>
              Select a message to read it
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
