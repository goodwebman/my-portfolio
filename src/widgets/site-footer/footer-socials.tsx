'use client';

import type { FC } from 'react';

import { useTranslations } from 'next-intl';

import { SOCIALS } from '@/shared/config';

/**
 * Компактные соц-иконки для подвала. Client-компонент (иконки react-icons),
 * co-located в site-footer — сервер-футер рендерит его как client-лист.
 */
export const FooterSocials: FC = () => {
  const t = useTranslations('Socials');

  return (
  <ul className="mt-4 flex flex-wrap gap-2">
    {SOCIALS.map((social) => (
      <li key={social.id}>
        <a
          href={social.href}
          aria-label={t(social.id)}
          target={social.external ? '_blank' : undefined}
          rel={social.external ? 'noopener noreferrer' : undefined}
          className="grid size-10 place-items-center rounded-pill border border-border text-muted-foreground outline-none transition-colors hover:border-accent/40 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="text-[1.1rem]">{social.icon}</span>
        </a>
      </li>
    ))}
  </ul>
  );
};
