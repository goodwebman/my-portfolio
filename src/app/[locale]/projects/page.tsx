import type { Metadata } from 'next';

import { getTranslations, setRequestLocale } from 'next-intl/server';

import { PROJECTS } from '@/entities/project';
import type { Locale } from '@/i18n/routing';
import { UIContainer, UISection, UISectionHeading } from '@/shared/ui';
import { ProjectsShowcase } from '@/widgets/projects-showcase';

interface ProjectsPageProps {
  readonly params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: 'Meta' });

  return {
    title: t('projectsTitle'),
    description: t('projectsDescription'),
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('ProjectsPage');

  return (
    <UISection>
      <UIContainer>
        <UISectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />
        <div className="mt-10">
          <ProjectsShowcase projects={PROJECTS} />
        </div>
      </UIContainer>
    </UISection>
  );
}
