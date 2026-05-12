import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="flex min-h-[80vh] items-center px-4 py-12">
      <div className="mx-auto w-full max-w-md glass-card p-8 animate-fade-up">
        <h1 className="text-3xl font-bold text-brand-800">Welcome Back</h1>
        <p className="mt-2 text-sm text-slate-600">Sign in to your AquaLux account</p>
        <form className="mt-6 space-y-4">
          <input className="field" type="email" placeholder="you@example.com" />
          <input className="field" type="password" placeholder="Enter your password" />
          <button className="btn-main w-full" type="submit"><i className="bi bi-box-arrow-in-right" /> Sign In</button>
        </form>
        <div className="mt-4 flex justify-between text-sm">
          <Link className="text-brand-700" href="/forgot-password">Forgot Password?</Link>
          <Link className="text-brand-700" href="/register">Create one</Link>
        </div>
      </div>
    </section>
  );
}
