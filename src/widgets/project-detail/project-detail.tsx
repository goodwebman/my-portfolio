import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import type { Project } from '@/entities/project';
import { getTechMeta } from '@/entities/project';
import {
  IconArrowLeft,
  IconExternal,
  Show,
  UILinkButton,
  UIReveal,
  UISkill,
  UITextLink,
} from '@/shared/ui';

import { ProjectGallery } from './project-gallery';

export interface IProjectDetailProps {
  readonly project: Project;
}

/**
 * Детальная страница кейса: обложка, описание, стек, ссылки и галерея.
 * Server component — тексты проекта резолвятся из messages по slug,
 * галерея — client-лист.
 */
export async function ProjectDetail({ project }: IProjectDetailProps) {
  const t = await getTranslations('ProjectDetail');
  const tProj = await getTranslations('Projects');

  const summary = tProj(`${project.slug}.summary`);
  const role = tProj(`${project.slug}.role`);
  const description = tProj.raw(`${project.slug}.description`) as readonly string[];

  return (
    <article>
      <UITextLink href="/projects" tone="muted" dataName="all-projects">
        <IconArrowLeft />
        {t('allProjects')}
      </UITextLink>

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

        <Show when={Boolean(project.links.live ?? project.links.repo)}>
          <div className="mt-6 flex flex-wrap gap-3">
            <Show when={Boolean(project.links.live)}>
              <UILinkButton
                href={project.links.live ?? ''}
                variant="accent"
                size="M"
                dataName="live"
              >
                {t('openProject')}
                <IconExternal />
              </UILinkButton>
            </Show>
            <Show when={Boolean(project.links.repo)}>
              <UILinkButton
                href={project.links.repo ?? ''}
                variant="outline"
                size="M"
                dataName="repo"
              >
                {t('sourceCode')}
                <IconExternal />
              </UILinkButton>
            </Show>
          </div>
        </Show>

        <div className="mt-8">
          <h2 className="text-caption font-semibold uppercase tracking-wider text-muted-foreground">
            {t('stack')}
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2.5">
            {project.stack.map((tech) => {
              const { icon, color } = getTechMeta(tech);

              return (
                <li key={tech}>
                  <UISkill name={tech} icon={icon} brandColor={color} dataName="stack" />
                </li>
              );
            })}
          </ul>
        </div>
      </header>

      <UIReveal className="mt-10">
        <div className="relative aspect-screenshot overflow-hidden rounded-card bg-muted shadow-[0_0_0_1px_var(--color-border)]">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            priority
            className="object-contain"
          />
        </div>
      </UIReveal>

      <div className="mt-12 max-w-2xl space-y-5 text-body leading-relaxed text-muted-foreground">
        {description.map((paragraph, index) => (
          <UIReveal key={paragraph} delay={index * 0.05}>
            <p>{paragraph}</p>
          </UIReveal>
        ))}
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
