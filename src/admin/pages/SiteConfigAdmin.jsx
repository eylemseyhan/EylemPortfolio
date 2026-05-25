import { useState, useEffect } from 'react'
import { configApi } from '../../api/config'

export default function SiteConfigAdmin() {
  const [config, setConfig] = useState({})
  const [saving, setSaving] = useState(null)
  const [saved, setSaved] = useState(null)

  useEffect(() => { configApi.getAll().then(setConfig).catch(() => {}) }, [])

  const handleSave = async (key) => {
    setSaving(key)
    try {
      await configApi.set(key, config[key] ?? '')
      setSaved(key)
      setTimeout(() => setSaved(null), 2000)
    } catch (err) {
      alert('Save failed: ' + (err.response?.data?.message || err.message))
    } finally { setSaving(null) }
  }

  const fields = [
    { key: 'hero_title', label: 'Hero Title', hint: 'Main heading on the cover page' },
    { key: 'hero_subtitle', label: 'Hero Subtitle', hint: 'Tagline below the title' },
    { key: 'hero_location', label: 'Location', hint: 'City/country shown on the cover' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#3d2b1f] mb-2" style={{ fontFamily: 'system-ui' }}>Site Config</h1>
      <p className="text-sm text-[#9a8a7a] mb-8" style={{ fontFamily: 'system-ui' }}>
        Edit homepage content without touching the code.
      </p>

      <div className="space-y-6 max-w-lg">
        {fields.map(({ key, label, hint }) => (
          <div key={key} className="p-5 rounded-xl" style={{ background: '#fff', border: '1.5px solid #c8b8a0' }}>
            <label className="block font-semibold text-sm text-[#3d2b1f] mb-1" style={{ fontFamily: 'system-ui' }}>{label}</label>
            <p className="text-xs text-[#9a8a7a] mb-3" style={{ fontFamily: 'system-ui' }}>{hint}</p>
            <div className="flex gap-2">
              <input
                className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                style={{ border: '1.5px solid #c8b8a0', fontFamily: 'system-ui' }}
                value={config[key] ?? ''}
                onChange={e => setConfig(c => ({ ...c, [key]: e.target.value }))}
              />
              <button
                onClick={() => handleSave(key)}
                disabled={saving === key}
                className="px-4 py-2 rounded-lg text-sm font-medium flex-shrink-0"
                style={{
                  background: saved === key ? '#C8F0DC' : '#FFF3B0',
                  border: `1.5px solid ${saved === key ? '#8fd4aa' : '#e8d878'}`,
                  fontFamily: 'system-ui',
                  cursor: saving === key ? 'not-allowed' : 'pointer',
                }}
              >
                {saving === key ? '...' : saved === key ? '✓ Saved' : 'Save'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-5 rounded-xl max-w-lg" style={{ background: '#FFF3B0', border: '1.5px solid #e8d878' }}>
        <p className="text-sm font-medium text-[#5a4a3a] mb-1" style={{ fontFamily: 'system-ui' }}>
          ✎ Note
        </p>
        <p className="text-xs text-[#7a6a5a]" style={{ fontFamily: 'system-ui' }}>
          To make the frontend read these values, the portfolio's <code>CoverPage</code> and <code>AboutPage</code> components
          need to call <code>GET /api/config</code> on mount. This is ready to wire in — the API is live.
        </p>
      </div>
    </div>
  )
}
