import { useState } from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { Sprout, Warehouse, CalendarClock, Wheat, ArrowUpRight } from 'lucide-react';
import { STATS, IMAGES } from '../data';

const ICONS = [Sprout, Warehouse, CalendarClock, Wheat];

export default function Stats() {
  const [start, setStart] = useState(false);

  return (
    <section id="stats" className="relative overflow-hidden py-20 md:py-36">
      <div className="mesh opacity-50" />
      <div className="absolute inset-0 bg-forest-950/70" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
          onViewportEnter={() => setStart(true)}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-gold-400">
            На сегодняшний день
          </p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Масштаб, которому <span className="text-gradient-gold">доверяют</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sand-100/65">
            За цифрами — тысячи гектаров пашни, современный зерновой комплекс и команда,
            которая работает на земле Сибири больше двух десятилетий.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-3.5 sm:gap-4 md:mt-16 md:grid-cols-4 md:gap-5">
          {/* фото-панель */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative col-span-2 aspect-[16/11] overflow-hidden rounded-3xl border border-white/10 md:row-span-2 md:aspect-auto"
            data-cursor
          >
            <img
              src={IMAGES.sunsetField}
              alt="Поля «Чернаково» на закате"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-forest-950/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-300 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" /> Полный цикл
              </span>
              <p className="font-display text-2xl font-bold leading-tight text-sand-50 sm:text-3xl">
                От поля до зерна<br />высшего класса
              </p>
              <p className="mt-2 max-w-sm text-sm text-sand-100/70">
                Выращиваем, очищаем, сушим и храним урожай сами — контролируя качество
                на каждом этапе.
              </p>
            </div>
            <span className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-sand-50 backdrop-blur transition group-hover:bg-gold-400 group-hover:text-forest-950">
              <ArrowUpRight size={18} />
            </span>
          </motion.div>

          {/* карточки-метрики */}
          {STATS.map((s, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="border-anim group relative flex h-full flex-col overflow-hidden rounded-3xl glass p-5 sm:p-6"
                data-cursor
              >
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent opacity-0 transition group-hover:opacity-100" />
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-forest-700/60 text-gold-400 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  <Icon size={20} />
                </span>
                <div className="font-display text-3xl font-bold leading-none text-gradient-gold sm:text-4xl">
                  {start ? (
                    <CountUp end={s.value} duration={2} separator=" " suffix={s.suffix} />
                  ) : (
                    `0${s.suffix}`
                  )}
                  <span className="ml-1 text-lg text-gold-300 sm:text-xl">{s.unit}</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-sand-50">{s.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-sand-100/55">{s.sub}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
