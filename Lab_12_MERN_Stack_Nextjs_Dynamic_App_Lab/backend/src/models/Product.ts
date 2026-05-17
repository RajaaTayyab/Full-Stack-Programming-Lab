import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: mongoose.Types.ObjectId;
  tags: string[];
  stock: number;
  sku: string;
  dimensions?: { width: number; height: number; depth: number; unit: string };
  weight?: number;
  material?: string;
  colors?: string[];
  isFeatured: boolean;
  isActive: boolean;
  rating: number;
  numReviews: number;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: String,
    price: { type: Number, required: true, min: 0 },
    comparePrice: Number,
    images: [String],
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    tags: [String],
    stock: { type: Number, default: 0, min: 0 },
    sku: { type: String, unique: true },
    dimensions: {
      width: Number,
      height: Number,
      depth: Number,
      unit: { type: String, default: 'cm' },
    },
    weight: Number,
    material: String,
    colors: [String],
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

productSchema.index({ name: 'text', description: 'text', tags: 'text' });

export default mongoose.model<IProduct>('Product', productSchema);