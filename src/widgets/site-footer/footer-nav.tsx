'use client';

import type { FC } from 'react';

import { useTranslations } from 'next-intl';

import { NAV } from '@/shared/config';
import { Link, usePathname } from '@/shared/i18n';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Навигация подвала. Client-компонент: клик по уже активному разделу не
 запускает навигацию (маршрут не меняется, scroll-to-top из провайдеров не
 * сработает), поэтому прокручиваем наверх вручную — плавно.
 */
export const FooterNav: FC = () => {
  const tNav = useTranslations('Nav');
  const pathname = usePathname();

  return (
    <ul className="mt-4 space-y-2">
      {NAV.map((item) => {
        const isCurrent = pathname === item.href;

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isCurrent ? 'page' : undefined}
              onClick={(e) => {
                if (!isCurrent) return;
                e.preventDefault();
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: prefersReducedMotion() ? 'auto' : 'smooth',
                });
              }}
              className="text-small text-muted-foreground transition-all duration-300 ease-out-expo hover:bg-linear-to-r hover:from-accent hover:via-amber-500 hover:to-orange-400 hover:bg-size-[200%_auto] hover:bg-clip-text hover:text-transparent hover:animate-rainbow-text"
            >
              {tNav(item.key)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
