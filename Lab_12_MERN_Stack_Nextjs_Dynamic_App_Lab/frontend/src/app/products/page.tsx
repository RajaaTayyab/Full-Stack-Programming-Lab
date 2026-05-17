import { Suspense } from 'react';
import ProductsContent from './ProductsContent';

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-display text-wood-400">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
