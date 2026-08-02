'use client';

import { memo, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

/**
 * Бесконечно крутящаяся вертикальная карусель иконок.
 *
 * Иконки повторяются столько раз, чтобы полностью заполнить контейнер —
 * никогда не бывает пустого пространства. Размер контейнера отслеживается
 * через ResizeObserver, при изменении количество повторов пересчитывается.
 * Анимация через requestAnimationFrame — без субпиксельных дёргов.
 */
export interface IUIIconStreamProps {
  /** Иконки для карусели. */
  readonly icons: ReactNode[];
  /** Скорость полного оборота в секундах. 20 по умолчанию. */
  readonly speed?: number;
  /** Направление: `'up'` (снизу вверх) или `'down'` (сверху вниз). */
  readonly direction?: 'up' | 'down';
  /** Отступ между иконками в rem. 1.5 по умолчанию. */
  readonly gap?: number;
  /** Дополнительные классы на внешний контейнер. */
  readonly className?: string;
}

export const UIIconStream = memo<IUIIconStreamProps>(({
  icons,
  speed = 20,
  direction = 'up',
  gap = 1.5,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const shiftRef = useRef(0);
  const lastTimeRef = useRef(0);
  const cycleHeightRef = useRef(0);
  const pxPerMsRef = useRef(0);
  const [repetitions, setRepetitions] = useState(3);

  // Следим за размером контейнера и пересчитываем количество повторов
  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const measure = () => {
      const children = Array.from(inner.children);
      if (!children.length) return;

      const setLen = icons.length;
      let setH = 0;
      for (let i = 0; i < setLen; i++) {
        setH += children[i].getBoundingClientRect().height;
      }
      const gapPx = gap * 16;
      setH += gapPx * (setLen - 1);
      const cyclePx = setH + gapPx;

      if (cyclePx <= 0) return;

      const containerHeight = container.getBoundingClientRect().height;
      // Нужно столько повторов, чтобы (repetitions - 1) × cyclePx >= containerHeight
      const needed = Math.ceil(containerHeight / cyclePx) + 1;
      setRepetitions((prev) => (prev !== needed ? needed : prev));
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, [icons, gap]);

  // Анимация
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const children = Array.from(el.children);
    const setLen = icons.length;
    let h = 0;
    for (let i = 0; i < setLen; i++) {
      h += children[i].getBoundingClientRect().height;
    }
    const gapPx = gap * 16;
    h += gapPx * (setLen - 1);
    const cyclePx = h + gapPx;

    if (cyclePx <= 0) return;

    cycleHeightRef.current = cyclePx;
    pxPerMsRef.current = cyclePx / (speed * 1000);

    lastTimeRef.current = 0;
    shiftRef.current = 0;
    el.style.transform = 'translateZ(0)';

    // translateY всегда в [-cyclePx, 0] — контейнер (он выше на cyclePx,
    // чем реально нужно) остаётся полностью закрытым в любой момент анимации,
    // а оборот на границе цикла невидим, т.к. контент периодичен с шагом cyclePx.
    const tick = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = Math.min(time - lastTimeRef.current, speed * 500);
      lastTimeRef.current = time;

      const cycle = cycleHeightRef.current;
      shiftRef.current = (shiftRef.current + pxPerMsRef.current * dt) % cycle;

      const translateY = direction === 'down' ? shiftRef.current - cycle : -shiftRef.current;
      el.style.transform = `translateY(${translateY}px) translateZ(0)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [icons, speed, direction, gap, repetitions]);

  if (!icons.length) return null;

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        ref={innerRef}
        className="flex flex-col items-center"
        style={{ gap: `${gap}rem`, willChange: 'transform' }}
      >
        {Array.from({ length: repetitions }, (_, setIdx) =>
          icons.map((icon, iconIdx) => (
            <div key={`${setIdx}-${iconIdx}`}>{icon}</div>
          )),
        )}
      </div>
    </div>
  );
});
UIIconStream.displayName = 'UIIconStream';
