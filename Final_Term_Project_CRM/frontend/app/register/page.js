'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/register', form);
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-purple-400">⬡ NexCRM</h1>
          <p className="text-zinc-500 text-sm mt-1">Create your workspace</p>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-400 text-sm px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-zinc-500 mb-1 block">FULL NAME</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ali Raza" required />
          </div>
          <div>
            <label className="text-xs text-zinc-500 mb-1 block">EMAIL</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" required />
          </div>
          <div>
            <label className="text-xs text-zinc-500 mb-1 block">PASSWORD</label>
            <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Min 6 characters" required />
          </div>
          <button className="btn-primary w-full mt-2" type="submit">
            Create account →
          </button>
        </form>

        <p className="text-zinc-600 text-sm text-center mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-purple-400 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}