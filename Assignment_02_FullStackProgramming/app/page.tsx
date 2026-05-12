import Link from "next/link";

const featured = [
  {
    name: "Serenity 6-Person Hot Tub",
    price: "$4,299",
    old: "$5,199",
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&h=400&fit=crop"
  },
  {
    name: "Cascade Swim Spa 14ft",
    price: "$8,999",
    old: "$11,500",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=400&fit=crop"
  },
  {
    name: "Premium Insulated Spa Cover",
    price: "$349",
    old: "",
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=400&fit=crop"
  }
];

export default function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-800 to-brand-600 px-4 py-20 text-white">
        <div className="mx-auto max-w-6xl animate-fade-up">
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight md:text-6xl">
            Your Perfect <span className="text-accent">Backyard Escape</span> Awaits
          </h1>
          <p className="mt-5 max-w-2xl text-white/85">
            Discover premium hot tubs, swim spas, and accessories. Elevate your relaxation experience with AquaLux.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/product" className="btn-main"><i className="bi bi-grid" /> Shop Now</Link>
            <Link href="/terms" className="btn-soft border-white/40 bg-white/10 text-white"><i className="bi bi-play-circle" /> Learn More</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-6xl gap-4 px-4 md:grid-cols-4">
        {["Free Delivery", "5-Year Warranty", "24/7 Support", "30-Day Returns"].map((item) => (
          <div key={item} className="glass-card p-5 text-center animate-fade-up">
            <h3 className="font-semibold text-brand-800">{item}</h3>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-brand-800">Featured Products</h2>
          <p className="mt-2 text-slate-600">Best-selling hot tubs and spa essentials</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((p) => (
            <article key={p.name} className="glass-card overflow-hidden transition hover:-translate-y-1">
              <img src={p.img} alt={p.name} className="h-56 w-full object-cover" />
              <div className="p-5">
                <h3 className="font-semibold">{p.name}</h3>
                <div className="mt-2 text-amber-400">★★★★★</div>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-xl font-bold text-brand-600">{p.price}</span>
                  {p.old && <span className="text-sm text-slate-400 line-through">{p.old}</span>}
                </div>
                <div className="mt-4 flex gap-2">
                  <Link href="/product" className="btn-soft flex-1">View Details</Link>
                  <button className="btn-main px-4"><i className="bi bi-cart-plus" /></button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
