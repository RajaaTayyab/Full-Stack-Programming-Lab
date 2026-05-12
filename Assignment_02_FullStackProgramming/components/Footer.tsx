import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-950 text-white/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <h4 className="text-xl font-bold text-white">AquaLux</h4>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/70">
            Premium hot tubs and swim spas for discerning homeowners. Quality, luxury, and relaxation since 2005.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/product">Hot Tubs</Link></li>
            <li><Link href="/terms">Terms</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">Account</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/login">Login</Link></li>
            <li><Link href="/register">Register</Link></li>
            <li><Link href="/my-account">My Account</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">© 2025 AquaLux. All rights reserved.</div>
    </footer>
  );
}
