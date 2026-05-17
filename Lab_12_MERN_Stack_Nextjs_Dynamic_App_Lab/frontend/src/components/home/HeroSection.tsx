'use client';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { cloudinaryUrl, CLOUDINARY_IMAGES } from '@/lib/cloudinary';

const slides = [
  {
    tagline: 'Reclaimed & Hand Crafted',
    title: 'Where Wood\nTells Stories',
    sub: 'Furniture built to last generations, crafted with purpose from sustainably sourced timber.',
    cta: 'Explore Collection',
    href: '/products',
    bg: 'from-wood-900/80 via-wood-800/60 to-transparent',
    img: cloudinaryUrl(CLOUDINARY_IMAGES.marketing.heroLiving, { width: 1600 }),
  },
  {
    tagline: 'Elite Collection',
    title: 'Refined Design,\nTimeless Craft',
    sub: 'Each piece is a statement. Explore our premium handcrafted furniture for refined interiors.',
    cta: 'Shop Featured',
    href: '/products?featured=true',
    bg: 'from-forest-900/80 via-forest-800/60 to-transparent',
    img: cloudinaryUrl(CLOUDINARY_IMAGES.marketing.heroWorkshop, { width: 1600 }),
  },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[active];

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Background */}
      <div
        key={active}
        className="absolute inset-0 animate-fade-in"
        style={{
          backgroundImage: `url(${slide.img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg}`} />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
          <div className="max-w-2xl animate-fade-up">
            <p className="font-mono text-wood-300 text-xs tracking-[0.3em] mb-4 uppercase">
              {slide.tagline}
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-700 text-white leading-[1.05] mb-6 whitespace-pre-line">
              {slide.title}
            </h1>
            <p className="font-body text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
              {slide.sub}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={slide.href}
                className="flex items-center gap-2 bg-wood-600 hover:bg-wood-500 text-white px-8 py-4 font-body font-500 tracking-wide transition-all duration-200 group">
                {slide.cta}
                <FiArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/products"
                className="flex items-center gap-2 border border-white/40 hover:border-white text-white px-8 py-4 font-body font-500 tracking-wide transition-all duration-200 backdrop-blur-sm">
                View All
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-0.5 transition-all duration-300 ${i === active ? 'w-8 bg-wood-400' : 'w-4 bg-white/30'}`}
          />
        ))}
      </div>

      {/* Stats strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-cream/90 backdrop-blur-sm border-t border-wood-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-3 divide-x divide-wood-100">
            {[
              { value: '2,400+', label: 'Pieces Crafted' },
              { value: '15 Yrs', label: 'Expert Craftsmanship' },
              { value: '100%', label: 'Sustainable Wood' },
            ].map((stat) => (
              <div key={stat.label} className="py-4 text-center">
                <div className="font-display font-700 text-wood-700 text-xl">{stat.value}</div>
                <div className="font-mono text-xs text-wood-500 tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}