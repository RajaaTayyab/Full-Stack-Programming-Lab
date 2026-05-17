'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="bg-charcoal text-cream mt-20">
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid md:grid-cols-4 gap-10">
        <section className="md:col-span-2">
          <h3 className="font-display text-2xl font-700 mb-4">Rustik Plank</h3>
          <p className="font-body text-white/60 text-sm leading-relaxed max-w-md">
            Handcrafted wood furniture and home decor, sustainably sourced and built to last generations.
          </p>
        </section>
        <section>
          <p className="font-mono text-xs tracking-widest text-wood-400 mb-4">SHOP</p>
          <ul className="space-y-2 font-body text-sm text-white/70">
            <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link href="/products?featured=true" className="hover:text-white transition-colors">Featured</Link></li>
            <li><Link href="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
          </ul>
        </section>
        <section>
          <p className="font-mono text-xs tracking-widest text-wood-400 mb-4">ACCOUNT</p>
          <ul className="space-y-2 font-body text-sm text-white/70">
            <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
            <li><Link href="/register" className="hover:text-white transition-colors">Register</Link></li>
            <li><Link href="/account" className="hover:text-white transition-colors">My Account</Link></li>
          </ul>
        </section>
      </section>
      <section className="border-t border-white/10 py-6 text-center font-mono text-xs text-white/40 tracking-wider">
        &copy; {new Date().getFullYear()} RUSTIK PLANK - LAB 12 MERN STACK
      </section>
    </footer>
  );
}
