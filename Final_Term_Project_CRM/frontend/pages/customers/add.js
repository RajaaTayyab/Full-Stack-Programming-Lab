import { useState } from 'react';
import Layout from '../../components/Layout';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const INITIAL = { name:'', email:'', phone:'', company:'', status:'Lead', service:'', value:'', notes:'' };

export default function AddCustomer() {
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/customers', form);
      toast.success('Customer added successfully! 🎉');
      router.push('/customers');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add customer');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key:'name',    label:'Full Name',     type:'text',   placeholder:'Ahmed Raza' },
    { key:'email',   label:'Email',         type:'email',  placeholder:'ahmed@example.com' },
    { key:'phone',   label:'Phone',         type:'text',   placeholder:'0301-1234567' },
    { key:'company', label:'Company',       type:'text',   placeholder:'Tech Corp' },
    { key:'service', label:'Service',       type:'text',   placeholder:'Web Development' },
    { key:'value',   label:'Value (PKR)',   type:'number', placeholder:'150000' },
  ];

  return (
    <Layout>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Add Customer</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>Fill in the details to add a new customer record</p>
      <div className="glass" style={{ maxWidth: 640, padding: '32px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {fields.map(f => (
              <div key={f.key}>
                <label style={{ display:'block', fontSize:13, color:'var(--text-muted)', marginBottom:6 }}>{f.label}</label>
                <input className="input-field" type={f.type} placeholder={f.placeholder}
                  value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} required />
              </div>
            ))}
            <div>
              <label style={{ display:'block', fontSize:13, color:'var(--text-muted)', marginBottom:6 }}>Status</label>
              <select className="input-field" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                {['Lead','Active','Inactive'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <label style={{ display:'block', fontSize:13, color:'var(--text-muted)', marginBottom:6 }}>Notes</label>
            <textarea className="input-field" rows={3} placeholder="Additional notes..."
              value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ resize:'vertical' }} />
          </div>
          <div style={{ display:'flex', gap:12, marginTop:24 }}>
            <button className="btn-primary" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Add Customer'}</button>
            <button className="btn-secondary" type="button" onClick={() => router.push('/customers')}>Cancel</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}