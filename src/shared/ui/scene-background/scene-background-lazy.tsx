'use client';

import dynamic from 'next/dynamic';

/**
 * Ленивая обёртка над WebGL-фоном.
 *
 * `SceneBackground` тянет за собой шейдеры и весь рендер-цикл, но при этом
 * чисто декоративен и на сервере не рендерится в принципе. Отдельный чанк с
 * `ssr: false` убирает его из критического бандла: страница интерактивна
 * раньше, а фон подъезжает следом (до этого видна заливка `--background`,
 * совпадающая с базовым цветом шейдера).
 */
export const SceneBackgroundLazy = dynamic(
  () => import('./scene-background').then((mod) => mod.SceneBackground),
  { ssr: false },
);
