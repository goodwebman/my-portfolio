import type { ReactNode } from 'react';

import { FaLinkedin } from 'react-icons/fa6';
import { LuMail } from 'react-icons/lu';
import { SiGithub, SiTelegram } from 'react-icons/si';

import { SITE } from './site';

/** Соц-ссылка/контакт. Подпись резолвится через `t('Socials.<id>')`. */
export interface Social {
  readonly id: 'github' | 'telegram' | 'linkedin' | 'email';
  readonly href: string;
  readonly icon: ReactNode;
  /** Внешняя ссылка (target=_blank). Для mailto — false. */
  readonly external: boolean;
}

/** Контакты и соц-сети. Ссылки — заглушки, заменяются на реальные. */
export const SOCIALS: readonly Social[] = [
  {
    id: 'github',
    href: 'https://github.com',
    icon: <SiGithub />,
    external: true,
  },
  {
    id: 'telegram',
    href: 'https://t.me',
    icon: <SiTelegram />,
    external: true,
  },
  {
    id: 'linkedin',
    href: 'https://linkedin.com',
    icon: <FaLinkedin />,
    external: true,
  },
  {
    id: 'email',
    href: `mailto:${SITE.email}`,
    icon: <LuMail />,
    external: false,
  },
];
