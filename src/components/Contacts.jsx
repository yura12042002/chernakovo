import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Reveal from './Reveal';
import MagneticButton from './MagneticButton';

function Field({ id, label, type = 'text', textarea, value, onChange }) {
  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          rows={3}
          value={value}
          onChange={onChange}
          placeholder=" "
          className="peer w-full resize-none rounded-2xl border border-white/15 bg-white/5 px-5 pb-4 pt-5 text-sand-50 outline-none transition focus:border-gold-400 focus:bg-white/10"
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder=" "
          className="peer w-full rounded-2xl border border-white/15 bg-white/5 px-5 pb-4 pt-5 text-sand-50 outline-none transition focus:border-gold-400 focus:bg-white/10"
        />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-5 top-4 text-sand-100/50 transition-all peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-gold-300 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:text-gold-300"
      >
        {label}
      </label>
    </div>
  );
}

export default function Contacts() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setSent(true);
    setTimeout(() => { setForm({ name: '', phone: '', message: '' }); }, 300);
  };

  return (
    <section id="contacts" className="mx-auto max-w-7xl px-6 py-20 md:py-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-forest-800 to-forest-950">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gold-400/20 blur-3xl" />
          <div className="relative grid gap-12 p-9 md:grid-cols-2 md:p-16">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-gold-400">
                Контакты
              </p>
              <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
                Готовы к <span className="text-gradient-gold">сотрудничеству</span>
              </h2>
              <p className="mt-5 max-w-sm text-lg text-sand-100/70">
                Оставьте заявку — обсудим поставки зерна, условия и объёмы. Ответим в рабочее время.
              </p>

              <div className="mt-9 space-y-3">
                <a href="tel:+73835035167" className="block rounded-2xl glass px-5 py-4 transition hover:bg-white/10" data-cursor>
                  <span className="text-xs uppercase tracking-wider text-sand-100/50">Телефон</span>
                  <p className="text-lg font-semibold text-gold-300">+7 (383) 50‑35‑167</p>
                </a>
                <a href="mailto:info@chernakovo.ru" className="block rounded-2xl glass px-5 py-4 transition hover:bg-white/10" data-cursor>
                  <span className="text-xs uppercase tracking-wider text-sand-100/50">Почта</span>
                  <p className="text-lg font-semibold text-gold-300">info@chernakovo.ru</p>
                </a>
                <div className="rounded-2xl glass px-5 py-4">
                  <span className="text-xs uppercase tracking-wider text-sand-100/50">Адрес</span>
                  <p className="text-sand-50">Новосибирская обл., Ордынский р-н,<br />п. Чернаково, ул. Ильина, 84А</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-sand-100/55">
                <span><span className="text-sand-100/40">ИНН</span> 5434116945</span>
                <span><span className="text-sand-100/40">ОГРН</span> 1045404496390</span>
                <span><span className="text-sand-100/40">КПП</span> 543401001</span>
                <span><span className="text-sand-100/40">Пн–Пт</span> 8:00–17:00</span>
              </div>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <Field id="name" label="Ваше имя" value={form.name} onChange={set('name')} />
              <Field id="phone" label="Телефон" type="tel" value={form.phone} onChange={set('phone')} />
              <Field id="message" label="Сообщение" textarea value={form.message} onChange={set('message')} />

              <MagneticButton
                onClick={submit}
                className="sheen flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-gold-400 to-gold-500 px-7 py-4 font-semibold text-forest-950 shadow-[0_18px_44px_-16px_rgba(244,196,90,0.6)] transition-shadow hover:shadow-[0_22px_60px_-16px_rgba(244,196,90,0.8)]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {sent ? (
                    <motion.span key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                      Отправлено <Check size={18} />
                    </motion.span>
                  ) : (
                    <motion.span key="go" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      Отправить заявку <ArrowRight size={18} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </MagneticButton>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
