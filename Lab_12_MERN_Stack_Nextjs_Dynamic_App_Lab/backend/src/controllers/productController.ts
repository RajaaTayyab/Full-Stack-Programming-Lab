import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product';
import Review from '../models/Review';
import { AuthRequest } from '../middleware/auth';

const resolveProductId = async (param: string) => {
  if (mongoose.Types.ObjectId.isValid(param)) {
    const byId = await Product.findById(param).select('_id');
    if (byId) return byId._id;
  }
  const bySlug = await Product.findOne({ slug: param }).select('_id');
  return bySlug?._id;
};

export const getProducts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 12;
  const skip = (page - 1) * limit;

  const filter: Record<string, unknown> = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.featured === 'true') filter.isFeatured = true;
  if (req.query.search) filter.$text = { $search: req.query.search as string };
  if (req.query.minPrice || req.query.maxPrice) {
    filter.price = {};
    if (req.query.minPrice) (filter.price as Record<string, number>).$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) (filter.price as Record<string, number>).$lte = Number(req.query.maxPrice);
  }

  const sortMap: Record<string, string> = {
    newest: '-createdAt',
    price_asc: 'price',
    price_desc: '-price',
    rating: '-rating',
  };
  const sort = sortMap[req.query.sort as string] || '-createdAt';

  const [products, total] = await Promise.all([
    Product.find(filter).populate('category', 'name slug').sort(sort).skip(skip).limit(limit),
    Product.countDocuments(filter),
  ]);

  res.json({ products, total, page, pages: Math.ceil(total / limit) });
};

export const getProduct = async (req: Request, res: Response) => {
  const product = await Product.findOne({ slug: req.params.slug, isActive: true }).populate('category');
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id).populate('category');
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const slug = req.body.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const product = await Product.create({ ...req.body, slug });
  res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
};

export const getProductReviews = async (req: Request, res: Response) => {
  const productId = await resolveProductId(req.params.param);
  if (!productId) return res.status(404).json({ message: 'Product not found' });
  const reviews = await Review.find({ product: productId }).populate('user', 'name avatar');
  res.json(reviews);
};

export const createReview = async (req: AuthRequest, res: Response) => {
  const productId = await resolveProductId(req.params.param);
  if (!productId) return res.status(404).json({ message: 'Product not found' });

  const { rating, title, body } = req.body;
  const existing = await Review.findOne({ product: productId, user: req.user?._id });
  if (existing) return res.status(400).json({ message: 'Already reviewed' });
  await Review.create({ product: productId, user: req.user?._id, rating, title, body });

  const reviews = await Review.find({ product: productId });
  const avg = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
  await Product.findByIdAndUpdate(productId, { rating: avg, numReviews: reviews.length });
  res.status(201).json({ message: 'Review added' });
};