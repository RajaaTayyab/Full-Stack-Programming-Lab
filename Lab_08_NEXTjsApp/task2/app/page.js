import { getProductById } from '../../../data/products';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Generate metadata dynamically for each product
export function generateMetadata({ params }) {
  const product = getProductById(params.id);
  if (!product) return { title: 'Product Not Found' };
  return { title: `${product.title} – ShopNext` };
}

export default function ProductDetailPage({ params }) {
  // params.id comes from the folder name [id]
  const product = getProductById(params.id);

  // If product not found, show Next.js 404 page
  if (!product) return notFound();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      {/* Back Link */}
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-10 text-sm font-semibold"
      >
        ← Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-12 items-start">

        {/* Product Visual Card */}
        <div className={`bg-gradient-to-br ${product.color} rounded-3xl h-72 flex items-center justify-center shadow-xl`}>
          <span className="text-9xl">{product.emoji}</span>
        </div>

        {/* Product Info */}
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500 bg-amber-50 px-3 py-1 rounded-full">
            {product.category}
          </span>

          <h1 className="text-4xl font-bold text-slate-900 mt-4 mb-3">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-amber-400 text-lg">{'★'.repeat(Math.round(product.rating))}</span>
            <span className="text-slate-500 text-sm">{product.rating} · {product.reviews.toLocaleString()} reviews</span>
          </div>

          <p className="text-slate-600 leading-relaxed text-lg mb-6">{product.description}</p>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-8">
            <span className="text-4xl font-bold text-slate-900">${product.price}</span>
            <span className="text-slate-400 text-sm">USD · Free shipping</span>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 flex-wrap mb-10">
            <button className="bg-slate-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-amber-400 hover:text-slate-900 transition-all duration-200 flex-1">
              Add to Cart 🛒
            </button>
            <button className="border-2 border-slate-200 text-slate-700 font-bold px-6 py-4 rounded-xl hover:border-slate-400 transition-colors">
              ♡ Wishlist
            </button>
          </div>

          {/* Features */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="font-bold text-slate-700 mb-4 text-sm uppercase tracking-wide">Key Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-slate-600 text-sm">
                  <span className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation to other products */}
      <div className="mt-16 text-center">
        <p className="text-slate-400 mb-4">Explore more products</p>
        <Link
          href="/products"
          className="inline-block bg-amber-400 text-slate-900 font-bold px-10 py-4 rounded-full hover:bg-amber-300 transition-colors"
        >
          View All Products →
        </Link>
      </div>
    </div>
  );
}
