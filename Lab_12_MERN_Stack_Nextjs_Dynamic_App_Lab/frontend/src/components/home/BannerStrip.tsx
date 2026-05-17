import Link from 'next/link';

export default function BannerStrip() {
  return (
    <section className="bg-wood-700 text-cream py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-mono text-wood-300 text-xs tracking-widest mb-1">NOW AVAILABLE</p>
            <h3 className="font-display text-2xl md:text-3xl font-600">Buy Online, Pick Up In Store</h3>
            <p className="text-white/60 text-sm mt-1 font-body">Available on select products. Learn more →</p>
          </div>
          <div className="flex gap-4">
            <Link href="/products" className="bg-wood-500 hover:bg-wood-400 text-white px-6 py-3 text-sm font-body font-500 transition-colors">
              Shop Now
            </Link>
            <Link href="/products" className="border border-white/30 hover:border-white text-white px-6 py-3 text-sm font-body font-500 transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}