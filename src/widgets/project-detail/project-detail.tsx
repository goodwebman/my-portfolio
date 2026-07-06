import type { FC } from 'react';

import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import type { Project } from '@/entities/project';
import { Show } from '@/shared/ui/show';
import { UIReveal, UITag } from '@/shared/ui';
import { uiButtonClassNames } from '@/shared/ui/ui-button/button-styles';

import { ProjectGallery } from './project-gallery';

export interface IProjectDetailProps {
  readonly project: Project;
}

const IconArrowLeft: FC = () => (
  <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
    <path
      d="M15 18l-6-6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconExternal: FC = () => (
  <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
    <path
      d="M7 17L17 7M17 7H8M17 7v9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Детальная страница кейса: обложка, описание, стек, ссылки и галерея.
 * Server component — тексты проекта резолвятся из messages по slug, внешние
 * ссылки — обычные `<a>`, галерея — client-лист.
 */
export async function ProjectDetail({ project }: IProjectDetailProps) {
  const t = await getTranslations('ProjectDetail');
  const tProj = await getTranslations('Projects');

  const summary = tProj(`${project.slug}.summary`);
  const role = tProj(`${project.slug}.role`);
  const description = tProj.raw(`${project.slug}.description`) as readonly string[];

  return (
    <article>
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-small text-muted-foreground transition-colors hover:text-foreground"
      >
        <IconArrowLeft />
        {t('allProjects')}
      </Link>

      <header className="mt-6 max-w-3xl">
        <div className="flex items-center gap-2 text-small text-muted-foreground">
          <span>{project.year}</span>
          <Show when={Boolean(role)}>
            <span aria-hidden="true">·</span>
            <span>{role}</span>
          </Show>
        </div>
        <h1 className="mt-3 text-h1 font-bold text-foreground">{project.title}</h1>
        <p className="mt-4 text-body text-muted-foreground sm:text-lg">{summary}</p>

        <Show when={Boolean(project.links.live || project.links.repo)}>
          <div className="mt-6 flex flex-wrap gap-3">
            <Show when={Boolean(project.links.live)}>
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className={uiButtonClassNames({ variant: 'accent', size: 'M' })}
              >
                {t('openProject')}
                <IconExternal />
              </a>
            </Show>
            <Show when={Boolean(project.links.repo)}>
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className={uiButtonClassNames({ variant: 'outline', size: 'M' })}
              >
                {t('sourceCode')}
                <IconExternal />
              </a>
            </Show>
          </div>
        </Show>
      </header>

      <UIReveal className="mt-10">
        <div className="relative aspect-[16/9] overflow-hidden rounded-card border border-border bg-muted">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            priority
            className="object-cover"
          />
        </div>
      </UIReveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_260px] lg:gap-16">
        <div className="max-w-2xl space-y-5 text-body leading-relaxed text-muted-foreground">
          {description.map((paragraph, index) => (
            <UIReveal key={index} delay={index * 0.05}>
              <p>{paragraph}</p>
            </UIReveal>
          ))}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-caption font-semibold uppercase tracking-wider text-muted-foreground">
            {t('stack')}
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech}>
                <UITag tone="outline">{tech}</UITag>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <Show when={project.gallery.length > 0}>
        <section className="mt-16">
          <h2 className="text-h3 font-semibold text-foreground">{t('gallery')}</h2>
          <div className="mt-6">
            <ProjectGallery images={project.gallery} title={project.title} />
          </div>
        </section>
      </Show>
    </article>
  );
}
