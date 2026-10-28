import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-36 px-6">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-medium tracking-widest uppercase mb-8">
            <Lightbulb className="w-3.5 h-3.5" />
            Leone University
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-slate-900 mb-6"
        >
          Intel<span className="font-semibold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">Oasis</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed mb-4">
            An archive of ideas designed to revolutionize humanity.
          </p>
          <p className="text-base text-slate-400 font-light leading-relaxed">
            Each idea is open — anyone can take it, build it, and bring it to life. 
            We believe the best ideas shouldn't be locked away. They should be shared, 
            refined, and set free into the world.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mt-12 flex items-center justify-center gap-8 text-xs text-slate-400 tracking-widest uppercase"
        >
          <span>Open Source Ideas</span>
          <span className="w-1 h-1 rounded-full bg-amber-400" />
          <span>For Humanity</span>
          <span className="w-1 h-1 rounded-full bg-amber-400" />
          <span>Leone University</span>
        </motion.div>
      </div>
    </section>
  );
}