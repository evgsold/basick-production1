"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Project {
  id: string;
  index: string;
  title: string;
  category: "РЕКЛАМА" | "КЛИПЫ" | "СПЕЦПРОЕКТЫ";
  client: string;
  year: string;
  specs: string;
  narrative: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    id: "heatwave",
    index: "01",
    title: "HEATWAVE",
    category: "РЕКЛАМА",
    client: "OUTERWEAR BRAND",
    year: "2025",
    specs: "35MM KODAK / ARRI / COOKE",
    narrative: "Фешн-кампейн верхней одежды. Естественный свет, туман и зерно 35мм пленки.",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "form-index",
    index: "02",
    title: "FORM INDEX",
    category: "КЛИПЫ",
    client: "ELECTRONIC MUSICIAN",
    year: "2025",
    specs: "RED V-RAPTOR / ANAMORPHIC",
    narrative: "Музыкальное видео в стерильных архитектурных локациях с акцентом на пластику актеров.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "night-shift",
    index: "03",
    title: "NIGHT SHIFT",
    category: "СПЕЦПРОЕКТЫ",
    client: "AUTOMOTIVE BRAND",
    year: "2024",
    specs: "ALEXA MINI LF / TAPE SOUND",
    narrative: "Ночной короткий метр об уличной культуре. Саунд-дизайн, записанный на аналоговую ленту.",
    image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "bleach-out",
    index: "04",
    title: "BLEACH OUT",
    category: "РЕКЛАМА",
    client: "STREETWEAR LABEL",
    year: "2024",
    specs: "16MM BOLEX / DIGITAL",
    narrative: "Виральный ролик для запуска капсульной коллекции. Смесь архивных кассет и 16мм.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "monochrome",
    index: "05",
    title: "MONOCHROME",
    category: "СПЕЦПРОЕКТЫ",
    client: "ARCHITECTURAL BUREAU",
    year: "2024",
    specs: "35MM B&W / ZEISS HIGH SPEED",
    narrative: "Черно-белый документальный ролик об индустриальной архитектуре конструктивизма.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "echo-chamber",
    index: "06",
    title: "ECHO CHAMBER",
    category: "КЛИПЫ",
    client: "INDIE ARTIST",
    year: "2023",
    specs: "OPTICS: LOMO ROUND FRONT",
    narrative: "Камерное видео с живым аналоговым звуком без компьютерных спецэффектов.",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
  },
];

type ViewMode = "LIST" | "GRID";
type CategoryFilter = "ВСЕ" | "РЕКЛАМА" | "КЛИПЫ" | "СПЕЦПРОЕКТЫ";

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("LIST");
  const [filter, setFilter] = useState<CategoryFilter>("ВСЕ");

  // Состояние для десктопного плавающего окна (hover)
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState({ x: -999, y: -999 });
  const exitTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Состояние для мобильного раскрывающегося аккордеона (tap)
  const [expandedMobileId, setExpandedMobileId] = useState<string | null>(null);

  // Отслеживание мыши (только на десктопе)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    if (window.innerWidth >= 1024) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleProjectEnter = (project: Project) => {
    if (window.innerWidth < 1024) return;
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    setHoveredProject(project);
    setIsVisible(true);
  };

  const handleProjectLeave = () => {
    if (window.innerWidth < 1024) return;
    setIsVisible(false);
    exitTimerRef.current = setTimeout(() => {
      setHoveredProject(null);
    }, 200);
  };

  // Мобильный клик: раскрыть/свернуть кадр
  const handleMobileProjectClick = (projectId: string) => {
    if (window.innerWidth >= 1024) return;
    setExpandedMobileId((prev) => (prev === projectId ? null : projectId));
  };

  const filtered = filter === "ВСЕ" 
    ? PROJECTS 
    : PROJECTS.filter((p) => p.category === filter);

  // Расчет позиции для десктопного курсора
  const CARD_WIDTH = 320;
  const CARD_HEIGHT = 280;
  const OFFSET = 24;

  const isNearRight = typeof window !== "undefined" && mousePos.x + CARD_WIDTH + OFFSET > window.innerWidth;
  const isNearBottom = typeof window !== "undefined" && mousePos.y + CARD_HEIGHT + OFFSET > window.innerHeight;

  const previewX = isNearRight ? mousePos.x - CARD_WIDTH - 16 : mousePos.x + OFFSET;
  const previewY = isNearBottom ? mousePos.y - CARD_HEIGHT - 16 : mousePos.y + OFFSET;

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#070707] text-black dark:text-white pt-20 sm:pt-32 pb-[max(5rem,env(safe-area-inset-bottom))] px-4 sm:px-10 text-left">
      <div className="max-w-6xl mx-auto">
        
        {/* ========================================================== */}
        {/* 1. ШАПКА И МОБИЛЬНО-ОПТИМИЗИРОВАННАЯ ПАНЕЛЬ ФИЛЬТРОВ         */}
        {/* ========================================================== */}
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-5 sm:pb-8 mb-6 sm:mb-12">
          
          <div className="flex flex-col gap-4">
            
            {/* Название и статус */}
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                  [ АРХИВ СТУДИИ // 2023—2025 ]
                </div>
                <h1 className="text-3xl sm:text-6xl font-bold uppercase font-sans tracking-tight leading-none">
                  ПРОЕКТЫ
                </h1>
              </div>

              {/* Переключатель вида на мобильных: компактный тумблер */}
              <div className="flex lg:hidden items-center border border-neutral-300 dark:border-neutral-800 p-0.5 bg-neutral-100 dark:bg-[#111111] font-mono text-[10px]">
                <button
                  onClick={() => setViewMode("LIST")}
                  className={`px-2.5 py-1.5 transition-colors ${
                    viewMode === "LIST"
                      ? "bg-white dark:bg-black text-black dark:text-white font-bold shadow-sm"
                      : "text-neutral-500"
                  }`}
                >
                  СПИСОК
                </button>
                <button
                  onClick={() => setViewMode("GRID")}
                  className={`px-2.5 py-1.5 transition-colors ${
                    viewMode === "GRID"
                      ? "bg-white dark:bg-black text-black dark:text-white font-bold shadow-sm"
                      : "text-neutral-500"
                  }`}
                >
                  СЕТКА
                </button>
              </div>
            </div>

            {/* Панель фильтров: на смартфонах скроллится горизонтально с мягкими чипами */}
            <div className="flex items-center justify-between gap-4 pt-2">
              
              {/* Горизонтальный скролл чипов категорий (без полосы прокрутки) */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 font-mono text-xs uppercase w-full lg:w-auto">
                {(["ВСЕ", "РЕКЛАМА", "КЛИПЫ", "СПЕЦПРОЕКТЫ"] as CategoryFilter[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`whitespace-nowrap px-3 py-1.5 min-h-[36px] flex items-center justify-center border transition-all text-[11px] ${
                      filter === cat
                        ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black font-bold"
                        : "border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-black dark:hover:text-white bg-neutral-50 dark:bg-neutral-900/40"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Десктопный переключатель СПИСОК / СЕТКА */}
              <div className="hidden lg:flex items-center gap-4 font-mono text-xs uppercase pl-4 border-l border-neutral-200 dark:border-neutral-800">
                <button
                  onClick={() => setViewMode("LIST")}
                  className={`flex items-center gap-1.5 ${
                    viewMode === "LIST"
                      ? "font-bold text-black dark:text-white"
                      : "text-neutral-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {viewMode === "LIST" && <span>■</span>}
                  <span>СПИСОК</span>
                </button>
                <button
                  onClick={() => setViewMode("GRID")}
                  className={`flex items-center gap-1.5 ${
                    viewMode === "GRID"
                      ? "font-bold text-black dark:text-white"
                      : "text-neutral-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {viewMode === "GRID" && <span>■</span>}
                  <span>СЕТКА</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* ========================================================== */}
        {/* 2. РЕЖИМ «СПИСОК»: С ТАП-АККОРДЕОНОМ НА МОБИЛЬНЫХ           */}
        {/* ========================================================== */}
        {viewMode === "LIST" && (
          <div className="relative" onMouseLeave={handleProjectLeave}>
            <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {filtered.map((project) => {
                const isHovered = hoveredProject?.id === project.id;
                const isMobileExpanded = expandedMobileId === project.id;

                return (
                  <div
                    key={project.id}
                    onClick={() => handleMobileProjectClick(project.id)}
                    onMouseEnter={() => handleProjectEnter(project)}
                    className="group py-4 sm:py-8 flex flex-col transition-colors cursor-pointer select-none"
                  >
                    {/* Основная строка проекта */}
                    <div className="flex items-center justify-between gap-4">
                      
                      <div className="flex items-baseline gap-3 sm:gap-8">
                        <span className="font-mono text-[11px] sm:text-sm text-neutral-400 dark:text-neutral-600">
                          0{project.index}
                        </span>
                        <h2
                          className={`text-2xl sm:text-6xl lg:text-[5vw] font-bold uppercase font-sans tracking-tight leading-none transition-colors duration-200 ${
                            isHovered || isMobileExpanded
                              ? "text-black dark:text-white"
                              : "text-neutral-400 dark:text-neutral-700"
                          }`}
                        >
                          {project.title}
                        </h2>
                      </div>

                      {/* Мета-информация справа */}
                      <div className="flex items-center gap-3 sm:gap-6 font-mono text-xs uppercase text-neutral-500 dark:text-neutral-400">
                        <span className="border border-neutral-200 dark:border-neutral-800 px-2 py-0.5 text-[9px] sm:text-[10px]">
                          {project.category}
                        </span>
                        <span className="hidden md:inline">{project.client}</span>
                        <span className="hidden sm:inline">{project.year}</span>
                        
                        {/* Индикатор раскрытия для мобильных */}
                        <span className="lg:hidden text-xs font-bold text-neutral-400 ml-1">
                          {isMobileExpanded ? "−" : "+"}
                        </span>
                      </div>

                    </div>

                    {/* МОБИЛЬНЫЙ АККОРДЕОН (показывает фото и параметры по тапу на смартфонах) */}
                    {isMobileExpanded && (
                      <div className="lg:hidden mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-900 space-y-3 animate-fadeIn">
                        <div className="w-full aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover grayscale contrast-125"
                          />
                        </div>
                        <div className="font-mono text-xs uppercase space-y-1.5">
                          <div className="flex justify-between text-neutral-400 text-[10px]">
                            <span>КЛИЕНТ: {project.client}</span>
                            <span>ГОД: {project.year}</span>
                          </div>
                          <p className="text-neutral-700 dark:text-neutral-300 leading-snug text-[11px]">
                            {project.narrative}
                          </p>
                          <div className="text-[9px] text-neutral-400 pt-1">
                            ОБОРУДОВАНИЕ: {project.specs}
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* 3. РЕЖИМ «СЕТКА»: ЧЕТКАЯ МОБИЛЬНАЯ КАРТОЧНАЯ СИСТЕМА       */}
        {/* ========================================================== */}
        {viewMode === "GRID" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            {filtered.map((project) => (
              <div
                key={project.id}
                className="space-y-3.5 border border-neutral-200 dark:border-neutral-800 p-3.5 sm:p-6 bg-white dark:bg-[#0a0a0a]"
              >
                <div className="w-full aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale contrast-125"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400">
                    <span>0{project.index} // {project.category}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-sans uppercase tracking-tight text-black dark:text-white">
                    {project.title}
                  </h3>
                </div>

                <div className="font-mono text-xs space-y-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-900">
                  <p className="text-neutral-600 dark:text-neutral-300 uppercase leading-snug text-[11px] sm:text-xs">
                    {project.narrative}
                  </p>
                  <div className="text-[9px] text-neutral-400 uppercase">
                    ТЕХНИКА: {project.specs}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================== */}
        {/* 4. НИЖНИЙ БЛОК ДЛЯ ЗАЯВКИ (АДАПТИРОВАН ДЛЯ ТАПА)           */}
        {/* ========================================================== */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 mt-12 sm:mt-20 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 font-mono text-xs">
          <div className="space-y-1">
            <span className="font-bold text-black dark:text-white uppercase text-[11px] sm:text-xs">
              НУЖЕН ПОХОЖИЙ ПРОЕКТ?
            </span>
            <p className="text-neutral-500 uppercase text-[10px]">
              РАССЧИТАЕМ СМЕТУ И СРОКИ ПРОИЗВОДСТВА.
            </p>
          </div>
          <Link
            href="/contact"
            className="h-12 sm:h-auto px-6 py-3 bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-wider active:scale-[0.98] transition-transform text-center flex items-center justify-center"
          >
            ОБСУДИТЬ ПРОЕКТ ►
          </Link>
        </div>

      </div>

      {/* ========================================================== */}
      {/* 5. ДЕСКТОПНЫЙ МОДУЛЬ ПРЕДПРОСМОТРА (СКРЫТ НА СМАРТФОНАХ)   */}
      {/* ========================================================== */}
      {hoveredProject && (
        <div
          className={`hidden lg:block fixed top-0 left-0 z-50 pointer-events-none transition-[opacity,transform] duration-200 ease-out will-change-transform ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{
            transform: `translate3d(${previewX}px, ${previewY}px, 0)`,
          }}
        >
          <div className="w-[310px] border border-neutral-300 dark:border-neutral-700 bg-white/95 dark:bg-[#0c0c0c]/95 p-3 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2">
              <span className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                ПРЕДПРОСМОТР
              </span>
              <span>0{hoveredProject.index} // {hoveredProject.year}</span>
            </div>

            <div className="relative w-full h-44 overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <img
                key={hoveredProject.id}
                src={hoveredProject.image}
                alt={hoveredProject.title}
                className="w-full h-full object-cover grayscale contrast-125 transition-opacity duration-300"
              />
            </div>

            <div className="mt-2.5 font-mono text-[10px] uppercase space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-xs text-black dark:text-white font-sans tracking-wide">
                  {hoveredProject.title}
                </span>
                <span className="text-[9px] text-neutral-400">
                  {hoveredProject.specs}
                </span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-300 leading-tight">
                {hoveredProject.narrative}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}