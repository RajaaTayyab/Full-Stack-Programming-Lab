import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Mail, Lock, ArrowRight, Loader, Leaf } from 'lucide-react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      login(data.token, data.user);
      toast.success(`Welcome back, ${data.user.name}!`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-secondary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 52, height: 52,
            background: 'var(--primary)',
            borderRadius: 14,
            marginBottom: 16,
            boxShadow: '0 6px 20px rgba(44,74,62,0.25)',
          }}>
            <Leaf size={22} color="#fff" strokeWidth={2.5} />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em' }}>
            Sign in to Sage CRM
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 6, fontSize: 14 }}>
            Enter your credentials to continue
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          padding: '28px 28px 24px',
          boxShadow: 'var(--shadow)',
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label className="form-label">Email address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={14} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)', pointerEvents: 'none' }} />
                <input className="input-field" type="email" placeholder="admin@nexuscrm.pk"
                  style={{ paddingLeft: 33 }}
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={14} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)', pointerEvents: 'none' }} />
                <input className="input-field" type="password" placeholder="••••••••"
                  style={{ paddingLeft: 33 }}
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
              </div>
            </div>

            <button className="btn-primary" type="submit" disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '10px 18px' }}>
              {loading ? <Loader size={14} className="spin" /> : <ArrowRight size={14} />}
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 18, fontSize: 13, color: 'var(--text-muted)' }}>
          No account?{' '}
          <Link href="/register" style={{ color: 'var(--primary)', fontWeight: 700 }}>Create one</Link>
        </p>
      </div>
    </div>
  );
}
