import type { Metadata } from 'next';

import { getTranslations, setRequestLocale } from 'next-intl/server';

import { SITE } from '@/shared/config';
import type { Locale } from '@/shared/i18n';
import { buildBreadcrumbJsonLd, buildPageMetadata } from '@/shared/lib/seo';
import {
  JsonLd,
  UIContainer,
  UILinkButton,
  UISection,
  UISectionHeading,
} from '@/shared/ui';
import { ContactLinks } from '@/widgets/contact-links';

interface ContactPageProps {
  readonly params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: 'Meta' });

  return buildPageMetadata({
    locale: locale as Locale,
    href: '/contact',
    title: t('contactTitle'),
    description: t('contactDescription'),
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations('Contact');
  const tNav = await getTranslations('Nav');

  return (
    <UISection>
      <JsonLd
        data={buildBreadcrumbJsonLd(typedLocale, [
          { name: tNav('home'), href: '/' },
          { name: tNav('contact'), href: '/contact' },
        ])}
      />
      <UIContainer className="max-w-3xl">
        <UISectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />
        <div className="mt-6">
          <UILinkButton
            href={`mailto:${SITE.email}`}
            variant="accent"
            size="M"
            dataName="write-email"
          >
            {t('writeTo', { email: SITE.email })}
          </UILinkButton>
        </div>
        <div className="mt-10">
          <ContactLinks />
        </div>
      </UIContainer>
    </UISection>
  );
}
