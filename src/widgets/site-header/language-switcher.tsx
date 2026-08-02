'use client';

import type { FC } from 'react';
import { useTransition } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { usePathname, useRouter } from '@/shared/i18n';
import { cn } from '@/shared/lib/cn';
import type { cnParams } from '@/shared/lib/cn';
import { UISelect } from '@/shared/ui';
import type { Locale } from '@/shared/i18n';

const OPTIONS = [
  { value: 'ru', label: 'RU' },
  { value: 'en', label: 'EN' },
] as const;

/**
 * Переключатель языка. Меняет локаль, сохраняя текущий путь (next-intl router).
 * Навигация обёрнута в `useTransition` — не блокирует UI на переходе.
 */
export interface ILanguageSwitcherProps {
  readonly className?: cnParams | string;
}

export const LanguageSwitcher: FC<ILanguageSwitcherProps> = ({ className }) => {
  const t = useTranslations('Header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onChange = (next: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: next as Locale });
    });
  };

  return (
    <UISelect
      value={locale}
      onValueChange={onChange}
      options={OPTIONS}
      ariaLabel={t('language')}
      dataName="locale"
      className={cn(className, isPending && 'opacity-70')}
    />
  );
};
