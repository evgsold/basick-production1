"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Footer from "@/components/Footer";
import SceneEffects from "@/components/SceneEffects";

interface StoryStep {
  id: string;
  index: string;
  tag: string;
  hint: string;
  bigTitle: string[];
  desktopPadding: string;
  narrative: string;
}

// Единый структурированный контент
const STORY: StoryStep[] = [
  {
    id: "origin",
    index: "01",
    tag: "СЪЕМКА",
    hint: "РИСУЙТЕ НА ЭКРАНЕ",
    bigTitle: ["СНИМАЕМ", "НА ПЛЕНКУ"],
    desktopPadding: "pt-32 pl-44",
    narrative: "35мм и цифра. Живой кадр, естественный свет и фактура без пластмассы.",
  },
  {
    id: "cinema",
    index: "02",
    tag: "РЕЖИССУРА",
    hint: "СОТРИТЕ ВОДУ С ЭКРАНА",
    bigTitle: ["ДЕРЖИМ", "ВНИМАНИЕ"],
    desktopPadding: "pt-36 pl-56",
    narrative: "Клипы и реклама как короткий метр. С первой до последней секунды.",
  },
  {
    id: "marketing",
    index: "03",
    tag: "МАРКЕТИНГ",
    hint: "КЛИКАЙТЕ ДЛЯ ОХВАТА",
    bigTitle: ["РЕЗУЛЬТАТ,", "А НЕ ШУМ"],
    desktopPadding: "pt-40 pl-40",
    narrative: "Ролики, которые реально смотрят. Не сливаем бюджет в пустоту.",
  },
  {
    id: "post",
    index: "04",
    tag: "МОНТАЖ И ЗВУК",
    hint: "УПРАВЛЯЙТЕ РИТМОМ",
    bigTitle: ["ПЛОТНЫЙ", "РИТМ"],
    desktopPadding: "pt-32 pl-48",
    narrative: "Монтаж без воды, плотный саунд-дизайн и глубокий пленочный цвет.",
  },
  {
    id: "manifesto",
    index: "05",
    tag: "СВЯЗЬ",
    hint: "ОЧИСТИТЕ ЭКРАН ОТ ШУМА",
    bigTitle: ["БЕЗ", "ЛИШНЕГО"],
    desktopPadding: "pt-36 pl-52",
    narrative: "Только то, что работает на ваш бренд. Напишите нам задачу.",
  },
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const isTransitioningRef = useRef(false);

  const goToStep = useCallback((newStep: number) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setCurrentStep(newStep);
    setIsPlaying(false);

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 450);
  }, []);

  const nextStep = useCallback(() => {
    goToStep((currentStep + 1) % STORY.length);
  }, [currentStep, goToStep]);

  const prevStep = useCallback(() => {
    goToStep((currentStep - 1 + STORY.length) % STORY.length);
  }, [currentStep, goToStep]);

  // Колесико мыши работает только на десктопе
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 1024) return;
      if (Math.abs(e.deltaY) < 25) return;
      if (e.deltaY > 0) nextStep();
      else prevStep();
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [nextStep, prevStep]);

  // Стрелки клавиатуры
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") nextStep();
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") prevStep();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextStep, prevStep]);

  // Автовоспроизведение
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % STORY.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    
    // При уходе на любую другую страницу (/about, /contact, /privacy) возвращаем скролл
    return () => {
      document.body.style.overflow = originalOverflow || "auto";
    };
  }, []);

  const active = STORY[currentStep];

  return (
    <main className="relative h-[100dvh] w-full bg-white dark:bg-[#070707] transition-colors duration-500 overflow-hidden select-none">
      
      {/* ИНТЕРАКТИВНЫЙ ХОЛСТ (Палец свободно рисует без свайпов страницы) */}
      <SceneEffects step={currentStep} />

      {/* ============================================================ */}
      {/* 1. МОБИЛЬНАЯ ВЕРСТКА: СТРОГО СЛЕВА, ЧЕТКИЙ РИТМ             */}
      {/* ============================================================ */}
      <div className="lg:hidden absolute top-0 left-0 w-full z-10 pt-20 px-6 pointer-events-none text-left">
        {/* Строка статуса без некрасивых переносов */}
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
          <span className="text-red-600 dark:text-red-400 font-semibold truncate">
            ● {active.hint}
          </span>
        </div>

        {/* Заголовок: массивный сжатый гротеск */}
        <h1 className="text-4xl sm:text-5xl font-bold uppercase font-sans tracking-[-0.03em] leading-[0.88] text-black dark:text-white mt-2.5">
          {active.bigTitle.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>

        {/* Описание */}
        <p className="font-mono text-xs text-neutral-700 dark:text-neutral-300 uppercase leading-relaxed mt-3 max-w-[280px] sm:max-w-xs">
          {active.narrative}
        </p>

      </div>

      {/* ============================================================ */}
      {/* 2. ДЕСКТОПНАЯ ВЕРСТКА: ЕДИНОЕ НАПРАВЛЕНИЕ ТЕКСТА (TEXT-LEFT)  */}
      {/* ============================================================ */}
      {/* Боковое оглавление слева */}
      <div className="hidden lg:block fixed left-10 top-1/2 -translate-y-1/2 z-20 font-mono text-xs uppercase tracking-widest space-y-3 pointer-events-auto text-left">
        {STORY.map((item, idx) => {
          const isActive = currentStep === idx;
          return (
            <button
              key={item.id}
              onClick={() => goToStep(idx)}
              className="flex items-center gap-2 group text-left transition-all cursor-pointer"
            >
              <span className={isActive ? "text-black dark:text-white" : "text-transparent"}>
                ■
              </span>
              <span
                className={`transition-colors duration-200 ${
                  isActive
                    ? "font-bold text-black dark:text-white"
                    : "text-neutral-400 dark:text-neutral-600 group-hover:text-black dark:group-hover:text-white"
                }`}
              >
                {item.tag}
              </span>
            </button>
          );
        })}
      </div>

      {/* Десктопный блок контента: ВСЕГДА text-left */}
      <div
        className={`hidden lg:flex absolute inset-0 z-10 pointer-events-none transition-all duration-500 ease-out text-left ${active.desktopPadding}`}
      >
        <div className="max-w-2xl space-y-4">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400 flex items-center gap-3">
            <span className="text-[10px] text-red-600 dark:text-red-400 ml-2">
              ● {active.hint}
            </span>
          </div>

          <h1 className="text-[6.5vw] font-bold uppercase font-sans tracking-[-0.04em] leading-[0.88] text-black dark:text-neutral-100">
            {active.bigTitle.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>

          <div className="pt-1 max-w-md">
            <p className="font-mono text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed uppercase">
              {active.narrative}
            </p>
            <div className="mt-2 font-mono text-[9px] text-neutral-400 dark:text-neutral-600 tracking-wider uppercase">
              {active.techSpecs}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. ФУТЕР                                                     */}
      {/* ============================================================ */}
      <Footer
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        currentStep={currentStep}
        totalSteps={STORY.length}
        onNext={nextStep}
        onPrev={prevStep}
      />
    </main>
  );
}