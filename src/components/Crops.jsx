import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Stagger, StaggerItem } from './Reveal';
import Reveal from './Reveal';
import { CROPS } from '../data';

function TiltCard({ crop, index }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });
  const glareX = useTransform(sry, [-12, 12], ['0%', '100%']);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 18);
    rx.set(-py * 18);
  };
  const reset = () => { rx.set(0); ry.set(0); };

  return (
    <StaggerItem>
      <motion.article
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
        data-cursor
        className={`group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${crop.tone} to-forest-900/40 p-6 backdrop-blur sm:p-8`}
      >
        {/* блик */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
          style={{
            background: useTransform(glareX, (x) => `radial-gradient(circle at ${x} 0%, rgba(255,255,255,0.18), transparent 60%)`),
          }}
        />
        <div className="mb-6 grid h-20 w-20 place-items-center rounded-2xl bg-forest-950/40 text-5xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
          {crop.emoji}
        </div>
        <div className="flex items-center gap-3">
          <h3 className="font-display text-3xl font-semibold">{crop.name}</h3>
        </div>
        <span className="mt-2 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-gold-300">
          {crop.tag}
        </span>
        <p className="mt-4 text-sand-100/65">{crop.desc}</p>
        <span className="absolute right-6 top-6 font-display text-4xl font-bold text-white/10 transition group-hover:text-gold-400/50">
          0{index + 1}
        </span>
      </motion.article>
    </StaggerItem>
  );
}

export default function Crops() {
  return (
    <section id="crops" className="mx-auto max-w-7xl px-6 py-20 md:py-40">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <Reveal>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-forest-400">
            Что мы выращиваем
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl font-bold md:text-6xl">
            Наши <span className="text-gradient-gold">культуры</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-5 text-lg text-sand-100/65">
            Тщательная обработка на собственных мощностях обеспечивает стабильно высокое качество.
          </p>
        </Reveal>
      </div>

      <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
        {CROPS.map((c, i) => (
          <TiltCard key={c.name} crop={c} index={i} />
        ))}
        {/* акцентная карточка */}
        <StaggerItem>
          <motion.a
            href="#contacts"
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            data-cursor
            className="sheen group flex h-full flex-col justify-center rounded-3xl bg-gradient-to-br from-gold-400 to-gold-600 p-6 text-forest-950 sm:p-8"
          >
            <span className="text-5xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-90">➕</span>
            <h3 className="mt-6 font-display text-3xl font-semibold">Другие культуры</h3>
            <p className="mt-3 font-medium text-forest-900/80">
              Расширяем севооборот под запросы рынка и партнёров. Обсудим вашу культуру.
            </p>
          </motion.a>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
