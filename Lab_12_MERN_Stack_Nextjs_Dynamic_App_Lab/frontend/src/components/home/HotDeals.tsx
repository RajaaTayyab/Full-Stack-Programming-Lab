import Link from 'next/link';
import Image from 'next/image';
import { cloudinaryUrl, CLOUDINARY_IMAGES } from '@/lib/cloudinary';

export default function HotDeals() {
  return (
    <section className="py-16 bg-wood-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <p className="font-mono text-wood-500 text-xs tracking-widest mb-2">LIMITED TIME</p>
          <h2 className="section-title">Hot Deals</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Deal 1 */}
          <div className="relative overflow-hidden group h-80">
            <Image
              src={cloudinaryUrl(CLOUDINARY_IMAGES.marketing.dealReclaimed, { width: 800 })}
              alt="Reclaimed Collection"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-charcoal/50" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <span className="font-mono text-wood-300 text-xs tracking-widest mb-2">SALE</span>
              <h3 className="font-display text-white text-3xl font-700 mb-2">Reclaimed Collection</h3>
              <p className="font-display text-wood-400 text-4xl font-700 mb-4">50% OFF</p>
              <Link href="/products" className="inline-flex items-center gap-2 bg-wood-600 hover:bg-wood-500 text-white px-6 py-3 text-sm font-body font-500 transition-colors w-fit">
                Shop Now
              </Link>
            </div>
          </div>

          {/* Deal 2 */}
          <div className="relative overflow-hidden group h-80">
            <Image
              src={cloudinaryUrl(CLOUDINARY_IMAGES.marketing.dealElite, { width: 800 })}
              alt="Elite Collection"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-forest-900/50" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <span className="font-mono text-wood-300 text-xs tracking-widest mb-2">PREMIUM</span>
              <h3 className="font-display text-white text-3xl font-700 mb-2">Elite Collection</h3>
              <p className="font-display text-wood-400 text-4xl font-700 mb-4">35% OFF</p>
              <Link href="/products?featured=true" className="inline-flex items-center gap-2 bg-forest-600 hover:bg-forest-500 text-white px-6 py-3 text-sm font-body font-500 transition-colors w-fit">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}