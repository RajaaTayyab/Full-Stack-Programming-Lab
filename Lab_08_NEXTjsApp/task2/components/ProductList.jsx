import Link from 'next/link';

export default function ProductList({ products }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-[2rem] shadow-sm border border-[#e5e0da] overflow-hidden hover:shadow-2xl hover:shadow-[#c9933a]/10 transition-all duration-500 hover:-translate-y-2 group"
        >
          <div className={`bg-gradient-to-br ${product.color} h-40 flex items-center justify-center relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
            <span className="text-7xl group-hover:scale-110 transition-transform duration-500 z-10">{product.emoji}</span>
          </div>

          {/* Info */}
          <div className="p-8">
            <span className="text-[10px] font-black text-[#c9933a] uppercase tracking-[0.2em]">{product.category}</span>
            <h3 className="text-xl font-black text-[#1c110a] mt-2 mb-3 tracking-tight">{product.title}</h3>
            <p className="text-[#3d2b1f]/60 text-sm leading-relaxed mb-6 line-clamp-2 font-medium">{product.description}</p>

            {/* Price & Rating */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#3d2b1f]/40 uppercase tracking-widest">Price</span>
                <span className="text-2xl font-black text-[#1c110a]">
                  Rs. {product.price.toLocaleString()}
                </span>
              </div>
              <div className="text-right">
                <span className="block text-amber-500 font-black text-sm"> {product.rating}</span>
                <span className="text-[10px] text-[#3d2b1f]/40 font-bold uppercase">{product.reviews} Reviews</span>
              </div>
            </div>

            {/* View Details Link */}
            <Link
              href={`/products/${product.id}`}
              className="block w-full text-center bg-[#1c110a] text-[#faf6f1] py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#c9933a] hover:text-[#1c110a] transition-all duration-300 shadow-lg shadow-[#1c110a]/10"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}