"use client";

import { useTheme } from "@/context/ThemeContext";

interface FooterProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function Footer({
  isPlaying,
  onTogglePlay,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
}: FooterProps) {
  const { theme, setTheme } = useTheme();

  return (
    <footer className="fixed bottom-0 left-0 w-full z-30 pointer-events-none pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 px-5 sm:px-10">
      
      {/* ======================================================== */}
      {/* МОБИЛЬНАЯ ЭРГОНОМИЧНАЯ ДОК-ПАНЕЛЬ В ОДНУ ЛИНИЮ          */}
      {/* ======================================================== */}
      <div className="lg:hidden pointer-events-auto flex items-center justify-between border border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-[#0c0c0c]/95 px-3 py-2 shadow-lg backdrop-blur-md">
        
        {/* Слева: Номер сцены и переключатель темы */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="font-bold text-black dark:text-white">
            0{currentStep + 1}
            <span className="text-neutral-400 font-normal">/0{totalSteps}</span>
          </span>
          <span className="h-3 w-[1px] bg-neutral-200 dark:bg-neutral-800" />
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
          >
            {theme === "dark" ? "ТЬМА ■" : "СВЕТ ■"}
          </button>
        </div>

        {/* Справа: Тактильные кнопки перелистывания */}
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <button
            onClick={onPrev}
            aria-label="Назад"
            className="h-9 px-3 flex items-center justify-center gap-1 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-black dark:text-white active:scale-95 transition-transform"
          >
            <span>◄</span>
            <span className="text-[10px] font-bold">НАЗАД</span>
          </button>
          <button
            onClick={onNext}
            aria-label="Далее"
            className="h-9 px-3.5 flex items-center justify-center gap-1 bg-black text-white dark:bg-white dark:text-black active:scale-95 transition-transform"
          >
            <span className="text-[10px] font-bold">ДАЛЕЕ</span>
            <span>►</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* ДЕСКТОПНЫЙ ФУТЕР (ПОЛНОЕ СООТВЕТСТВИЕ РЕФЕРЕНСУ)         */}
      {/* ======================================================== */}
      <div className="hidden lg:flex justify-between items-end w-full">
        {/* Манифест слева */}
        <div className="pointer-events-auto max-w-sm font-mono text-xs leading-relaxed text-black dark:text-white uppercase tracking-wider select-none text-left">
        </div>

        {/* Переключатели тем и воспроизведение справа */}
        <div className="pointer-events-auto flex flex-col items-end gap-4 font-mono text-[11px] uppercase tracking-widest text-black dark:text-white select-none">
          <div className="flex flex-col items-end space-y-1">
            <button
              onClick={() => setTheme("light")}
              className="flex items-center gap-1.5 hover:opacity-75 transition-opacity"
            >
              <span>СВЕТ</span>
              {theme === "light" && <span className="text-[9px]">■</span>}
            </button>
            <button
              onClick={() => setTheme("dark")}
              className="flex items-center gap-1.5 hover:opacity-75 transition-opacity"
            >
              <span>ТЬМА</span>
              {theme === "dark" && <span className="text-[9px]">■</span>}
            </button>
            <button
              onClick={() => setTheme("system")}
              className="flex items-center gap-1.5 hover:opacity-75 transition-opacity"
            >
              <span>АВТО</span>
              {theme === "system" && <span className="text-[9px]">■</span>}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}