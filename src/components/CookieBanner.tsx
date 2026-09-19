"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("basick_cookie_consent");
    if (!consent) {
      // Небольшая задержка перед показом для плавности
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("basick_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const decline = () => {
    localStorage.setItem("basick_cookie_consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Согласие на использование файлов cookie"
      className="fixed bottom-20 lg:bottom-6 left-5 sm:left-10 z-50 max-w-sm border border-neutral-300 dark:border-neutral-800 bg-white/95 dark:bg-[#0c0c0c]/95 p-4 shadow-2xl backdrop-blur-md font-mono text-left animate-fadeIn select-none"
    >
      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2">
        <span>// ПРИВАТНОСТЬ & КУКИ</span>
        <span className="text-neutral-800 dark:text-neutral-200">SYS.CK</span>
      </div>

      <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed uppercase">
        Мы используем куки для работы сайта и аналитики. Без спама и скрытого трекинга. Подробнее — в{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-2 hover:text-neutral-400"
        >
          политике
        </Link>
        .
      </p>

      <div className="flex items-center gap-2 mt-3 text-xs uppercase">
        <button
          onClick={accept}
          className="flex-1 py-1.5 px-3 bg-black text-white dark:bg-white dark:text-black font-bold active:scale-95 transition-transform"
        >
          [ ПРИНЯТЬ ]
        </button>
        <button
          onClick={decline}
          className="py-1.5 px-3 border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
        >
          ОТКЛОНИТЬ
        </button>
      </div>
    </aside>
  );
}