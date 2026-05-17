import { Request, Response } from 'express';
import Order from '../models/Order';
import Product from '../models/Product';
import { AuthRequest } from '../middleware/auth';

export const createOrder = async (req: AuthRequest, res: Response) => {
  const { items, shippingAddress, paymentMethod, notes } = req.body;

  // Verify stock and prices
  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product || product.stock < item.quantity)
      return res.status(400).json({ message: `Insufficient stock for ${item.name}` });
  }

  const subtotal = items.reduce((a: number, i: { price: number; quantity: number }) => a + i.price * i.quantity, 0);
  const shippingCost = subtotal > 200 ? 0 : 15;
  const tax = subtotal * 0.1;
  const total = subtotal + shippingCost + tax;

  const order = await Order.create({
    user: req.user?._id,
    items,
    shippingAddress,
    paymentMethod,
    subtotal,
    shippingCost,
    tax,
    total,
    notes,
  });

  // Reduce stock
  for (const item of items) {
    await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
  }

  res.status(201).json(order);
};

export const getMyOrders = async (req: AuthRequest, res: Response) => {
  const orders = await Order.find({ user: req.user?._id }).sort({ createdAt: -1 });
  res.json(orders);
};

export const getOrder = async (req: AuthRequest, res: Response) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) return res.status(404).json({ message: 'Order not found' });
  if (order.user._id.toString() !== req.user?._id.toString() && req.user?.role !== 'admin')
    return res.status(403).json({ message: 'Not authorized' });
  res.json(order);
};

export const getAllOrders = async (_req: Request, res: Response) => {
  const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json(orders);
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(order);
};

export const getDashboardStats = async (_req: Request, res: Response) => {
  const [totalOrders, totalRevenue, pendingOrders, totalProducts] = await Promise.all([
    Order.countDocuments(),
    Order.aggregate([{ $group: { _id: null, total: { $sum: '$total' } } }]),
    Order.countDocuments({ status: 'pending' }),
    Product.countDocuments({ isActive: true }),
  ]);

  const recentOrders = await Order.find().populate('user', 'name').sort({ createdAt: -1 }).limit(5);

  res.json({
    totalOrders,
    totalRevenue: totalRevenue[0]?.total || 0,
    pendingOrders,
    totalProducts,
    recentOrders,
  });
};