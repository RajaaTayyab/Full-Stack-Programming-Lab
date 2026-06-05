import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Search, Plus, Pencil, Trash2, FileText, Filter } from 'lucide-react';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (status !== 'All') params.status = status;
      const { data } = await api.get('/customers', { params });
      setCustomers(data);
    } catch {
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCustomers(); }, [search, status]);

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete ${name}? This cannot be undone.`)) return;
    try {
      await api.delete(`/customers/${id}`);
      toast.success(`${name} deleted`);
      fetchCustomers();
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <Layout>
      <div style={{ width: '100%' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>Customers</h1>
            <p style={{ color: 'var(--text-muted)', marginTop: 4, fontSize: 13 }}>{customers.length} total records</p>
          </div>
          <Link href="/customers/add">
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Plus size={15} /> Add Customer
            </button>
          </Link>
        </div>

        {/* Search & Filter Controls */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: 280 }}>
            <Search size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
            <input className="input-field" placeholder="Search customers..." value={search}
              onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 32 }} />
          </div>
          <div style={{ position: 'relative' }}>
            <Filter size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)', pointerEvents: 'none' }} />
            <select className="input-field" value={status} onChange={e => setStatus(e.target.value)} style={{ paddingLeft: 32, width: 150, appearance: 'none', cursor: 'pointer' }}>
              {['All', 'Active', 'Lead', 'Inactive'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Structured Data Table */}
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {['Name', 'Company', 'Phone', 'Service', 'Value', 'Status', 'Actions'].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: 48, color: 'var(--text-muted)' }}>Loading...</td></tr>
              ) : customers.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: 48, color: 'var(--text-muted)' }}>No customers found</td></tr>
              ) : customers.map(c => (
                <tr key={c._id}>
                  <td style={{ fontWeight: 600, color: 'var(--text)' }}>{c.name}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{c.company}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{c.phone}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{c.service}</td>
                  <td style={{ fontWeight: 600, color: 'var(--text)' }}>₨ {c.value.toLocaleString()}</td>
                  <td>
                    <span className={`badge badge-${c.status.toLowerCase()}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <Link href={`/customers/edit/${c._id}`}>
                        <button className="btn-ghost" style={{ padding: '6px 8px', display: 'flex', alignItems: 'center' }} title="Edit">
                          <Pencil size={14} />
                        </button>
                      </Link>
                      <Link href={`/invoices/generate/${c._id}`}>
                        <button className="btn-ghost" style={{ padding: '6px 8px', display: 'flex', alignItems: 'center' }} title="Invoice">
                          <FileText size={14} />
                        </button>
                      </Link>
                      <button className="btn-ghost" onClick={() => handleDelete(c._id, c.name)}
                        style={{ padding: '6px 8px', color: 'var(--danger)', display: 'flex', alignItems: 'center' }} title="Delete"
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--danger-soft)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}