'use client';

import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { LuChevronLeft, LuChevronRight, LuX } from 'react-icons/lu';

export interface IProjectGalleryProps {
  readonly images: readonly string[];
  readonly title: string;
}

/** Галерея скриншотов с лайтбоксом (motion) + клавиатурная навигация. */
export const ProjectGallery: FC<IProjectGalleryProps> = ({ images, title }) => {
  const t = useTranslations('ProjectGallery');
  const [active, setActive] = useState<number | null>(null);
  const shouldReduce = useReducedMotion();

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((a) => (a === null ? a : (a - 1 + images.length) % images.length)),
    [images.length],
  );
  const next = useCallback(
    () => setActive((a) => (a === null ? a : (a + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (active === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      else if (event.key === 'ArrowLeft') prev();
      else if (event.key === 'ArrowRight') next();
    };

    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close, prev, next]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(index)}
            className="group relative aspect-[16/10] overflow-hidden rounded-card border border-border bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={t('openScreenshot', { index: index + 1 })}
          >
            <Image
              src={src}
              alt={t('screenshotAlt', { title, index: index + 1 })}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"
            initial={shouldReduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={t('galleryAria', { title })}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label={t('close')}
              className="absolute right-4 top-4 grid size-11 place-items-center rounded-pill border border-border bg-card text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
            >
              <LuX className="size-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label={t('prev')}
              className="absolute left-4 grid size-11 place-items-center rounded-pill border border-border bg-card text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
            >
              <LuChevronLeft className="size-5" />
            </button>

            <motion.div
              className="relative aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-card border border-border bg-muted"
              initial={shouldReduce ? false : { scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={shouldReduce ? { opacity: 0 } : { scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[active]}
                alt={t('screenshotAlt', { title, index: active + 1 })}
                fill
                sizes="90vw"
                className="object-cover"
              />
            </motion.div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label={t('next')}
              className="absolute right-4 bottom-4 grid size-11 place-items-center rounded-pill border border-border bg-card text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring sm:bottom-auto sm:right-4"
            >
              <LuChevronRight className="size-5" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};
