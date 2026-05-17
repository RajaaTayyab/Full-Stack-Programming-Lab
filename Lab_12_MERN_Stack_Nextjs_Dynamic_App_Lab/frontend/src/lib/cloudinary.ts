const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? 'Tayyab';

export function cloudinaryUrl(
  publicId: string,
  options?: { width?: number; height?: number }
): string {
  const transforms = ['f_auto', 'q_auto'];
  if (options?.width) transforms.push(`w_${options.width}`);
  if (options?.height) transforms.push(`h_${options.height}`);
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms.join(',')}/${publicId}`;
}

/** Cloudinary public IDs under folder rustik-plank (populated by backend seed). */
export const CLOUDINARY_IMAGES = {
  products: {
    oakDiningTable: 'rustik-plank/products/oak-dining-table',
    pineCoffeeTable: 'rustik-plank/products/pine-coffee-table',
    walnutChair: 'rustik-plank/products/walnut-chair',
    oakShelf: 'rustik-plank/products/oak-shelf',
    woodenBed: 'rustik-plank/products/wooden-bed',
  },
  categories: {
    tables: 'rustik-plank/categories/tables',
    chairs: 'rustik-plank/categories/chairs',
    shelves: 'rustik-plank/categories/shelves',
    beds: 'rustik-plank/categories/beds',
    bookcases: 'rustik-plank/categories/bookcases',
    cabinets: 'rustik-plank/categories/cabinets',
  },
  marketing: {
    heroLiving: 'rustik-plank/marketing/hero-living',
    heroWorkshop: 'rustik-plank/marketing/hero-workshop',
    dealReclaimed: 'rustik-plank/marketing/deal-reclaimed',
    dealElite: 'rustik-plank/marketing/deal-elite',
  },
} as const;

export const productFallback = (width = 600) =>
  cloudinaryUrl(CLOUDINARY_IMAGES.products.oakDiningTable, { width });

export const categoryFallback = (slug: string, width = 600) => {
  const map: Record<string, string> = {
    chairs: CLOUDINARY_IMAGES.categories.chairs,
    tables: CLOUDINARY_IMAGES.categories.tables,
    shelves: CLOUDINARY_IMAGES.categories.shelves,
    beds: CLOUDINARY_IMAGES.categories.beds,
    bookcases: CLOUDINARY_IMAGES.categories.bookcases,
    cabinets: CLOUDINARY_IMAGES.categories.cabinets,
  };
  return cloudinaryUrl(map[slug] ?? CLOUDINARY_IMAGES.categories.chairs, { width });
};
