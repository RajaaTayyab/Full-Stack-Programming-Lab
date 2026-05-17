'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import api from '@/lib/api';
import { Order } from '@/types';
import { FiCheckCircle, FiPackage, FiTruck, FiHome } from 'react-icons/fi';
import { productFallback } from '@/lib/cloudinary';

const steps = ['pending', 'processing', 'shipped', 'delivered'];
const stepIcons = [FiPackage, FiPackage, FiTruck, FiHome];

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    api.get(`/orders/${id}`).then((res) => setOrder(res.data)).catch(() => {});
  }, [id]);

  if (!order) return <div className="min-h-screen flex items-center justify-center animate-pulse"><p className="text-wood-400 font-display text-2xl">Loading order...</p></div>;

  const stepIdx = steps.indexOf(order.status);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
      <div className="flex items-start justify-between mb-10">
        <div>
          <p className="font-mono text-wood-500 text-xs tracking-widest mb-2">ORDER DETAILS</p>
          <h1 className="font-display text-3xl font-700">#{order._id.slice(-8).toUpperCase()}</h1>
          <p className="text-wood-500 text-sm mt-1">{new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        {order.status === 'delivered' && (
          <div className="flex items-center gap-2 text-green-600">
            <FiCheckCircle size={20} />
            <span className="font-mono text-sm">Delivered</span>
          </div>
        )}
      </div>

      {/* Progress */}
      {order.status !== 'cancelled' && (
        <div className="bg-white p-6 border border-wood-100 mb-8">
          <div className="flex justify-between">
            {steps.map((step, i) => {
              const Icon = stepIcons[i];
              const active = i <= stepIdx;
              return (
                <div key={step} className="flex flex-col items-center gap-2 flex-1">
                  <div className={`w-10 h-10 flex items-center justify-center border-2 ${active ? 'bg-wood-600 border-wood-600 text-white' : 'border-wood-200 text-wood-300'}`}>
                    <Icon size={18} />
                  </div>
                  <span className={`font-mono text-xs tracking-wide capitalize ${active ? 'text-wood-700' : 'text-wood-300'}`}>{step}</span>
                  {i < steps.length - 1 && (
                    <div className={`absolute h-0.5 w-full top-5 left-1/2 ${active && i < stepIdx ? 'bg-wood-600' : 'bg-wood-100'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {/* Items */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="font-display font-600 text-xl text-charcoal">Items</h2>
          {order.items.map((item, i) => (
            <div key={i} className="flex gap-4 bg-white p-4 border border-wood-50">
              <div className="relative w-16 h-16 shrink-0 bg-wood-50">
                <Image src={item.image || productFallback(100)} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-body font-500 text-charcoal">{item.name}</h4>
                <p className="text-sm text-wood-500">Qty: {item.quantity}</p>
              </div>
              <span className="font-display font-700 text-charcoal">£{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <div className="bg-white p-5 border border-wood-100">
            <h3 className="font-display font-600 text-charcoal mb-4">Summary</h3>
            <div className="space-y-2 text-sm font-body">
              <div className="flex justify-between"><span className="text-wood-600">Subtotal</span><span>£{order.subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-wood-600">Shipping</span><span>{order.shippingCost === 0 ? 'Free' : `£${order.shippingCost.toFixed(2)}`}</span></div>
              <div className="flex justify-between"><span className="text-wood-600">Tax</span><span>£{order.tax.toFixed(2)}</span></div>
              <div className="border-t border-wood-100 pt-2 flex justify-between font-display font-700 text-lg"><span>Total</span><span>£{order.total.toFixed(2)}</span></div>
            </div>
          </div>
          <div className="bg-white p-5 border border-wood-100">
            <h3 className="font-display font-600 text-charcoal mb-3">Shipping To</h3>
            <address className="text-sm text-wood-600 font-body not-italic leading-relaxed">
              {order.shippingAddress.street}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state}<br />
              {order.shippingAddress.zip}<br />
              {order.shippingAddress.country}
            </address>
          </div>
          <div className="bg-white p-5 border border-wood-100">
            <h3 className="font-display font-600 text-charcoal mb-2">Payment</h3>
            <p className="text-sm text-wood-600 font-body">{order.paymentMethod}</p>
            <p className={`text-xs font-mono mt-1 ${order.isPaid ? 'text-green-600' : 'text-yellow-600'}`}>
              {order.isPaid ? 'PAID' : 'PAYMENT PENDING'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}