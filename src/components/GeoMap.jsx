import { motion } from 'framer-motion';

/**
 * Кастомная стилизованная карта района (не тайловая, а художественная).
 * Композиция читается как настоящая карта: два берега и широкое
 * Обское водохранилище между ними. На правом берегу — посёлок Чернаково
 * (Ордынский р-н, НСО), отмеченный золотым маркером «мы здесь».
 */

// границы русла (берега водохранилища) — сверху вниз
const EAST_BANK = 'M540 -10 C500 110 452 184 392 256 C332 326 214 420 124 510';
const WEST_BANK = 'M470 -10 C430 112 378 178 318 248 C256 318 138 404 46 510';

// центральная линия русла — для блика-течения
const CENTER = 'M506 0 C465 112 415 182 355 252 C295 322 176 412 86 510';

// суша правого берега (нижний-левый сегмент): Ордынское, Чернаково
const LAND_WEST =
  'M470 -10 C430 112 378 178 318 248 C256 318 138 404 46 510 L-10 510 L-10 -10 Z';
// суша левого берега (верхний-правый сегмент): Новосибирск, Бердск
const LAND_EAST =
  'M540 -10 C500 110 452 184 392 256 C332 326 214 420 124 510 L610 510 L610 -10 Z';

const CONTOURS = [
  'M30 90 C140 64 220 120 300 90',
  'M24 168 C130 146 210 196 300 168',
  'M40 300 C120 286 190 326 268 300',
  'M70 392 C140 380 210 414 286 392',
];

// поля у Чернаково
const FIELDS = [
  { x: 120, y: 372, w: 50, h: 30, r: -16 },
  { x: 150, y: 402, w: 56, h: 28, r: -16 },
  { x: 92, y: 404, w: 42, h: 26, r: -16 },
  { x: 188, y: 386, w: 40, h: 24, r: -16 },
];

const CITIES = [
  { x: 524, y: 52, label: 'Новосибирск', sub: 'плотина ГЭС', align: 'end' },
  { x: 506, y: 150, label: 'Бердск', align: 'end' },
  { x: 252, y: 250, label: 'Ордынское', sub: 'райцентр', align: 'end' },
];

const ROUTE = 'M518 64 C470 130 360 150 300 210 C236 274 206 300 188 344';
const PIN = { x: 186, y: 348 };

export default function GeoMap() {
  return (
    <svg
      viewBox="0 0 600 500"
      className="h-full w-full"
      role="img"
      aria-label="Карта расположения посёлка Чернаково на правом берегу Обского водохранилища"
    >
      <defs>
        <linearGradient id="mapLandW" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#103019" />
          <stop offset="1" stopColor="#07140c" />
        </linearGradient>
        <linearGradient id="mapLandE" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d2716" />
          <stop offset="1" stopColor="#06110a" />
        </linearGradient>
        <linearGradient id="mapWater" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#3c93b0" />
          <stop offset="0.5" stopColor="#2a7793" />
          <stop offset="1" stopColor="#19465a" />
        </linearGradient>
        <radialGradient id="mapVignette" cx="42%" cy="38%" r="80%">
          <stop offset="0.5" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.55" />
        </radialGradient>
        <filter id="bankBlur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id="pinGlow" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* вода — заливка всего поля (видна только в русле между берегами) */}
      <rect width="600" height="500" fill="url(#mapWater)" />

      {/* блик-течение по центру русла */}
      <path d={CENTER} fill="none" stroke="#eaf8ff" strokeOpacity="0.55" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="3 24" className="map-flow" />
      <path d={CENTER} fill="none" stroke="#bfe7f4" strokeOpacity="0.22" strokeWidth="10" strokeLinecap="round" filter="url(#bankBlur)" />

      {/* берега-подсветка */}
      <path d={WEST_BANK} fill="none" stroke="#0a1d11" strokeOpacity="0.6" strokeWidth="10" filter="url(#bankBlur)" />
      <path d={EAST_BANK} fill="none" stroke="#0a1d11" strokeOpacity="0.6" strokeWidth="10" filter="url(#bankBlur)" />

      {/* суша — два берега */}
      <path d={LAND_WEST} fill="url(#mapLandW)" />
      <path d={LAND_EAST} fill="url(#mapLandE)" />

      {/* тонкая кромка берегов */}
      <path d={WEST_BANK} fill="none" stroke="#5bbd7d" strokeOpacity="0.4" strokeWidth="1.4" />
      <path d={EAST_BANK} fill="none" stroke="#5bbd7d" strokeOpacity="0.4" strokeWidth="1.4" />

      {/* сетка широт/долгот */}
      <g stroke="#ffffff" strokeOpacity="0.045" strokeWidth="1">
        {[80, 160, 240, 320, 400].map((y) => <line key={y} x1="0" y1={y} x2="600" y2={y} strokeDasharray="2 9" />)}
        {[100, 200, 300, 400, 500].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="500" strokeDasharray="2 9" />)}
      </g>

      {/* рельеф — изолинии (на левом берегу, где наше хозяйство) */}
      <g fill="none" stroke="#45a866" strokeOpacity="0.18" strokeWidth="1.3">
        {CONTOURS.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.3 + i * 0.15, ease: 'easeInOut' }}
          />
        ))}
      </g>

      {/* поля у Чернаково */}
      <g>
        {FIELDS.map((f, i) => (
          <motion.rect
            key={i}
            x={f.x} y={f.y} width={f.w} height={f.h} rx="4"
            transform={`rotate(${f.r} ${f.x + f.w / 2} ${f.y + f.h / 2})`}
            fill="#f6c84f" fillOpacity="0.08" stroke="#f6c84f" strokeOpacity="0.28" strokeWidth="1"
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 + i * 0.08, type: 'spring', stiffness: 160 }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        ))}
      </g>

      {/* подпись водоёма вдоль русла */}
      <text x="372" y="214" fill="#dff3ff" fillOpacity="0.78" fontSize="13" fontWeight="600" fontStyle="italic" transform="rotate(38 372 214)" fontFamily="Manrope, sans-serif">
        Обское вдхр.
      </text>

      {/* маршрут до Новосибирска — плавный «текущий» пунктир.
          Анимируем только opacity (не pathLength), чтобы framer-motion
          не выставлял inline stroke-dashoffset и не конфликтовал с .map-dash */}
      <motion.path
        d={ROUTE} fill="none" stroke="#f6c84f" strokeOpacity="0.6" strokeWidth="1.8" strokeDasharray="7 7"
        className="map-dash"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.6 }}
      />
      <circle r="3" fill="#ffe7a3">
        <animateMotion dur="6s" repeatCount="indefinite" path={ROUTE} rotate="auto" />
      </circle>
      <text x="372" y="186" fill="#f6c84f" fillOpacity="0.55" fontSize="10" textAnchor="middle" transform="rotate(26 372 186)" fontFamily="Manrope, sans-serif">
        ≈ 110 км
      </text>

      {/* города */}
      <g fontFamily="Manrope, sans-serif">
        {CITIES.map((c) => (
          <g key={c.label}>
            <circle cx={c.x} cy={c.y} r="3.5" fill="#efe9da" />
            <circle cx={c.x} cy={c.y} r="7.5" fill="none" stroke="#efe9da" strokeOpacity="0.28" />
            <text
              x={c.align === 'end' ? c.x - 12 : c.x + 12}
              y={c.y + 4}
              textAnchor={c.align}
              fill="#efe9da" fillOpacity="0.85" fontSize="13" fontWeight="600"
            >
              {c.label}
            </text>
            {c.sub && (
              <text
                x={c.align === 'end' ? c.x - 12 : c.x + 12}
                y={c.y + 18}
                textAnchor={c.align}
                fill="#efe9da" fillOpacity="0.42" fontSize="10"
              >
                {c.sub}
              </text>
            )}
          </g>
        ))}
      </g>

      {/* метка Чернаково */}
      <g>
        <circle cx={PIN.x} cy={PIN.y} r="9" fill="none" stroke="#f6c84f" strokeWidth="2" style={{ transformOrigin: `${PIN.x}px ${PIN.y}px`, animation: 'pulseRing 2.6s var(--ease-spring) infinite' }} />
        <circle cx={PIN.x} cy={PIN.y} r="9" fill="none" stroke="#f6c84f" strokeWidth="2" style={{ transformOrigin: `${PIN.x}px ${PIN.y}px`, animation: 'pulseRing 2.6s var(--ease-spring) infinite', animationDelay: '1.3s' }} />
        <circle cx={PIN.x} cy={PIN.y} r="6.5" fill="#f6c84f" filter="url(#pinGlow)" />
        <circle cx={PIN.x} cy={PIN.y} r="2.4" fill="#06130c" />
        <motion.g
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1, type: 'spring', stiffness: 200 }}
        >
          <rect x={PIN.x - 58} y={PIN.y - 44} width="116" height="27" rx="13.5" fill="#f8f5ee" />
          <text x={PIN.x} y={PIN.y - 25} textAnchor="middle" fill="#06130c" fontSize="13" fontWeight="800" fontFamily="Manrope, sans-serif">
            Чернаково
          </text>
          <path d={`M${PIN.x - 5} ${PIN.y - 17} L${PIN.x + 5} ${PIN.y - 17} L${PIN.x} ${PIN.y - 10} Z`} fill="#f8f5ee" />
        </motion.g>
      </g>

      {/* компас */}
      <g transform="translate(552 56)" opacity="0.75">
        <circle r="18" fill="#06130c" fillOpacity="0.5" stroke="#efe9da" strokeOpacity="0.3" />
        <path d="M0 -13 L4 4 L0 0 L-4 4 Z" fill="#f6c84f" />
        <text x="0" y="-22" textAnchor="middle" fill="#efe9da" fontSize="11" fontWeight="700" fontFamily="Manrope, sans-serif">С</text>
      </g>

      {/* легенда */}
      <g transform="translate(24 24)" fontFamily="Manrope, sans-serif">
        <rect x="-4" y="-4" width="150" height="74" rx="12" fill="#06130c" fillOpacity="0.55" stroke="#ffffff" strokeOpacity="0.08" />
        <g transform="translate(8 14)">
          <circle cx="6" cy="0" r="5.5" fill="#f6c84f" />
          <text x="20" y="4" fill="#efe9da" fillOpacity="0.85" fontSize="11" fontWeight="600">Чернаково — мы здесь</text>
        </g>
        <g transform="translate(8 36)">
          <circle cx="6" cy="0" r="3.5" fill="#efe9da" />
          <text x="20" y="4" fill="#efe9da" fillOpacity="0.6" fontSize="11">город</text>
        </g>
        <g transform="translate(8 56)">
          <rect x="0" y="-4" width="12" height="8" rx="2" fill="#2a7793" />
          <text x="20" y="4" fill="#efe9da" fillOpacity="0.6" fontSize="11">водохранилище</text>
        </g>
      </g>

      {/* масштаб */}
      <g transform="translate(40 470)" fontFamily="Manrope, sans-serif">
        <line x1="0" y1="0" x2="80" y2="0" stroke="#efe9da" strokeOpacity="0.5" strokeWidth="2" />
        <line x1="0" y1="-4" x2="0" y2="4" stroke="#efe9da" strokeOpacity="0.5" strokeWidth="2" />
        <line x1="80" y1="-4" x2="80" y2="4" stroke="#efe9da" strokeOpacity="0.5" strokeWidth="2" />
        <text x="40" y="-8" textAnchor="middle" fill="#efe9da" fillOpacity="0.5" fontSize="10">≈ 20 км</text>
      </g>

      {/* координаты */}
      <text x="566" y="486" textAnchor="end" fill="#efe9da" fillOpacity="0.42" fontSize="11" fontFamily="Manrope, sans-serif">
        54.2° N · 81.9° E
      </text>

      <rect width="600" height="500" fill="url(#mapVignette)" pointerEvents="none" />
    </svg>
  );
}
