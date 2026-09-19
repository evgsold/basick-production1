"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Sparkles, Eye, Camera, Film, MonitorPlay } from "lucide-react";

interface Stage {
  id: number;
  title: string;
  step: string;
  subtitle: string;
  description: string;
  details: string[];
}

const STAGES: Stage[] = [
  {
    id: 0,
    step: "01",
    title: "Замысел и Сценарий",
    subtitle: "От идеи на клочке бумаги до железной раскадровки",
    description: "Всё начинается с одного параграфа. Мы не начинаем арендовать технику, пока история не работает сама по себе в чистом тексте за 3 минуты чтения.",
    details: ["Литературный сценарий", "Режиссёрский тритмент", "Покадровые эскизы (Storyboards)"],
  },
  {
    id: 1,
    step: "02",
    title: "Видоискатель и Кастинг",
    subtitle: "Поиск фактуры: люди, свет и честные локации",
    description: "Мы не берём моделей из рекламных каталогов. Ищем выразительные лица, проезжаем тысячи километров в поисках заброшенных заводов или маяков с естественным светом.",
    details: ["Оптический видоискатель", "Локационный скаутинг", "Пробы по свету и объективам"],
  },
  {
    id: 2,
    step: "03",
    title: "Съёмочный Цех",
    subtitle: "Мотор. 24 кадра в секунду. Плёнка и живой свет",
    description: "На площадке нет случайных людей. Работаем на плёнку 16mm (Arri SR3) или цифровой Arri RAW с винтажной анаморфотной оптикой. Звук пишем начисто на ленту или рекордер Nagra.",
    details: ["Плёнка Kodak Vision3", "Анаморфотное стекло Cooke / Lomo", "Чистовая запись звука на площадке"],
  },
  {
    id: 3,
    step: "04",
    title: "Лаборатория и Монтаж",
    subtitle: "Ритм дыхания, химическая проявка и цвет",
    description: "Монтируем по драматургии, а не по таймкоду песни. Проявка плёнки в лаборатории, сканирование в 4K и аналоговый саунд-дизайн на магнитной ленте.",
    details: ["Монтаж на таймлайне", "Колористика по негативу", "Саунд-дизайн и фоли-шумы"],
  },
  {
    id: 4,
    step: "05",
    title: "Премьерный Мастер",
    subtitle: "Большой экран и звук 5.1",
    description: "Финальный фильм для кинотеатров, фестивалей или брендов. Зритель чувствует плотность воздуха, теплоту зерна и настоящий вес кадра.",
    details: ["DCP пакет для кинотеатров", "Dolby Atmos / 5.1 микс", "Архивация негативов"],
  },
];

export default function ProductionJourney3D() {
  const [currentStage, setCurrentStage] = useState(0);
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const stageObjects = useRef<THREE.Object3D[]>([]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Сцена, камера, рендерер
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Свет (кинематографичный с тёплым контрастом)
    const ambientLight = new THREE.AmbientLight(0xede8df, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xd94a26, 2.8); // оранжевый свет прожектора
    keyLight.position.set(5, 6, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x5282a6, 2.0); // холодный контровой свет
    rimLight.position.set(-5, 3, -4);
    scene.add(rimLight);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);
    groupRef.current = masterGroup;

    // ==============================================================
    // 5 ПРОЦЕДУРНЫХ 3D-АРТЕФАКТОВ КИНОПРОИЗВОДСТВА
    // ==============================================================

    // 01. СЦЕНАРИЙ (Блокнот с золотым сечением и раскадровкой)
    const scriptGroup = new THREE.Group();
    const coverGeo = new THREE.BoxGeometry(2.2, 2.8, 0.15);
    const coverMat = new THREE.MeshStandardMaterial({ color: 0x1f1d1a, roughness: 0.8, metalness: 0.2 });
    const cover = new THREE.Mesh(coverGeo, coverMat);
    scriptGroup.add(cover);

    const pageGeo = new THREE.BoxGeometry(2.0, 2.6, 0.1);
    const pageMat = new THREE.MeshStandardMaterial({ color: 0xede8df, roughness: 0.9 });
    const pages = new THREE.Mesh(pageGeo, pageMat);
    pages.position.z = 0.08;
    scriptGroup.add(pages);

    // Закладка-лента
    const ribbonGeo = new THREE.BoxGeometry(0.12, 3.2, 0.02);
    const ribbonMat = new THREE.MeshStandardMaterial({ color: 0xd94a26 });
    const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    ribbon.position.set(0.4, 0, 0.15);
    scriptGroup.add(ribbon);

    masterGroup.add(scriptGroup);
    stageObjects.current[0] = scriptGroup;

    // 02. ОПТИЧЕСКИЙ ВИДОИСКАТЕЛЬ (Viewfinder с линзами)
    const vfGroup = new THREE.Group();
    const barrelGeo = new THREE.CylinderGeometry(0.7, 0.85, 2.4, 32);
    const metalMat = new THREE.MeshStandardMaterial({ color: 0x24221f, roughness: 0.3, metalness: 0.8 });
    const barrel = new THREE.Mesh(barrelGeo, metalMat);
    barrel.rotation.z = Math.PI / 2;
    vfGroup.add(barrel);

    // Кольцо шкалы фокуса
    const ringGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.35, 32);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xd94a26, metalness: 0.6, roughness: 0.4 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.z = Math.PI / 2;
    vfGroup.add(ring);

    // Стеклянная передняя линза
    const lensGeo = new THREE.SphereGeometry(0.68, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const lensMat = new THREE.MeshPhysicalMaterial({ color: 0x88c0d0, roughness: 0.1, transmission: 0.9, thickness: 0.8 });
    const lens = new THREE.Mesh(lensGeo, lensMat);
    lens.position.x = 1.2;
    lens.rotation.z = -Math.PI / 2;
    vfGroup.add(lens);

    masterGroup.add(vfGroup);
    stageObjects.current[1] = vfGroup;

    // 03. КИНОКАМЕРА 16MM (Корпус, двойной магазин плёнки, бленда)
    const camGroup = new THREE.Group();
    const bodyGeo = new THREE.BoxGeometry(1.8, 1.4, 1.4);
    const body = new THREE.Mesh(bodyGeo, metalMat);
    camGroup.add(body);

    // Круглые кассеты с плёнкой сверху (Magazine 400ft)
    const magGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.4, 32);
    const mag1 = new THREE.Mesh(magGeo, metalMat);
    mag1.position.set(-0.3, 1.2, 0);
    mag1.rotation.x = Math.PI / 2;
    const mag2 = new THREE.Mesh(magGeo, metalMat);
    mag2.position.set(0.6, 1.2, 0);
    mag2.rotation.x = Math.PI / 2;
    camGroup.add(mag1, mag2);

    // Объектив с блендой (Matte box)
    const mbGeo = new THREE.BoxGeometry(1.1, 0.9, 0.7);
    const mbMat = new THREE.MeshStandardMaterial({ color: 0x141312, roughness: 0.7 });
    const matteBox = new THREE.Mesh(mbGeo, mbMat);
    matteBox.position.set(1.4, 0, 0);
    camGroup.add(matteBox);

    masterGroup.add(camGroup);
    stageObjects.current[2] = camGroup;

    // 04. МОНТАЖНЫЙ СТОЛ (Бобина с магнитной лентой)
    const reelGroup = new THREE.Group();
    const reelPlateGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.05, 32);
    const reel1 = new THREE.Mesh(reelPlateGeo, metalMat);
    reel1.position.z = 0.25;
    reel1.rotation.x = Math.PI / 2;

    const reel2 = new THREE.Mesh(reelPlateGeo, metalMat);
    reel2.position.z = -0.25;
    reel2.rotation.x = Math.PI / 2;

    // Сердечник с намотанной пленкой
    const filmCoreGeo = new THREE.CylinderGeometry(1.1, 1.1, 0.45, 32);
    const filmCoreMat = new THREE.MeshStandardMaterial({ color: 0x3d2b24, roughness: 0.9 });
    const filmCore = new THREE.Mesh(filmCoreGeo, filmCoreMat);
    filmCore.rotation.x = Math.PI / 2;

    reelGroup.add(reel1, reel2, filmCore);
    masterGroup.add(reelGroup);
    stageObjects.current[3] = reelGroup;

    // 05. КИНОПРОЕКТОР (Объектив с конусом света)
    const projGroup = new THREE.Group();
    const projBodyGeo = new THREE.BoxGeometry(2.0, 1.5, 2.0);
    const projBody = new THREE.Mesh(projBodyGeo, metalMat);
    projGroup.add(projBody);

    // Световой конус луча проектора
    const coneGeo = new THREE.ConeGeometry(2.2, 5, 32, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0xede8df,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });
    const lightBeam = new THREE.Mesh(coneGeo, coneMat);
    lightBeam.position.set(0, 0, 3);
    lightBeam.rotation.x = -Math.PI / 2;
    projGroup.add(lightBeam);

    masterGroup.add(projGroup);
    stageObjects.current[4] = projGroup;

    // Вращение мышью
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    container.addEventListener("mousemove", handleMouseMove);

    // Анимационный цикл
    let reqId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Плавное вращение активного объекта
      masterGroup.rotation.y += (mouseX * 0.8 - masterGroup.rotation.y) * 0.05 + 0.003;
      masterGroup.rotation.x += (-mouseY * 0.5 - masterGroup.rotation.x) * 0.05;

      // Вращение бобины на 4 этапе
      if (stageObjects.current[3]) {
        stageObjects.current[3].rotation.z = elapsedTime * 1.5;
      }

      renderer.render(scene, camera);
      reqId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Переключение видимости объектов в зависимости от текущего этапа
  useEffect(() => {
    stageObjects.current.forEach((obj, idx) => {
      if (!obj) return;
      obj.visible = idx === currentStage;
      if (idx === currentStage && groupRef.current) {
        groupRef.current.rotation.set(0.2, 0, 0);
      }
    });
  }, [currentStage]);

  return (
    <section id="experience" className="py-24 px-6 border-b border-[#211f1c] bg-[#0c0b0a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[#d94a26] text-xs font-mono tracking-widest uppercase block mb-3">
              [ ЭТАПЫ ПРОИЗВОДСТВА • ИНТЕРАКТИВ ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-light text-white tracking-tight">
              Путь фильма: от искры до проектора
            </h2>
          </div>
          <span className="text-xs text-[#787267] font-mono mt-4 md:mt-0">
            [ ТЯНИТЕ МЫШЬ ДЛЯ ВРАЩЕНИЯ 3D-АРТЕФАКТА ]
          </span>
        </div>

        {/* 3D Сцена + Информационная панель */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#131210] border border-[#211f1c] p-4 sm:p-8">
          {/* Интерактивный 3D Холст */}
          <div className="lg:col-span-7 h-[380px] sm:h-[480px] relative border border-[#26231f] bg-[#0c0b0a] overflow-hidden flex items-center justify-center">
            <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
            <div className="absolute top-4 left-4 text-[10px] font-mono text-[#635e54] pointer-events-none">
              МОДЕЛЬ {STAGES[currentStage].step} // REAL-TIME WEBGL
            </div>
            <div className="absolute bottom-4 right-4 text-[10px] font-mono text-[#d94a26] pointer-events-none">
              ● ROTATE: ACTIVE
            </div>
          </div>

          {/* Описание текущего шага */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full p-2 sm:p-4">
            <div>
              <div className="flex items-center gap-3 font-mono text-xs text-[#d94a26] mb-2">
                <span>ЭТАП {STAGES[currentStage].step}</span>
                <span>/ 05</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-sans font-normal text-white mb-2">
                {STAGES[currentStage].title}
              </h3>
              <p className="text-sm font-serif italic text-[#a39c8f] mb-6">
                {STAGES[currentStage].subtitle}
              </p>

              <p className="text-sm text-[#8c8577] leading-relaxed mb-6 font-sans">
                {STAGES[currentStage].description}
              </p>

              <div className="border-t border-[#26231f] pt-4 mb-8">
                <span className="text-[11px] font-mono text-[#635e54] uppercase tracking-wider block mb-2">
                  Инструменты этапа:
                </span>
                <ul className="space-y-1.5 font-mono text-xs text-[#ede8df]">
                  {STAGES[currentStage].details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d94a26]" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Кнопки переключения этапов */}
            <div className="grid grid-cols-5 gap-2 pt-4 border-t border-[#26231f]">
              {STAGES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentStage(idx)}
                  className={`py-2 text-xs font-mono transition-all border ${
                    currentStage === idx
                      ? "bg-[#d94a26] text-black border-[#d94a26] font-bold"
                      : "bg-[#181614] text-[#8c8577] border-[#2b2824] hover:border-[#ede8df] hover:text-white"
                  }`}
                >
                  {s.step}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}