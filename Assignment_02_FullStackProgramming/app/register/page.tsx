import Link from "next/link";

export default function RegisterPage() {
  return (
    <section className="flex min-h-[80vh] items-center px-4 py-12">
      <div className="mx-auto w-full max-w-xl glass-card p-8 animate-fade-up">
        <h1 className="text-3xl font-bold text-brand-800">Create Account</h1>
        <p className="mt-2 text-sm text-slate-600">Join AquaLux and enjoy exclusive benefits</p>
        <form className="mt-6 grid gap-4 md:grid-cols-2">
          <input className="field" placeholder="First Name" />
          <input className="field" placeholder="Last Name" />
          <input className="field md:col-span-2" type="email" placeholder="Email Address" />
          <input className="field md:col-span-2" placeholder="Phone Number" />
          <input className="field md:col-span-2" type="password" placeholder="Password" />
          <input className="field md:col-span-2" type="password" placeholder="Confirm Password" />
          <button className="btn-main md:col-span-2" type="submit"><i className="bi bi-person-check" /> Create Account</button>
        </form>
        <p className="mt-4 text-sm text-slate-600">Already have an account? <Link className="text-brand-700" href="/login">Sign in</Link></p>
      </div>
    </section>
  );
}
