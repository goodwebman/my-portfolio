import type { ReactNode } from 'react';

import { LuMail } from 'react-icons/lu';
import { SiGithub, SiTelegram } from 'react-icons/si';

import { SITE } from './site';

/** Соц-ссылка/контакт. Подпись резолвится через `t('Socials.<id>')`. */
export interface Social {
  readonly id: 'github' | 'telegram' | 'email';
  readonly href: string;
  readonly icon: ReactNode;
  /** Внешняя ссылка (target=_blank). Для mailto — false. */
  readonly external: boolean;
}

/** Контакты и соц-сети. */
export const SOCIALS: readonly Social[] = [
  {
    id: 'github',
    href: SITE.github,
    icon: <SiGithub />,
    external: true,
  },
  {
    id: 'telegram',
    href: SITE.telegram,
    icon: <SiTelegram />,
    external: true,
  },
  {
    id: 'email',
    href: `mailto:${SITE.email}`,
    icon: <LuMail />,
    external: false,
  },
];
