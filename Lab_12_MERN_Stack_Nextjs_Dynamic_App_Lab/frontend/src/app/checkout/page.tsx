'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    street: '', city: '', state: '', zip: '', country: 'United Kingdom',
    paymentMethod: 'COD', notes: '',
  });

  const shipping = subtotal > 200 ? 0 : 15;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (!user) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h2 className="font-display text-2xl mb-4">Please sign in to checkout</h2>
      <Link href="/login" className="btn-primary">Sign In</Link>
    </div>
  );

  if (items.length === 0) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h2 className="font-display text-2xl mb-4">Your cart is empty</h2>
      <Link href="/products" className="btn-primary">Browse Products</Link>
    </div>
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderItems = items.map(({ product, quantity }) => ({
        product: product._id,
        name: product.name,
        image: product.images[0] || '',
        price: product.price,
        quantity,
      }));
      const { data } = await api.post('/orders', {
        items: orderItems,
        shippingAddress: { street: form.street, city: form.city, state: form.state, zip: form.zip, country: form.country },
        paymentMethod: form.paymentMethod,
        notes: form.notes,
      });
      clearCart();
      toast.success('Order placed successfully!');
      router.push(`/orders/${data._id}`);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || 'Order failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <h1 className="section-title mb-10">Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-3 gap-10">
          {/* Form */}
          <div className="md:col-span-2 space-y-8">
            {/* Shipping */}
            <div>
              <h2 className="font-display font-600 text-xl text-charcoal mb-6 pb-3 border-b border-wood-100">
                Shipping Address
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="font-mono text-xs text-wood-500 tracking-wider block mb-2">STREET ADDRESS</label>
                  <input name="street" value={form.street} onChange={handleChange} required placeholder="12 Timber Lane" className="input-field" />
                </div>
                <div>
                  <label className="font-mono text-xs text-wood-500 tracking-wider block mb-2">CITY</label>
                  <input name="city" value={form.city} onChange={handleChange} required placeholder="London" className="input-field" />
                </div>
                <div>
                  <label className="font-mono text-xs text-wood-500 tracking-wider block mb-2">STATE / COUNTY</label>
                  <input name="state" value={form.state} onChange={handleChange} placeholder="England" className="input-field" />
                </div>
                <div>
                  <label className="font-mono text-xs text-wood-500 tracking-wider block mb-2">POSTCODE</label>
                  <input name="zip" value={form.zip} onChange={handleChange} required placeholder="EC1A 1BB" className="input-field" />
                </div>
                <div>
                  <label className="font-mono text-xs text-wood-500 tracking-wider block mb-2">COUNTRY</label>
                  <input name="country" value={form.country} onChange={handleChange} className="input-field" />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div>
              <h2 className="font-display font-600 text-xl text-charcoal mb-6 pb-3 border-b border-wood-100">
                Payment Method
              </h2>
              <div className="space-y-3">
                {[
                  { value: 'COD', label: 'Cash on Delivery', desc: 'Pay when your order arrives' },
                  { value: 'Bank Transfer', label: 'Bank Transfer', desc: 'Transfer directly to our account' },
                ].map((method) => (
                  <label key={method.value} className={`flex items-center gap-4 p-4 cursor-pointer border transition-colors ${form.paymentMethod === method.value ? 'border-wood-600 bg-wood-50' : 'border-wood-100 bg-white hover:border-wood-300'}`}>
                    <input type="radio" name="paymentMethod" value={method.value}
                      checked={form.paymentMethod === method.value} onChange={handleChange}
                      className="accent-wood-600" />
                    <div>
                      <div className="font-body font-500 text-charcoal">{method.label}</div>
                      <div className="text-sm text-wood-500">{method.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="font-mono text-xs text-wood-500 tracking-wider block mb-2">ORDER NOTES (OPTIONAL)</label>
              <textarea name="notes" value={form.notes} onChange={handleChange}
                rows={3} placeholder="Special instructions for delivery..."
                className="input-field resize-none" />
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white p-6 border border-wood-100 h-fit">
            <h3 className="font-display font-600 text-charcoal text-lg mb-6">Order Summary</h3>
            <div className="space-y-3 mb-6">
              {items.map(({ product, quantity }) => (
                <div key={product._id} className="flex justify-between text-sm">
                  <span className="font-body text-wood-700 truncate max-w-32">{product.name} ×{quantity}</span>
                  <span className="font-mono font-500">£{(product.price * quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-wood-100 pt-4 space-y-3 text-sm font-body">
              <div className="flex justify-between">
                <span className="text-wood-600">Subtotal</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-wood-600">Shipping</span>
                <span>{shipping === 0 ? <span className="text-green-600">Free</span> : `£${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-wood-600">Tax</span>
                <span>£{tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-wood-100 pt-3 flex justify-between font-display font-700 text-lg">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full mt-6 btn-primary disabled:opacity-50">
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}