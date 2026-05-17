'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiShoppingBag, FiHeart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/wishlist', label: 'Wishlist' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  if (pathname.startsWith('/admin')) return null;

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-wood-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-xl font-700 text-charcoal tracking-tight">
          Rustik <span className="text-wood-600">Plank</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-body font-500 transition-colors ${
                pathname === href ? 'text-wood-700' : 'text-wood-500 hover:text-charcoal'
              }`}
            >
              {label}
            </Link>
          ))}
          {user?.role === 'admin' && (
            <Link href="/admin" className="text-sm font-mono tracking-widest text-forest-600 hover:text-forest-700">
              ADMIN
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/wishlist" className="hidden md:block text-wood-600 hover:text-wood-800 transition-colors">
            <FiHeart size={20} />
          </Link>
          <Link href="/cart" className="relative text-wood-600 hover:text-wood-800 transition-colors">
            <FiShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-wood-600 text-white text-xs font-mono flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/account" className="text-sm font-body text-wood-600 hover:text-charcoal">
                {user.name.split(' ')[0]}
              </Link>
              <button type="button" onClick={logout} className="text-xs font-mono text-wood-400 hover:text-wood-700">
                LOGOUT
              </button>
            </div>
          ) : (
            <Link href="/login" className="hidden md:flex items-center gap-1 text-sm font-body text-wood-600 hover:text-charcoal">
              <FiUser size={18} /> Login
            </Link>
          )}
          <button
            type="button"
            className="md:hidden text-charcoal"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-wood-100 bg-cream px-4 py-4 space-y-3">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} className="block font-body text-charcoal py-2">
              {label}
            </Link>
          ))}
          <Link href="/cart" onClick={() => setOpen(false)} className="block font-body text-charcoal py-2">
            Cart ({totalItems})
          </Link>
          {user ? (
            <>
              <Link href="/account" onClick={() => setOpen(false)} className="block font-body text-charcoal py-2">
                Account
              </Link>
              <button type="button" onClick={() => { logout(); setOpen(false); }} className="block font-body text-wood-500 py-2">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)} className="block font-body text-charcoal py-2">
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}


