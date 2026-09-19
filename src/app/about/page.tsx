import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "О студии — BASICK PRODUCTION",
  description: "Съемочный цех, пленочный архив, техника и процесс работы студии.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#070707] text-black dark:text-white pt-24 sm:pt-32 pb-36 sm:pb-48 px-6 sm:px-12 overflow-y-visible">
      <div className="max-w-4xl mx-auto space-y-16 sm:space-y-24">
        
        {/* Шапка страницы */}
        <div className="space-y-3 border-b border-neutral-200 dark:border-neutral-800 pb-8">
          <div className="font-mono text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            [ 01 // О ПРОДАКШЕНЕ ]
          </div>
          <h1 className="text-4xl sm:text-7xl font-bold uppercase font-sans tracking-tight leading-[0.9]">
            ЦЕХ СЪЕМКИ И МАРКЕТИНГА
          </h1>
          <p className="font-mono text-sm sm:text-base text-neutral-600 dark:text-neutral-400 uppercase leading-relaxed max-w-2xl pt-2">
            Мы не агентство со сотней менеджеров. Мы — продакшн-команда. Режиссеры, операторы и маркетологи, которые снимают руками и головой.
          </p>
        </div>

        {/* Цифры без хвастовства */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 font-mono border-b border-neutral-200 dark:border-neutral-800 pb-12">
          {[
            { num: "120+", label: "СНЯТЫХ ПРОЕКТОВ" },
            { num: "35ММ", label: "ПЛЕНОЧНЫЙ АРХИВ" },
            { num: "14 ДНЕЙ", label: "СРЕДНИЙ ЦИКЛ ПОСТА" },
            { num: "0", label: "ШАБЛОННЫХ СМЕТ" },
          ].map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div className="text-3xl sm:text-5xl font-bold font-sans tracking-tight text-black dark:text-white">
                {stat.num}
              </div>
              <div className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Что конкретно мы делаем */}
        <div className="space-y-8">
          <h2 className="text-2xl sm:text-4xl font-bold uppercase font-sans tracking-tight">
            ЧЕМ ЗАНИМАЕМСЯ
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 font-mono text-xs sm:text-sm">
            <div className="border border-neutral-200 dark:border-neutral-800 p-6 space-y-2">
              <span className="text-neutral-400 text-[10px] uppercase">01 // ВИДЕОПРОИЗВОДСТВО</span>
              <h3 className="text-lg font-bold font-sans uppercase">СЪЕМКА И КИНО</h3>
              <p className="text-neutral-600 dark:text-neutral-400 uppercase leading-relaxed">
                Реклама, имиджевые ролики, клипы и документальные спецпроекты. Съемка на цифровые камеры киноуровня и 35мм пленку.
              </p>
            </div>

            <div className="border border-neutral-200 dark:border-neutral-800 p-6 space-y-2">
              <span className="text-neutral-400 text-[10px] uppercase">02 // ДИСТРИБУЦИЯ</span>
              <h3 className="text-lg font-bold font-sans uppercase">МАРКЕТИНГ И ОХВАТЫ</h3>
              <p className="text-neutral-600 dark:text-neutral-400 uppercase leading-relaxed">
                Не просто отдаем файл mp4, а готовим нарезки, форматы под платформы, планируем запуск и привлекаем внимание аудитории.
              </p>
            </div>

            <div className="border border-neutral-200 dark:border-neutral-800 p-6 space-y-2">
              <span className="text-neutral-400 text-[10px] uppercase">03 // ПОСТ-ПРОДАКШН</span>
              <h3 className="text-lg font-bold font-sans uppercase">МОНТАЖ И ЗВУК</h3>
              <p className="text-neutral-600 dark:text-neutral-400 uppercase leading-relaxed">
                Чистый ритмичный монтаж, кинематографичный цвет в DaVinci Resolve и плотный авторский саунд-дизайн.
              </p>
            </div>

            <div className="border border-neutral-200 dark:border-neutral-800 p-6 space-y-2">
              <span className="text-neutral-400 text-[10px] uppercase">04 // ПРЕПРОДАКШН</span>
              <h3 className="text-lg font-bold font-sans uppercase">СЦЕНАРИЙ И КАСТИНГ</h3>
              <p className="text-neutral-600 dark:text-neutral-400 uppercase leading-relaxed">
                Пишем сценарии без воды. Подбираем актеров, локации и художников-постановщиков под реальную задачу.
              </p>
            </div>
          </div>
        </div>

        {/* Железо и камеры */}
        <div className="space-y-4 border-t border-neutral-200 dark:border-neutral-800 pt-8 font-mono">
          <div className="text-[10px] text-neutral-400 uppercase tracking-widest">
            // СЕЛЕКЦИЯ ТЕХНИКИ
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 uppercase leading-relaxed max-w-2xl">
            Камеры: ARRI Alexa LF, RED V-Raptor, Arriflex 35мм. Оптика: Cooke Anamorphic, Zeiss High Speed. Аналоговая катушечная лента для сведения звука.
          </p>
        </div>

        {/* Призыв к действию */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="text-xl sm:text-2xl font-bold font-sans uppercase">
              ЕСТЬ ЗАДАЧА НА СЪЕМКУ?
            </div>
            <p className="font-mono text-xs text-neutral-500 uppercase mt-1">
              ОТВЕЧАЕМ В ТЕЧЕНИЕ НЕСКОЛЬКИХ ЧАСОВ.
            </p>
          </div>
          <Link
            href="/contact"
            className="font-mono text-xs uppercase px-6 py-3 bg-black text-white dark:bg-white dark:text-black font-bold active:scale-95 transition-transform"
          >
            ОБСУДИТЬ ПРОЕКТ ►
          </Link>
        </div>

      </div>
    </div>
  );
}