import { useState, useEffect } from 'react'
import { analyticsApi } from '../../api/analytics'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    analyticsApi.getSummary()
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-[#7a6a5a] text-sm">loading analytics...</div>

  if (!data) return (
    <div>
      <h1 className="text-2xl font-bold text-[#3d2b1f] mb-2">Dashboard</h1>
      <p className="text-sm text-[#9a8a7a]">Connect the API to see live analytics.</p>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {['Page Views', 'Unique Visitors', 'CV Downloads', 'Messages'].map(label => (
          <StatCard key={label} label={label} value="—" />
        ))}
      </div>
    </div>
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#3d2b1f] mb-6">Dashboard</h1>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Page Views (30d)" value={data.totalPageViews} color="#C8F0DC" />
        <StatCard label="Unique Visitors" value={data.uniqueVisitors} color="#E0D4F7" />
        <StatCard label="CV Downloads" value={data.cvDownloads} color="#FFD9C0" />
        <StatCard label="Unread Messages" value={data.unreadMessages} color="#FFD6E0" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily page views chart */}
        <ChartCard title="Daily Page Views (30d)">
          {data.dailyViews?.length > 0 ? (
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={data.dailyViews}>
                <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={d => d.slice(5)} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#8fd4aa" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : <EmptyChart />}
        </ChartCard>

        {/* Top pages chart */}
        <ChartCard title="Top Pages">
          {data.topPages?.length > 0 ? (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={data.topPages} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="page" tick={{ fontSize: 10 }} width={70} />
                <Tooltip />
                <Bar dataKey="views" fill="#b8a8e0" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <EmptyChart />}
        </ChartCard>

        {/* Top projects */}
        <ChartCard title="Most Viewed Projects">
          {data.topProjects?.length > 0 ? (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={data.topProjects}>
                <XAxis dataKey="title" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="views" fill="#f0b898" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <EmptyChart />}
        </ChartCard>
      </div>
    </div>
  )
}

function StatCard({ label, value, color = '#FFF3B0' }) {
  return (
    <div className="rounded-xl p-4" style={{ background: color, border: '1.5px solid rgba(0,0,0,0.08)' }}>
      <p className="text-xs text-[#5a4a3a] mb-1" style={{ fontFamily: 'system-ui' }}>{label}</p>
      <p className="text-3xl font-bold text-[#3d2b1f]" style={{ fontFamily: 'system-ui' }}>{value}</p>
    </div>
  )
}

function ChartCard({ title, children }) {
  return (
    <div className="rounded-xl p-5" style={{ background: '#fff', border: '1.5px solid #c8b8a0' }}>
      <h3 className="text-sm font-semibold text-[#3d2b1f] mb-4" style={{ fontFamily: 'system-ui' }}>{title}</h3>
      {children}
    </div>
  )
}

function EmptyChart() {
  return <p className="text-xs text-[#9a8a7a] text-center py-8" style={{ fontFamily: 'system-ui' }}>No data yet</p>
}
