'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { productFallback } from '@/lib/cloudinary';

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, totalItems } = useCart();
  const shipping = subtotal > 200 ? 0 : 15;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 text-center">
        <h1 className="font-display text-3xl font-700 text-charcoal mb-4">Your cart is empty</h1>
        <p className="font-body text-wood-600 mb-8">Add handcrafted pieces to get started.</p>
        <Link href="/products" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <h1 className="font-display text-4xl font-700 text-charcoal mb-10">Shopping Cart ({totalItems})</h1>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product._id} className="flex gap-4 bg-white border border-wood-100 p-4">
              <div className="relative w-24 h-24 shrink-0 bg-wood-50">
                <Image
                  src={product.images[0] || productFallback(200)}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <Link href={`/products/${product.slug}`} className="font-display font-600 text-charcoal hover:text-wood-700">
                  {product.name}
                </Link>
                <p className="font-display font-700 text-lg mt-1">£{product.price.toFixed(2)}</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border border-wood-200">
                    <button type="button" onClick={() => updateQuantity(product._id, quantity - 1)} className="p-2 hover:bg-wood-50">
                      <FiMinus size={14} />
                    </button>
                    <span className="w-8 text-center font-mono text-sm">{quantity}</span>
                    <button type="button" onClick={() => updateQuantity(product._id, quantity + 1)} className="p-2 hover:bg-wood-50">
                      <FiPlus size={14} />
                    </button>
                  </div>
                  <button type="button" onClick={() => removeItem(product._id)} className="text-wood-400 hover:text-red-600 ml-2">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-wood-100 p-6 h-fit">
          <h2 className="font-display text-xl font-600 mb-6">Order Summary</h2>
          <div className="space-y-3 font-body text-sm">
            <div className="flex justify-between"><span className="text-wood-600">Subtotal</span><span>£{subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-wood-600">Shipping</span><span>{shipping === 0 ? 'Free' : `£${shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between"><span className="text-wood-600">Tax (10%)</span><span>£{tax.toFixed(2)}</span></div>
            <div className="flex justify-between font-display font-700 text-lg pt-3 border-t border-wood-100">
              <span>Total</span><span>£{total.toFixed(2)}</span>
            </div>
          </div>
          <Link href="/checkout" className="btn-primary w-full block text-center mt-6 py-4">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}


