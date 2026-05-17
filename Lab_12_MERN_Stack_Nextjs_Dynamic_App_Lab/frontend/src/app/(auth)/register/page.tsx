'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return; }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success('Account created!');
      router.push('/');
    } catch {
      toast.error('Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <p className="font-mono text-wood-500 text-xs tracking-widest mb-2">JOIN US</p>
          <h1 className="font-display text-4xl font-700 text-charcoal">Create Account</h1>
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-8 space-y-5">
          {[
            { key: 'name', label: 'FULL NAME', type: 'text', placeholder: 'John Smith' },
            { key: 'email', label: 'EMAIL', type: 'email', placeholder: 'your@email.com' },
            { key: 'password', label: 'PASSWORD', type: 'password', placeholder: '••••••••' },
            { key: 'confirm', label: 'CONFIRM PASSWORD', type: 'password', placeholder: '••••••••' },
          ].map(({ key, label, type, placeholder }) => (
            <div key={key}>
              <label className="font-mono text-xs text-wood-500 tracking-wider block mb-2">{label}</label>
              <input type={type} required placeholder={placeholder}
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="input-field" />
            </div>
          ))}
          <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50 mt-2">
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          <p className="text-center text-sm font-body text-wood-500">
            Already have an account?{' '}
            <Link href="/login" className="text-wood-700 font-500 hover:text-wood-900">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}