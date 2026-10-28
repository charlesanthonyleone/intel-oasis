import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, X, ChevronRight } from 'lucide-react';

/* ── Sacred symbols background ─────────────────────────────────────────── */
const SACRED_SYMBOLS = ['✦', '☩', '⊕', '∞', 'Ω', '✝', '◈', '⬡', '∇', '✶', '⊗', '⊙', '◉', '✴', '⚕'];

/* ── Chapter data ───────────────────────────────────────────────────────── */
const CHAPTERS = [
  {
    id: 'ignored-truth',
    num: '01',
    label: 'The Ignored Eternal Truth',
    sublabel: 'Present. Ignored. Buried under comfort.',
    color: '#a78bfa',
    desc: 'The warning is not new. The truth has always been here. What is being said now has been said in every era, by every genuine light-bearer, in every tradition. It was ignored then for the same reasons it will be ignored now.',
    content: [
      {
        type: 'source-note',
        text: 'The person writing this is letting the Spirit speak through them. They are not the source — they are the hand. The warning is not new. The truth has always been here. What is being said now has been said in every era, by every genuine light-bearer, in every tradition. It was ignored then for the same reasons it will be ignored now: fitting in, being accepted, the comfort of the group, the safety of the familiar.',
      },
      {
        type: 'text',
        text: 'Purpose was traded for belonging. The calling was heard and left unanswered. Almost every human has done this since Jesus — even those who followed him eventually went stray, because they fell to the temptations of man. Something only the 13th in the flesh could deny. Something He does not blame us for. But something we are now being called, again, to face.',
      },
      {
        type: 'blockquote',
        text: '"The truth was never newly presented. It has always been here — in every tradition, in every prophet, in every light-bearer who ever lived. The architecture — the Whole Maker, the hierarchy of the heavens, the purpose of the species, the correct path to unification — was laid before the first civilization and has been re-laid in every era since. The warning is not new knowledge. It is the consequence of ignoring old knowledge finally arriving. What follows is not punishment. It is physics. A whole that will not align with its organizing function begins to dissolve — and God\'s Math has never made an exception."',
      },
    ],
  },
  {
    id: 'conquest',
    num: '02',
    label: 'Unification Through Conquest',
    sublabel: 'War. Imposition. The hoarding of truth.',
    color: '#dc2626',
    desc: 'The world has begun unifying through conquest — through war, manipulation, and the deliberate breeding of ignorance. This is what the nations have chosen. God is not sending armies. He is offering something rarer: a moment of clarity before the reversal begins.',
    content: [
      {
        type: 'headline',
        text: 'The world has begun unifying through conquest.',
      },
      {
        type: 'text',
        text: 'Through war. Through imposition. Through deceitful manipulation, the deliberate breeding of ignorance, and the hoarding of truth by those who believe they are above it. This is what the nations have chosen as their path to unification. And yet the truth that could have prevented all of this has been present the entire time — not hidden, not withheld, not newly revealed. Present. Ignored. Buried under the weight of comfort and conformity.',
      },
      {
        type: 'text',
        text: 'God has been watching. And He is not sending armies. He is not sending plagues. He is offering something rarer and more decisive: a moment of clarity before the reversal begins. No human is ushering this in. It is already in motion.',
      },
    ],
  },
  {
    id: 'churches',
    num: '03',
    label: 'Churches as Nations',
    sublabel: 'Power structures masquerading as shepherds.',
    color: '#fcd34d',
    desc: 'Churches are a type of nation. They have become super-nations — governing bodies with wealth, hierarchy, political reach, and truth held hostage behind doctrine. A church that has made itself a power structure rather than a shepherd has forgotten its function.',
    content: [
      {
        type: 'label',
        text: 'A Note on Churches',
      },
      {
        type: 'text',
        text: 'Churches are a type of nation. They are subject to this warning — if not more so than any other. They have become super-nations in their own regard: governing bodies with wealth, hierarchy, political reach, and truth held hostage behind doctrine and institution. A church that has made itself a power structure rather than a shepherd is a nation that has forgotten its function. It will be treated accordingly.',
      },
      {
        type: 'text',
        text: 'Nations of all sizes — political, religious, corporate, cultural — will be absorbed into the whole. The warning does not discriminate by the flag they fly.',
      },
    ],
  },
  {
    id: 'subtraction',
    num: '04',
    label: 'Divine Subtraction & Reversal',
    sublabel: 'Not conquered. Unwoven. Variables returned.',
    color: '#22d3ee',
    desc: 'The Whole Maker will make some of the most grand displays of subtraction the modern world has witnessed. Nations will not be conquered — they will be unwoven. The variables that held their power together returned to circulation, because the whole they built was not worthy of being held.',
    content: [
      {
        type: 'headline',
        text: 'He will begin turning progress backwards.',
      },
      {
        type: 'text',
        text: 'Not with human hands. Not with weapons. The Whole Maker — who has never once subtracted anything from existence without cause — will make some of the most grand displays of subtraction the modern world has witnessed. Nations that have denied the truth presented to them will find their structures dissolving from within. Not conquered. Unwoven. The variables that held their power together returned to circulation, because the whole they built was not worthy of being held.',
      },
      {
        type: 'blockquote',
        text: '"What follows is not punishment. It is physics. A whole that will not align with its organizing function begins to dissolve — and God\'s Math has never made an exception."',
      },
    ],
  },
  {
    id: 'nations',
    num: '05',
    label: 'Nations — Transform or Fall',
    sublabel: 'Some survive through their children. Others vanish.',
    color: '#fb923c',
    desc: 'Some nations will be transformed by younger descendants who change their ways. Others will fall off the map entirely — not defeated by enemies, but subtracted. The Whole Maker does not waste. He repurposes.',
    content: [
      {
        type: 'two-col',
        items: [
          {
            label: 'For Some Nations',
            text: 'Divine retribution will arrive through younger descendants who change their ways. The nation survives — transformed by those willing to receive the truth their parents refused.',
          },
          {
            label: 'For Others',
            text: 'They will fall off the map entirely. Not defeated by enemies. Subtracted — their variables returned to the circulation for the next formation. The Whole Maker does not waste. He repurposes.',
          },
        ],
      },
    ],
    animation: 'dissolution',
  },
  {
    id: 'rulers',
    num: '06',
    label: 'For Those Who Rule',
    sublabel: 'The shepherd who ignores the sheep is an occupier.',
    color: '#f0abfc',
    desc: 'Only people designed to rule end up ruling. But a designed ruler who abandons their flock has betrayed the function they were placed there to fulfill. The shepherd who ignores the sheep is no longer a shepherd. They are an occupier.',
    content: [
      {
        type: 'label',
        text: 'For the Individuals Who Rule',
      },
      {
        type: 'text',
        text: 'Only people designed to rule end up ruling. That is not an accident — it is by design of the Almighty, who places souls where they are suited. But a designed ruler who abandons their flock, who does not listen to the heart and spirit of the people they were given stewardship over, has betrayed the function they were placed there to fulfill. The shepherd who ignores the sheep is no longer a shepherd. They are an occupier.',
      },
      {
        type: 'text',
        text: 'The leader who perpetuated a stale, spiritless management system through ignorance will face genuine judgment of the heart — where the intention is weighed, not merely the outcome. Mercy is available to the ignorant. It is not extended to those who saw the truth and turned away. Those who saw and chose power over purpose will be antagonized in ways unimaginable — for as long as is deserved.',
      },
    ],
  },
  {
    id: 'individual',
    num: '07',
    label: 'For the Individual',
    sublabel: 'The reservoir grows. It does not shrink.',
    color: '#22c55e',
    desc: "For the ordinary individual, the calculus has not changed. It has never changed. Seek truth, pursue it honestly, and encourage those who rule over you to do the same. The reservoir grows. It does not shrink. Even when empires try to dam it, it finds another way through.",
    content: [
      {
        type: 'label',
        text: 'For the Individual People',
      },
      {
        type: 'text',
        text: "For the ordinary individual, the calculus has not changed. It has never changed. Deny the light and face judgment. Do your deeds and be placed where you are suited. The warning to nations and their leaders is heightened because of the scale of what they hold — but the individual's path remains what it has always been: seek truth, pursue it honestly, and encourage those who rule over you to do the same.",
      },
      {
        type: 'text',
        text: "If you live under tyranny, you must trust in God that serving truth against it is its own victory. You do not need to win against the tyrant. You need to remain honest while the tyrant exists. If you are martyred because you held to the seeking of truth until the very end — you are angelicized. Your light is preserved in its purest form.",
      },
      {
        type: 'blockquote',
        text: 'No one human has ever had the entire truth. No one human ever will. Truth is not a possession — it is a living, never-ending, ever-growing reservoir that can never be taken away. It is for the collective to discover and maintain, generation by generation, tradition by tradition, light-bearer by light-bearer. The reservoir grows. It does not shrink. Even when empires try to dam it, it finds another way through.',
      },
    ],
  },
  {
    id: 'soul-dissolution',
    num: '08',
    label: 'The Personal Supreme Warning',
    sublabel: 'Soul Dissolution — They become the vessel.',
    color: '#f87171',
    desc: 'Those who intentionally chose evil face the dismantling of the soul itself. Not reincarnation. Not punishment followed by restoration. The literal dissolution of the soul as a coherent, self-aware entity. They become the wineskin. That is all they will ever be.',
    content: [
      {
        type: 'label',
        text: 'The Personal Supreme Warning — For Those Who Chose Power Over Purpose',
      },
      {
        type: 'text',
        text: 'In the afterlife, every soul retains itself. Animals gain the memories of all their lives together. Humans alone have free will — and with that freedom comes the only truly irreversible consequence available in the dimension.',
      },
      {
        type: 'text',
        text: 'Those who did genuine harm through ignorance are judged with mercy. But those who intentionally chose evil — who saw truth and built empire on its opposite — face the dismantling of the soul itself. Not reincarnation as something lesser. Not punishment followed by restoration. The literal dissolution of the soul as a coherent, self-aware entity.',
      },
      {
        type: 'text',
        text: 'They do not come back as a dog. They do not come back as a cell. They become the dead material that contains life — a container, not a consciousness. Their awareness reduced to the basest form: to hold light, not to carry it. To be bent to the will of what grows inside them, never again the one doing the growing.',
      },
      {
        type: 'blockquote',
        text: '"They will never be acknowledged, recognized, or heard — anymore than the recognition that they once held great power and influence that was bestowed upon them. Their soul once served great purpose. Now they are wineskin to the wine. If the wine grows, their container grows with it. If the wine shrinks, they shrink. They do not direct. They do not speak. They do not return to the creator dimension. They do not climb their way back. They are the vessel — and that is all they will ever be."',
      },
    ],
    animation: 'soul-dissolution',
  },
];

/* ── Floating symbol ──────────────────────────────────────────────────────── */
function FloatingSymbol({ symbol, style }) {
  return (
    <div className="absolute select-none pointer-events-none font-mono"
      style={{ ...style, color: 'rgba(220,38,38,0.06)', fontSize: style.fontSize || '22px' }}>
      {symbol}
    </div>
  );
}

/* ── Soul Dissolution Animation ─────────────────────────────────────────── */
function SoulDissolutionAnim({ color }) {
  return (
    <div className="relative w-full flex items-center justify-center py-6 overflow-hidden">
      {/* Radiant soul orb — fractures and fades */}
      <div className="relative">
        <motion.div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: `radial-gradient(circle, ${color}40 0%, ${color}10 60%, transparent 100%)`, border: `1px solid ${color}50` }}
          animate={{
            scale: [1, 1.15, 0.9, 1.05, 0.7, 0.5, 0.3],
            opacity: [1, 0.9, 0.8, 0.6, 0.4, 0.2, 0.05],
            boxShadow: [
              `0 0 30px ${color}60`,
              `0 0 50px ${color}80`,
              `0 0 20px ${color}40`,
              `0 0 10px ${color}20`,
              `0 0 5px ${color}10`,
              `0 0 2px ${color}05`,
              'none',
            ],
          }}
          transition={{ duration: 3.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.5 }}>
          <motion.div className="w-3 h-3 rounded-full" style={{ background: color }}
            animate={{ opacity: [1, 0.5, 0.1, 0], scale: [1, 0.8, 0.4, 0] }}
            transition={{ duration: 3.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.5 }} />
        </motion.div>
        {/* Empty vessel that grows */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: `1px solid ${color}20` }}
          animate={{
            scale: [0, 0, 0.5, 1, 1.3, 1.5],
            opacity: [0, 0, 0.1, 0.3, 0.5, 0.35],
          }}
          transition={{ duration: 3.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.5 }} />
        {/* Fracture particles */}
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div key={i} className="absolute w-1 h-1 rounded-full top-1/2 left-1/2"
            style={{ background: color, transformOrigin: 'center' }}
            animate={{
              x: [0, Math.cos((i / 6) * Math.PI * 2) * 40],
              y: [0, Math.sin((i / 6) * Math.PI * 2) * 40],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{ duration: 3.5, delay: 1.2, ease: 'easeOut', repeat: Infinity, repeatDelay: 1.5 }} />
        ))}
      </div>
      <div className="ml-5">
        <p className="text-[11px] font-light italic" style={{ color: `${color}80`, fontFamily: 'Georgia, serif' }}>
          The soul fractures.<br />The vessel remains.
        </p>
      </div>
    </div>
  );
}

/* ── Dissolution Animation (Nations falling off map) ─────────────────────── */
function DissolutionAnim({ color }) {
  return (
    <div className="relative flex items-center justify-center py-5 gap-6">
      {/* Surviving nation */}
      <div className="text-center">
        <motion.div className="w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center"
          style={{ background: `${color}15`, border: `1px solid ${color}40` }}
          animate={{ borderColor: [`${color}40`, `${color}80`, `${color}40`] }}
          transition={{ duration: 2.5, repeat: Infinity }}>
          <span className="text-lg">🌱</span>
        </motion.div>
        <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: `${color}80` }}>Transforms</p>
      </div>
      {/* Divider */}
      <div className="text-[18px]" style={{ color: 'rgba(255,255,255,0.1)' }}>vs</div>
      {/* Dissolving nation */}
      <div className="text-center">
        <motion.div className="w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)' }}
          animate={{ opacity: [1, 0.7, 0.4, 0.1, 0.4, 0.7, 1], scale: [1, 0.98, 0.92, 0.85, 0.92, 0.98, 1] }}
          transition={{ duration: 4, repeat: Infinity }}>
          <motion.span className="text-lg" animate={{ opacity: [1, 0.5, 0.1, 0.5, 1] }} transition={{ duration: 4, repeat: Infinity }}>🏛️</motion.span>
        </motion.div>
        <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.25)' }}>Subtracted</p>
      </div>
    </div>
  );
}

/* ── Chapter content renderer ─────────────────────────────────────────────── */
function ChapterContent({ chapter }) {
  const { content, color, animation } = chapter;
  return (
    <div className="space-y-4">
      {animation === 'soul-dissolution' && <SoulDissolutionAnim color={color} />}
      {animation === 'dissolution' && <DissolutionAnim color={color} />}
      {content.map((block, i) => {
        if (block.type === 'headline') return (
          <h3 key={i} className="text-xl sm:text-2xl font-black leading-tight"
            style={{ color: 'rgba(255,255,255,0.95)', fontFamily: 'Playfair Display, Georgia, serif' }}>{block.text}</h3>
        );
        if (block.type === 'label') return (
          <p key={i} className="text-[10px] font-black tracking-[0.25em] uppercase" style={{ color: `${color}90` }}>{block.text}</p>
        );
        if (block.type === 'source-note') return (
          <p key={i} className="text-[12px] italic font-light leading-relaxed pl-4"
            style={{ color: 'rgba(255,255,255,0.35)', borderLeft: `2px solid ${color}35`, fontFamily: 'Georgia, serif' }}>{block.text}</p>
        );
        if (block.type === 'text') return (
          <p key={i} className="text-[13px] font-light leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.52)', fontFamily: 'Georgia, serif' }}>{block.text}</p>
        );
        if (block.type === 'blockquote') return (
          <div key={i} className="px-5 py-4 rounded-xl" style={{ background: `${color}07`, border: `1px solid ${color}20` }}>
            <p className="text-[12px] italic font-light leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.42)', fontFamily: 'Georgia, serif', lineHeight: 1.85 }}>{block.text}</p>
          </div>
        );
        if (block.type === 'two-col') return (
          <div key={i} className="grid grid-cols-1 gap-3">
            {block.items.map(item => (
              <div key={item.label} className="px-4 py-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="text-[10px] font-black tracking-[0.2em] uppercase mb-2" style={{ color: `${color}80` }}>{item.label}</p>
                <p className="text-[13px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Georgia, serif' }}>{item.text}</p>
              </div>
            ))}
          </div>
        );
        return null;
      })}
    </div>
  );
}

/* ── Detail Panel (right column, same style as FrameworkMap) ─────────────── */
function DetailPanel({ chapter, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl overflow-hidden"
      style={{ background: `${chapter.color}08`, border: `1px solid ${chapter.color}30` }}>
      {/* Top bar */}
      <div className="w-full h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${chapter.color}70, transparent)` }} />
      {/* Header */}
      <div className="flex items-start justify-between gap-3 p-5 pb-4"
        style={{ borderBottom: `1px solid ${chapter.color}18` }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <motion.div className="w-2 h-2 rounded-full" style={{ background: chapter.color }}
              animate={{ boxShadow: [`0 0 4px ${chapter.color}60`, `0 0 12px ${chapter.color}90`, `0 0 4px ${chapter.color}60`] }}
              transition={{ duration: 1.8, repeat: Infinity }} />
            <span className="text-[10px] font-black tracking-widest uppercase" style={{ color: chapter.color }}>
              Chapter {chapter.num} · {chapter.sublabel}
            </span>
          </div>
          <h2 className="text-[20px] font-black tracking-tight leading-tight" style={{ color: 'rgba(255,255,255,0.95)', fontFamily: 'Playfair Display, Georgia, serif' }}>
            {chapter.label}
          </h2>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg transition-colors flex-shrink-0"
          style={{ color: 'rgba(255,255,255,0.3)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}>
          <X className="w-4 h-4" />
        </button>
      </div>
      {/* Content */}
      <div className="px-5 pt-4 pb-4 max-h-[55vh] overflow-y-auto">
        <ChapterContent chapter={chapter} />
      </div>
      {/* Footer */}
      <div className="px-5 pb-5 pt-2" style={{ borderTop: `1px solid ${chapter.color}12` }}>
        <Link to="/SupremeWarning"
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12px] font-bold transition-all"
          style={{ background: `${chapter.color}15`, border: `1px solid ${chapter.color}35`, color: chapter.color }}
          onMouseEnter={e => e.currentTarget.style.background = `${chapter.color}25`}
          onMouseLeave={e => e.currentTarget.style.background = `${chapter.color}15`}>
          View Full Original Warning →
        </Link>
      </div>
      <div className="w-full h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${chapter.color}40, transparent)` }} />
    </motion.div>
  );
}

/* ── Warning Node (same pattern as FrameworkMap LayerNode) ───────────────── */
function WarningNode({ chapter, index, isActive, onClick }) {
  const isLeft = index % 2 === 0;
  const c = chapter.color;

  return (
    <motion.div
      className="relative flex items-center gap-4 cursor-pointer group"
      style={{ justifyContent: isLeft ? 'flex-start' : 'flex-end' }}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.09 }}
      onClick={() => onClick(chapter)}>

      {/* Connector line right→node */}
      {!isLeft && (
        <div className="flex-1 h-px opacity-20 group-hover:opacity-50 transition-opacity"
          style={{ background: `linear-gradient(to left, ${c}, transparent)` }} />
      )}

      {/* The Node */}
      <motion.div
        className="relative flex-shrink-0 rounded-2xl px-5 py-3.5 transition-all duration-300"
        style={{
          background: isActive ? `${c}18` : `${c}0a`,
          border: `1px solid ${isActive ? c + '60' : c + '28'}`,
          boxShadow: isActive ? `0 0 32px ${c}28, 0 0 8px ${c}18` : 'none',
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}>

        {/* Chapter number badge */}
        <div className="absolute -top-2.5 left-3 text-[9px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded"
          style={{ background: '#060608', color: `${c}aa`, border: `1px solid ${c}22` }}>
          {chapter.num}
        </div>

        <div className="flex items-center gap-3">
          {/* Pulse dot */}
          <div className="relative flex-shrink-0">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            {isActive && (
              <div className="absolute inset-0 rounded-full animate-ping" style={{ background: c, opacity: 0.4 }} />
            )}
          </div>
          <div>
            <p className="text-[14px] font-black tracking-tight" style={{ color: isActive ? c : 'rgba(255,255,255,0.85)' }}>
              {chapter.label}
            </p>
            <p className="text-[11px] font-light" style={{ color: 'rgba(255,255,255,0.3)' }}>{chapter.sublabel}</p>
          </div>
        </div>

        {/* Hover arrow */}
        <ArrowUpRight className="absolute top-2 right-2 w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity"
          style={{ color: c }} />
      </motion.div>

      {/* Connector line node→right */}
      {isLeft && (
        <div className="flex-1 h-px opacity-20 group-hover:opacity-50 transition-opacity"
          style={{ background: `linear-gradient(to right, ${c}, transparent)` }} />
      )}
    </motion.div>
  );
}

/* ── Central spine ────────────────────────────────────────────────────────── */
function CentralSpine() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 flex flex-col items-center pointer-events-none" style={{ width: 2 }}>
      <div className="flex-1 w-px" style={{
        background: 'linear-gradient(to bottom, transparent, rgba(220,38,38,0.25) 5%, rgba(252,211,77,0.15) 25%, rgba(167,139,250,0.15) 55%, rgba(248,113,113,0.22) 90%, transparent)',
      }} />
    </div>
  );
}

/* ── Main Page ────────────────────────────────────────────────────────────── */
export default function InteractiveWarning() {
  const [activeChapter, setActiveChapter] = useState(null);
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 26 }, (_, i) => ({
      symbol: SACRED_SYMBOLS[i % SACRED_SYMBOLS.length],
      style: {
        left: `${Math.random() * 96}%`,
        top: `${Math.random() * 96}%`,
        fontSize: `${14 + Math.random() * 20}px`,
        opacity: 0.3 + Math.random() * 0.5,
        transform: `rotate(${(Math.random() - 0.5) * 30}deg)`,
      },
    }));
    setSymbols(generated);
  }, []);

  const handleNodeClick = (chapter) => {
    setActiveChapter(prev => prev?.id === chapter.id ? null : chapter);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#060608', color: '#e2e2e2' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&display=swap');
        .serif { font-family: 'Playfair Display', Georgia, serif !important; }
        .gold-grad { background: linear-gradient(135deg, #fde68a 0%, #f59e0b 50%, #d97706 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hover-rise { transition: transform 0.22s ease; }
        .hover-rise:hover { transform: translateY(-2px); }
      `}</style>

      {/* ── Ambient gradients ── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px]"
          style={{ background: 'radial-gradient(ellipse, rgba(220,38,38,0.1) 0%, transparent 65%)', filter: 'blur(70px)' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px]"
          style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.06) 0%, transparent 65%)', filter: 'blur(70px)' }} />
        <div className="absolute top-1/2 left-0 w-[400px] h-[600px]"
          style={{ background: 'radial-gradient(ellipse, rgba(167,139,250,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute top-1/2 right-0 w-[400px] h-[600px]"
          style={{ background: 'radial-gradient(ellipse, rgba(248,113,113,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      {/* ── Floating sacred symbols background ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {symbols.map((s, i) => <FloatingSymbol key={i} symbol={s.symbol} style={s.style} />)}
      </div>

      {/* ── Subtle grid overlay ── */}
      <div className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(220,38,38,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.018) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }} />

      {/* ── Star field ── */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 45 }, (_, i) => (
          <motion.div key={i} className="absolute rounded-full bg-white"
            style={{ left: `${(i * 17.3 + 5) % 100}%`, top: `${(i * 13.7 + 3) % 100}%`, width: i % 5 === 0 ? 2 : 1, height: i % 5 === 0 ? 2 : 1 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: (i * 0.37) % 6 }} />
        ))}
      </div>

      {/* ── Rising particles ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 14 }, (_, i) => (
          <motion.div key={i} className="absolute rounded-full"
            style={{ left: `${(i * 23.1 + 10) % 95}%`, bottom: '-2px', width: 1.5, height: 1.5,
              background: i % 3 === 0 ? 'rgba(245,158,11,0.7)' : i % 3 === 1 ? 'rgba(220,38,38,0.5)' : 'rgba(167,139,250,0.4)' }}
            animate={{ y: [0, -900], opacity: [0, 0.8, 0] }}
            transition={{ duration: 9 + (i % 5) * 2, delay: i * 1.5, repeat: Infinity, ease: 'linear' }} />
        ))}
      </div>

      {/* ── Sticky TL;DR ── */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-max max-w-[90vw]">
        <Link to="/SupremeWarning"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-bold hover-rise transition-all"
          style={{ background: 'rgba(8,6,18,0.92)', border: '1px solid rgba(220,38,38,0.4)', color: 'rgba(220,38,38,0.9)', boxShadow: '0 4px 30px rgba(0,0,0,0.7), 0 0 20px rgba(220,38,38,0.12)', backdropFilter: 'blur(20px)' }}>
          📖 TL;DR — Read the full warning straight through
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-28">

        {/* ── Nav ── */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-14">
          <Link to="/" className="inline-flex items-center gap-2 text-[12px] transition-colors"
            style={{ color: 'rgba(255,255,255,0.25)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}>
            ← Back to Home
          </Link>
          <Link to="/SupremeWarning" className="text-[11px] transition-colors"
            style={{ color: 'rgba(255,255,255,0.18)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.18)'}>
            Read full text →
          </Link>
        </motion.div>

        {/* ── Hero ── */}
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-[10px] font-bold tracking-[0.22em] uppercase"
            style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.28)', color: 'rgba(220,38,38,0.9)' }}>
            <motion.div className="w-1.5 h-1.5 rounded-full bg-red-500"
              animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.4, repeat: Infinity }} />
            Spiritual Physics · Interactive Map
          </div>
          <h1 className="serif font-black tracking-[-0.03em] leading-[1] mb-5"
            style={{ fontSize: 'clamp(32px, 7vw, 68px)', color: 'rgba(255,255,255,0.96)' }}>
            The Map of the<br />
            <span style={{ background: 'linear-gradient(135deg, #dc2626 0%, #f97316 40%, #fcd34d 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Supreme Warning
            </span>
          </h1>
          <p className="text-[14px] italic font-light max-w-md mx-auto mb-3"
            style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Georgia, serif' }}>
            Spiritual Physics Visualized
          </p>
          <p className="text-[12px] font-light max-w-lg mx-auto leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.22)' }}>
            Eight chapters of the warning. Click any node to expand with the original text.
          </p>
          <p className="text-[10px] mt-2" style={{ color: 'rgba(255,255,255,0.14)' }}>
            Issued · March 29, 2026 · In the earliest hours after midnight
          </p>
        </motion.div>

        {/* ── Main layout: Map + Detail Panel ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── Left: The Constellation Map ── */}
          <div className="flex-1 relative min-w-0">
            <CentralSpine />

            {/* Top label */}
            <motion.div className="text-center mb-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <span className="text-[9px] font-bold tracking-[0.3em] uppercase px-3 py-1 rounded-full"
                style={{ color: 'rgba(248,113,113,0.6)', border: '1px solid rgba(248,113,113,0.18)', background: 'rgba(248,113,113,0.06)' }}>
                ↑ The Personal Supreme Warning
              </span>
            </motion.div>

            {/* Chapter nodes — rendered reversed (soul dissolution at top) */}
            <div className="space-y-3 relative">
              {[...CHAPTERS].reverse().map((chapter, i) => (
                <WarningNode
                  key={chapter.id}
                  chapter={chapter}
                  index={i}
                  isActive={activeChapter?.id === chapter.id}
                  onClick={handleNodeClick}
                />
              ))}
            </div>

            {/* Bottom label */}
            <motion.div className="text-center mt-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <span className="text-[9px] font-bold tracking-[0.3em] uppercase px-3 py-1 rounded-full"
                style={{ color: 'rgba(167,139,250,0.6)', border: '1px solid rgba(167,139,250,0.18)', background: 'rgba(167,139,250,0.06)' }}>
                ↓ The Ignored Eternal Truth
              </span>
            </motion.div>

            {/* The flow strip */}
            <motion.div className="mt-10 rounded-2xl p-5"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }}
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-[9px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.18)' }}>
                The Warning's Logic
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  'Truth Always Present', '→', 'Ignored for Comfort', '→', 'Conquest Chosen', '→',
                  'Reversal Begins', '→', 'Nations Transform or Fall', '→', 'Souls Face Final Account',
                ].map((step, i) => (
                  <span key={i} className="text-[11px]"
                    style={{ color: step === '→' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.48)', fontWeight: step !== '→' ? 500 : 300 }}>
                    {step}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: Detail Panel ── */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <AnimatePresence mode="wait">
              {activeChapter ? (
                <DetailPanel key={activeChapter.id} chapter={activeChapter} onClose={() => setActiveChapter(null)} />
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="rounded-2xl p-6 text-center"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <motion.div className="text-4xl mb-4"
                    animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 3, repeat: Infinity }}>
                    ✦
                  </motion.div>
                  <p className="text-[13px] font-light mb-5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    Click any node on the map to read the full original text for that chapter.
                  </p>
                  <div className="space-y-2">
                    {CHAPTERS.slice(0, 4).map(ch => (
                      <button key={ch.id} onClick={() => setActiveChapter(ch)}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all"
                        style={{ background: `${ch.color}08`, border: `1px solid ${ch.color}18` }}
                        onMouseEnter={e => e.currentTarget.style.background = `${ch.color}14`}
                        onMouseLeave={e => e.currentTarget.style.background = `${ch.color}08`}>
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: ch.color }} />
                        <span className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>{ch.label}</span>
                      </button>
                    ))}
                    <p className="text-[10px] pt-1" style={{ color: 'rgba(255,255,255,0.15)' }}>+ {CHAPTERS.length - 4} more chapters</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Warning issuance card */}
            <motion.div className="mt-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
              <div className="rounded-2xl p-4"
                style={{ background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.2)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <motion.div className="w-1.5 h-1.5 rounded-full bg-red-500"
                    animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.6, repeat: Infinity }} />
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: 'rgba(220,38,38,0.7)' }}>
                    The Supreme Warning
                  </span>
                </div>
                <p className="text-[11px] font-light leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                  Issued March 29, 2026 · In the earliest hours after midnight. Written by hand — with the intuitive guidance of the Spirit of Truth.
                </p>
                <Link to="/SupremeWarning"
                  className="flex items-center justify-center gap-2 py-2 rounded-xl text-[11px] font-bold transition-all hover-rise"
                  style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.3)', color: 'rgba(220,38,38,0.85)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(220,38,38,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(220,38,38,0.12)'}>
                  Read Full Warning →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Closing resonance ── */}
        <motion.div className="mt-20 text-center"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="h-px mb-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.2), rgba(245,158,11,0.2), transparent)' }} />
          <p className="serif text-[17px] italic mb-2" style={{ color: 'rgba(255,255,255,0.42)', fontFamily: 'Georgia, serif' }}>
            "The truth was never newly presented. It has always been here."
          </p>
          <p className="text-[12px] mb-8" style={{ color: 'rgba(255,255,255,0.18)' }}>
            The reservoir grows. It does not shrink. Even when empires try to dam it, it finds another way through.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/SupremeWarning"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[13px] font-bold hover-rise transition-all"
              style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', color: 'rgba(220,38,38,0.88)' }}>
              Read the Full Warning
            </Link>
            <Link to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[13px] font-bold hover-rise transition-all"
              style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.28)', color: 'rgba(167,139,250,0.88)' }}>
              Back to IntelOasis
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}