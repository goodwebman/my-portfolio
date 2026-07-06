import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getProjectBySlug, PROJECTS } from '@/entities/project';
import type { Locale } from '@/i18n/routing';
import { UIContainer, UISection } from '@/shared/ui';
import { ProjectDetail } from '@/widgets/project-detail';

interface ProjectPageProps {
  readonly params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    const tMeta = await getTranslations({ locale: locale as Locale, namespace: 'Meta' });
    return { title: tMeta('projectNotFound') };
  }

  const t = await getTranslations({ locale: locale as Locale, namespace: 'Projects' });
  const summary = t(`${slug}.summary`);

  return {
    title: project.title,
    description: summary,
    openGraph: {
      title: project.title,
      description: summary,
      images: [project.cover],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <UISection>
      <UIContainer>
        <ProjectDetail project={project} />
      </UIContainer>
    </UISection>
  );
}
