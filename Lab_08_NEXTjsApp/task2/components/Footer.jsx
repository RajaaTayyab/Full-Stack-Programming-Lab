import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-white font-bold text-xl">🛍️ ShopNext</p>
          <p className="text-sm mt-1 text-slate-500">Premium products, modern experience.</p>
        </div>
        <nav>
          <ul className="flex gap-6 list-none">
            <li><Link href="/" className="hover:text-white transition-colors text-sm">Home</Link></li>
            <li><Link href="/products" className="hover:text-white transition-colors text-sm">Products</Link></li>
          </ul>
        </nav>
        <p className="text-xs text-slate-600">© {new Date().getFullYear()} ShopNext. All rights reserved.</p>
      </div>
    </footer>
  );
}
