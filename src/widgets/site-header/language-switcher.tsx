'use client';

import type { FC } from 'react';
import { useTransition } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { usePathname, useRouter } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { UISelect } from '@/shared/ui';

const OPTIONS = [
  { value: 'ru', label: 'RU' },
  { value: 'en', label: 'EN' },
] as const;

/**
 * Переключатель языка. Меняет локаль, сохраняя текущий путь (next-intl router).
 * Навигация обёрнута в `useTransition` — не блокирует UI на переходе.
 */
export const LanguageSwitcher: FC = () => {
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
      className={isPending ? 'opacity-70' : undefined}
    />
  );
};
