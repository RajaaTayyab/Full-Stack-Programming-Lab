'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import { Product, Category } from '@/types';
import ProductCard from '@/components/products/ProductCard';

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/categories')
      .then((res) => {
        const cat = res.data.find((c: Category) => c.slug === slug);
        if (cat) {
          setCategory(cat);
          return api.get(`/products?category=${cat._id}&limit=24`);
        }
      })
      .then((res) => { if (res) setProducts(res.data.products); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="mb-12">
        <p className="font-mono text-wood-500 text-xs tracking-widest mb-2">COLLECTION</p>
        <h1 className="section-title">{category?.name || 'Products'}</h1>
        {category?.description && <p className="text-wood-600 font-body mt-2 max-w-xl">{category.description}</p>}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => <div key={i} className="aspect-[4/3] bg-wood-100 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
}