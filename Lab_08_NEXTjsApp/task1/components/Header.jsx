'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-6">

        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-accent text-background font-bold px-2 py-1 rounded shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            TJ
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Tayyab <span className="text-accent">Janjua</span>
          </span>
        </Link>

        <nav>
          <ul className="flex items-center gap-2">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`px-4 py-2 text-sm font-medium transition-all rounded-lg ${isActive
                        ? 'text-accent bg-accent/10 border border-accent/20'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}