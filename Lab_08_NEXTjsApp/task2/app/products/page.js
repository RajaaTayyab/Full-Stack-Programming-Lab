import products from '../../data/products';
import ProductList from '../../components/ProductList';
import { Sparkles, LayoutGrid, Banknote } from 'lucide-react';

export const metadata = {
  title: 'All Products – ShopNext',
};

export default function ProductsPage() {
  const conversionRate = 278;

  const localizedProducts = products.map(product => ({
    ...product,
    formattedPrice: `₨ ${(product.price * conversionRate).toLocaleString()}`
  }));

  return (
    <div className="min-h-screen bg-[#faf6f1] text-[#1c110a]">
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <p className="text-[#c9933a] uppercase tracking-[0.25em] text-xs font-bold">
              Our Collection
            </p>
          </div>

          <h1 className="text-6xl font-extrabold text-[#1c110a] mb-6 tracking-tight">
            All Products
          </h1>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-[#3d2b1f]/20"></div>
            <LayoutGrid size={20} className="text-[#3d2b1f]/40" />
            <div className="w-12 h-[1px] bg-[#3d2b1f]/20"></div>
          </div>

          <p className="text-[#3d2b1f]/70 text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            A hand-picked selection of premium tech and workspace essentials,
            designed for those who appreciate refined aesthetics.
          </p>


        </div>

        {/* Product Grid */}
        <div className="relative">
          {/* Ensure your ProductList component is updated to look for 'formattedPrice' */}
          <ProductList products={localizedProducts} />
        </div>
      </div>
    </div>
  );
}