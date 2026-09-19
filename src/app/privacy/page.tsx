import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — BASICK PRODUCTION",
  description: "Порядок обработки персональных данных и использование файлов cookie.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#070707] text-black dark:text-white pt-24 sm:pt-32 pb-36 sm:pb-48 px-6 sm:px-12 overflow-y-visible">
      <div className="max-w-3xl mx-auto space-y-10 font-mono">
        
        {/* Заголовок */}
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6 space-y-2">
          <div className="text-[10px] text-neutral-400 uppercase tracking-widest">
            DOC. REF: BASICK-LEGAL-2026 // РЕДАКЦИЯ 1.1
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-sans uppercase tracking-tight">
            ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
          </h1>
          <p className="text-xs text-neutral-500 uppercase">
            Действует для сайта basickprod.com и всех входящих заявок.
          </p>
        </div>

        {/* Тело документа */}
        <div className="space-y-8 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed uppercase">
          
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-black dark:text-white">
              01 // КТО ОБРАБАТЫВАЕТ ДАННЫЕ
            </h2>
            <p>
              Оператором данных является продакшн-студия Basick Production. Мы собираем только те сведения, которые необходимы для связи с вами и оценки проекта.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-black dark:text-white">
              02 // КАКИЕ ДАННЫЕ МЫ ПОЛУЧАЕМ
            </h2>
            <p>
              — Данные, которые вы отправляете в форме связи: имя, аккаунт в Telegram, телефон, адрес электронной почты и описание проекта.
              <br />
              — Технические обезличенные данные: IP-адрес, тип браузера, разрешение экрана и файлы cookie для корректной работы страницы.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-black dark:text-white">
              03 // ДЛЯ ЧЕГО ЭТО НУЖНО
            </h2>
            <p>
              Мы используем информацию исключительно для:
              <br />
              1. Обратной связи по вашей заявке и составления сметы.
              <br />
              2. Анализа работы сайта (чтобы интерактивные холсты не тормозили на слабых устройствах).
              <br />
              Мы никогда не продаем и не передаем базы данных рекламным сетям или спам-агентствам.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-black dark:text-white">
              04 // ФАЙЛЫ COOKIE
            </h2>
            <p>
              Сайт использует cookie, чтобы запомнить выбранную вами тему оформления (светлая/темная) и ваш ответ на баннер согласия. Вы можете отключить cookie в настройках браузера в любой момент.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-black dark:text-white">
              05 // ВАШИ ПРАВА
            </h2>
            <p>
              Вы имеете право в любой момент запросить удаление всех переданных вами контактов. Для этого достаточно отправить письмо на{" "}
              <a href="mailto:hello@basickprod.com" className="underline text-black dark:text-white">
                hello@basickprod.com
              </a>{" "}
              с темой «Удаление данных». Мы сотрем историю переписки в течение 48 часов.
            </p>
          </section>

        </div>

        {/* Футер документа */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 flex justify-between items-center text-[10px] text-neutral-400">
          <span>BASICK PRODUCTION LEGAL DEPT.</span>
          <Link href="/" className="underline hover:text-black dark:hover:text-white uppercase">
            ← НА ГЛАВНУЮ
          </Link>
        </div>

      </div>
    </div>
  );
}