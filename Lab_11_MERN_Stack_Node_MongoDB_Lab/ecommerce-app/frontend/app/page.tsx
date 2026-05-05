"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <span className="text-xl font-semibold tracking-tight text-gray-900">MyShop</span>
        <div className="flex gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-gray-900 transition-colors">Home</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Products</a>
          <a href="#" className="hover:text-gray-900 transition-colors">About</a>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Products</h1>
          <p className="text-gray-400 mt-1 text-sm">Simple, quality items — nothing more.</p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-24">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-24">
            <p className="text-gray-400 text-sm">Could not load products. Make sure your backend is running.</p>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200"
              >
                {/* Product Image */}
                <div className="relative w-full h-48 bg-gray-100">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-base font-medium text-gray-900">{p.name}</h2>
                    <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">${p.price}</span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{p.description}</p>

                  <button className="mt-auto w-full py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200">
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-24">
            <p className="text-gray-400 text-sm">No products found. Try seeding your database.</p>
          </div>
        )}

      </main>

      <footer className="border-t border-gray-200 mt-16 py-6 text-center text-xs text-gray-400">
        © 2025 MyShop. Built with Next.js + MongoDB.
      </footer>

    </div>
  );
}