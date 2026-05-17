'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Category } from '@/types';
import { FiArrowRight } from 'react-icons/fi';
import { categoryFallback } from '@/lib/cloudinary';

export default function FeaturedCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data.slice(0, 5))).catch(() => {});
  }, []);

  const defaultCats = [
    { _id: '1', name: 'Chairs', slug: 'chairs', image: categoryFallback('chairs') },
    { _id: '2', name: 'Tables', slug: 'tables', image: categoryFallback('tables') },
    { _id: '3', name: 'Beds', slug: 'beds', image: categoryFallback('beds') },
    { _id: '4', name: 'Bookcases', slug: 'bookcases', image: categoryFallback('bookcases') },
    { _id: '5', name: 'Cabinets', slug: 'cabinets', image: categoryFallback('cabinets') },
  ];

  const items = categories.length > 0 ? categories : defaultCats;

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-mono text-wood-500 text-xs tracking-widest mb-2">BROWSE BY</p>
            <h2 className="section-title">Collections</h2>
          </div>
          <Link href="/products" className="hidden md:flex items-center gap-2 text-sm font-body font-500 text-wood-600 hover:text-wood-800 transition-colors group">
            View All <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {items.map((cat, i) => (
            <Link key={cat._id} href={`/categories/${cat.slug}`}
              className="group relative aspect-[3/4] overflow-hidden bg-wood-100"
              style={{ animationDelay: `${i * 0.1}s` }}>
              <Image
                src={cat.image || categoryFallback(cat.slug)}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-display text-white font-600 text-lg leading-tight">{cat.name}</h3>
                <div className="flex items-center gap-1 text-wood-300 text-xs font-mono mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <FiArrowRight size={10} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}