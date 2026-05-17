'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import api from '@/lib/api';
import { Product } from '@/types';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { productFallback } from '@/lib/cloudinary';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    api.get('/products?limit=50&all=true').then((res) => setProducts(res.data.products)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted');
      fetchProducts();
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <p className="font-mono text-wood-500 text-xs tracking-widest mb-1">INVENTORY</p>
          <h1 className="font-display text-3xl font-700 text-charcoal">Products</h1>
        </div>
        <Link href="/admin/products/new" className="flex items-center gap-2 btn-primary">
          <FiPlus size={16} /> Add Product
        </Link>
      </div>

      <div className="bg-white border border-wood-100">
        {loading ? (
          <div className="p-8 space-y-4">{[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-wood-50 animate-pulse" />)}</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-wood-100">
                {['Product', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-6 py-4 font-mono text-xs tracking-widest text-wood-500">{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-wood-50">
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-wood-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 shrink-0 overflow-hidden bg-wood-100">
                        <Image src={p.images[0] || productFallback(100)} alt={p.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-body font-500 text-charcoal">{p.name}</p>
                        <p className="font-mono text-xs text-wood-400">{p.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-wood-600">{p.category?.name}</td>
                  <td className="px-6 py-4 font-display font-700 text-charcoal">£{p.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`font-mono text-xs ${p.stock === 0 ? 'text-red-600' : p.stock < 10 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-mono rounded-full ${p.isActive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {p.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link href={`/admin/products/${p._id}/edit`} className="p-2 hover:text-wood-700 transition-colors">
                        <FiEdit2 size={16} />
                      </Link>
                      <button onClick={() => deleteProduct(p._id)} className="p-2 hover:text-red-600 transition-colors">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}