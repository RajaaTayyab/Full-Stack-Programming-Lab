import HeroSection from '@/components/home/HeroSection';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import ProductGrid from '@/components/home/ProductGrid';
import HotDeals from '@/components/home/HotDeals';
import BannerStrip from '@/components/home/BannerStrip';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <ProductGrid title="Featured Pieces" subtitle="HANDPICKED" queryParams="featured=true" limit={8} />
      <HotDeals />
      <BannerStrip />
      <ProductGrid title="Latest Arrivals" subtitle="JUST IN" queryParams="sort=newest" limit={8} />
    </>
  );
}