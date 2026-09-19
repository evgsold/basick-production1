"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 px-5 sm:px-10 py-5 sm:py-7 flex justify-between items-start pointer-events-none">
        <Link
          href="/"
          className="pointer-events-auto flex flex-col group leading-none text-black dark:text-white"
        >
          <span className="text-2xl sm:text-3xl font-bold font-sans tracking-tight">
            BASICK
          </span>
          <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.25em] text-neutral-400 dark:text-neutral-500 mt-0.5">
            ПРОДАКШН
          </span>
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="pointer-events-auto min-h-[44px] min-w-[44px] flex items-center justify-end font-mono text-xs tracking-[0.2em] uppercase text-black dark:text-white hover:opacity-50 transition-opacity"
        >
          {open ? "[ ЗАКРЫТЬ ]" : "МЕНЮ"}
        </button>
      </header>

      {/* Полноэкранное меню */}
      <div
        className={`fixed inset-0 z-30 flex flex-col justify-between p-6 sm:p-14 font-mono transition-all duration-500 bg-white text-black dark:bg-[#070707] dark:text-white ${
          open
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-8"
        }`}
      >
        <div className="pt-20 sm:pt-24 space-y-6 sm:space-y-8 text-left">
          <span className="text-[10px] sm:text-xs text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">
            // НАВИГАЦИЯ СТУДИИ
          </span>
          
          <nav className="space-y-3 sm:space-y-4 text-3xl sm:text-5xl font-sans font-bold uppercase tracking-tight">
            {[
    { num: "01", title: "ИНТЕРАКТИВНАЯ СЦЕНА", href: "/" },
    { num: "02", title: "ПРОЕКТЫ СТУДИИ", href: "/projects" },     // <--- НОВАЯ СТРАНИЦА
    { num: "03", title: "О ПРОДАКШЕНЕ", href: "/about" },
    { num: "04", title: "ОБСУДИТЬ ПРОЕКТ", href: "/contact" },
    { num: "05", title: "ПОЛИТИКА ПРИВАТНОСТИ", href: "/privacy" },
            ].map((item) => (
              <Link
                key={item.num}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block hover:translate-x-3 transition-transform text-neutral-900 dark:text-neutral-100 hover:text-neutral-400 dark:hover:text-neutral-500 py-1"
              >
                <span className="text-xs font-mono mr-3 text-neutral-400 dark:text-neutral-600 font-normal">
                  {item.num}
                </span>
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col sm:flex-row justify-between text-[10px] sm:text-xs text-neutral-400 dark:text-neutral-600 tracking-widest gap-2 sm:gap-4 border-t border-neutral-200 dark:border-neutral-800 pt-4 sm:pt-6 text-left">
          <span>МОСКВА — ДУБАЙ — ВЕСЬ МИР</span>
          <span>HELLO@BASICKPROD.COM</span>
        </div>
      </div>
    </>
  );
}