"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    let current = 0;
    let target = 25;

    // 1. Проверка DOM
    if (document.readyState === "complete") {
      target = 65;
    } else {
      const handleState = () => {
        if (document.readyState === "interactive") target = 50;
        if (document.readyState === "complete") target = 75;
      };
      document.addEventListener("readystatechange", handleState);
    }

    // 2. Реальное ожидание всех подключенных Google-шрифтов
    if ("fonts" in document) {
      document.fonts.ready.then(() => {
        target = Math.max(target, 85);
      });
    }

    // 3. Полная загрузка стилей и скриптов
    const handleFullLoad = () => {
      target = 100;
    };

    if (document.readyState === "complete") {
      target = 100;
    } else {
      window.addEventListener("load", handleFullLoad);
    }

    // Ретро-интервальный счетчик
    const timer = setInterval(() => {
      if (current < target) {
        current += 1;
        setProgress(current);
      } else if (target === 100 && current >= 100) {
        clearInterval(timer);
        setTimeout(() => setIsDone(true), 300);
        setTimeout(() => setRemoved(true), 800);
      }
    }, 16);

    return () => {
      clearInterval(timer);
      window.removeEventListener("load", handleFullLoad);
    };
  }, []);

  if (removed) return null;

  return (
    <aside
      aria-live="polite"
      aria-label="Loading Page"
      className={`fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-12 font-mono transition-opacity duration-700 select-none bg-white text-black dark:bg-[#070707] dark:text-neutral-100 ${
        isDone ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex justify-between items-center text-[10px] sm:text-xs tracking-widest text-neutral-400 dark:text-neutral-600 uppercase">
        <span>BASICK PRODUCTION // CALIBRATING OPTICS</span>
        <span className="flex items-center gap-2 text-black dark:text-white">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
          REC 24 FPS
        </span>
      </div>

      <div className="max-w-md w-full mx-auto space-y-3">
        <div className="flex justify-between text-xs tracking-widest uppercase">
          <span>INITIALIZING</span>
          <span>{progress.toString().padStart(3, "0")}%</span>
        </div>
        <div className="w-full h-[1px] bg-neutral-200 dark:bg-neutral-800">
          <div
            className="h-full bg-black dark:bg-white transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[9px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">
          <span>35MM ANALOGUE BUFFER</span>
          <span>100% READY</span>
        </div>
      </div>

      <div className="flex justify-between text-[10px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">
        <span>SYS.CORE 2.0</span>
        <span>STANDBY...</span>
      </div>
    </aside>
  );
}