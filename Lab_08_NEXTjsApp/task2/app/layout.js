import './globals.css';
import Footer from '../components/Footer';
import Link from 'next/link';
import { ShoppingBag, Search, User } from 'lucide-react';

export const metadata = {
  title: 'ShopNext | Curated by Tayyab Janjua',
  description: 'Premium tech and workspace essentials for the refined professional.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-[#faf6f1] text-[#1c110a] antialiased selection:bg-[#c9933a]/20">

        {/* Header - Glass Effect with Deep Mocha #3d2b1f */}
        <header className="bg-[#3d2b1f]/95 backdrop-blur-md text-[#faf6f1] sticky top-0 z-50 shadow-[0_8px_32px_rgba(28,17,10,0.12)] border-b border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">

            {/* Branding */}
            <Link href="/" className="text-xl font-bold tracking-tight flex items-center gap-3 group">
              <div className="bg-[#c9933a] p-2 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#c9933a]/20">
                <ShoppingBag size={20} className="text-[#3d2b1f]" />
              </div>
              <span className="leading-none">
                Shop<span className="text-[#c9933a]">Next</span>
                <span className="block text-[10px] uppercase tracking-[0.3em] font-black opacity-60 mt-1">
                  by Tayyab Janjua
                </span>
              </span>
            </Link>

            {/* Navigation & Actions */}
            <div className="flex items-center gap-10">
              <nav className="hidden md:block">
                <ul className="flex gap-8 list-none">
                  <li>
                    <Link href="/" className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#faf6f1]/60 hover:text-[#c9933a] transition-all">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/products" className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#faf6f1]/60 hover:text-[#c9933a] transition-all">
                      Products
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Utility Icons for a Pro Look */}
              <div className="flex items-center gap-5 pl-8 border-l border-white/10 text-[#faf6f1]/60">
                <button className="hover:text-[#c9933a] transition-colors"><Search size={18} /></button>
                <button className="hover:text-[#c9933a] transition-colors"><User size={18} /></button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 relative">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}