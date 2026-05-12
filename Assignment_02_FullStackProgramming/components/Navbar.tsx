"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Hot Tubs" },
  { href: "/terms", label: "Terms" },
  { href: "/my-account", label: "Account" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-800/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-2xl font-bold text-white">
          Aqua<span className="text-accent">Lux</span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition ${
                pathname === link.href ? "text-accent" : "text-white/85 hover:text-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 text-white md:flex">
          <Link href="/login" aria-label="Login">
            <i className="bi bi-person text-lg" />
          </Link>
          <Link href="/order-summary" className="relative" aria-label="Cart">
            <i className="bi bi-bag text-lg" />
            <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-accent text-[10px] font-bold">
              3
            </span>
          </Link>
        </div>
        <button
          type="button"
          className="text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <i className={`bi ${open ? "bi-x-lg" : "bi-list"} text-xl`} />
        </button>
      </div>
      {open && (
        <div className="space-y-2 bg-brand-800 px-4 pb-4 md:hidden">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="block rounded-md px-3 py-2 text-white/90 hover:bg-white/10">
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
