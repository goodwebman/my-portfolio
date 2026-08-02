import type { Metadata } from 'next';

import { getTranslations, setRequestLocale } from 'next-intl/server';

import { PROJECTS } from '@/entities/project';
import type { Locale } from '@/shared/i18n';
import { buildBreadcrumbJsonLd, buildPageMetadata } from '@/shared/lib/seo';
import { JsonLd, UIContainer, UISection, UISectionHeading } from '@/shared/ui';
import { ProjectsShowcase } from '@/widgets/projects-showcase';

interface ProjectsPageProps {
  readonly params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: 'Meta' });

  return buildPageMetadata({
    locale: locale as Locale,
    href: '/projects',
    title: t('projectsTitle'),
    description: t('projectsDescription'),
  });
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  setRequestLocale(typedLocale);
  const t = await getTranslations('ProjectsPage');
  const tNav = await getTranslations('Nav');

  return (
    <UISection>
      <JsonLd
        data={buildBreadcrumbJsonLd(typedLocale, [
          { name: tNav('home'), href: '/' },
          { name: tNav('projects'), href: '/projects' },
        ])}
      />
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
