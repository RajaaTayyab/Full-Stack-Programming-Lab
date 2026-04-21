import './globals.css';
import Footer from '../components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'ShopNext – Task 2',
  description: 'Dynamic product listing with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-slate-50">
        {/* Header / Navbar */}
        <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-amber-400 hover:text-amber-300 transition-colors">
              🛍️ ShopNext
            </Link>
            <nav>
              <ul className="flex gap-8 list-none">
                <li>
                  <Link href="/" className="text-sm font-semibold uppercase tracking-widest text-slate-300 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-sm font-semibold uppercase tracking-widest text-slate-300 hover:text-white transition-colors">
                    Products
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer on all pages via layout.js */}
        <Footer />
      </body>
    </html>
  );
}
