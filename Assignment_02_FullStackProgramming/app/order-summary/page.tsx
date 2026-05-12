import Link from "next/link";

export default function OrderSummaryPage() {
  return (
    <section className="flex min-h-[75vh] items-center px-4 py-12">
      <div className="mx-auto w-full max-w-2xl glass-card p-8 text-center animate-fade-up">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-4xl text-emerald-600">
          <i className="bi bi-check-lg" />
        </div>
        <h1 className="mt-4 text-3xl font-bold text-emerald-600">Order Confirmed!</h1>
        <p className="mt-3 text-slate-600">Thank you for your purchase, <strong>John</strong>.</p>
        <div className="mx-auto mt-6 max-w-md rounded-xl bg-slate-100 p-5 text-left text-sm">
          <p className="flex justify-between py-1"><span>Order Number</span><strong>#AQL-2025-003</strong></p>
          <p className="flex justify-between py-1"><span>Date</span><strong>March 11, 2025</strong></p>
          <p className="flex justify-between py-1"><span>Total Paid</span><strong>$5,115.96</strong></p>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/order-details" className="btn-main"><i className="bi bi-bag" /> View Order</Link>
          <Link href="/" className="btn-soft"><i className="bi bi-house" /> Continue Shopping</Link>
        </div>
      </div>
    </section>
  );
}
