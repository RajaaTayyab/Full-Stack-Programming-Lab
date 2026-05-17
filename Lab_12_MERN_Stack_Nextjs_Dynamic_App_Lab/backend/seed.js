require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { v2: cloudinary } = require('cloudinary');

// ─── DATABASE CONNECTION ────────────────────────────────────────────────────

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is missing in .env');
  }

  await mongoose.connect(uri);

  console.log('✅ MongoDB Connected');
}

// ─── MONGOOSE SCHEMAS ───────────────────────────────────────────────────────

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    required: true,
    unique: true,
  },

  description: String,
});

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    description: String,

    shortDescription: String,

    price: {
      type: Number,
      required: true,
    },

    comparePrice: Number,

    images: [String],

    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },

    stock: {
      type: Number,
      default: 0,
    },

    sku: String,

    material: String,

    colors: [String],

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },

        name: String,

        price: Number,

        quantity: Number,
      },
    ],

    total: Number,
  },
  {
    timestamps: true,
  }
);

// ─── MODELS ─────────────────────────────────────────────────────────────────

const User =
  mongoose.models.User || mongoose.model('User', UserSchema);

const Category =
  mongoose.models.Category || mongoose.model('Category', CategorySchema);

const Product =
  mongoose.models.Product || mongoose.model('Product', ProductSchema);

const Order =
  mongoose.models.Order || mongoose.model('Order', OrderSchema);

// ─── CLOUDINARY ──────────────────────────────────────────────────────────────

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/** One-time upload sources (stored on Cloudinary; frontend only uses Cloudinary URLs). */
const SEED_ASSETS = [
  { folder: 'rustik-plank/products', id: 'oak-dining-table', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc' },
  { folder: 'rustik-plank/products', id: 'pine-coffee-table', url: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d' },
  { folder: 'rustik-plank/products', id: 'walnut-chair', url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c' },
  { folder: 'rustik-plank/products', id: 'oak-shelf', url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91' },
  { folder: 'rustik-plank/products', id: 'wooden-bed', url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85' },
  { folder: 'rustik-plank/categories', id: 'tables', url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36' },
  { folder: 'rustik-plank/categories', id: 'chairs', url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c' },
  { folder: 'rustik-plank/categories', id: 'shelves', url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91' },
  { folder: 'rustik-plank/categories', id: 'beds', url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85' },
  { folder: 'rustik-plank/categories', id: 'bookcases', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
  { folder: 'rustik-plank/categories', id: 'cabinets', url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2' },
  { folder: 'rustik-plank/marketing', id: 'hero-living', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc' },
  { folder: 'rustik-plank/marketing', id: 'hero-workshop', url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36' },
  { folder: 'rustik-plank/marketing', id: 'deal-reclaimed', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc' },
  { folder: 'rustik-plank/marketing', id: 'deal-elite', url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36' },
];

function buildCloudinaryUrl(publicId) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${publicId}`;
}

async function uploadSeedAssets() {
  const urls = {};
  const skipUpload = process.env.SKIP_CLOUDINARY_UPLOAD === 'true';

  for (const asset of SEED_ASSETS) {
    const key = `${asset.folder}/${asset.id}`;
    const publicId = `${asset.folder}/${asset.id}`;

    if (!skipUpload) {
      try {
        const result = await cloudinary.uploader.upload(asset.url, {
          folder: asset.folder,
          public_id: asset.id,
          overwrite: true,
          resource_type: 'image',
        });
        urls[key] = result.secure_url;
        console.log(`  📷 Uploaded ${key}`);
        continue;
      } catch (err) {
        const message = err?.message || err?.error?.message || String(err);
        console.warn(`  ⚠️ Upload failed for ${key}: ${message}`);
      }
    }

    urls[key] = buildCloudinaryUrl(publicId);
    console.log(`  🔗 Using Cloudinary URL for ${key}`);
  }

  return urls;
}

// ─── SEED FUNCTION ──────────────────────────────────────────────────────────

async function seedDatabase() {
  try {
    await connectDB();

    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      throw new Error('CLOUDINARY_CLOUD_NAME is missing in .env');
    }

    console.log('☁️ Uploading seed images to Cloudinary...');
    const imageUrls = await uploadSeedAssets();
    console.log('✅ Cloudinary assets ready');

    const PRODUCT_IMAGES = {
      diningTable: imageUrls['rustik-plank/products/oak-dining-table'],
      coffeeTable: imageUrls['rustik-plank/products/pine-coffee-table'],
      accentChair: imageUrls['rustik-plank/products/walnut-chair'],
      wallShelf: imageUrls['rustik-plank/products/oak-shelf'],
      bedFrame: imageUrls['rustik-plank/products/wooden-bed'],
    };

    const CATEGORY_IMAGES = {
      tables: imageUrls['rustik-plank/categories/tables'],
      chairs: imageUrls['rustik-plank/categories/chairs'],
      shelves: imageUrls['rustik-plank/categories/shelves'],
    };

    // ─── CLEAR DATABASE ────────────────────────────────────────────────────

    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Product.deleteMany({}),
      Order.deleteMany({}),
    ]);

    console.log('🗑️ Database Cleared');

    // ─── CREATE USERS ──────────────────────────────────────────────────────

    const hashedAdminPassword = await bcrypt.hash('admin123', 12);
    const hashedUserPassword = await bcrypt.hash('user1234', 12);

    const [adminUser, normalUser] = await User.create([
      {
        name: 'Admin',
        email: 'admin@rustikplank.com',
        password: hashedAdminPassword,
        role: 'admin',
      },

      {
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedUserPassword,
        role: 'user',
      },
    ]);

    console.log('✅ Users Seeded');

    // ─── CREATE CATEGORIES ────────────────────────────────────────────────

    const [tables, chairs, shelves] = await Category.create([
      {
        name: 'Tables',
        slug: 'tables',
        description: 'Premium wooden tables',
        image: CATEGORY_IMAGES.tables,
      },

      {
        name: 'Chairs',
        slug: 'chairs',
        description: 'Modern wooden chairs',
        image: CATEGORY_IMAGES.chairs,
      },

      {
        name: 'Shelves',
        slug: 'shelves',
        description: 'Wall mounted shelves',
        image: CATEGORY_IMAGES.shelves,
      },
    ]);

    console.log('✅ Categories Seeded');

    // ─── CREATE PRODUCTS ──────────────────────────────────────────────────

    const products = await Product.create([
      {
        name: 'Rustic Oak Dining Table',
        slug: 'rustic-oak-dining-table',
        description:
          'Handcrafted solid oak dining table with premium finish. Perfect centerpiece for modern rustic homes.',

        shortDescription: 'Premium solid oak dining table',

        price: 1299,

        comparePrice: 1599,

        category: tables._id,

        stock: 10,

        sku: 'RPT-001',

        material: 'Solid Oak',

        colors: ['Natural Oak', 'Walnut Brown'],

        isFeatured: true,

        images: [PRODUCT_IMAGES.diningTable],
      },

      {
        name: 'Modern Pine Coffee Table',
        slug: 'modern-pine-coffee-table',
        description:
          'Stylish reclaimed pine coffee table with minimalist design and strong build quality.',

        shortDescription: 'Minimalist pine coffee table',

        price: 499,

        comparePrice: 650,

        category: tables._id,

        stock: 18,

        sku: 'RPT-002',

        material: 'Reclaimed Pine',

        colors: ['Natural', 'Light Grey'],

        images: [PRODUCT_IMAGES.coffeeTable],
      },

      {
        name: 'Walnut Accent Chair',
        slug: 'walnut-accent-chair',
        description:
          'Mid-century inspired walnut accent chair with soft cushioning and ergonomic design.',

        shortDescription: 'Walnut modern chair',

        price: 399,

        comparePrice: 520,

        category: chairs._id,

        stock: 25,

        sku: 'RPT-003',

        material: 'Walnut Wood',

        colors: ['Cream', 'Dark Grey'],

        isFeatured: true,

        images: [PRODUCT_IMAGES.accentChair],
      },

      {
        name: 'Floating Oak Wall Shelf',
        slug: 'floating-oak-wall-shelf',
        description:
          'Minimal floating shelf crafted from solid oak. Perfect for modern interiors.',

        shortDescription: 'Wall mounted oak shelf',

        price: 149,

        category: shelves._id,

        stock: 30,

        sku: 'RPT-004',

        material: 'Oak Wood',

        colors: ['Natural'],

        images: [PRODUCT_IMAGES.wallShelf],
      },

      {
        name: 'Luxury Wooden Bed Frame',
        slug: 'luxury-wooden-bed-frame',
        description:
          'Premium handcrafted wooden bed frame designed for comfort and durability.',

        shortDescription: 'Luxury wood bed frame',

        price: 1899,

        comparePrice: 2200,

        category: tables._id,

        stock: 5,

        sku: 'RPT-005',

        material: 'Teak Wood',

        colors: ['Dark Walnut', 'Natural'],

        isFeatured: true,

        images: [PRODUCT_IMAGES.bedFrame],
      },
    ]);

    console.log('✅ Products Seeded');

    // ─── CREATE SAMPLE ORDER ──────────────────────────────────────────────

    await Order.create({
      user: normalUser._id,

      items: [
        {
          product: products[0]._id,
          name: products[0].name,
          price: products[0].price,
          quantity: 1,
        },
      ],

      total: products[0].price,
    });

    console.log('✅ Orders Seeded');

    console.log('\n🎉 DATABASE SEEDING COMPLETE');
    console.log('--------------------------------');
    console.log('Admin Login:');
    console.log('Email: admin@rustikplank.com');
    console.log('Password: admin123');

    await mongoose.disconnect();

    console.log('🔌 MongoDB Disconnected');
  } catch (error) {
    console.error('❌ Seed Error:', error);

    process.exit(1);
  }
}

// ─── RUN SEEDER ─────────────────────────────────────────────────────────────

seedDatabase();