"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Shuffle } from "lucide-react";

interface RawImageItem {
  id: string;
  title: string;
  category: string;
  pieces: number;
  baseUrl: string;
  aspect: number;
}

interface CalculatedItem extends RawImageItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

// 24 работы (по 6 штук на каждый из 4-х ярусов)
const RAW_GALLERY: RawImageItem[] = [
  // --- Ярус 1 ---
  { id: "1", title: "Editorial Art", category: "direction", pieces: 1, aspect: 1.3, baseUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119" },
  { id: "2", title: "Fluid Macro", category: "motion", pieces: 3, aspect: 1.5, baseUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe" },
  { id: "3", title: "Van Rijn Concept", category: "design", pieces: 2, aspect: 1.0, baseUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853" },
  { id: "4", title: "Desert Mirage", category: "direction", pieces: 1, aspect: 1.6, baseUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5" },
  { id: "5", title: "Color Prism", category: "design", pieces: 4, aspect: 1.2, baseUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab" },
  { id: "6", title: "Cosmic Loops", category: "motion", pieces: 2, aspect: 1.4, baseUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475" },

  // --- Ярус 2 ---
  { id: "7", title: "Studio Sound", category: "motion", pieces: 1, aspect: 0.95, baseUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4" },
  { id: "8", title: "DualSense Form", category: "design", pieces: 1, aspect: 1.35, baseUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f" },
  { id: "9", title: "Ancient Totems", category: "direction", pieces: 5, aspect: 1.1, baseUrl: "https://images.unsplash.com/photo-1578925518470-4def7a0f08bb" },
  { id: "10", title: "Executive Noir", category: "design", pieces: 3, aspect: 1.3, baseUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf" },
  { id: "11", title: "Neon Cyberpunk", category: "motion", pieces: 2, aspect: 1.5, baseUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071" },
  { id: "12", title: "Deep Planet", category: "direction", pieces: 1, aspect: 1.25, baseUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9" },

  // --- Ярус 3 ---
  { id: "13", title: "Synthetic Flora", category: "design", pieces: 4, aspect: 1.0, baseUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f" },
  { id: "14", title: "Organic Motion", category: "motion", pieces: 2, aspect: 1.45, baseUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5" },
  { id: "15", title: "Modernist Form", category: "direction", pieces: 3, aspect: 1.2, baseUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f" },
  { id: "16", title: "Urban Geometry", category: "design", pieces: 2, aspect: 1.4, baseUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab" },
  { id: "17", title: "Vapor Shadows", category: "motion", pieces: 1, aspect: 1.1, baseUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23" },
  { id: "18", title: "Abstract Wave", category: "direction", pieces: 3, aspect: 1.3, baseUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab" },

  // --- Ярус 4 ---
  { id: "19", title: "Golden Radiance", category: "design", pieces: 1, aspect: 1.3, baseUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675" },
  { id: "20", title: "Tokyo Highway", category: "motion", pieces: 5, aspect: 1.55, baseUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5" },
  { id: "21", title: "Surreal Mind", category: "direction", pieces: 2, aspect: 1.05, baseUrl: "https://images.unsplash.com/photo-1563089145-599997674d42" },
  { id: "22", title: "Minimal Surface", category: "design", pieces: 1, aspect: 1.4, baseUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f" },
  { id: "23", title: "Dark Nebula", category: "motion", pieces: 3, aspect: 1.25, baseUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa" },
  { id: "24", title: "Architectural Shift", category: "direction", pieces: 2, aspect: 1.35, baseUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f" },
];

const ROW_HEIGHTS = [200, 230, 210, 225];
const TARGET_CHUNK_WIDTH = 2200;
const CHUNK_HEIGHT = ROW_HEIGHTS.reduce((a, b) => a + b, 0); // 865px

const TILES = [
  { col: -1, row: -1 }, { col: 0, row: -1 }, { col: 1, row: -1 }, { col: 2, row: -1 },
  { col: -1, row:  0 }, { col: 0, row:  0 }, { col: 1, row:  0 }, { col: 2, row:  0 },
  { col: -1, row:  1 }, { col: 0, row:  1 }, { col: 1, row:  1 }, { col: 2, row:  1 },
];

export default function InfiniteGallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredItem, setHoveredItem] = useState<CalculatedItem | null>(null);

  // Автоматический расчёт сплошной сетки стык в стык
  const items = useMemo<CalculatedItem[]>(() => {
    const result: CalculatedItem[] = [];
    const itemsPerRow = Math.ceil(RAW_GALLERY.length / ROW_HEIGHTS.length);
    let currentY = 0;

    ROW_HEIGHTS.forEach((rowH, rowIndex) => {
      const rowRawItems = RAW_GALLERY.slice(
        rowIndex * itemsPerRow,
        (rowIndex + 1) * itemsPerRow
      );

      const rawRowWidth = rowRawItems.reduce((acc, it) => acc + rowH * it.aspect, 0);
      const scaleFactor = TARGET_CHUNK_WIDTH / rawRowWidth;
      let currentX = 0;

      rowRawItems.forEach((item) => {
        const w = Math.round(rowH * item.aspect * scaleFactor) + 1.2;
        const h = rowH + 1.2;

        result.push({
          ...item,
          x: currentX,
          y: currentY,
          w,
          h,
        });

        currentX += w - 1.2;
      });

      currentY += rowH;
    });

    return result;
  }, []);

  useEffect(() => {
    if (items.length > 0 && !hoveredItem) setHoveredItem(items[1]);
  }, [items, hoveredItem]);

  // Драг (перетягивание)
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: -TARGET_CHUNK_WIDTH * 0.5, y: -CHUNK_HEIGHT * 0.5 });
  const currentPos = useRef({ x: -TARGET_CHUNK_WIDTH * 0.5, y: -CHUNK_HEIGHT * 0.5 });

  // Параллакс-сдвиг к краю экрана
  const mouseNorm = useRef({ x: 0, y: 0 });
  const parallaxOffset = useRef({ x: 0, y: 0 });

  const hoveredIdRef = useRef<string | null>(null);
  const elementsMap = useRef<Map<string, HTMLDivElement>>(new Map());

  const mod = (n: number, m: number) => ((n % m) + m) % m;

  // Отслеживание курсора
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      // Нормализованные координаты: от -1 до +1
      mouseNorm.current.x = (e.clientX - cx) / cx;
      mouseNorm.current.y = (e.clientY - cy) / cy;
    };

    const handleMouseLeaveWindow = () => {
      mouseNorm.current.x = 0;
      mouseNorm.current.y = 0;
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
    };
  }, []);

  // RAF цикл
  useEffect(() => {
    let animId: number;

    const render = () => {
      // 1. Плавный драг
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.085;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.085;

      // 2. ИНВЕРТИРОВАННЫЙ ЭЛАСТИЧНЫЙ СДВИГ (теперь тянет в правильном направлении)
      const PARALLAX_MAX_X = 90;
      const PARALLAX_MAX_Y = 60;
      parallaxOffset.current.x += (-mouseNorm.current.x * PARALLAX_MAX_X - parallaxOffset.current.x) * 0.06;
      parallaxOffset.current.y += (-mouseNorm.current.y * PARALLAX_MAX_Y - parallaxOffset.current.y) * 0.06;

      const baseOffsetX = mod(currentPos.current.x, TARGET_CHUNK_WIDTH) - TARGET_CHUNK_WIDTH;
      const baseOffsetY = mod(currentPos.current.y, CHUNK_HEIGHT) - CHUNK_HEIGHT;

      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;

      elementsMap.current.forEach((el, key) => {
        if (!el) return;

        const [cStr, rStr, idStr] = key.split(":");
        const col = parseInt(cStr, 10);
        const row = parseInt(rStr, 10);
        const item = items.find((it) => it.id === idStr);
        if (!item) return;

        const absX = (col + 1) * TARGET_CHUNK_WIDTH + item.x + baseOffsetX + parallaxOffset.current.x;
        const absY = (row + 1) * CHUNK_HEIGHT + item.y + baseOffsetY + parallaxOffset.current.y;

        const midX = absX + item.w / 2;
        const midY = absY + item.h / 2;
        const dx = (midX - cx) / cx;
        const dy = (midY - cy) / cy;

        // Отсечение элементов вне экрана для 60/120 FPS
        if (Math.abs(dx) > 1.6 || Math.abs(dy) > 1.6) {
          el.style.display = "none";
          return;
        }
        el.style.display = "block";

        const isHovered = hoveredIdRef.current === item.id;

        // Сфера/глобус
        const rotY = dx * 20;
        const rotX = -dy * 17;
        const distSq = dx * dx + dy * dy;
        const zGlobe = -Math.min(distSq * 160, 360);
        const zPos = isHovered ? zGlobe + 50 : zGlobe;

        el.style.transform = `translate3d(${absX}px, ${absY}px, ${zPos}px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        el.style.zIndex = isHovered ? "400" : `${Math.round(40 - distSq * 10)}`;
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [items]);

  // Драг мышью
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    targetPos.current.x += dx;
    targetPos.current.y += dy;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const onWheel = (e: React.WheelEvent) => {
    targetPos.current.x -= e.deltaX * 0.75;
    targetPos.current.y -= e.deltaY * 0.75;
  };

  const handleShuffle = () => {
    targetPos.current.x += (Math.random() - 0.5) * 1200;
    targetPos.current.y += (Math.random() - 0.5) * 700;
  };

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onWheel={onWheel}
      className="relative w-screen h-screen bg-[#070707] overflow-hidden select-none cursor-grab active:cursor-grabbing font-sans"
      style={{
        perspective: "1100px",
        perspectiveOrigin: "50% 50%",
      }}
    >

      {/* 2. 3D-сцена */}
      <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
        {TILES.map(({ col, row }) =>
          items.map((item) => {
            const key = `${col}:${row}:${item.id}`;
            const isHovered = hoveredIdRef.current === item.id;

            return (
              <div
                key={key}
                ref={(el) => {
                  if (el) elementsMap.current.set(key, el);
                  else elementsMap.current.delete(key);
                }}
                onMouseEnter={() => {
                  hoveredIdRef.current = item.id;
                  setHoveredItem(item);
                }}
                onMouseLeave={() => {
                  hoveredIdRef.current = null;
                }}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: item.w,
                  height: item.h,
                  transformOrigin: "center center",
                  willChange: "transform",
                }}
                className="pointer-events-auto group cursor-pointer overflow-visible rounded-none border-0 m-0 p-0"
              >
                <ImageCard item={item} isHovered={isHovered} />
              </div>
            );
          })
        )}
      </div>

      {/* 3. Инфо-панель снизу слева */}
      {hoveredItem && (
        <div className="absolute bottom-8 left-8 z-50 pointer-events-none transition-all duration-300">
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight drop-shadow-2xl">
            {hoveredItem.title}
          </h2>
          <p className="text-neutral-400 text-xs md:text-sm mt-1 font-medium capitalize drop-shadow">
            {hoveredItem.category} • {hoveredItem.pieces} piece{hoveredItem.pieces > 1 ? "s" : ""}
          </p>
        </div>
      )}

      {/* 4. Кнопка Shuffle */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-50">
        <button
          onClick={handleShuffle}
          className="flex flex-col items-center justify-center gap-1 w-14 h-14 bg-black/60 hover:bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 text-white transition-all transform hover:scale-110 active:scale-95 shadow-2xl"
          title="Shuffle"
        >
          <Shuffle className="w-5 h-5 text-neutral-300" />
          <span className="text-[10px] font-semibold tracking-wide">shuffle</span>
        </button>
      </div>
    </div>
  );
}

// Карточка с прогрессивной плавной загрузкой (LQIP Blur)
function ImageCard({
  item,
  isHovered,
}: {
  item: CalculatedItem;
  isHovered: boolean;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  const lqipUrl = `${item.baseUrl}?w=25&q=20&auto=format&fit=crop`;
  const fullUrl = `${item.baseUrl}?w=700&q=80&auto=format&fit=crop`;

  return (
    <div
      className="w-full h-full relative overflow-hidden bg-neutral-900 rounded-none border-0"
      style={{
        transform: isHovered ? "scale(1.08)" : "scale(1)",
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease",
        boxShadow: isHovered ? "0 20px 45px -10px rgba(0, 0, 0, 0.95)" : "none",
      }}
    >
      {/* LQIP Placeholder (показывается сразу, размыт) */}
      <img
        src={lqipUrl}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover filter blur-sm scale-105 pointer-events-none transition-opacity duration-700 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Оригинал: проявляется плавно поверх превью по событию onLoad */}
      <img
        src={fullUrl}
        alt={item.title}
        draggable={false}
        onLoad={() => setIsLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-700 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`absolute inset-0 bg-black/15 transition-opacity duration-300 pointer-events-none ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}