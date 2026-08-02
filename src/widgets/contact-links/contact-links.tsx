'use client';

import type { FC } from 'react';

import { useTranslations } from 'next-intl';

import { SOCIALS } from '@/shared/config';
import type { cnParams } from '@/shared/lib/cn';
import { useCn } from '@/shared/lib/cn';
import { UIContactCard } from '@/shared/ui';

export interface IContactLinksProps {
  readonly className?: cnParams | string;
}

/** Убирает протокол/`mailto:` — в карточке показывается «человеческий» адрес. */
const toReadableHref = (href: string): string =>
  href.replace(/^mailto:|^https?:\/\//, '');

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
          <UIContactCard
            href={social.href}
            icon={social.icon}
            title={t(social.id)}
            subtitle={toReadableHref(social.href)}
            dataName={social.id}
          />
        </li>
      ))}
    </ul>
  );
};
