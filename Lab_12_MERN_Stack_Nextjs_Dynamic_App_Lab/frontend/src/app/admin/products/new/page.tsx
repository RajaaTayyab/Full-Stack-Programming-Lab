'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Category } from '@/types';
import toast from 'react-hot-toast';

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', description: '', shortDescription: '',
    price: '', comparePrice: '', stock: '',
    sku: '', material: '', category: '',
    tags: '', isFeatured: false, isActive: true,
    images: [''],
  });

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data)).catch(() => {});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/products', {
        ...form,
        price: Number(form.price),
        comparePrice: form.comparePrice ? Number(form.comparePrice) : undefined,
        stock: Number(form.stock),
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        images: form.images.filter(Boolean),
      });
      toast.success('Product created!');
      router.push('/admin/products');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || 'Create failed');
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-8">
        <p className="font-mono text-wood-500 text-xs tracking-widest mb-1">INVENTORY</p>
        <h1 className="font-display text-3xl font-700 text-charcoal">Add New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-wood-100 p-6 space-y-5">
            <h2 className="font-display font-600 text-xl text-charcoal">Basic Info</h2>
            <div>
              <label className="font-mono text-xs text-wood-500 tracking-wider block mb-2">PRODUCT NAME *</label>
              <input name="name" value={form.name} onChange={handleChange} required className="input-field" placeholder="Rustic Oak Dining Table" />
            </div>
            <div>
              <label className="font-mono text-xs text-wood-500 tracking-wider block mb-2">SHORT DESCRIPTION</label>
              <input name="shortDescription" value={form.shortDescription} onChange={handleChange} className="input-field" placeholder="A brief summary..." />
            </div>
            <div>
              <label className="font-mono text-xs text-wood-500 tracking-wider block mb-2">FULL DESCRIPTION *</label>
              <textarea name="description" value={form.description} onChange={handleChange} required rows={5} className="input-field resize-none" placeholder="Detailed product description..." />
            </div>
          </div>

          <div className="bg-white border border-wood-100 p-6 space-y-5">
            <h2 className="font-display font-600 text-xl text-charcoal">Images</h2>
            {form.images.map((img, i) => (
              <input key={i} type="url" value={img}
                onChange={(e) => {
                  const imgs = [...form.images];
                  imgs[i] = e.target.value;
                  setForm({ ...form, images: imgs });
                }}
                className="input-field"
                placeholder={`Image URL ${i + 1}`} />
            ))}
            <button type="button" onClick={() => setForm({ ...form, images: [...form.images, ''] })}
              className="text-sm text-wood-600 font-body hover:text-wood-800">+ Add Image URL</button>
          </div>

          <div className="bg-white border border-wood-100 p-6 space-y-5">
            <h2 className="font-display font-600 text-xl text-charcoal">Pricing & Inventory</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-xs text-wood-500 tracking-wider block mb-2">PRICE (£) *</label>
                <input name="price" type="number" step="0.01" min="0" value={form.price} onChange={handleChange} required className="input-field" placeholder="299.99" />
              </div>
              <div>
                <label className="font-mono text-xs text-wood-500 tracking-wider block mb-2">COMPARE PRICE (£)</label>
                <input name="comparePrice" type="number" step="0.01" min="0" value={form.comparePrice} onChange={handleChange} className="input-field" placeholder="399.99" />
              </div>
              <div>
                <label className="font-mono text-xs text-wood-500 tracking-wider block mb-2">STOCK *</label>
                <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required className="input-field" placeholder="10" />
              </div>
              <div>
                <label className="font-mono text-xs text-wood-500 tracking-wider block mb-2">SKU *</label>
                <input name="sku" value={form.sku} onChange={handleChange} required className="input-field" placeholder="RP-001" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white border border-wood-100 p-6 space-y-5">
            <h2 className="font-display font-600 text-xl text-charcoal">Organisation</h2>
            <div>
              <label className="font-mono text-xs text-wood-500 tracking-wider block mb-2">CATEGORY *</label>
              <select name="category" value={form.category} onChange={handleChange} required className="input-field">
                <option value="">Select category</option>
                {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="font-mono text-xs text-wood-500 tracking-wider block mb-2">MATERIAL</label>
              <input name="material" value={form.material} onChange={handleChange} className="input-field" placeholder="Reclaimed Oak" />
            </div>
            <div>
              <label className="font-mono text-xs text-wood-500 tracking-wider block mb-2">TAGS (comma separated)</label>
              <input name="tags" value={form.tags} onChange={handleChange} className="input-field" placeholder="oak, handmade, dining" />
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="isFeatured" checked={form.isFeatured}
                  onChange={handleChange} className="accent-wood-600 w-4 h-4" />
                <span className="font-body text-sm">Featured Product</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="isActive" checked={form.isActive}
                  onChange={handleChange} className="accent-wood-600 w-4 h-4" />
                <span className="font-body text-sm">Active (visible to customers)</span>
              </label>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50 py-4">
            {loading ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
}