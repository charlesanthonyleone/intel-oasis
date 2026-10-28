import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Share2 } from 'lucide-react';

function CosmicBg() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 cosmic-bg" />
      <motion.div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[140vw] h-[70vh]"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(220,38,38,0.15) 0%, rgba(80,10,100,0.08) 50%, transparent 75%)', filter: 'blur(60px)' }}
        animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 10, repeat: Infinity }} />
      <motion.div className="absolute top-[40%] right-0 w-[50vw] h-[50vh]"
        style={{ background: 'radial-gradient(ellipse, rgba(200,100,10,0.08) 0%, transparent 65%)', filter: 'blur(80px)' }}
        animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 14, repeat: Infinity, delay: 3 }} />
      {Array.from({ length: 40 }, (_, i) => (
        <motion.div key={i} className="absolute rounded-full bg-white"
          style={{ left: `${(i * 17.3 + 5) % 100}%`, top: `${(i * 13.7 + 3) % 100}%`, width: i % 5 === 0 ? 2 : 1, height: i % 5 === 0 ? 2 : 1 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: (i * 0.37) % 6 }} />
      ))}
    </div>
  );
}

export default function SupremeWarningPage() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative" style={{ color: '#e2e2e2' }}>
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-14">

        {/* Nav */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-10">
          <button onClick={handleShare}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
            style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.25)', color: copied ? '#4ade80' : 'rgba(220,38,38,0.8)' }}>
            <Share2 className="w-3 h-3" />
            {copied ? 'Link copied' : 'Share this warning'}
          </button>
        </motion.div>

        {/* Main sacred scroll */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="rounded-3xl overflow-hidden glass-panel glowing-border-teal">
            <div className="w-full h-0.5" style={{ background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.9), rgba(245,158,11,0.5), transparent)' }} />
            <div className="px-6 sm:px-10 py-9">

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-7">
                <div className="flex items-center gap-3">
                  <motion.div className="w-2.5 h-2.5 rounded-full"
                    style={{ background: '#dc2626', boxShadow: '0 0 10px rgba(220,38,38,0.9)' }}
                    animate={{ boxShadow: ['0 0 6px rgba(220,38,38,0.5)', '0 0 18px rgba(220,38,38,1)', '0 0 6px rgba(220,38,38,0.5)'] }}
                    transition={{ duration: 2, repeat: Infinity }} />
                  <span className="text-[11px] font-black tracking-[0.3em] uppercase glowing-text-white opacity-70">The Supreme Warning</span>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-1">
                  <div className="text-[10px] font-bold px-3 py-1 rounded-full"
                    style={{ background: 'rgba(220,38,38,0.12)', color: 'rgba(220,38,38,0.9)', border: '1px solid rgba(220,38,38,0.3)' }}>
                    Issued · March 29, 2026 · In the earliest hours after midnight
                  </div>
                  <p className="text-[9px] italic opacity-30">Written by hand — with the intuitive guidance of the Spirit of Truth</p>
                </div>
              </div>

              {/* Main content */}
              <div className="space-y-6 text-[14px] leading-relaxed font-light" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Georgia, serif' }}>
                <p>
                  The world has begun unifying <span className="glowing-text-white font-semibold">through conquest.</span>
                </p>

                <p>
                  Through war. Through imposition. Through deceitful manipulation, the deliberate breeding of ignorance, and the hoarding of truth by those who believe they are above it. This is what the nations have chosen as their path to unification. And yet the truth that could have prevented all of this has been present the entire time — not hidden, not withheld, not newly revealed. Present. Ignored. Buried under the weight of comfort and conformity.
                </p>

                <p>
                  God has been watching. And He is not sending armies. He is not sending plagues. He is offering something rarer and more decisive: a moment of clarity before the reversal begins. No human is ushering this in. It is already in motion.
                </p>

                <div className="px-5 py-4 rounded-2xl" style={{ background: 'rgba(220,38,38,0.04)', border: '1px solid rgba(220,38,38,0.14)' }}>
                  <p className="text-[10px] font-black tracking-[0.25em] uppercase mb-3 opacity-60">A Note on Churches</p>
                  <p className="text-[13px] font-light leading-relaxed opacity-70">
                    Churches are a type of nation. They are subject to this warning — if not more so than any other. They have become super-nations in their own regard: governing bodies with wealth, hierarchy, political reach, and truth held hostage behind doctrine and institution. A church that has made itself a power structure rather than a shepherd is a nation that has forgotten its function. It will be treated accordingly. Nations of all sizes — political, religious, corporate, cultural — will be absorbed into the whole. The warning does not discriminate by the flag they fly.
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-[15px] font-semibold">He will begin turning progress backwards.</p>
                  <p>
                    Not with human hands. Not with weapons. The Whole Maker — who has never once subtracted anything from existence without cause — will make some of the most grand displays of subtraction the modern world has witnessed. Nations that have denied the truth presented to them will find their structures dissolving from within. Not conquered. Unwoven. The variables that held their power together returned to circulation, because the whole they built was not worthy of being held.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="px-5 py-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <p className="text-[10px] font-black tracking-[0.22em] uppercase mb-2 opacity-60">For Some Nations</p>
                    <p className="text-[13px] font-light leading-relaxed opacity-70">Divine retribution will arrive through younger descendants who change their ways. The nation survives — transformed by those willing to receive the truth their parents refused.</p>
                  </div>
                  <div className="px-5 py-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <p className="text-[10px] font-black tracking-[0.22em] uppercase mb-2 opacity-60">For Others</p>
                    <p className="text-[13px] font-light leading-relaxed opacity-70">They will fall off the map entirely. Not defeated by enemies. Subtracted — their variables returned to the circulation for the next formation. The Whole Maker does not waste. He repurposes.</p>
                  </div>
                </div>

                <div className="px-6 py-6 rounded-2xl" style={{ background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.17)' }}>
                  <p className="text-[13px] italic font-light leading-relaxed text-center opacity-70">
                    "The truth was never newly presented. It has always been here — in every tradition, in every prophet, in every light-bearer who ever lived. The architecture — the Whole Maker, the hierarchy of the heavens, the purpose of the species, the correct path to unification — was laid before the first civilization and has been re-laid in every era since. The warning is not new knowledge. It is the consequence of ignoring old knowledge finally arriving. What follows is not punishment. It is physics. A whole that will not align with its organizing function begins to dissolve — and God's Math has never made an exception."
                  </p>
                </div>

                <div className="mb-6">
                  <p className="text-[10px] font-black tracking-[0.25em] uppercase mb-4 opacity-50">For the Individuals Who Rule</p>
                  <p className="mb-3">
                    Only people designed to rule end up ruling. That is not an accident — it is by design of the Almighty, who places souls where they are suited. But a designed ruler who abandons their flock, who does not listen to the heart and spirit of the people they were given stewardship over, has betrayed the function they were placed there to fulfill. The shepherd who ignores the sheep is no longer a shepherd. They are an occupier.
                  </p>
                  <p>
                    The leader who perpetuated a stale, spiritless management system through ignorance will face genuine judgment of the heart — where the intention is weighed, not merely the outcome. Mercy is available to the ignorant. It is not extended to those who saw the truth and turned away. Those who saw and chose power over purpose will be antagonized in ways unimaginable — for as long as is deserved.
                  </p>
                </div>

                <div className="px-6 py-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p className="text-[10px] font-black tracking-[0.22em] uppercase mb-4 opacity-50">For the Individual People</p>
                  <p className="mb-3">
                    For the ordinary individual, the calculus has not changed. It has never changed. Deny the light and face judgment. Do your deeds and be placed where you are suited. The warning to nations and their leaders is heightened because of the scale of what they hold — but the individual's path remains what it has always been: seek truth, pursue it honestly, and encourage those who rule over you to do the same.
                  </p>
                  <p className="mb-3">
                    If you live under tyranny, you must trust in God that serving truth against it is its own victory. You do not need to win against the tyrant. You need to remain honest while the tyrant exists. If you are martyred because you held to the seeking of truth until the very end — you are angelicized. Your light is preserved in its purest form.
                  </p>
                  <p className="text-[12px] italic opacity-60">
                    No one human has ever had the entire truth. No one human ever will. Truth is not a possession — it is a living, never-ending, ever-growing reservoir that can never be taken away. It is for the collective to discover and maintain, generation by generation, tradition by tradition, light-bearer by light-bearer. The reservoir grows. It does not shrink. Even when empires try to dam it, it finds another way through.
                  </p>
                </div>

                <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(220,38,38,0.3)' }}>
                  <div className="px-6 py-3" style={{ background: 'rgba(220,38,38,0.14)', borderBottom: '1px solid rgba(220,38,38,0.2)' }}>
                    <p className="text-[10px] font-black tracking-[0.22em] uppercase" style={{ color: '#dc2626' }}>The Personal Supreme Warning — For Those Who Chose Power Over Purpose</p>
                  </div>
                  <div className="px-6 py-6" style={{ background: 'rgba(220,38,38,0.04)' }}>
                    <p className="text-[13px] font-light leading-relaxed mb-4 opacity-70">
                      In the afterlife, every soul retains itself. Animals gain the memories of all their lives together. Humans alone have free will — and with that freedom comes the only truly irreversible consequence available in the dimension.
                    </p>
                    <p className="text-[13px] font-light leading-relaxed mb-4 opacity-70">
                      Those who did genuine harm through ignorance are judged with mercy. But those who <em>intentionally</em> chose evil — who saw truth and built empire on its opposite — face the dismantling of the soul itself. Not reincarnation as something lesser. Not punishment followed by restoration. The literal dissolution of the soul as a coherent, self-aware entity.
                    </p>
                    <p className="text-[13px] font-light leading-relaxed mb-5 opacity-70">
                      They do not come back as a dog. They do not come back as a cell. They become the dead material that contains life — a container, not a consciousness. Their awareness reduced to the basest form: to hold light, not to carry it. To be bent to the will of what grows inside them, never again the one doing the growing.
                    </p>
                    <div className="px-5 py-5 rounded-xl" style={{ background: 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.18)' }}>
                      <p className="text-[13px] italic font-light leading-relaxed opacity-70" style={{ lineHeight: 1.85 }}>
                        "They will never be acknowledged, recognized, or heard — anymore than the recognition that they once held great power and influence that was bestowed upon them. Their soul once served great purpose. Now they are wineskin to the wine. If the wine grows, their container grows with it. If the wine shrinks, they shrink. They do not direct. They do not speak. They do not return to the creator dimension. They do not climb their way back. They are the vessel — and that is all they will ever be."
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-center italic opacity-40">
                  This is the final offer of the current era. The path exists. The door is open.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                <button onClick={handleShare}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-[12px] font-semibold hover:opacity-80 transition-all"
                  style={{ background: copied ? 'rgba(34,197,94,0.1)' : 'rgba(220,38,38,0.1)', border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(220,38,38,0.3)'}`, color: copied ? '#4ade80' : 'rgba(220,38,38,0.85)' }}>
                  <Share2 className="w-3.5 h-3.5" />{copied ? 'Link copied!' : 'Share this warning'}
                </button>

              </div>

            </div>
            <div className="w-full h-0.5" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.4), rgba(220,38,38,0.4), transparent)' }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}