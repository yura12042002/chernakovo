import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import MagneticButton from './MagneticButton';

const TITLE = ['Зерно', 'нового', 'поколения'];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 20 });
  const py = useSpring(my, { stiffness: 60, damping: 20 });
  const onMove = (e) => {
    const { innerWidth: w, innerHeight: h } = window;
    mx.set((e.clientX / w - 0.5) * 2);
    my.set((e.clientY / h - 0.5) * 2);
  };

  // два фиксированных параллакс-слоя (без хуков в цикле)
  const nearX = useTransform(px, (v) => v * 22);
  const nearY = useTransform(py, (v) => v * 22);
  const farX = useTransform(px, (v) => v * -16);
  const farY = useTransform(py, (v) => v * -16);

  const FLOATERS = [
    { e: '🌾', left: 8, top: 24, layer: 'near', size: 'text-4xl md:text-6xl', mobile: true },
    { e: '🌱', left: 82, top: 18, layer: 'far', size: 'text-3xl md:text-5xl', mobile: true },
    { e: '🌿', left: 18, top: 70, layer: 'near', size: 'text-3xl md:text-5xl', mobile: false },
    { e: '🌼', left: 72, top: 74, layer: 'far', size: 'text-4xl md:text-5xl', mobile: true },
    { e: '🫛', left: 90, top: 46, layer: 'near', size: 'text-3xl md:text-5xl', mobile: false },
    { e: '🌾', left: 40, top: 12, layer: 'far', size: 'text-2xl md:text-4xl', mobile: false },
    { e: '🌿', left: 60, top: 60, layer: 'near', size: 'text-3xl md:text-5xl', mobile: false },
  ];

  return (
    <section
      id="hero"
      ref={ref}
      onMouseMove={onMove}
      className="noise relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* фон-меш */}
      <motion.div className="mesh" style={{ scale }} />
      <div className="grid-field absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-950/30 via-transparent to-forest-950" />

      {/* плавающие эмодзи-культуры */}
      {FLOATERS.map((f, i) => (
        <motion.span
          key={i}
          className={`float-y pointer-events-none absolute select-none opacity-70 ${f.size} ${f.mobile ? '' : 'hidden sm:inline-block'}`}
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            x: f.layer === 'near' ? nearX : farX,
            y: f.layer === 'near' ? nearY : farY,
          }}
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
        >
          {f.e}
        </motion.span>
      ))}

      <motion.div className="relative z-10 mx-auto w-full max-w-7xl px-6" style={{ y: yText, opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.6 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-semibold tracking-wide"
        >
          <Sparkles size={14} className="text-gold-400" />
          Новосибирская область · с 2004 года
        </motion.div>

        <h1 className="font-display text-[clamp(2.8rem,9vw,8rem)] font-bold leading-[0.92] tracking-tight">
          {TITLE.map((word, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className={`inline-block ${i === 2 ? 'text-gradient-gold' : ''}`}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: 2.2 + i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7, duration: 0.7 }}
          className="mt-8 max-w-xl text-lg text-sand-100/80 md:text-xl"
        >
          <span className="font-semibold text-sand-50">ООО «Чернаково»</span> — современная зерновая
          компания Сибири. Выращиваем пшеницу, ячмень, горох, гречиху и рапс на 9 000 гектарах.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.9, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            href="#crops"
            className="sheen group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-7 py-4 font-semibold text-forest-950 shadow-[0_18px_44px_-16px_rgba(244,196,90,0.6)] transition-shadow hover:shadow-[0_22px_60px_-16px_rgba(244,196,90,0.8)]"
          >
            Наши культуры
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </MagneticButton>
          <MagneticButton
            href="#contacts"
            className="inline-flex items-center gap-2 rounded-full glass px-7 py-4 font-semibold text-sand-50 transition-colors hover:bg-white/10"
          >
            Связаться
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* индикатор скролла */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-sand-100/60"
      >
        <span className="flex h-9 w-6 justify-center rounded-full border border-sand-100/40 p-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-gold-400"
            animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </span>
        Листайте
      </motion.div>
    </section>
  );
}
