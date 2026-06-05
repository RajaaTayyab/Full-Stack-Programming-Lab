import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Chatbot from '../components/Chatbot';

// 1. Import charting components from recharts
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, active: 0, leads: 0, inactive: 0, value: 0 });
  const { user } = useAuth();

  // Mock historical data for your graph - fits your 15+ customer requirement nicely
  const graphData = [
    { month: 'Jan', value: 45000, clients: 3 },
    { month: 'Feb', value: 95000, clients: 6 },
    { month: 'Mar', value: 160000, clients: 9 },
    { month: 'Apr', value: 240000, clients: 12 },
    { month: 'May', value: stats.value || 380000, clients: stats.total || 15 }, // Dynamics sync
  ];

  useEffect(() => {
    api.get('/customers').then(({ data }) => {
      setStats({
        total:    data.length,
        active:   data.filter(c => c.status === 'Active').length,
        leads:    data.filter(c => c.status === 'Lead').length,
        inactive: data.filter(c => c.status === 'Inactive').length,
        value:    data.reduce((s, c) => s + (c.value || 0), 0)
      });
    }).catch(err => console.error("Error loading dashboard metrics:", err));
  }, []);

  const cards = [
    { label: 'Total Customers', value: stats.total,    color: 'var(--text)', icon: '👥' },
    { label: 'Active Clients',  value: stats.active,   color: 'var(--success)', icon: '🌱' },
    { label: 'Leads',           value: stats.leads,    color: 'var(--warning)', icon: '🎯' },
    { label: 'Inactive',        value: stats.inactive, color: 'var(--danger)', icon: '⏸️' },
    { label: 'Total Value (PKR)', value: `₨ ${stats.value.toLocaleString()}`, color: 'var(--primary)', icon: '💰' },
  ];

  return (
    <Layout>
      <div style={{ padding: '4px' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.02em' }}>Dashboard</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>Overview of your CRM data</p>
        
        {/* Statistical Summary Cards Grid - Auto-responsive spacing layout */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: 20, 
          marginBottom: 32 
        }}>
          {cards.map(c => (
            <div key={c.label} className="card" style={{ padding: '24px 20px', minWidth: 0 }}>
              <div style={{ fontSize: 24, marginBottom: 12 }}>{c.icon}</div>
              <div style={{ 
                fontSize: 24, 
                fontWeight: 700, 
                color: c.color, 
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis' 
              }}>
                {c.value}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4, fontWeight: 500 }}>{c.label}</div>
            </div>
          ))}
        </div>

        {/* 2. Visual Analytics Graphic Container Section */}
        <div className="card" style={{ padding: '24px 20px', marginBottom: 40, width: '100%', overflow: 'hidden' }}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>Pipeline Valuation Trends</h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>Monthly growth tracking of customer portfolio values (PKR)</p>
          </div>
          
          {/* CRUCIAL FOR RESPONSIVENESS: minWidth: 0 prevents the chart vector context from stretching parents */}
          <div style={{ width: '100%', height: 300, minWidth: 0, fontSize: 11 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={graphData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  {/* Custom Gradient mapping to your premium Sage Moss Green theme */}
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--text-light)" tickLine={false} />
                <YAxis stroke="var(--text-light)" tickLine={false} tickFormatter={(v) => `₨ ${v / 1000}k`} />
                <Tooltip 
                  contentStyle={{ 
                    background: 'var(--bg)', 
                    border: '1px solid var(--border)', 
                    borderRadius: 'var(--radius)',
                    color: 'var(--text)'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  name="Total Value"
                  stroke="var(--primary)" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <Chatbot />
      </div>
    </Layout>
  );
}