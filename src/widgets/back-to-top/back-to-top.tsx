'use client';

import type { FC } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { LuArrowUp } from 'react-icons/lu';

import { Show } from '@/shared/ui';

/**
 * # Порог скролла (в процентах от высоты документа) для появления кнопки.
 * 0.2 = 20% — когда пользователь пролистал пятую часть страницы.
 */
const SCROLL_THRESHOLD = 0.2;

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Круглая «наверх»-кнопка в правом нижнем углу.
 * Появляется с анимацией после того, как пользователь пролистал страницу
 * на `SCROLL_THRESHOLD` (20%) от её общей высоты.
 * По клику плавно скроллит на самый верх страницы.
 *
 * Используется только на главной странице (`/`), в shared/layout не вешается.
 */
export const BackToTop: FC = () => {
  const shouldReduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Защита от деления на ноль — если контент короче вьюпорта,
      // кнопка никогда не показывается.
      if (docHeight <= 0) {
        setVisible(false);
        return;
      }

      setVisible(scrollTop / docHeight > SCROLL_THRESHOLD);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Вызов на случай, если страница открыта уже в прокрученном состоянии
    // (например, после редиректа или с бек-навигации).
    requestAnimationFrame(update);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: shouldReduce ? 'instant' : 'smooth' });
  }, [shouldReduce]);

  const transition = useMemo(
    () => ({ duration: 0.28, ease: EASE }),
    [],
  );

  return (
    <AnimatePresence mode="wait">
      <Show when={visible}>
        <motion.button
          key="back-to-top"
          type="button"
          aria-label="Прокрутить наверх"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduce ? undefined : { opacity: 0, scale: 0.6, y: 16 }}
          transition={transition}
          whileHover={shouldReduce ? undefined : { scale: 1.1 }}
          whileTap={shouldReduce ? undefined : { scale: 0.95 }}
          onClick={handleClick}
          className="fixed bottom-6 right-6 z-40 grid size-11 cursor-pointer place-items-center rounded-full border border-border bg-card text-muted-foreground shadow-[0_8px_30px_-8px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/4 backdrop-blur-xl outline-none transition-colors duration-200 hover:border-accent/40 hover:text-accent focus-visible:ring-2 focus-visible:ring-ring sm:bottom-8 sm:right-8 sm:size-12"
        >
          <LuArrowUp className="size-5 sm:size-5.5" />
        </motion.button>
      </Show>
    </AnimatePresence>
  );
};
