import type { Metadata } from 'next';

import { getTranslations, setRequestLocale } from 'next-intl/server';

import { SKILL_CATEGORY_ORDER } from '@/entities/skill';
import type { Locale } from '@/i18n/routing';
import { UIContainer, UISection, UISectionHeading } from '@/shared/ui';
import { SkillsGrid } from '@/widgets/skills-grid';

interface TechStackPageProps {
  readonly params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: TechStackPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: 'Meta' });

  return {
    title: t('techStackTitle'),
    description: t('techStackDescription'),
  };
}

export default async function TechStackPage({ params }: TechStackPageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('TechStack');
  const tSkills = await getTranslations('Skills');

  return (
    <UISection>
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
