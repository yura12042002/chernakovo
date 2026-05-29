import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Кастомный курсор с «магнитным» увеличением на интерактиве
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });
  const ringX = useSpring(x, { stiffness: 150, damping: 22, mass: 0.7 });
  const ringY = useSpring(y, { stiffness: 150, damping: 22, mass: 0.7 });
  const raf = useRef(0);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const t = document.elementFromPoint(e.clientX, e.clientY);
        setHover(!!t?.closest('a, button, [data-cursor]'));
      });
    };
    window.addEventListener('mousemove', move);
    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf.current);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400"
        style={{ x: sx, y: sy }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-400/70"
        style={{ x: ringX, y: ringY }}
        animate={{ width: hover ? 56 : 34, height: hover ? 56 : 34, opacity: hover ? 1 : 0.6 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      />
    </>
  );
}
