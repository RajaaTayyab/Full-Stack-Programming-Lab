import Link from "next/link";

const sections = [
  ["Acceptance of Terms", "By using AquaLux website and placing orders, you agree to these terms."],
  ["Purchases & Payment", "All prices are in USD. Payment must be received before processing."],
  ["Shipping & Delivery", "Standard delivery takes 5-10 business days with free delivery over $1,000."],
  ["Returns & Refunds", "30-day return policy applies for most products in original condition."],
  ["Warranty", "Standard coverage includes 5-year shell and 2-year equipment warranty."],
  ["Privacy Policy", "Your personal data is used only for service and order processing."],
  ["Limitation of Liability", "AquaLux is not liable for indirect or consequential damages."],
  ["Contact", "Questions? Contact us through support channels."]
];

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold text-brand-800">Terms & Conditions</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: March 11, 2025</p>
      <div className="mt-6 space-y-4">
        {sections.map(([title, text], i) => (
          <article key={title} className="glass-card p-5">
            <h2 className="font-semibold text-brand-700">{i + 1}. {title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
          </article>
        ))}
      </div>
      <div className="mt-6 rounded-xl bg-slate-100 p-5 text-center text-sm text-slate-600">
        By purchasing from AquaLux, you agree to all terms stated above.
        <div className="mt-3">
          <Link href="/register" className="btn-main">I Agree - Create Account</Link>
        </div>
      </div>
    </section>
  );
}
