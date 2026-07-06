import { getTranslations } from 'next-intl/server';

import type { Project } from '@/entities/project';
import type { cnParams } from '@/shared/lib/cn';
import { cn } from '@/shared/lib/cn';
import { UICardProject, UIReveal } from '@/shared/ui';

export interface IProjectsShowcaseProps {
  readonly projects: readonly Project[];
  readonly className?: cnParams | string;
}

/**
 * Сетка карточек проектов со scroll-ревилом. Server component: тексты проектов
 * (summary/role) резолвятся из messages по slug, UICardProject — client-лист.
 */
export async function ProjectsShowcase({
  projects,
  className,
}: IProjectsShowcaseProps) {
  const t = await getTranslations('Projects');

  return (
    <div className={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {projects.map((project, index) => (
        <UIReveal key={project.slug} delay={(index % 3) * 0.08}>
          <UICardProject
            title={project.title}
            summary={t(`${project.slug}.summary`)}
            cover={project.cover}
            tags={project.stack}
            href={`/projects/${project.slug}`}
            year={project.year}
            role={t(`${project.slug}.role`)}
            priority={index < 3}
          />
        </UIReveal>
      ))}
    </div>
  );
}
