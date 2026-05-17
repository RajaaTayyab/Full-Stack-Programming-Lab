import { Router } from 'express';
import {
  createOrder, getMyOrders, getOrder,
  getAllOrders, updateOrderStatus, getDashboardStats,
} from '../controllers/orderController';
import { protect } from '../middleware/auth';
import { adminOnly } from '../middleware/admin';

const router = Router();
router.post('/', protect, createOrder);
router.get('/my', protect, getMyOrders);
router.get('/admin/all', protect, adminOnly, getAllOrders);
router.get('/admin/stats', protect, adminOnly, getDashboardStats);
router.get('/:id', protect, getOrder);
router.put('/:id', protect, adminOnly, updateOrderStatus);
export default router;