'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function AccountPage() {
  const { user, updateUser } = useAuth();
  const [tab, setTab] = useState<'profile' | 'password'>('profile');
  const [profile, setProfile] = useState({ name: user?.name || '', phone: user?.phone || '' });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [loading, setLoading] = useState(false);

  if (!user) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <Link href="/login" className="btn-primary">Sign In</Link>
    </div>
  );

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.put('/auth/profile', profile);
      updateUser(data);
      toast.success('Profile updated!');
    } catch { toast.error('Update failed'); }
    setLoading(false);
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirm) { toast.error('Passwords do not match'); return; }
    setLoading(true);
    try {
      await api.put('/auth/password', { currentPassword: passwords.currentPassword, newPassword: passwords.newPassword });
      toast.success('Password changed!');
      setPasswords({ currentPassword: '', newPassword: '', confirm: '' });
    } catch { toast.error('Failed to change password'); }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-16 h-16 bg-wood-200 flex items-center justify-center">
          <span className="font-display font-700 text-wood-700 text-2xl">{user.name.charAt(0)}</span>
        </div>
        <div>
          <h1 className="font-display text-2xl font-700 text-charcoal">{user.name}</h1>
          <p className="text-wood-500 font-mono text-xs tracking-wide">{user.email}</p>
          {user.role === 'admin' && <span className="tag mt-1">ADMIN</span>}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-wood-100 mb-8">
        {(['profile', 'password'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-6 py-3 font-mono text-xs tracking-widest uppercase transition-colors border-b-2 -mb-px capitalize ${tab === t ? 'border-wood-600 text-wood-700' : 'border-transparent text-wood-400 hover:text-wood-600'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'profile' && (
        <form onSubmit={saveProfile} className="bg-white p-8 space-y-5">
          <div>
            <label className="font-mono text-xs text-wood-500 tracking-wider block mb-2">FULL NAME</label>
            <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="input-field" placeholder="Full Name" />
          </div>
          <div>
            <label className="font-mono text-xs text-wood-500 tracking-wider block mb-2">EMAIL</label>
            <input value={user.email} disabled className="input-field opacity-50 cursor-not-allowed" />
          </div>
          <div>
            <label className="font-mono text-xs text-wood-500 tracking-wider block mb-2">PHONE</label>
            <input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="input-field" placeholder="+44 7700 900000" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      )}

      {tab === 'password' && (
        <form onSubmit={changePassword} className="bg-white p-8 space-y-5">
          {[
            { key: 'currentPassword', label: 'CURRENT PASSWORD' },
            { key: 'newPassword', label: 'NEW PASSWORD' },
            { key: 'confirm', label: 'CONFIRM NEW PASSWORD' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="font-mono text-xs text-wood-500 tracking-wider block mb-2">{label}</label>
              <input type="password" required
                value={passwords[key as keyof typeof passwords]}
                onChange={(e) => setPasswords({ ...passwords, [key]: e.target.value })}
                className="input-field" placeholder="••••••••" />
            </div>
          ))}
          <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
            {loading ? 'Updating...' : 'Change Password'}
          </button>
        </form>
      )}
    </div>
  );
}