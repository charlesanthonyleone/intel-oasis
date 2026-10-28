import { motion, useReducedMotion } from 'framer-motion';

export default function Reveal({ children, delay = 0, y = 22, className = '', as = 'div' }) {
  const reduce = useReducedMotion();
  const M = motion[as] || motion.div;
  if (reduce) return <M className={className}>{children}</M>;
  return (
    <M className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}>
      {children}
    </M>
  );
}
