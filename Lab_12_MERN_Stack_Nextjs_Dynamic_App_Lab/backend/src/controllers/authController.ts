import { Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

const signToken = (id: string) =>
  jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  } as SignOptions);

const toPublicUser = (user: InstanceType<typeof User>) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
  phone: user.phone,
  addresses: user.addresses,
  wishlist: user.wishlist,
});

export const register = async (req: AuthRequest, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already registered' });

  const user = await User.create({ name, email, password });
  res.status(201).json({ token: signToken(user._id.toString()), user: toPublicUser(user) });
};

export const login = async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.json({ token: signToken(user._id.toString()), user: toPublicUser(user) });
};

export const getMe = async (req: AuthRequest, res: Response) => {
  res.json(req.user);
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  const user = await User.findByIdAndUpdate(req.user?._id, req.body, { new: true }).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

export const changePassword = async (req: AuthRequest, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user?._id);
  if (!user || !(await user.comparePassword(currentPassword))) {
    return res.status(400).json({ message: 'Current password is incorrect' });
  }
  user.password = newPassword;
  await user.save();
  res.json({ message: 'Password updated' });
};
