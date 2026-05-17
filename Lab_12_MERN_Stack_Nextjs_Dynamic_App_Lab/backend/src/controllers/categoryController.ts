import { Request, Response } from 'express';
import Category from '../models/Category';

const slugify = (name: string) =>
  name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

export const getCategories = async (_req: Request, res: Response) => {
  const categories = await Category.find({ isActive: true }).sort({ name: 1 });
  res.json(categories);
};

export const createCategory = async (req: Request, res: Response) => {
  const slug = slugify(req.body.name);
  const category = await Category.create({ ...req.body, slug });
  res.status(201).json(category);
};

export const updateCategory = async (req: Request, res: Response) => {
  const updates = { ...req.body };
  if (updates.name) updates.slug = slugify(updates.name);
  const category = await Category.findByIdAndUpdate(req.params.id, updates, { new: true });
  if (!category) return res.status(404).json({ message: 'Category not found' });
  res.json(category);
};

export const deleteCategory = async (req: Request, res: Response) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: 'Category deleted' });
};
