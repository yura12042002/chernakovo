import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Wheat } from 'lucide-react';
import { NAV } from '../data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* прогресс-бар */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[9998] h-[3px] origin-left bg-gradient-to-r from-gold-400 via-lime to-forest-400"
        style={{ scaleX: progress }}
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-[9990] transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 ${
            scrolled ? 'rounded-full glass mx-4 md:mx-auto py-2.5 px-5' : ''
          }`}
        >
          <a href="#hero" className="flex items-center gap-2.5" data-cursor>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-forest-700 text-gold-400">
              <Wheat size={20} />
            </span>
            <span className="leading-none">
              <strong className="font-display block text-[0.95rem] tracking-[0.18em]">ЧЕРНАКОВО</strong>
              <small className="text-[0.62rem] uppercase tracking-[0.2em] text-sand-200/60">зерновая компания</small>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.slice(0, -1).map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="group relative rounded-full px-3.5 py-2 text-sm text-sand-100/85 transition hover:text-sand-50"
                data-cursor
              >
                {n.label}
                <span className="absolute inset-x-3.5 bottom-1.5 h-px origin-left scale-x-0 bg-gold-400 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
            <a
              href="#contacts"
              className="sheen ml-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-5 py-2.5 text-sm font-semibold text-forest-950 transition hover:shadow-[0_10px_30px_-8px_rgba(244,196,90,0.6)]"
              data-cursor
            >
              Контакты
            </a>
          </nav>

          <button
            className="grid h-11 w-11 place-items-center rounded-full glass md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Открыть меню"
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.header>

      {/* мобильное меню */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[9995] flex flex-col bg-forest-950/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display tracking-[0.18em]">ЧЕРНАКОВО</span>
              <button onClick={() => setOpen(false)} aria-label="Закрыть" className="grid h-11 w-11 place-items-center rounded-full glass">
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl text-sand-50"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i }}
                >
                  {n.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
