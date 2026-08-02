import type { Metadata } from 'next';

import { getTranslations, setRequestLocale } from 'next-intl/server';

import { SKILL_CATEGORY_ORDER } from '@/entities/skill';
import type { Locale } from '@/shared/i18n';
import { buildBreadcrumbJsonLd, buildPageMetadata } from '@/shared/lib/seo';
import { JsonLd, UIContainer, UISection, UISectionHeading } from '@/shared/ui';
import { SkillsGrid } from '@/widgets/skills-grid';

interface TechStackPageProps {
  readonly params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: TechStackPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: 'Meta' });

  return buildPageMetadata({
    locale: locale as Locale,
    href: '/tech-stack',
    title: t('techStackTitle'),
    description: t('techStackDescription'),
  });
}

export default async function TechStackPage({ params }: TechStackPageProps) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations('TechStack');
  const tSkills = await getTranslations('Skills');
  const tNav = await getTranslations('Nav');

  return (
    <UISection>
      <JsonLd
        data={buildBreadcrumbJsonLd(typedLocale, [
          { name: tNav('home'), href: '/' },
          { name: tNav('techStack'), href: '/tech-stack' },
        ])}
      />
      <UIContainer>
        <UISectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />
        <div className="mt-12 space-y-12">
          {SKILL_CATEGORY_ORDER.map((category) => (
            <div key={category}>
              <h2 className="text-h3 font-semibold text-foreground">
                {tSkills(category)}
              </h2>
              <div className="mt-5">
                <SkillsGrid category={category} />
              </div>
            </div>
          ))}
        </div>
      </UIContainer>
    </UISection>
  );
}
