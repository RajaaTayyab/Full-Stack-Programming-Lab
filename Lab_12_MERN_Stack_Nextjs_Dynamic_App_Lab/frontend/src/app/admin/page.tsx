'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import { FiPackage, FiShoppingBag, FiClock, FiDollarSign } from 'react-icons/fi';

interface Stats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  totalProducts: number;
  recentOrders: {
    _id: string;
    user: { name: string };
    total: number;
    status: string;
    createdAt: string;
  }[];
}

const statusColors: Record<string, string> = {
  pending: 'text-yellow-600 bg-yellow-50',
  processing: 'text-blue-600 bg-blue-50',
  shipped: 'text-purple-600 bg-purple-50',
  delivered: 'text-green-600 bg-green-50',
  cancelled: 'text-red-600 bg-red-50',
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    api.get('/orders/admin/stats').then((res) => setStats(res.data)).catch(() => {});
  }, []);

  const cards = [
    { label: 'Total Revenue', value: `£${stats?.totalRevenue.toFixed(2) || '0'}`, icon: FiDollarSign, color: 'text-green-600' },
    { label: 'Total Orders', value: stats?.totalOrders || 0, icon: FiShoppingBag, color: 'text-blue-600' },
    { label: 'Pending Orders', value: stats?.pendingOrders || 0, icon: FiClock, color: 'text-yellow-600' },
    { label: 'Active Products', value: stats?.totalProducts || 0, icon: FiPackage, color: 'text-wood-600' },
  ];

  return (
    <div>
      <div className="mb-8">
        <p className="font-mono text-wood-500 text-xs tracking-widest mb-1">OVERVIEW</p>
        <h1 className="font-display text-3xl font-700 text-charcoal">Dashboard</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white p-6 border border-wood-100">
            <div className="flex justify-between items-start mb-4">
              <p className="font-mono text-xs text-wood-500 tracking-wide">{label.toUpperCase()}</p>
              <Icon size={20} className={color} />
            </div>
            <p className="font-display font-700 text-3xl text-charcoal">{value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-wood-100">
        <div className="flex justify-between items-center p-6 border-b border-wood-100">
          <h2 className="font-display font-600 text-xl text-charcoal">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm font-body text-wood-600 hover:text-wood-800">View All →</Link>
        </div>
        <div className="divide-y divide-wood-50">
          {stats?.recentOrders.map((order) => (
            <div key={order._id} className="flex items-center justify-between p-5">
              <div>
                <p className="font-mono text-xs text-wood-500">#{order._id.slice(-8).toUpperCase()}</p>
                <p className="font-body font-500 text-charcoal">{order.user?.name}</p>
              </div>
              <div className="flex items-center gap-6">
                <span className={`px-2 py-1 text-xs font-mono rounded-full ${statusColors[order.status]}`}>
                  {order.status.toUpperCase()}
                </span>
                <span className="font-display font-700 text-charcoal">£{order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}