import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { ArrowLeft, ArrowRight, MoveHorizontal } from 'lucide-react';
import Reveal from './Reveal';
import { GALLERY } from '../data';

export default function Gallery() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const [bounds, setBounds] = useState(0);

  useEffect(() => {
    const calc = () => {
      if (!trackRef.current || !containerRef.current) return;
      setBounds(Math.max(0, trackRef.current.scrollWidth - containerRef.current.offsetWidth));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const move = (dir) => {
    const next = Math.max(-bounds, Math.min(0, x.get() - dir * 380));
    animate(x, next, { type: 'spring', stiffness: 320, damping: 42 });
  };

  return (
    <section id="gallery" className="overflow-hidden py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-gold-400">
                <span className="h-px w-7 bg-gold-400" /> Галерея
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                Поле <span className="text-gradient-gold">в кадре</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 max-w-md text-sand-100/65">
                От первых всходов до золотых колосьев и уборки. Так выглядит сезон
                в сибирском хозяйстве «Чернаково».
              </p>
            </Reveal>
          </div>

          <div className="hidden shrink-0 gap-3 md:flex">
            <button
              onClick={() => move(-1)}
              aria-label="Назад"
              className="grid h-12 w-12 place-items-center rounded-full glass text-sand-50 transition hover:bg-gold-400 hover:text-forest-950"
              data-cursor
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => move(1)}
              aria-label="Вперёд"
              className="grid h-12 w-12 place-items-center rounded-full glass text-sand-50 transition hover:bg-gold-400 hover:text-forest-950"
              data-cursor
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="mx-auto mt-10 max-w-[100rem] cursor-grab overflow-hidden px-6 active:cursor-grabbing md:mt-14">
        <motion.div
          ref={trackRef}
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -bounds, right: 0 }}
          dragElastic={0.08}
          className="flex w-max gap-4 sm:gap-5"
        >
          {GALLERY.map((g, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="group relative h-[400px] w-[280px] shrink-0 overflow-hidden rounded-3xl border border-white/10 sm:h-[460px] sm:w-[340px]"
            >
              <img
                src={g.src}
                alt={g.title}
                loading="lazy"
                draggable={false}
                className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/15 to-transparent" />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-6">
                <span className="mb-2 inline-block rounded-full bg-black/35 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-300 backdrop-blur">
                  {g.tag}
                </span>
                <p className="font-display text-xl font-bold text-sand-50">{g.title}</p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto mt-6 flex max-w-7xl items-center gap-2 px-6 text-xs uppercase tracking-wider text-sand-100/40 md:hidden">
        <MoveHorizontal size={15} /> Листайте вбок
      </div>
    </section>
  );
}
