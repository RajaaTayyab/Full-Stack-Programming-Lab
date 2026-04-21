import Link from 'next/link';

// ProductList component — receives products as a prop and renders them
export default function ProductList({ products }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
        >
          {/* Coloured Banner */}
          <div className={`bg-gradient-to-br ${product.color} h-32 flex items-center justify-center`}>
            <span className="text-6xl">{product.emoji}</span>
          </div>

          {/* Info */}
          <div className="p-6">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{product.category}</span>
            <h3 className="text-lg font-bold text-slate-800 mt-1 mb-2">{product.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">{product.description}</p>

            {/* Price & Rating */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-slate-900">${product.price}</span>
              <span className="text-sm text-amber-500 font-semibold">★ {product.rating} ({product.reviews})</span>
            </div>

            {/* View Details Link */}
            <Link
              href={`/products/${product.id}`}
              className="block w-full text-center bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-amber-500 transition-colors duration-200"
            >
              View Details →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
