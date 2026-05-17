import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';

export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role === 'admin') return next();
  res.status(403).json({ message: 'Admin access required' });
};