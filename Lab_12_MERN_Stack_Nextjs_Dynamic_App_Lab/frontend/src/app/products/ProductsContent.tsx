'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Product } from '@/types';
import ProductCard from '@/components/products/ProductCard';

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const featured = searchParams.get('featured');
  const sort = searchParams.get('sort');
  const queryParams = [
    featured === 'true' ? 'featured=true' : '',
    sort ? `sort=${sort}` : '',
    'limit=24',
  ]
    .filter(Boolean)
    .join('&');

  useEffect(() => {
    setLoading(true);
    api
      .get(`/products?${queryParams}`)
      .then((res) => setProducts(res.data.products))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [queryParams]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="mb-12">
        <p className="font-mono text-wood-500 text-xs tracking-widest mb-2">COLLECTION</p>
        <h1 className="font-display text-4xl font-700 text-charcoal">All Products</h1>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse aspect-[4/3] bg-wood-100" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

