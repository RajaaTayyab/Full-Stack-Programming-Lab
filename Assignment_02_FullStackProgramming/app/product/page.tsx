"use client";

import { useState } from "react";

const thumbs = [
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700&h=500&fit=crop",
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=700&h=500&fit=crop",
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=700&h=500&fit=crop",
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=700&h=500&fit=crop"
];

export default function ProductPage() {
  const [img, setImg] = useState(thumbs[0]);
  const [tab, setTab] = useState("desc");
  const [qty, setQty] = useState(1);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <img src={img} alt="Serenity Hot Tub" className="h-[420px] w-full rounded-2xl object-cover shadow" />
          <div className="mt-3 grid grid-cols-4 gap-2">
            {thumbs.map((t) => (
              <button key={t} onClick={() => setImg(t)} className={`overflow-hidden rounded-lg border-2 ${img === t ? "border-brand-600" : "border-slate-200"}`}>
                <img src={t} alt="" className="h-20 w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">NEW ARRIVAL</span>
          <h1 className="mt-4 text-3xl font-bold text-brand-800">Serenity 6-Person Hot Tub</h1>
          <p className="mt-3 text-slate-600">42 high-powered jets, multi-zone heating, and premium LED lighting.</p>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-4xl font-extrabold text-brand-600">$4,299</span>
            <span className="text-slate-400 line-through">$5,199</span>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button className="btn-soft px-3" onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
            <span className="w-8 text-center font-bold">{qty}</span>
            <button className="btn-soft px-3" onClick={() => setQty((q) => q + 1)}>+</button>
            <button className="btn-main flex-1"><i className="bi bi-cart-plus" /> Add to Cart</button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex flex-wrap gap-2 border-b">
          <button className={`px-4 py-2 ${tab === "desc" ? "border-b-2 border-brand-600 font-semibold text-brand-700" : ""}`} onClick={() => setTab("desc")}>Description</button>
          <button className={`px-4 py-2 ${tab === "specs" ? "border-b-2 border-brand-600 font-semibold text-brand-700" : ""}`} onClick={() => setTab("specs")}>Specifications</button>
          <button className={`px-4 py-2 ${tab === "reviews" ? "border-b-2 border-brand-600 font-semibold text-brand-700" : ""}`} onClick={() => setTab("reviews")}>Reviews</button>
        </div>
        {tab === "desc" && <p className="mt-5 text-slate-600">Engineered for premium hydrotherapy with energy-efficient insulation and whisper-quiet pumps.</p>}
        {tab === "specs" && <p className="mt-5 text-slate-600">Dimensions: 84 x 84 x 36, 390 gallons, 42 jets, 240V power, 5-year shell warranty.</p>}
        {tab === "reviews" && <p className="mt-5 text-slate-600">Rated 4.9/5 from 42 reviews. Customers praise build quality and comfort.</p>}
      </div>
    </section>
  );
}
