import Link from "next/link";

export default function OrderDetailsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-brand-800">Order #AQL-2025-001</h1>
      <p className="mt-2 text-slate-600">Placed on March 5, 2025 · 3 items · Delivered</p>
      <div className="mt-6 glass-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-brand-800 text-white">
            <tr><th className="p-3 text-left">Product</th><th className="p-3 text-left">Qty</th><th className="p-3 text-left">Price</th><th className="p-3 text-left">Total</th></tr>
          </thead>
          <tbody>
            <tr className="border-t"><td className="p-3">Serenity 6-Person Hot Tub</td><td className="p-3">1</td><td className="p-3">$4,299.00</td><td className="p-3">$4,299.00</td></tr>
            <tr className="border-t"><td className="p-3">Premium Spa Cover</td><td className="p-3">1</td><td className="p-3">$349.00</td><td className="p-3">$349.00</td></tr>
            <tr className="border-t"><td className="p-3">All-Season Chemical Kit</td><td className="p-3">1</td><td className="p-3">$89.00</td><td className="p-3">$89.00</td></tr>
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex gap-3">
        <Link href="/my-account" className="btn-soft"><i className="bi bi-arrow-left" /> Back to Account</Link>
        <button className="btn-main" type="button"><i className="bi bi-printer" /> Print Invoice</button>
      </div>
    </section>
  );
}
