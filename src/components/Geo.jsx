import { MapPin, Phone, Navigation, Waves, Sprout, ThermometerSun } from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from './Reveal';
import GeoMap from './GeoMap';

const FACTS = [
  { icon: Navigation, value: '≈ 110 км', label: 'до Новосибирска' },
  { icon: Waves, value: 'Берег', label: 'Обского водохранилища' },
  { icon: Sprout, value: 'Чернозём', label: 'плодородные почвы юга Сибири' },
  { icon: ThermometerSun, value: 'Климат', label: 'континентальный, тёплое лето' },
];

export default function Geo() {
  return (
    <section id="geo" className="mx-auto max-w-7xl px-6 py-20 md:py-40">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
        <div>
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-forest-400">
              <span className="h-px w-7 bg-gold-400" /> География
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
              В сердце <span className="text-gradient-lime">Сибири</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-lg text-sand-100/70">
              Поля и производство «Чернаково» расположены в Ордынском районе Новосибирской
              области — на правом берегу Обского водохранилища. Это один из самых
              плодородных аграрных уголков юга Западной Сибири: чернозёмные почвы,
              большое число солнечных дней и чистая вода рядом.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-4 max-w-md text-sand-100/55">
              Близость к Новосибирску и федеральным трассам даёт удобную логистику —
              отгружаем зерно переработчикам, трейдерам и на экспортные направления
              без лишних плеч и простоев.
            </p>
          </Reveal>

          <Stagger className="mt-9 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2" stagger={0.08}>
            {FACTS.map((f) => {
              const Icon = f.icon;
              return (
                <StaggerItem key={f.label}>
                  <div className="group flex h-full items-start gap-3 rounded-2xl glass p-4 transition hover:bg-white/10" data-cursor>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-forest-700/70 text-gold-400 transition-transform group-hover:scale-110">
                      <Icon size={17} />
                    </span>
                    <span>
                      <span className="block font-display text-base font-bold text-sand-50">{f.value}</span>
                      <span className="block text-xs text-sand-100/55">{f.label}</span>
                    </span>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>

          <div className="mt-7 space-y-3">
            <Reveal delay={0.3}>
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest-700 text-gold-400">
                  <MapPin size={20} />
                </span>
                <p className="pt-1.5 text-sand-50">
                  Новосибирская обл., Ордынский р-н,<br />п. Чернаково, ул. Ильина, 84А
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <a href="tel:+73835035167" className="flex items-center gap-4" data-cursor>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest-700 text-gold-400">
                  <Phone size={20} />
                </span>
                <span className="text-lg font-semibold text-sand-50 transition hover:text-gold-400">
                  +7 (383) 50‑35‑167
                </span>
              </a>
            </Reveal>
          </div>
        </div>

        {/* кастомная карта района */}
        <Reveal dir="left">
          <div className="relative aspect-[6/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]">
            <GeoMap />
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-gold-400/10" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
