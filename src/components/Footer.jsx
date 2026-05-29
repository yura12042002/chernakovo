import { Wheat, ArrowUp } from 'lucide-react';
import { NAV, REQUISITES } from '../data';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-forest-950 pt-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-forest-700 text-gold-400">
              <Wheat size={20} />
            </span>
            <span className="leading-none">
              <strong className="font-display block tracking-[0.18em]">ЧЕРНАКОВО</strong>
              <small className="text-[0.62rem] uppercase tracking-[0.2em] text-sand-200/50">
                зерновая компания · с 2004
              </small>
            </span>
          </div>
          <p className="mt-5 max-w-xs text-sand-100/55">
            Выращиваем зерно для тех, кто ценит качество и надёжность.
          </p>
        </div>

        <nav className="flex flex-col gap-2.5">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="w-fit text-sand-100/70 transition hover:text-gold-400" data-cursor>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="text-sm text-sand-100/60">
          <p className="font-bold text-sand-50">{REQUISITES.fullName}</p>
          <p className="mt-1.5">{REQUISITES.index}, {REQUISITES.address}</p>
          <p className="mt-1.5">Ген. директор — {REQUISITES.director}</p>
          <p className="mt-2.5 text-sand-100/45">
            ИНН {REQUISITES.inn} · ОГРН {REQUISITES.ogrn} · КПП {REQUISITES.kpp}
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 border-t border-white/10 px-6 py-6 text-sm text-sand-100/50">
        <span>© {new Date().getFullYear()} ООО «Чернаково». Все права защищены.</span>
        <a href="#hero" className="flex items-center gap-1.5 transition hover:text-gold-400" data-cursor>
          Наверх <ArrowUp size={15} />
        </a>
      </div>
    </footer>
  );
}
