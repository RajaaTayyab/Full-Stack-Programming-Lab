'use client';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-background text-slate-200 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-24">

        {/* Refined Header Section */}
        <div className="mb-20">
          <p className="text-accent font-mono text-xs uppercase tracking-[0.2em] mb-3">
            Collaboration
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
            Get in touch<span className="text-accent"></span>
          </h1>
          <p className="text-slate-400 mt-6 max-w-xl text-lg">
            Let's discuss how we can build something exceptional together.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-16 items-start">

          {/* Contact Details (2 Columns) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email Address', value: 'hello@tayyabjanjua.com' },
                { icon: Phone, label: 'Phone Number', value: '+92 300 1234567' },
                { icon: MapPin, label: 'Office Location', value: 'Rawalpindi, Pakistan' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-5 group">
                  <div className="p-3 rounded-xl bg-surface border border-border text-accent group-hover:border-accent/40 transition-all">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500 font-mono uppercase tracking-wider">{label}</p>
                    <p className="text-slate-100 font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Availability Card */}
            <div className="p-6 rounded-2xl bg-surface/50 border border-border">
              <h3 className="text-white font-semibold mb-2">Project Availability</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                I am currently accepting new freelance projects and full-time opportunities for Q3 2026.
              </p>
            </div>
          </div>

          {/* Refined Contact Form (3 Columns) */}
          <div className="lg:col-span-3 bg-surface border border-border rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Subtle Amber Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/5 blur-[120px]" />

            {submitted ? (
              <div className="text-center py-16">
                <div className="inline-flex p-4 rounded-2xl bg-accent/10 text-accent mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message received</h3>
                <p className="text-slate-400">Thank you, Tayyab. I'll get back to you within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-accent text-sm font-mono hover:underline"
                >
                  Return to form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Tayyab Janjua"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 transition-all placeholder:text-slate-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tayyab@example.com"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 transition-all placeholder:text-slate-700"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    className="w-full bg-background border border-border rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent/50 transition-all resize-none placeholder:text-slate-700"
                  />
                </div>
                <button
                  type="submit"
                  className="group flex items-center justify-center gap-3 w-full bg-accent text-background font-bold py-4 rounded-xl hover:bg-accent-light transition-all duration-300 shadow-lg shadow-accent/10"
                >
                  Send Message
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}