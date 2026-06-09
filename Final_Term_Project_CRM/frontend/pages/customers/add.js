import { useState } from 'react';
import Layout from '../../components/Layout';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const INITIAL = { name: '', email: '', phone: '', company: '', status: 'Lead', service: '', value: '', notes: '' };

export default function AddCustomer() {
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/customers', form);
      toast.success('Customer added!');
      router.push('/customers');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add customer');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: 'name',    label: 'Full Name',   type: 'text',   placeholder: 'Ahmed Raza' },
    { key: 'email',   label: 'Email',       type: 'email',  placeholder: 'ahmed@example.com' },
    { key: 'phone',   label: 'Phone',       type: 'text',   placeholder: '0301-1234567' },
    { key: 'company', label: 'Company',     type: 'text',   placeholder: 'TechCorp PK' },
    { key: 'service', label: 'Service',     type: 'text',   placeholder: 'Web Development' },
    { key: 'value',   label: 'Value (PKR)', type: 'number', placeholder: '150000' },
  ];

  return (
    <Layout>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em' }}>Add Customer</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: 4, fontSize: 13 }}>Create a new customer record</p>
      </div>

      <div style={{
        background: 'var(--bg)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px 32px',
        maxWidth: 640,
        boxShadow: 'var(--shadow-sm)',
      }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {fields.map(f => (
              <div key={f.key}>
                <label className="form-label">{f.label}</label>
                <input className="input-field" type={f.type} placeholder={f.placeholder}
                  value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} required />
              </div>
            ))}
            <div>
              <label className="form-label">Status</label>
              <select className="input-field" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                {['Lead', 'Active', 'Inactive'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <label className="form-label">Notes</label>
            <textarea className="input-field" rows={3} placeholder="Additional notes…"
              value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
              style={{ resize: 'vertical' }} />
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? 'Saving…' : 'Add Customer'}
            </button>
            <button className="btn-secondary" type="button" onClick={() => router.push('/customers')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
