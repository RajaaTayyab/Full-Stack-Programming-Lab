import { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import api from '../../../utils/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

export default function EditCustomer() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', company:'', status:'Lead', service:'', value:'', notes:'' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      api.get(`/customers/${id}`).then(({ data }) => setForm(data)).catch(() => toast.error('Customer not found'));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/customers/${id}`, form);
      toast.success('Customer updated! ✅');
      router.push('/customers');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 32 }}>Edit Customer</h2>
      <div className="glass" style={{ maxWidth: 640, padding: '32px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { key:'name', label:'Full Name', type:'text' },
              { key:'email', label:'Email', type:'email' },
              { key:'phone', label:'Phone', type:'text' },
              { key:'company', label:'Company', type:'text' },
              { key:'service', label:'Service', type:'text' },
              { key:'value', label:'Value (PKR)', type:'number' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ display:'block', fontSize:13, color:'var(--text-muted)', marginBottom:6 }}>{f.label}</label>
                <input className="input-field" type={f.type} value={form[f.key] || ''}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })} required />
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
            <textarea className="input-field" rows={3} value={form.notes || ''}
              onChange={e => setForm({ ...form, notes: e.target.value })} style={{ resize:'vertical' }} />
          </div>
          <div style={{ display:'flex', gap:12, marginTop:24 }}>
            <button className="btn-primary" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</button>
            <button className="btn-secondary" type="button" onClick={() => router.push('/customers')}>Cancel</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}