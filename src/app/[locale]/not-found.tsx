import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import { UIContainer } from '@/shared/ui';
import { uiButtonClassNames } from '@/shared/ui/ui-button/button-styles';

/** 404 в пределах локали. */
export default async function NotFound() {
  const t = await getTranslations('NotFound');

  return (
    <UIContainer>
      <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="text-display font-bold text-accent">404</p>
        <h1 className="mt-4 text-h2 font-bold text-foreground">{t('title')}</h1>
        <p className="mt-3 max-w-md text-body text-muted-foreground">
          {t('description')}
        </p>
        <Link
          href="/"
          className={`mt-8 ${uiButtonClassNames({ variant: 'accent', size: 'M' })}`}
        >
          {t('home')}
        </Link>
      </div>
    </UIContainer>
  );
}
