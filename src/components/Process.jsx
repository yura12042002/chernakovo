import { motion } from 'framer-motion';
import Reveal, { Stagger, StaggerItem } from './Reveal';
import { PROCESS } from '../data';

export default function Process() {
  return (
    <section id="process" className="relative mx-auto max-w-7xl px-6 py-20 md:py-40">
      <div className="mb-16 max-w-2xl">
        <Reveal>
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-forest-400">
            <span className="h-px w-7 bg-gold-400" /> Как мы работаем
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
            Полный цикл — <span className="text-gradient-gold">от поля до отгрузки</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-lg text-sand-100/65">
            Контролируем зерно на каждом этапе: от подготовки почвы до формирования партии для
            покупателя. Замкнутый цикл — это стабильное качество и предсказуемые сроки.
          </p>
        </Reveal>
      </div>

      <Stagger className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
        {PROCESS.map((p) => (
          <StaggerItem key={p.n}>
            <motion.article
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              data-cursor
              className="border-anim group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-forest-900/40 p-7 backdrop-blur transition-colors hover:bg-forest-900/70 sm:p-8"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold-400/10 blur-2xl transition group-hover:bg-gold-400/20" />
              <span className="font-display text-5xl font-bold text-white/10 transition group-hover:text-gold-400/40">
                {p.n}
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold">{p.title}</h3>
              <p className="mt-3 text-sand-100/65">{p.desc}</p>
            </motion.article>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
