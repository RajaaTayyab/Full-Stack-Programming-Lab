'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Order } from '@/types';
import toast from 'react-hot-toast';
import Link from 'next/link';

const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
const statusColors: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-700',
  processing: 'bg-blue-50 text-blue-700',
  shipped: 'bg-purple-50 text-purple-700',
  delivered: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-700',
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    api.get('/orders/admin/all').then((res) => setOrders(res.data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.put(`/orders/${id}`, { status });
      toast.success('Status updated');
      fetchOrders();
    } catch { toast.error('Update failed'); }
  };

  return (
    <div>
      <div className="mb-8">
        <p className="font-mono text-wood-500 text-xs tracking-widest mb-1">MANAGEMENT</p>
        <h1 className="font-display text-3xl font-700 text-charcoal">Orders</h1>
      </div>

      <div className="bg-white border border-wood-100">
        {loading ? (
          <div className="p-8 space-y-4">{[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-wood-50 animate-pulse" />)}</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-wood-100">
                {['Order', 'Customer', 'Date', 'Total', 'Status', 'Update'].map((h) => (
                  <th key={h} className="text-left px-6 py-4 font-mono text-xs tracking-widest text-wood-500">{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-wood-50">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-wood-50 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/orders/${order._id}`} className="font-mono text-xs text-wood-600 hover:text-wood-800">
                      #{order._id.slice(-8).toUpperCase()}
                    </Link>
                  </td>
                  <td className="px-6 py-4 font-body text-sm text-charcoal">{order.user?.name}</td>
                  <td className="px-6 py-4 text-sm text-wood-500 font-mono">
                    {new Date(order.createdAt).toLocaleDateString('en-GB')}
                  </td>
                  <td className="px-6 py-4 font-display font-700 text-charcoal">£{order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-mono rounded-full ${statusColors[order.status]}`}>
                      {order.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="text-xs border border-wood-200 px-2 py-1 bg-white focus:outline-none focus:border-wood-500"
                    >
                      {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}