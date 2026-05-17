'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { User } from '@/types';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users').then((res) => setUsers(res.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <p className="font-mono text-wood-500 text-xs tracking-widest mb-1">MANAGEMENT</p>
        <h1 className="font-display text-3xl font-700 text-charcoal">Users</h1>
      </div>

      <div className="bg-white border border-wood-100">
        {loading ? (
          <div className="p-8 space-y-4">{[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-wood-50 animate-pulse" />)}</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-wood-100">
                {['Name', 'Email', 'Role', 'Joined'].map((h) => (
                  <th key={h} className="text-left px-6 py-4 font-mono text-xs tracking-widest text-wood-500">{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-wood-50">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-wood-50">
                  <td className="px-6 py-4 font-body font-500 text-charcoal">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-wood-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-mono rounded-full ${user.role === 'admin' ? 'bg-forest-50 text-forest-700' : 'bg-wood-50 text-wood-700'}`}>
                      {user.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-wood-500">—</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}


