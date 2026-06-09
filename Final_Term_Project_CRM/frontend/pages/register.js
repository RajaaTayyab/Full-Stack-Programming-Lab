import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { User, Mail, Lock, ArrowRight, Loader, Leaf } from 'lucide-react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', form);
      login(data.token, data.user);
      toast.success('Account created successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: 'name',     label: 'Full name',     type: 'text',     placeholder: 'Tayyab Janjua',   icon: User },
    { key: 'email',    label: 'Email address', type: 'email',    placeholder: 'you@example.com', icon: Mail },
    { key: 'password', label: 'Password',      type: 'password', placeholder: '••••••••',        icon: Lock },
  ];

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

        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 52, height: 52,
            background: 'var(--primary)',
            borderRadius: 14, marginBottom: 16,
            boxShadow: '0 6px 20px rgba(44,74,62,0.25)',
          }}>
            <Leaf size={22} color="#fff" strokeWidth={2.5} />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em' }}>
            Create your account
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 6, fontSize: 14 }}>
            Get started with Sage CRM today
          </p>
        </div>

        <div style={{
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          padding: '28px 28px 24px',
          boxShadow: 'var(--shadow)',
        }}>
          <form onSubmit={handleSubmit}>
            {fields.map(({ key, label, type, placeholder, icon: Icon }) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <label className="form-label">{label}</label>
                <div style={{ position: 'relative' }}>
                  <Icon size={14} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)', pointerEvents: 'none' }} />
                  <input className="input-field" type={type} placeholder={placeholder}
                    style={{ paddingLeft: 33 }}
                    value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} required />
                </div>
              </div>
            ))}

            <button className="btn-primary" type="submit" disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '10px 18px', marginTop: 8 }}>
              {loading ? <Loader size={14} className="spin" /> : <ArrowRight size={14} />}
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 18, fontSize: 13, color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link href="/" style={{ color: 'var(--primary)', fontWeight: 700 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
