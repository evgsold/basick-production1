"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    contact: "",
    type: "Реклама",
    budget: "",
    comment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Имитация отправки
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#070707] text-black dark:text-white pt-24 sm:pt-32 pb-36 sm:pb-48 px-6 sm:px-12 overflow-y-visible">
      <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
        
        {/* Заголовок */}
        <div className="space-y-2 border-b border-neutral-200 dark:border-neutral-800 pb-6">
          <div className="font-mono text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            [ 02 // СВЯЗЬ И БРИФ ]
          </div>
          <h1 className="text-4xl sm:text-7xl font-bold uppercase font-sans tracking-tight leading-[0.9]">
            НАЧАТЬ ПРОЕКТ
          </h1>
          <p className="font-mono text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 uppercase pt-2">
            Напишите напрямую или заполните короткую форму ниже.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 font-mono">
          
          {/* Левая колонка: Прямые контакты */}
          <div className="lg:col-span-5 space-y-8 text-xs uppercase tracking-wider">
            <div className="space-y-2">
              <span className="text-neutral-400 text-[10px]">// ЭЛЕКТРОННАЯ ПОЧТА</span>
              <div className="text-base sm:text-lg font-bold font-sans text-black dark:text-white">
                <a href="mailto:hello@basickprod.com" className="hover:underline">
                  HELLO@BASICKPROD.COM
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-neutral-400 text-[10px]">// МЕССЕНДЖЕР</span>
              <div className="text-base sm:text-lg font-bold font-sans text-black dark:text-white">
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  TELEGRAM: @BASICK_PROD
                </a>
              </div>
            </div>

            <div className="space-y-2 border-t border-neutral-200 dark:border-neutral-800 pt-6">
              <span className="text-neutral-400 text-[10px]">// ЛОКАЦИИ</span>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                МОСКВА — СТУДИЯ И ЦЕХ
                <br />
                ДУБАЙ — ПРЕДСТАВИТЕЛЬСТВО
                <br />
                ВЫЕЗДНЫЕ СМЕНЫ ПО ВСЕМУ МИРУ
              </p>
            </div>
          </div>

          {/* Правая колонка: Форма быстрого брифа */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="border border-neutral-300 dark:border-neutral-700 p-8 space-y-3 bg-neutral-50 dark:bg-neutral-900/50">
                <div className="text-green-600 dark:text-green-400 font-bold text-sm">
                  ✓ ЗАЯВКА ПРИНЯТА
                </div>
                <h2 className="text-2xl font-bold font-sans uppercase">СВЯЖЕМСЯ С ВАМИ СЕГОДНЯ</h2>
                <p className="text-xs text-neutral-500 uppercase leading-relaxed">
                  Изучим задачу и вернемся с оценкой сроков и формата работы.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs underline uppercase pt-4"
                >
                  ОТПРАВИТЬ ЕЩЕ ОДНО СООБЩЕНИЕ
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-xs uppercase">
                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-400 block">
                    01 // ИМЯ ИЛИ КОМПАНИЯ *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="ИВАН / БРЕНД"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-700 py-2.5 focus:border-black dark:focus:border-white outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-400 block">
                    02 // ТЕЛЕГРАМ / ТЕЛЕФОН / EMAIL *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="@USERNAME ИЛИ +7 ..."
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-700 py-2.5 focus:border-black dark:focus:border-white outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-neutral-400 block">
                    03 // ФОРМАТ ПРОЕКТА
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["РЕКЛАМА", "МУЗЫКАЛЬНЫЙ КЛИП", "МАРКЕТИНГ", "ДРУГОЕ"].map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => setForm({ ...form, type: item })}
                        className={`px-3 py-1.5 border text-[10px] transition-colors ${
                          form.type === item
                            ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                            : "border-neutral-300 dark:border-neutral-800 text-neutral-500"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-400 block">
                    04 // ДЕТАЛИ И ОРИЕНТИР ПО БЮДЖЕТУ
                  </label>
                  <textarea
                    rows={3}
                    placeholder="КРАТКО О ЗАДАЧЕ И СРОКАХ..."
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-700 py-2.5 focus:border-black dark:focus:border-white outline-none resize-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-wider active:scale-[0.99] transition-transform text-xs"
                >
                  ОТПРАВИТЬ ЗАЯВКУ В ЦЕХ ►
                </button>

                <p className="text-[9px] text-neutral-400 leading-normal">
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <Link href="/privacy" className="underline">
                    политикой конфиденциальности
                  </Link>
                  . Никакого спама.
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}