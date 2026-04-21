import Link from 'next/link';
import { ArrowRight, Truck, ShieldCheck, RefreshCcw, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-[#faf6f1]">
      {/* Hero Section */}
      <section className="relative bg-[#3d2b1f] text-[#faf6f1] py-32 px-6 overflow-hidden">
        {/* Subtle Decorative Gradient */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_#c9933a20,_transparent)] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <p className="text-[#c9933a] uppercase tracking-[0.4em] text-xs font-black">
              Tayyab Janjua 231736
            </p>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter text-[#faf6f1]">
            Shop<span className="text-[#c9933a]">Next</span>
          </h1>

          <p className="text-[#faf6f1]/70 text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            Elevate your workspace with a hand-picked selection of premium tech and lifestyle essentials.
          </p>

          <Link
            href="/products"
            className="group inline-flex items-center gap-3 bg-[#c9933a] text-[#3d2b1f] font-black px-12 py-5 rounded-2xl hover:bg-[#faf6f1] transition-all duration-500 text-lg shadow-xl shadow-[#c9933a]/20"
          >
            Explore Collection
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Philosophy / Why Us */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl font-black text-[#1c110a] mb-4 tracking-tight">The ShopNext Standard</h2>
          <div className="w-12 h-1 bg-[#c9933a] rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <Truck className="text-[#c9933a]" size={32} />,
              title: 'Express Delivery',
              desc: 'Premium logistics network ensuring your items arrive within 48 hours across Pakistan.'
            },
            {
              icon: <ShieldCheck className="text-[#c9933a]" size={32} />,
              title: 'Curated Quality',
              desc: 'Every item is personally vetted for build quality, aesthetic value, and long-term durability.'
            },
            {
              icon: <RefreshCcw className="text-[#c9933a]" size={32} />,
              title: 'Seamless Returns',
              desc: 'A sophisticated, no-questions-asked 30-day return policy for ultimate peace of mind.'
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white rounded-[2rem] p-10 border border-[#e5e0da] hover:border-[#c9933a] transition-all duration-500 group shadow-sm">
              <div className="mb-6 p-4 bg-[#faf6f1] w-fit rounded-2xl group-hover:scale-110 transition-transform">
                {icon}
              </div>
              <h3 className="text-xl font-black text-[#1c110a] mb-3 uppercase tracking-tight">{title}</h3>
              <p className="text-[#3d2b1f]/60 leading-relaxed font-medium">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="bg-[#3d2b1f] rounded-[3rem] p-16 text-center relative overflow-hidden">
          {/* Subtle background text */}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-black text-white/[0.03] pointer-events-none select-none">
            NEXT
          </span>

          <h2 className="text-4xl font-black text-[#faf6f1] mb-6 relative z-10">Ready to Upgrade?</h2>
          <p className="text-[#faf6f1]/60 mb-10 text-lg max-w-lg mx-auto relative z-10">
            Join thousands of professionals who have refined their workflow with ShopNext essentials.
          </p>
          <Link
            href="/products"
            className="relative z-10 inline-flex items-center gap-2 text-[#c9933a] font-bold text-lg hover:text-[#faf6f1] transition-colors group"
          >
            View Full Catalog
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}