import { motion } from 'framer-motion';
import Reveal, { Stagger, StaggerItem } from './Reveal';
import { ADVANTAGES } from '../data';

export default function Advantages() {
  return (
    <section id="advantages" className="relative bg-forest-900/40 py-20 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 grid items-end gap-8 md:grid-cols-2">
          <div>
            <Reveal>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-forest-400">
                Почему выбирают «Чернаково»
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                Опыт, технологии <br />и <span className="text-gradient-gold">ответственность</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="md:pb-2">
            <p className="text-lg text-sand-100/65">
              Соединяем 20-летний опыт работы на земле с современным оборудованием
              и честным отношением к каждому партнёру.
            </p>
          </Reveal>
        </div>

        <Stagger className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {ADVANTAGES.map((a) => (
            <StaggerItem key={a.n}>
              <motion.div
                whileHover="hover"
                data-cursor
                className="group relative h-full bg-forest-950/60 p-7 transition-colors hover:bg-forest-900/80 sm:p-9"
              >
                <span className="inline-block font-display text-xl font-bold text-gold-500 transition-transform duration-300 group-hover:-translate-y-1">{a.n}</span>
                <h3 className="mt-5 text-xl font-bold transition-colors group-hover:text-gold-300">{a.title}</h3>
                <p className="mt-2.5 text-sand-100/60">{a.desc}</p>
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-gold-400"
                  variants={{ hover: { width: '100%' } }}
                  initial={{ width: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
