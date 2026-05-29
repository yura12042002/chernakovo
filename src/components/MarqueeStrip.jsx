import Marquee from 'react-fast-marquee';

const ITEMS = ['Пшеница', 'Ячмень', 'Горох', 'Гречиха', 'Рапс', 'Полный цикл', 'Экспорт', 'Качество', 'Сибирь', 'С 2004 года'];

export default function MarqueeStrip() {
  return (
    <div className="border-y border-white/5 bg-forest-900/60 py-6">
      <Marquee speed={55} gradient={false} pauseOnHover>
        {ITEMS.map((t, i) => (
          <span key={i} className="mx-8 flex items-center gap-8">
            <span className="font-display text-2xl font-medium text-sand-100 md:text-4xl">{t}</span>
            <span className="text-gold-500">✦</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
