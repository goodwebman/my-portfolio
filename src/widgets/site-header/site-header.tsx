'use client';

import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { LuMenu, LuX } from 'react-icons/lu';

import { Link, usePathname } from '@/i18n/navigation';
import { NAV, SITE } from '@/shared/config';
import { cn } from '@/shared/lib/cn';
import { useMediaQuery } from '@/shared/lib/hooks';
import { UIThemeToggle } from '@/shared/ui';

import { LanguageSwitcher } from './language-switcher';

const isActiveHref = (pathname: string, href: string): boolean =>
  href === '/' ? pathname === '/' : pathname.startsWith(href);

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Плавающий остров-навигация: стеклянная капсула, оторванная от краёв, поверх
 * шейдерного фона. Активный пункт — «переезжающая» таблетка (layoutId), при
 * скролле капсула уплотняется, мобильное меню выпадает отдельной плашкой.
 */
export const SiteHeader: FC = () => {
  const t = useTranslations('Header');
  const tNav = useTranslations('Nav');
  const pathname = usePathname();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const shouldReduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Дровер существует только на мобиле: на десктопе он схлопнут независимо от `open`.
  const drawerOpen = open && !isDesktop;

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    requestAnimationFrame(update); // начальное состояние (deferred)
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="pointer-events-none sticky top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4 lg:px-8">
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={shouldReduce ? false : { y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className={cn(
            'pointer-events-auto flex items-center justify-between gap-2 rounded-full border px-2.5 py-2 ring-1 ring-inset ring-white/4 backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-300',
            scrolled
              ? 'border-border bg-card/85 shadow-[0_14px_44px_-14px_rgba(0,0,0,0.6)]'
              : 'border-border/60 bg-card/55 shadow-[0_8px_30px_-14px_rgba(0,0,0,0.45)]',
          )}
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="group flex items-center gap-2 rounded-full pl-1 pr-2 font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="grid size-9 place-items-center rounded-full bg-accent font-mono text-accent-foreground shadow-[0_0_20px_-4px_var(--accent)] transition-transform duration-300 group-hover:scale-105">
              &lt;/&gt;
            </span>
            <span className="hidden pr-1 sm:inline">{SITE.name}</span>
          </Link>

          <nav
            className="hidden flex-1 items-center justify-center gap-0.5 md:flex"
            aria-label={t('mainNav')}
          >
            {NAV.map((item) => {
              const active = isActiveHref(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative rounded-full px-3.5 py-1.5 text-small font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring',
                    active
                      ? 'text-accent'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-accent/15 ring-1 ring-inset ring-accent/25"
                      transition={{ duration: 0.35, ease: EASE }}
                    />
                  ) : null}
                  {tNav(item.key)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <LanguageSwitcher />
            <UIThemeToggle
              labelToDark={t('themeToDark')}
              labelToLight={t('themeToLight')}
            />
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border border-border bg-card/60 text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring md:hidden"
              aria-label={open ? t('closeMenu') : t('openMenu')}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'x' : 'menu'}
                  initial={shouldReduce ? false : { opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={shouldReduce ? undefined : { opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex"
                >
                  {open ? <LuX className="size-5" /> : <LuMenu className="size-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {drawerOpen ? (
            <motion.div
              className="pointer-events-auto absolute inset-x-0 top-full mt-2 origin-top overflow-hidden rounded-3xl border border-border bg-card/90 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] ring-1 ring-inset ring-white/4 backdrop-blur-xl md:hidden"
              initial={shouldReduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={shouldReduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              <nav
                className="flex flex-col gap-1 p-3"
                aria-label={t('mobileNav')}
              >
                {NAV.map((item) => {
                  const active = isActiveHref(pathname, item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'rounded-2xl px-4 py-3 text-body font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring',
                        active
                          ? 'bg-accent/15 text-accent ring-1 ring-inset ring-accent/25'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                      )}
                    >
                      {tNav(item.key)}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
};
