import Link from 'next/link';
// ShoppingBag icon ko import kiya premium look ke liye
import { ShoppingBag } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1c110a] text-[#faf6f1]/50 mt-auto border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Brand Section with Symbol */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 text-[#faf6f1] font-bold text-xl tracking-tighter group">
            <ShoppingBag size={22} className="text-[#c9933a] group-hover:scale-110 transition-transform" />
            <span>
              Shop<span className="text-[#c9933a]">Next</span>
            </span>
          </div>
          <p className="text-[10px] font-black text-[#faf6f1] mt-1">
            by Tayyab Janjua
          </p>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex gap-8 list-none p-0">
            <li>
              <Link href="/" className="hover:text-[#c9933a] transition-colors text-xs font-bold uppercase tracking-widest">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-[#c9933a] transition-colors text-xs font-bold uppercase tracking-widest">
                Products
              </Link>
            </li>
          </ul>
        </nav>

      </div>
    </footer>
  );
}