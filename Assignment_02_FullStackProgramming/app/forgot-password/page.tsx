import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <section className="flex min-h-[80vh] items-center px-4 py-12">
      <div className="mx-auto w-full max-w-md glass-card p-8">
        <h1 className="text-3xl font-bold text-brand-800">Forgot Password</h1>
        <p className="mt-2 text-sm text-slate-600">Enter your email to receive a reset link</p>
        <form className="mt-6 space-y-4">
          <input className="field" type="email" placeholder="you@example.com" />
          <button className="btn-main w-full" type="submit"><i className="bi bi-send" /> Send Reset Link</button>
        </form>
        <Link href="/login" className="mt-4 inline-flex text-sm text-brand-700"><i className="bi bi-arrow-left mr-2" /> Back to Login</Link>
      </div>
    </section>
  );
}
