import type { Metadata } from 'next';

import { getTranslations, setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/i18n/routing';
import { SITE } from '@/shared/config';
import { UIContainer, UISection, UISectionHeading } from '@/shared/ui';
import { uiButtonClassNames } from '@/shared/ui/ui-button/button-styles';
import { ContactLinks } from '@/widgets/contact-links';

interface ContactPageProps {
  readonly params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: 'Meta' });

  return {
    title: t('contactTitle'),
    description: t('contactDescription'),
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('Contact');

  return (
    <UISection>
      <UIContainer className="max-w-3xl">
        <UISectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />
        <div className="mt-6">
          <a
            href={`mailto:${SITE.email}`}
            className={uiButtonClassNames({ variant: 'accent', size: 'M' })}
          >
            {t('writeTo', { email: SITE.email })}
          </a>
        </div>
        <div className="mt-10">
          <ContactLinks />
        </div>
      </UIContainer>
    </UISection>
  );
}
