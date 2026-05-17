'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import api from '@/lib/api';
import { Product, Review } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { FiHeart, FiShoppingBag, FiStar, FiMinus, FiPlus } from 'react-icons/fi';
import { HiHeart } from 'react-icons/hi';
import toast from 'react-hot-toast';
import ProductCard from '@/components/products/ProductCard';
import { productFallback } from '@/lib/cloudinary';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [qty, setQty] = useState(1);
  const [selectedImg, setSelectedImg] = useState(0);
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: '', body: '' });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'shipping'>('description');

  useEffect(() => {
    api.get(`/products/${slug}`).then((res) => {
      setProduct(res.data);
      return api.get(`/products?category=${res.data.category._id}&limit=4`);
    }).then((res) => setRelated(res.data.products.filter((p: Product) => p.slug !== slug))).catch(() => {});
    api.get(`/products/${slug}/reviews`).then((res) => setReviews(res.data)).catch(() => {});
  }, [slug]);

  const submitReview = async () => {
    if (!user) { toast.error('Please login to review'); return; }
    setSubmittingReview(true);
    try {
      await api.post(`/products/${product?._id}/reviews`, reviewForm);
      toast.success('Review submitted!');
      const res = await api.get(`/products/${product?._id}/reviews`);
      setReviews(res.data);
      setReviewForm({ rating: 5, title: '', body: '' });
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || 'Failed to submit review');
    }
    setSubmittingReview(false);
  };

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-wood-400 font-display text-2xl">Loading...</div>
    </div>
  );

  const wishlisted = isWishlisted(product._id);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        {/* Images */}
        <div>
          <div className="relative aspect-square overflow-hidden bg-wood-50 mb-4">
            <Image
              src={product.images[selectedImg] || productFallback(800)}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.comparePrice && (
              <div className="absolute top-4 left-4 bg-wood-600 text-white text-sm font-mono px-3 py-1">
                SALE
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImg(i)}
                  className={`relative w-20 h-20 overflow-hidden border-2 transition-colors ${selectedImg === i ? 'border-wood-600' : 'border-transparent'}`}>
                  <Image src={img} alt={`${product.name} ${i}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="font-mono text-wood-500 text-xs tracking-widest mb-2">{product.category.name.toUpperCase()}</p>
          <h1 className="font-display text-4xl font-700 text-charcoal mb-4">{product.name}</h1>

          {/* Rating */}
          {product.numReviews > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1,2,3,4,5].map((s) => (
                  <FiStar key={s} size={16} className={s <= Math.round(product.rating) ? 'text-wood-500 fill-wood-500' : 'text-wood-200'} />
                ))}
              </div>
              <span className="text-sm font-mono text-wood-500">{product.rating.toFixed(1)} ({product.numReviews} reviews)</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-display text-4xl font-700 text-charcoal">£{product.price.toFixed(2)}</span>
            {product.comparePrice && (
              <span className="font-body text-xl text-wood-400 line-through">£{product.comparePrice.toFixed(2)}</span>
            )}
          </div>

          {product.shortDescription && (
            <p className="font-body text-wood-600 leading-relaxed mb-6">{product.shortDescription}</p>
          )}

          {/* Meta */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {product.material && (
              <div className="bg-wood-50 p-3">
                <div className="font-mono text-xs text-wood-500 tracking-wider mb-1">MATERIAL</div>
                <div className="font-body text-sm text-charcoal">{product.material}</div>
              </div>
            )}
            {product.sku && (
              <div className="bg-wood-50 p-3">
                <div className="font-mono text-xs text-wood-500 tracking-wider mb-1">SKU</div>
                <div className="font-body text-sm text-charcoal">{product.sku}</div>
              </div>
            )}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6">
            <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-400'}`} />
            <span className="font-mono text-xs tracking-wide text-wood-600">
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </span>
          </div>

          {/* Qty */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-wood-200">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-wood-50 transition-colors"><FiMinus size={14} /></button>
              <span className="w-12 text-center font-mono text-sm">{qty}</span>
              <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="p-3 hover:bg-wood-50 transition-colors"><FiPlus size={14} /></button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => addItem(product, qty)}
              disabled={product.stock === 0}
              className="flex-1 flex items-center justify-center gap-2 btn-primary disabled:opacity-50"
            >
              <FiShoppingBag size={18} /> Add to Cart
            </button>
            <button
              onClick={() => toggle(product._id)}
              className="w-14 border border-wood-200 flex items-center justify-center hover:border-wood-600 transition-colors"
            >
              {wishlisted ? <HiHeart size={20} className="text-wood-600" /> : <FiHeart size={20} />}
            </button>
          </div>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {product.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-wood-100">
        <div className="flex gap-0 border-b border-wood-100">
          {(['description', 'reviews', 'shipping'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-mono text-xs tracking-widest uppercase transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? 'border-wood-600 text-wood-700'
                  : 'border-transparent text-wood-400 hover:text-wood-600'
              }`}
            >
              {tab}
              {tab === 'reviews' && ` (${reviews.length})`}
            </button>
          ))}
        </div>

        <div className="py-8">
          {activeTab === 'description' && (
            <div className="max-w-2xl font-body text-wood-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: product.description }} />
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-2xl">
              {reviews.map((r) => (
                <div key={r._id} className="border-b border-wood-100 py-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-wood-200 flex items-center justify-center font-mono text-sm font-bold text-wood-700">
                        {r.user.name.charAt(0)}
                      </div>
                      <span className="font-body font-500 text-charcoal">{r.user.name}</span>
                    </div>
                    <div className="flex">
                      {[1,2,3,4,5].map((s) => (
                        <FiStar key={s} size={12} className={s <= r.rating ? 'text-wood-500 fill-wood-500' : 'text-wood-200'} />
                      ))}
                    </div>
                  </div>
                  <h4 className="font-display font-600 text-charcoal mb-1">{r.title}</h4>
                  <p className="text-sm font-body text-wood-600 leading-relaxed">{r.body}</p>
                </div>
              ))}

              {/* Review form */}
              {user && (
                <div className="mt-8 bg-wood-50 p-6">
                  <h4 className="font-display font-600 text-charcoal mb-4">Write a Review</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="font-mono text-xs text-wood-500 tracking-wider block mb-2">RATING</label>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map((s) => (
                          <button key={s} onClick={() => setReviewForm({ ...reviewForm, rating: s })}>
                            <FiStar size={20} className={s <= reviewForm.rating ? 'text-wood-500 fill-wood-500' : 'text-wood-300'} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Review title"
                      value={reviewForm.title}
                      onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                      className="input-field"
                    />
                    <textarea
                      placeholder="Share your experience..."
                      value={reviewForm.body}
                      onChange={(e) => setReviewForm({ ...reviewForm, body: e.target.value })}
                      rows={4}
                      className="input-field resize-none"
                    />
                    <button onClick={submitReview} disabled={submittingReview} className="btn-primary">
                      {submittingReview ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="max-w-2xl space-y-4 font-body text-wood-700">
              <div className="bg-wood-50 p-4">
                <h4 className="font-display font-600 text-charcoal mb-2">Free Delivery Over £200</h4>
                <p className="text-sm leading-relaxed">Standard delivery 3-5 business days. Express options available at checkout.</p>
              </div>
              <div className="bg-wood-50 p-4">
                <h4 className="font-display font-600 text-charcoal mb-2">30-Day Returns</h4>
                <p className="text-sm leading-relaxed">Not satisfied? Return within 30 days for a full refund. Items must be in original condition.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-16 pt-12 border-t border-wood-100">
          <h2 className="section-title mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.slice(0, 4).map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}