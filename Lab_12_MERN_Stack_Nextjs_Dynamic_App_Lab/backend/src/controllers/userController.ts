import { Request, Response } from 'express';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
};

export const toggleWishlist = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user?._id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const productId = req.params.productId;
  const idx = user.wishlist.findIndex((id) => id.toString() === productId);
  if (idx > -1) user.wishlist.splice(idx, 1);
  else user.wishlist.push(productId as unknown as import('mongoose').Types.ObjectId);
  await user.save();
  res.json({ wishlist: user.wishlist });
};