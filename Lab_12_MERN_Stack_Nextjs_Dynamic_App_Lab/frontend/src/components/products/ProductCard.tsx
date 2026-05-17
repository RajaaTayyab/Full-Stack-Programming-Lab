'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { FiHeart, FiShoppingBag, FiStar } from 'react-icons/fi';
import { HiHeart } from 'react-icons/hi';
import { productFallback } from '@/lib/cloudinary';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product._id);
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white card-hover overflow-hidden">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-wood-50">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.images[0] || productFallback(600)}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {discount > 0 && (
            <span className="bg-wood-600 text-white text-xs font-mono px-2 py-0.5">
              -{discount}%
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-forest-600 text-white text-xs font-mono px-2 py-0.5">
              Featured
            </span>
          )}
          {product.stock === 0 && (
            <span className="bg-charcoal text-cream text-xs font-mono px-2 py-0.5">
              Sold Out
            </span>
          )}
        </div>

        {/* Actions overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => toggle(product._id)}
            className="w-8 h-8 bg-cream flex items-center justify-center hover:bg-wood-600 hover:text-white transition-colors shadow-sm"
          >
            {wishlisted ? <HiHeart size={16} className="text-wood-600 group-hover:text-white" /> : <FiHeart size={16} />}
          </button>
        </div>

        {/* Add to cart */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={() => addItem(product)}
            disabled={product.stock === 0}
            className="w-full bg-charcoal text-cream py-3 text-sm font-body font-500 tracking-wide
                       hover:bg-wood-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
          >
            <FiShoppingBag size={15} />
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        {product.category && (
          <Link href={`/categories/${product.category.slug}`}
            className="text-xs font-mono text-wood-500 tracking-widest hover:text-wood-700 transition-colors">
            {product.category.name.toUpperCase()}
          </Link>
        )}
        <h3 className="font-display font-500 text-charcoal mt-1 mb-2 text-lg leading-tight">
          <Link href={`/products/${product.slug}`} className="hover:text-wood-700 transition-colors">
            {product.name}
          </Link>
        </h3>

        {/* Rating */}
        {product.numReviews > 0 && (
          <div className="flex items-center gap-1 mb-2">
            {[1,2,3,4,5].map((s) => (
              <FiStar key={s} size={12} className={s <= Math.round(product.rating) ? 'text-wood-500 fill-wood-500' : 'text-wood-200'} />
            ))}
            <span className="text-xs text-wood-500 font-mono ml-1">({product.numReviews})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-display font-600 text-xl text-charcoal">£{product.price.toFixed(2)}</span>
          {product.comparePrice && (
            <span className="text-sm text-wood-400 line-through font-body">£{product.comparePrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
}