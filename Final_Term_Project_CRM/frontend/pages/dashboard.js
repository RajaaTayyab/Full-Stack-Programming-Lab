import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Chatbot from '../components/Chatbot';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, active: 0, leads: 0, inactive: 0, value: 0 });
  const { user } = useAuth();

  const graphData = [
    { month: 'Jan', value: 45000  },
    { month: 'Feb', value: 95000  },
    { month: 'Mar', value: 160000 },
    { month: 'Apr', value: 240000 },
    { month: 'May', value: stats.value || 380000 },
  ];

  useEffect(() => {
    api.get('/customers').then(({ data }) => {
      setStats({
        total:    data.length,
        active:   data.filter(c => c.status === 'Active').length,
        leads:    data.filter(c => c.status === 'Lead').length,
        inactive: data.filter(c => c.status === 'Inactive').length,
        value:    data.reduce((s, c) => s + (c.value || 0), 0),
      });
    }).catch(err => console.error('Dashboard error:', err));
  }, []);

  const fmt = (n) => {
    if (n >= 1000000) return `Rs ${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000)    return `Rs ${(n / 1000).toFixed(0)}K`;
    return `Rs ${n}`;
  };

  return (
    <Layout>
      {/* Page title */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 3 }}>
          Good day, <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{user?.name}</span>
        </p>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em' }}>
          Dashboard
        </h1>
      </div>

      {/* Stat cards — 3 columns like screenshot */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 24 }}>

        {/* Total Customers */}
        <div className="stat-card" style={{ padding: '22px 20px' }}>
          <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.04em', lineHeight: 1 }}>
            {stats.total}
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Customers
          </div>
        </div>

        {/* Pipeline — featured sage card */}
        <div className="stat-card-featured" style={{ padding: '22px 20px' }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1 }}>
            {fmt(stats.value)}
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.65)', marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Pipeline
          </div>
        </div>

        {/* Active */}
        <div className="stat-card" style={{ padding: '22px 20px' }}>
          <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--success)', letterSpacing: '-0.04em', lineHeight: 1 }}>
            {stats.active}
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Active
          </div>
        </div>

        {/* Leads */}
        <div className="stat-card" style={{ padding: '22px 20px' }}>
          <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--warning)', letterSpacing: '-0.04em', lineHeight: 1 }}>
            {stats.leads}
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Leads
          </div>
        </div>

        {/* Inactive */}
        <div className="stat-card" style={{ padding: '22px 20px' }}>
          <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '-0.04em', lineHeight: 1 }}>
            {stats.inactive}
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Inactive
          </div>
        </div>
      </div>

      {/* Revenue chart */}
      <div className="card" style={{ padding: '24px 28px', marginBottom: 40 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Revenue this week</h3>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>Customer portfolio value trend (PKR)</p>
        <div style={{ width: '100%', height: 260, minWidth: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={graphData} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="sgGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#2c4a3e" stopOpacity={0.20} />
                  <stop offset="95%" stopColor="#2c4a3e" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--text-light)" tickLine={false} axisLine={false} style={{ fontSize: 12 }} />
              <YAxis stroke="var(--text-light)" tickLine={false} axisLine={false} tickFormatter={v => `₨${v / 1000}k`} style={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  color: 'var(--text)',
                  boxShadow: 'var(--shadow)',
                  fontSize: 13,
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                name="Value (PKR)"
                stroke="#2c4a3e"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#sgGrad)"
                dot={{ fill: '#2c4a3e', strokeWidth: 2, r: 4, stroke: '#fff' }}
                activeDot={{ r: 6, fill: '#2c4a3e', stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Chatbot />
    </Layout>
  );
}
