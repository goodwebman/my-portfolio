import type { Metadata } from 'next';

import { getTranslations, setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/i18n/routing';
import { UIContainer, UISection } from '@/shared/ui';
import { AboutIntro } from '@/widgets/about-intro';

interface AboutPageProps {
  readonly params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: 'Meta' });

  return {
    title: t('aboutTitle'),
    description: t('aboutDescription'),
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <UISection>
      <UIContainer>
        <AboutIntro />
      </UIContainer>
    </UISection>
  );
}
