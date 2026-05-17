'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Order } from '@/types';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-700',
  processing: 'bg-blue-50 text-blue-700',
  shipped: 'bg-purple-50 text-purple-700',
  delivered: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-700',
};

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    api.get('/orders/my').then((res) => setOrders(res.data)).catch(() => {}).finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <section className="min-h-[60vh] flex flex-col items-center justify-center">
        <Link href="/login" className="btn-primary">Sign In to View Orders</Link>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 md:px-8 py-12">
      <p className="font-mono text-wood-500 text-xs tracking-widest mb-2">YOUR ACCOUNT</p>
      <h1 className="font-display text-4xl font-700 text-charcoal mb-10">My Orders</h1>

      {loading ? (
        <section className="space-y-4">
          {[...Array(3)].map((_, i) => <section key={i} className="h-24 bg-wood-50 animate-pulse" />)}
        </section>
      ) : orders.length === 0 ? (
        <section className="text-center py-16">
          <p className="font-body text-wood-600 mb-6">You have not placed any orders yet.</p>
          <Link href="/products" className="btn-primary">Start Shopping</Link>
        </section>
      ) : (
        <section className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order._id}
              href={`/orders/${order._id}`}
              className="block bg-white border border-wood-100 p-6 hover:border-wood-300 transition-colors"
            >
              <section className="flex flex-wrap justify-between gap-4 mb-3">
                <span className="font-mono text-xs text-wood-500">
                  #{order._id.slice(-8).toUpperCase()}
                </span>
                <span className={`px-2 py-1 text-xs font-mono rounded-full ${statusColors[order.status]}`}>
                  {order.status.toUpperCase()}
                </span>
              </section>
              <section className="flex justify-between items-end">
                <span className="font-body text-sm text-wood-600">
                  {new Date(order.createdAt).toLocaleDateString('en-GB')} · {order.items.length} item(s)
                </span>
                <span className="font-display font-700 text-xl text-charcoal">£{order.total.toFixed(2)}</span>
              </section>
            </Link>
          ))}
        </section>
      )}
    </section>
  );
}
