import { Router } from 'express';
import { getAllUsers, toggleWishlist } from '../controllers/userController';
import { protect } from '../middleware/auth';
import { adminOnly } from '../middleware/admin';

const router = Router();
router.get('/', protect, adminOnly, getAllUsers);
router.post('/wishlist/:productId', protect, toggleWishlist);
export default router;