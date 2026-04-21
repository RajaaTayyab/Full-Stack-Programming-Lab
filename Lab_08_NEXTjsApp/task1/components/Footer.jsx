import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background pt-24 pb-12 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-accent text-background font-bold px-2 py-1 rounded text-sm">
                TJ
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Tayyab <span className="text-accent">Janjua</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Full-stack developer focused on building technical platforms
              and high-performance web architectures. Available for
              collaboration on complex digital products.
            </p>
          </div>

          {/* Nav Column */}
          <div className="space-y-4">
            <h4 className="text-accent text-[11px] font-mono uppercase tracking-[0.2em]">Sitemap</h4>
            <ul className="flex flex-col gap-3 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About team</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Get in touch</Link></li>
            </ul>
          </div>

          {/* Meta Column */}
          <div className="space-y-4">
            <h4 className="text-accent text-[11px] font-mono uppercase tracking-[0.2em]">Identification</h4>
            <div className="p-4 rounded-xl bg-surface border border-border group hover:border-accent/30 transition-all">
              <p className="text-[10px] font-mono text-slate-500 uppercase">Reference</p>
              <p className="text-sm font-mono text-white mt-1">ID: 231736</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-mono text-slate-400 uppercase">Available for hire</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-6 text-[11px] font-mono text-slate-600 uppercase tracking-widest">
            <span>Stable v2.4.0</span>
            <span className="text-slate-800">|</span>
            <span>Rawalpindi, PK</span>
          </div>
        </div>
      </div>
    </footer>
  );
}