import { getProductById } from '../../../data/products';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Star, ShoppingCart, Heart, Truck, ShieldCheck, Globe, CheckCircle2 } from 'lucide-react';

export default function ProductDetailPage({ params }) {
  const product = getProductById(params.id);

  if (!product) return notFound();

  // Price formatting
  const formattedPrice = product.price.toLocaleString();

  return (
    <div className="min-h-screen bg-[#faf6f1] text-[#1c110a] font-sans selection:bg-[#c9933a]/30">
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-[#9c6b4e] hover:text-[#1c110a] transition-all mb-12 text-sm font-bold group uppercase tracking-widest"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Collection
        </Link>

        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Product Image Stage */}
          <div className="relative group">
            <div className="bg-white rounded-[3rem] aspect-square flex items-center justify-center shadow-[0_20px_50px_rgba(61,43,31,0.05)] border border-[#e5e0da] overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#faf6f1] to-transparent opacity-50 pointer-events-none" />
              <span className="text-[12rem] drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-700">
                {product.emoji}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c9933a] bg-[#c9933a]/10 px-4 py-2 rounded-full">
                {product.category}
              </span>
            </div>

            <h1 className="text-6xl font-black text-[#1c110a] leading-[0.9] mb-6 tracking-tighter">
              {product.title}
            </h1>

            {/* Rating Row */}
            <div className="flex items-center gap-4 mb-10">
              <div className="flex items-center gap-1.5 bg-[#3d2b1f] px-3 py-1.5 rounded-xl shadow-lg shadow-[#3d2b1f]/10">
                <Star size={14} fill="#c9933a" className="text-[#c9933a]" />
                <span className="text-sm font-black text-[#faf6f1]">{product.rating}</span>
              </div>
              <span className="text-[#9c6b4e] text-sm font-bold uppercase tracking-tight opacity-60">
                {product.reviews.toLocaleString()} reviews
              </span>
            </div>

            <p className="text-[#3d2b1f]/70 leading-relaxed text-lg mb-12 font-medium max-w-md">
              {product.description}
            </p>

            {/* Price Box */}
            <div className="mb-12 p-8 bg-white border border-[#e5e0da] rounded-[2rem] shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Globe size={100} />
              </div>

              <p className="text-[10px] font-black text-[#c9933a] uppercase tracking-[0.2em] mb-2">Final Price</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#c9933a]">Rs.</span>
                <span className="text-7xl font-black text-[#1c110a] tracking-tighter">
                  {formattedPrice}
                </span>
              </div>
              <p className="text-[10px] font-bold text-[#9c6b4e] mt-4 uppercase tracking-widest flex items-center gap-2">
                <CheckCircle2 size={12} className="text-green-600" /> Tax & Delivery Included
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-12">
              <button className="bg-[#1c110a] text-[#faf6f1] font-black px-10 py-6 rounded-2xl hover:bg-[#c9933a] hover:text-[#1c110a] transition-all flex-[2] flex items-center justify-center gap-3 shadow-xl shadow-[#1c110a]/20 uppercase tracking-widest text-xs">
                <ShoppingCart size={20} />
                Add to Workspace
              </button>
              <button className="bg-white border border-[#e5e0da] text-[#3d2b1f] px-6 py-6 rounded-2xl hover:border-[#c9933a] hover:bg-[#faf6f1] transition-all flex-1 flex items-center justify-center">
                <Heart size={20} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-6 pt-10 border-t border-[#e5e0da]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl border border-[#e5e0da] flex items-center justify-center shadow-sm">
                  <Truck size={22} className="text-[#c9933a]" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-[#1c110a] uppercase tracking-widest">Shipping</p>
                  <p className="text-[11px] text-[#9c6b4e] font-bold">Local Delivery 2-4 Days</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl border border-[#e5e0da] flex items-center justify-center shadow-sm">
                  <ShieldCheck size={22} className="text-[#c9933a]" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-[#1c110a] uppercase tracking-widest">Warranty</p>
                  <p className="text-[11px] text-[#9c6b4e] font-bold">1 Year Local Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}