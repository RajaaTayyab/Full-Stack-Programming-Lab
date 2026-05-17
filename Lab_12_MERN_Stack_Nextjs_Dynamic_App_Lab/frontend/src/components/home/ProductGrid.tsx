'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Product } from '@/types';
import ProductCard from '../products/ProductCard';
import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

interface Props {
  title: string;
  subtitle?: string;
  queryParams?: string;
  limit?: number;
}

export default function ProductGrid({ title, subtitle, queryParams = '', limit = 8 }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/products?limit=${limit}&${queryParams}`)
      .then((res) => setProducts(res.data.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [queryParams, limit]);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            {subtitle && <p className="font-mono text-wood-500 text-xs tracking-widest mb-2">{subtitle}</p>}
            <h2 className="section-title">{title}</h2>
          </div>
          <Link href={`/products?${queryParams}`}
            className="hidden md:flex items-center gap-2 text-sm font-body font-500 text-wood-600 hover:text-wood-800 transition-colors group">
            View All <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-wood-100" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-wood-100 w-1/3" />
                  <div className="h-5 bg-wood-100 w-3/4" />
                  <div className="h-6 bg-wood-100 w-1/4" />
                </div>
              </div>
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
    </section>
  );
}