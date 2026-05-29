import { motion } from 'framer-motion';

export default function Preloader({ onDone }) {
  return (
    <motion.div
      className="fixed inset-0 z-[10001] flex flex-col items-center justify-center bg-forest-950"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={onDone}
      style={{ pointerEvents: 'none' }}
    >
      <div className="relative flex items-end gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            className="block w-2 rounded-full bg-gradient-to-t from-forest-600 to-gold-400"
            initial={{ height: 8 }}
            animate={{ height: [8, 52, 8] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <motion.p
        className="font-display mt-7 text-sm tracking-[0.5em] text-sand-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        ЧЕРНАКОВО
      </motion.p>
    </motion.div>
  );
}
