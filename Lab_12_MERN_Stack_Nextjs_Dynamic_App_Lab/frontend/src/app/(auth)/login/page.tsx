'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      router.push('/');
    } catch {
      toast.error('Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <p className="font-mono text-wood-500 text-xs tracking-widest mb-2">WELCOME BACK</p>
          <h1 className="font-display text-4xl font-700 text-charcoal">Sign In</h1>
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-8 space-y-5">
          <div>
            <label className="font-mono text-xs text-wood-500 tracking-wider block mb-2">EMAIL</label>
            <input type="email" required placeholder="your@email.com"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input-field" />
          </div>
          <div>
            <label className="font-mono text-xs text-wood-500 tracking-wider block mb-2">PASSWORD</label>
            <input type="password" required placeholder="••••••••"
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="input-field" />
          </div>
          <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50 mt-2">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <p className="text-center text-sm font-body text-wood-500">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-wood-700 font-500 hover:text-wood-900">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}