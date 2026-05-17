'use client';
import { useEffect, useState } from 'react';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Product } from '@/types';
import ProductCard from '@/components/products/ProductCard';
import Link from 'next/link';
import { FiHeart } from 'react-icons/fi';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    if (wishlist.length === 0) { setProducts([]); setLoading(false); return; }
    Promise.all(wishlist.map((id) => api.get(`/products/id/${id}`).catch(() => null)))
      .then((results) => {
        setProducts(results.filter(Boolean).map((r) => r!.data));
      })
      .finally(() => setLoading(false));
  }, [wishlist, user]);

  if (!user) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <FiHeart size={48} className="text-wood-300 mb-4" />
      <h2 className="font-display text-2xl text-charcoal mb-2">Sign in to view wishlist</h2>
      <Link href="/login" className="btn-primary mt-4">Sign In</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <h1 className="section-title mb-10">My Wishlist</h1>
      {products.length === 0 ? (
        <div className="text-center py-20">
          <FiHeart size={48} className="text-wood-300 mx-auto mb-4" />
          <p className="font-display text-2xl text-wood-400 mb-2">No saved items yet</p>
          <Link href="/products" className="btn-primary mt-4">Discover Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
}