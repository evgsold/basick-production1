"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

interface EffectProps {
  step: number;
}

export default function SceneEffects({ step }: EffectProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

return (
  <div className="absolute inset-0 pointer-events-auto z-0 overflow-hidden select-none touch-none">
    {step === 0 && <DrawingCanvas isDark={isDark} />}
    {step === 1 && <WaterMistCanvas isDark={isDark} />}
    {step === 2 && <MarketingMagnetCanvas isDark={isDark} />}
    {step === 3 && <TimelineAudioCanvas isDark={isDark} />}
    {step === 4 && <NoiseCleanerCanvas isDark={isDark} />}
  </div>
);
}

// -------------------------------------------------------------
// ЭТАП 1: 35мм пленка — рисование светом
// -------------------------------------------------------------
function DrawingCanvas({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    let drawing = false;
    let lastX = 0;
    let lastY = 0;

    const start = (x: number, y: number) => {
      drawing = true;
      lastX = x;
      lastY = y;
    };

    const draw = (x: number, y: number) => {
      if (!drawing) return;
      ctx.strokeStyle = isDark ? "rgba(255,255,255,0.9)" : "rgba(10,10,10,0.9)";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();

      if (Math.random() > 0.4) {
        ctx.fillStyle = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
        ctx.fillRect(x + (Math.random() - 0.5) * 16, y + (Math.random() - 0.5) * 16, 1.5, 1.5);
      }
      lastX = x;
      lastY = y;
    };

    const stop = () => (drawing = false);

    let animId: number;
    const fade = () => {
      ctx.fillStyle = isDark ? "rgba(7, 7, 7, 0.025)" : "rgba(255, 255, 255, 0.025)";
      ctx.fillRect(0, 0, width, height);
      animId = requestAnimationFrame(fade);
    };
    animId = requestAnimationFrame(fade);

    const onDown = (e: MouseEvent) => start(e.clientX, e.clientY);
    const onMove = (e: MouseEvent) => draw(e.clientX, e.clientY);
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches[0]) start(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) draw(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", stop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stop);
    };
  }, [isDark]);

  return <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />;
}

// -------------------------------------------------------------
// ЭТАП 2: Режиссура — рассеивание воды / дымки над кадром
// -------------------------------------------------------------
function WaterMistCanvas({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fillMist = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = isDark ? "#070707" : "#FFFFFF";
      ctx.fillRect(0, 0, width, height);
    };
    fillMist();

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      fillMist();
    };
    window.addEventListener("resize", onResize);

    const erase = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";
      const rad = ctx.createRadialGradient(x, y, 10, x, y, 100);
      rad.addColorStop(0, "rgba(0,0,0,1)");
      rad.addColorStop(0.5, "rgba(0,0,0,0.6)");
      rad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = rad;
      ctx.beginPath();
      ctx.arc(x, y, 100, 0, Math.PI * 2);
      ctx.fill();
    };

    let animId: number;
    const refog = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = isDark ? "rgba(7, 7, 7, 0.012)" : "rgba(255, 255, 255, 0.012)";
      ctx.fillRect(0, 0, width, height);
      animId = requestAnimationFrame(refog);
    };
    animId = requestAnimationFrame(refog);

    const onMove = (e: MouseEvent) => erase(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) erase(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [isDark]);

  return (
    <div className="relative w-full h-full">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-60 dark:opacity-40 grayscale contrast-125 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2000&q=80')`,
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-grab" />
    </div>
  );
}

// -------------------------------------------------------------
// ЭТАП 3: Маркетинг — Магнит аудитории и взрывной охват (НОВОЕ)
// -------------------------------------------------------------
function MarketingMagnetCanvas({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }

    const particles: Particle[] = Array.from({ length: 65 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 2 + 1.5,
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;
    let shockwaves: { x: number; y: number; r: number; opacity: number }[] = [];

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };

    // Клик рождает взрывную волну охвата
    const onClick = (e: MouseEvent) => {
      shockwaves.push({ x: e.clientX, y: e.clientY, r: 10, opacity: 1 });
    };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches[0]) {
        shockwaves.push({ x: e.touches[0].clientX, y: e.touches[0].clientY, r: 10, opacity: 1 });
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("click", onClick);
    window.addEventListener("touchstart", onTouchStart, { passive: true });

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Анимация ударных волн от клика
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.r += 6;
        sw.opacity -= 0.02;

        ctx.strokeStyle = isDark
          ? `rgba(255, 255, 255, ${sw.opacity * 0.6})`
          : `rgba(0, 0, 0, ${sw.opacity * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = isDark ? `rgba(255,255,255,${sw.opacity})` : `rgba(0,0,0,${sw.opacity})`;

        if (sw.opacity <= 0) shockwaves.splice(s, 1);
      }

      // 2. Частицы аудитории притягиваются к курсору
      for (let p of particles) {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Сила гравитации внимания
        if (dist < 320 && dist > 15) {
          const force = (320 - dist) / 320;
          p.vx += (dx / dist) * force * 0.45;
          p.vy += (dy / dist) * force * 0.45;

          // Линии захвата внимания
          if (dist < 180) {
            ctx.strokeStyle = isDark
              ? `rgba(255, 255, 255, ${(1 - dist / 180) * 0.2})`
              : `rgba(0, 0, 0, ${(1 - dist / 180) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
          }
        }

        p.vx *= 0.94;
        p.vy *= 0.94;
        p.x += p.vx;
        p.y += p.vy;

        // Отскок от краев экрана
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Отрисовка узлов
        ctx.fillStyle = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)";
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);

      }

      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("click", onClick);
      window.removeEventListener("touchstart", onTouchStart);
    };
  }, [isDark]);

  return <canvas ref={canvasRef} className="w-full h-full cursor-pointer" />;
}

// -------------------------------------------------------------
// ЭТАП 4: Монтаж и Звук — Скретч таймлайна и частоты (НОВОЕ)
// -------------------------------------------------------------
function TimelineAudioCanvas({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let prevMouseX = mouseX;
    let cuts: number[] = [];

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) mouseX = e.touches[0].clientX;
    };

    // Клик ставит склейку (CUT) на таймлайне
    const onClick = (e: MouseEvent) => {
      cuts.push(e.clientX);
      if (cuts.length > 8) cuts.shift();
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("click", onClick);

    let animId: number;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.04;

      const speed = Math.abs(mouseX - prevMouseX);
      prevMouseX = mouseX;

      // 1. Полосы аудио-эквалайзера по всему экрану
      const barCount = Math.floor(width / 16);
      const centerY = height * 0.65;

      for (let i = 0; i < barCount; i++) {
        const x = i * 16;
        const distToMouse = Math.abs(x - mouseX);
        const amp = Math.max(0, 1 - distToMouse / 250);

        // Высота прыгает в ритме звуковой дорожки
        const h =
          Math.sin(i * 0.3 + time * 2) * 25 +
          Math.cos(i * 0.15 - time) * 15 +
          amp * 60 +
          speed * 1.5 +
          8;

        ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.15)";
        ctx.fillRect(x, centerY - h / 2, 2, h);
      }

      // 2. Линии склеек (монтажные резы CUT)
      for (const cutX of cuts) {
        ctx.strokeStyle = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(cutX, 0);
        ctx.lineTo(cutX, height);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)";
      }

      // 3. Красная стрелка монтажного плейхеда (курсор)
      ctx.strokeStyle = isDark ? "rgba(255, 60, 60, 0.85)" : "rgba(220, 20, 20, 0.85)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(mouseX, 0);
      ctx.lineTo(mouseX, height);
      ctx.stroke();

      // Таймкод текущего кадра
      const frame = Math.floor((mouseX / width) * 100);
      ctx.font = "9px monospace";
      ctx.fillStyle = isDark ? "#ff5555" : "#cc0000";
      ctx.fillText(`00:02:14:${frame.toString().padStart(2, "0")}`, mouseX + 8, 120);

      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("click", onClick);
    };
  }, [isDark]);

  return <canvas ref={canvasRef} className="w-full h-full cursor-col-resize" />;
}

// -------------------------------------------------------------
// ЭТАП 5: Без лишнего — Очистка экрана от зерна и шума (НОВОЕ)
// -------------------------------------------------------------
function NoiseCleanerCanvas({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Массив шума и мусора
    const noiseDots = Array.from({ length: 180 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      char: Math.random() > 0.7 ? (Math.random() > 0.5 ? "0" : "1") : undefined,
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Область чистой линзы вокруг курсора
      const cleanRadius = 160;

      ctx.font = "8px monospace";

      for (let dot of noiseDots) {
        // Случайный шум мерцает
        dot.x += (Math.random() - 0.5) * 1.5;
        dot.y += (Math.random() - 0.5) * 1.5;

        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Если зерно попадает в радиус курсора — оно стирается (вычищается)
        if (dist < cleanRadius) {
          const pushForce = (cleanRadius - dist) / cleanRadius;
          dot.x -= (dx / dist) * pushForce * 8;
          dot.y -= (dy / dist) * pushForce * 8;
          continue;
        }

        ctx.fillStyle = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";
        if (dot.char) {
          ctx.fillText(dot.char, dot.x, dot.y);
        } else {
          ctx.fillRect(dot.x, dot.y, dot.size, dot.size);
        }
      }

      // Прицел линзы очистки
      ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.35)";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, cleanRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [isDark]);

  return <canvas ref={canvasRef} className="w-full h-full cursor-none" />;
}