'use client';
import {
  Code2,
  Palette,
  Database,
  Lightbulb,
  Users2,
  Sparkles,
  Globe2,
  Terminal
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-background text-slate-200 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-24">

        {/* Section Header */}
        <div className="mb-20 text-center">
          <p className="text-accent font-mono text-xs uppercase tracking-[0.2em] mb-3">
            Our identity
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            About us<span className="text-accent">.</span>
          </h1>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        {/* Mission Card */}
        <div className="bg-surface border border-border rounded-3xl p-10 mb-20 relative overflow-hidden group">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent/5 blur-[100px] group-hover:bg-accent/10 transition-all duration-700" />

          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            <div className="p-5 rounded-2xl bg-background border border-border text-accent shadow-xl shadow-accent/5">
              <Terminal size={48} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Our mission</h2>
              <p className="text-slate-400 leading-relaxed text-lg max-w-2xl">
                We build modern web applications that are fast, accessible, and delightful to use.
                Our team blends technical excellence with a focus on clean, human-centered design
                to solve complex problems.
              </p>
            </div>
          </div>
        </div>

        {/* Team Grid */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Meet the team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Hassan Raza', role: 'Frontend Engineer', icon: Code2 },
              { name: 'Musab Ejaz', role: 'UI/UX Designer', icon: Palette },
              { name: 'Tayyab Janjua', role: 'Systems Architect', icon: Database },
            ].map(({ name, role, icon: Icon }) => (
              <div key={name} className="bg-surface border border-border rounded-2xl p-8 text-center group hover:border-accent/30 transition-all duration-300">
                <div className="inline-flex p-4 rounded-full bg-background border border-border text-accent mb-6 group-hover:scale-110 transition-transform">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white">{name}</h3>
                <p className="text-accent font-mono text-xs uppercase tracking-wider mt-2">{role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Grid */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Our values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Lightbulb, title: 'Innovation', desc: 'We embrace new technologies to solve real-world problems.' },
              { icon: Users2, title: 'Collaboration', desc: 'Success is built on open communication and collective trust.' },
              { icon: Sparkles, title: 'Quality', desc: 'We obsess over the details, from code cleanliness to pixel-perfect UI.' },
              { icon: Globe2, title: 'Accessibility', desc: 'Everything we build is designed to be usable by everyone.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-surface/50 border border-border flex gap-6 items-start p-8 rounded-3xl hover:bg-surface transition-colors">
                <div className="mt-1 text-accent">
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}