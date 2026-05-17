import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  getProducts,
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductReviews,
  createReview,
} from '../controllers/productController';
import { protect } from '../middleware/auth';
import { adminOnly } from '../middleware/admin';

const router = Router();

router.get('/', asyncHandler(getProducts as Parameters<typeof asyncHandler>[0]));
router.get('/id/:id', asyncHandler(getProductById as Parameters<typeof asyncHandler>[0]));
router.get('/:param/reviews', asyncHandler(getProductReviews as Parameters<typeof asyncHandler>[0]));
router.post('/:param/reviews', protect, asyncHandler(createReview as Parameters<typeof asyncHandler>[0]));
router.get('/:slug', asyncHandler(getProduct as Parameters<typeof asyncHandler>[0]));
router.post('/', protect, adminOnly, asyncHandler(createProduct as Parameters<typeof asyncHandler>[0]));
router.put('/:id', protect, adminOnly, asyncHandler(updateProduct as Parameters<typeof asyncHandler>[0]));
router.delete('/:id', protect, adminOnly, asyncHandler(deleteProduct as Parameters<typeof asyncHandler>[0]));

export default router;
