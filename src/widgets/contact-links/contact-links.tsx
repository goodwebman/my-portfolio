'use client';

import type { FC } from 'react';

import { useTranslations } from 'next-intl';
import { LuArrowUpRight } from 'react-icons/lu';

import { SOCIALS } from '@/shared/config';
import type { cnParams } from '@/shared/lib/cn';
import { useCn } from '@/shared/lib/cn';

export interface IContactLinksProps {
  readonly className?: cnParams | string;
}

/**
 * Соц-ссылки/контакты карточками (страница контактов). Client-компонент —
 * иконки react-icons рендерятся только на клиенте, SOCIALS импортятся здесь
 * напрямую (не через server→client границу, где Context.Consumer иконок ломается).
 */
export const ContactLinks: FC<IContactLinksProps> = ({ className }) => {
  const t = useTranslations('Socials');
  const classNames = useCn('grid gap-3 sm:grid-cols-2', className);

  return (
    <ul className={classNames}>
      {SOCIALS.map((social) => (
        <li key={social.id}>
          <a
            href={social.href}
            target={social.external ? '_blank' : undefined}
            rel={social.external ? 'noopener noreferrer' : undefined}
            className="group flex items-center gap-4 rounded-card border border-border bg-card p-4 outline-none transition-colors hover:border-accent/40 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-pill bg-muted text-[1.25rem] text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
              {social.icon}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-medium text-card-foreground">
                {t(social.id)}
              </span>
              <span className="block truncate text-caption text-muted-foreground">
                {social.href.replace(/^mailto:|^https?:\/\//, '')}
              </span>
            </span>
            <LuArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </li>
      ))}
    </ul>
  );
};
