import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Check } from 'lucide-react';
import Reveal from './Reveal';
import { IMAGES } from '../data';

const POINTS = [
  'Современное производство с новой техникой',
  'Собственное зернохранилище АЗМ-AGRO-34 на газе',
  'Стабильный коллектив профессионалов',
  'Контроль качества на каждом этапе',
];

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <section id="about" ref={ref} className="relative mx-auto max-w-7xl px-6 py-20 md:py-40">
      <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
        {/* визуал */}
        <div className="relative">
          <motion.div
            style={{ y, rotate }}
            className="relative overflow-hidden rounded-[2rem] shadow-2xl"
          >
            <img
              src={IMAGES.harvester}
              alt="Уборка урожая в хозяйстве «Чернаково»"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-forest-900/85 via-forest-950/70 to-forest-950/90" />
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-gold-400/30 blur-3xl" />
            <div className="relative p-10">
              <span className="font-display text-7xl font-bold text-gradient-gold md:text-8xl">2004</span>
              <p className="mt-2 text-sand-100/80">год основания хозяйства</p>
              <div className="mt-10 h-px w-full bg-white/15" />
              <p className="mt-6 text-sm text-sand-100/70">
                С 2021 года — новые собственники и стратегия развития на 5 лет.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            className="float-y absolute -bottom-8 -right-4 rounded-2xl glass px-6 py-5 md:-right-10"
          >
            <span className="font-display text-3xl text-gold-400">9 000</span>
            <span className="ml-1 text-sand-100/70">Га</span>
            <p className="text-xs text-sand-100/50">плодородной земли</p>
          </motion.div>
        </div>

        {/* текст */}
        <div>
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-forest-400">
              <span className="h-px w-7 bg-gold-400" /> О компании
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
              Крупное сельхоз­предприятие <span className="text-gradient-lime">Сибири</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-lg text-sand-100/70">
              Основное направление ООО «Чернаково» — выращивание зерновых, зернобобовых и масличных
              культур в Ордынском районе Новосибирской области. Хозяйство ведёт деятельность
              с 2004 года, а с 2021-го новые собственники реализуют стратегию развития:
              расширяют земельный фонд, обновляют технику и складские мощности.
            </p>
          </Reveal>

          <ul className="mt-9 space-y-3.5">
            {POINTS.map((p, i) => (
              <Reveal key={i} delay={0.3 + i * 0.08}>
                <li className="flex items-center gap-3.5 text-sand-50">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-forest-600 text-sand-50">
                    <Check size={16} />
                  </span>
                  {p}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
