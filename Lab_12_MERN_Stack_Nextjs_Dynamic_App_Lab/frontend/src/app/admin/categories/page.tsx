'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Category } from '@/types';
import toast from 'react-hot-toast';
import { FiTrash2 } from 'react-icons/fi';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', description: '' });

  const fetchCategories = () => {
    api.get('/categories').then((res) => setCategories(res.data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchCategories(); }, []);

  const createCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/categories', form);
      toast.success('Category created');
      setForm({ name: '', description: '' });
      fetchCategories();
    } catch {
      toast.error('Create failed');
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('Delete this category?')) return;
    try {
      await api.delete(`/categories/${id}`);
      toast.success('Category deleted');
      fetchCategories();
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <p className="font-mono text-wood-500 text-xs tracking-widest mb-1">MANAGEMENT</p>
        <h1 className="font-display text-3xl font-700 text-charcoal">Categories</h1>
      </div>

      <form onSubmit={createCategory} className="bg-white border border-wood-100 p-6 mb-8 grid md:grid-cols-3 gap-4">
        <input
          className="input-field"
          placeholder="Category name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="input-field"
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit" className="btn-primary">Add Category</button>
      </form>

      <div className="bg-white border border-wood-100">
        {loading ? (
          <div className="p-8 space-y-4">
            {[...Array(4)].map((_, i) => <div key={i} className="h-12 bg-wood-50 animate-pulse" />)}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-wood-100">
                {['Name', 'Slug', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-6 py-4 font-mono text-xs tracking-widest text-wood-500">{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-wood-50">
              {categories.map((cat) => (
                <tr key={cat._id} className="hover:bg-wood-50">
                  <td className="px-6 py-4 font-body font-500 text-charcoal">{cat.name}</td>
                  <td className="px-6 py-4 font-mono text-xs text-wood-500">{cat.slug}</td>
                  <td className="px-6 py-4">
                    <button type="button" onClick={() => deleteCategory(cat._id)} className="p-2 hover:text-red-600">
                      <FiTrash2 size={16} />
                    </button>
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


