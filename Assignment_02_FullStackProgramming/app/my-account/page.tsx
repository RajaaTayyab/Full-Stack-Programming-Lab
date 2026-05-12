import Link from "next/link";

export default function MyAccountPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-brand-800">My Account</h1>
      <div className="grid gap-6 md:grid-cols-4">
        <aside className="glass-card p-5 md:col-span-1">
          <div className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-100 text-2xl text-brand-700"><i className="bi bi-person" /></div>
            <h3 className="mt-2 font-semibold">Tayyab Janjua</h3>
            <p className="text-xs text-slate-500">tayyab.janjua@email.com</p>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <Link href="/my-account" className="block rounded bg-brand-50 px-3 py-2">Dashboard</Link>
            <Link href="/order-details" className="block rounded px-3 py-2 hover:bg-slate-100">My Orders</Link>
            <Link href="/edit-billing" className="block rounded px-3 py-2 hover:bg-slate-100">Billing Address</Link>
            <Link href="/edit-shipping" className="block rounded px-3 py-2 hover:bg-slate-100">Shipping Address</Link>
          </div>
        </aside>
        <div className="space-y-6 md:col-span-3">
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold">Account Overview</h2>
            <p className="mt-2 text-slate-600">Hello, Tayyab! View recent orders, manage addresses, and edit account details.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { t: "Total Orders", v: "5" },
              { t: "Delivered", v: "4" },
              { t: "In Progress", v: "1" }
            ].map((s) => (
              <div key={s.t} className="glass-card p-6 text-center">
                <div className="text-4xl font-extrabold text-brand-600">{s.v}</div>
                <p className="text-sm text-slate-600">{s.t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
