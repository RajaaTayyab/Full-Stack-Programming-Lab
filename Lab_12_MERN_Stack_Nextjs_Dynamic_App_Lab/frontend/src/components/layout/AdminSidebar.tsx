'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MdOutlineDashboard, MdOutlineInventory2,
  MdOutlineCategory, MdOutlineShoppingBag,
} from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';

const links = [
  { href: '/admin', label: 'Dashboard', icon: MdOutlineDashboard },
  { href: '/admin/products', label: 'Products', icon: MdOutlineInventory2 },
  { href: '/admin/categories', label: 'Categories', icon: MdOutlineCategory },
  { href: '/admin/orders', label: 'Orders', icon: MdOutlineShoppingBag },
  { href: '/admin/users', label: 'Users', icon: FiUsers },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-charcoal min-h-screen shrink-0">
      <div className="p-6 border-b border-white/10">
        <p className="font-mono text-wood-400 text-xs tracking-widest">ADMIN PANEL</p>
        <h2 className="font-display text-white text-lg font-600 mt-1">Rustik Plank</h2>
      </div>
      <nav className="p-4 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/admin' && pathname.startsWith(href));
          return (
            <Link key={href} href={href}
              className={`flex items-center gap-3 px-4 py-3 transition-colors font-body text-sm ${active ? 'bg-wood-600 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}