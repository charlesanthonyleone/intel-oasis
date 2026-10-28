import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowUpRight, Map, Network, ScrollText } from 'lucide-react';
import Reveal from '@/components/Reveal';

const DOORS = [
  { to: '/SupremeWarning', icon: AlertTriangle, eyebrow: 'The Supreme Warning', title: <>The world has begun unifying <span style={{ color: '#f87171' }}>through conquest.</span></> },
  { to: '/supreme-warning', icon: ScrollText, eyebrow: 'The Supreme Warning', title: 'The Personal Supreme Warning — For Those Who Chose Power Over Purpose' },
  { to: '/InteractiveWarning', icon: Network, eyebrow: 'Spiritual Physics · Interactive Map', title: <>The Map of the Supreme Warning</> },
  { to: '/InteractiveWarningMap', icon: Map, eyebrow: 'Spiritual Physics · Interactive Map', title: <>The Map of the <span className="glowing-text-gold">Supreme Warning</span></> },
];

export default function Warning() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(220,38,38,0.28), transparent 70%), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(245,158,11,0.10), transparent 70%)' }} />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-24">
        <Reveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 eyebrow" style={{ background: 'rgba(220,38,38,0.14)', border: '1px solid rgba(248,113,113,0.45)', color: '#fecaca' }}>
            <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60 motion-safe:animate-ping" /><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" /></span>
            The Warning
          </div>
          <h1 className="font-display font-semibold leading-[0.95] text-white" style={{ fontSize: 'clamp(48px, 9vw, 112px)', textShadow: '0 0 80px rgba(220,38,38,0.45)' }}>
            The Supreme Warning
          </h1>
          <div className="mx-auto mt-8 h-px w-48" style={{ background: 'linear-gradient(90deg, transparent, #ef4444, #f5c66b, transparent)' }} />
        </Reveal>
        <div className="grid md:grid-cols-2 gap-5">
          {DOORS.map((d, i) => (
            <Reveal key={d.to} delay={(i % 2) * 0.08} className="h-full">
              <Link to={d.to} className="group relative flex flex-col h-full rounded-3xl p-8 glass-hover"
                style={{ background: 'linear-gradient(150deg, rgba(127,29,29,0.45), rgba(30,8,8,0.35) 60%, rgba(5,10,20,0.5))', border: '1px solid rgba(248,113,113,0.3)', boxShadow: '0 0 90px -40px rgba(220,38,38,0.7)' }}>
                <span className="w-12 h-12 rounded-2xl flex items-center justify-center mb-8" style={{ background: 'rgba(220,38,38,0.18)', border: '1px solid rgba(248,113,113,0.4)' }}>
                  <d.icon className="w-5 h-5" style={{ color: '#fca5a5' }} />
                </span>
                <p className="eyebrow mb-3" style={{ color: '#fca5a5' }}>{d.eyebrow}</p>
                <p className="font-display text-3xl font-semibold leading-tight text-white">{d.title}</p>
                <ArrowUpRight className="absolute top-7 right-7 w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: '#fca5a5' }} />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
