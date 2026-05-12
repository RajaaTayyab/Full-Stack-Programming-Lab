export default function EditBillingPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-brand-800">Edit Billing Address</h1>
      <form className="glass-card grid gap-4 p-6 md:grid-cols-2">
        <input className="field" defaultValue="Tayyab" />
        <input className="field" defaultValue="Janjua" />
        <input className="field md:col-span-2" defaultValue="tayyab.janjua@email.com" />
        <input className="field md:col-span-2" defaultValue="+1 (555) 123-4567" />
        <input className="field md:col-span-2" defaultValue="123 Main Street" />
        <input className="field" defaultValue="New York" />
        <input className="field" defaultValue="NY" />
        <input className="field" defaultValue="10001" />
        <select className="field"><option>United States</option><option>Canada</option></select>
        <button className="btn-main md:col-span-2" type="submit">Save Billing Address</button>
      </form>
    </section>
  );
}
