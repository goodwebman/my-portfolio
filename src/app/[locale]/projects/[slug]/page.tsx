import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getProjectBySlug, PROJECTS } from '@/entities/project';
import type { Locale } from '@/shared/i18n';
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildProjectJsonLd,
} from '@/shared/lib/seo';
import { JsonLd, UIContainer, UISection } from '@/shared/ui';
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
  const typedLocale = locale as Locale;
  const project = getProjectBySlug(slug);

  if (!project) {
    const tMeta = await getTranslations({
      locale: typedLocale,
      namespace: 'Meta',
    });

    return { title: tMeta('projectNotFound'), robots: { index: false, follow: false } };
  }

  const t = await getTranslations({ locale: typedLocale, namespace: 'Projects' });
  const summary = t(`${slug}.summary`);

  return buildPageMetadata({
    locale: typedLocale,
    href: `/projects/${slug}`,
    title: project.title,
    description: summary,
    openGraph: {
      type: 'article',
      images: [{ url: project.cover, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: summary,
      images: [project.cover],
    },
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  setRequestLocale(typedLocale);
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const t = await getTranslations('Projects');
  const tNav = await getTranslations('Nav');

  return (
    <UISection>
      <JsonLd
        data={[
          buildProjectJsonLd({
            locale: typedLocale,
            slug: project.slug,
            name: project.title,
            description: t(`${project.slug}.summary`),
            cover: project.cover,
            year: project.year,
            stack: project.stack,
            live: project.links.live,
            repo: project.links.repo,
          }),
          buildBreadcrumbJsonLd(typedLocale, [
            { name: tNav('home'), href: '/' },
            { name: tNav('projects'), href: '/projects' },
            { name: project.title, href: `/projects/${project.slug}` },
          ]),
        ]}
      />
      <UIContainer>
        <ProjectDetail project={project} />
      </UIContainer>
    </UISection>
  );
}
