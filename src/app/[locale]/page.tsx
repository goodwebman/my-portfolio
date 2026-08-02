import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Fragment } from 'react';

import { Link } from '@/shared/i18n';
import type { Locale } from '@/shared/i18n';
import { getFeaturedProjects, getTechIcon } from '@/entities/project';
import { UICardProject, UIContainer, UISection, UISectionHeading, UIShowcase } from '@/shared/ui';
import { BackToTop } from '@/widgets/back-to-top';
import { CtaSection } from '@/widgets/cta-section';
import { Hero } from '@/widgets/hero';
import { ProjectsShowcase } from '@/widgets/projects-showcase';
import { SkillsGrid } from '@/widgets/skills-grid';

interface HomePageProps {
  readonly params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('Home');
  const tProjects = await getTranslations('Projects');
  const featured = getFeaturedProjects();

  return (
    <>
      <Hero />

      <UISection dataName="skills">
        <UIContainer>
          <UISectionHeading
            eyebrow={t('skillsEyebrow')}
            title={t('skillsTitle')}
            action={
              <Link
                href="/tech-stack"
                className="text-small font-medium text-accent transition-opacity hover:opacity-80"
              >
                {t('skillsAll')}
              </Link>
            }
          />
          <div className="mt-8">
            <SkillsGrid />
          </div>
        </UIContainer>
      </UISection>

      <UISection dataName="projects" className="border-y border-border bg-muted/30">
        <UIContainer>
          <UISectionHeading
            eyebrow={t('projectsEyebrow')}
            title={t('projectsTitle')}
            description={t('projectsDescription')}
            action={
              <Link
                href="/projects"
                className="text-small font-medium text-accent transition-opacity hover:opacity-80"
              >
                {t('projectsAll')}
              </Link>
            }
          />
          <div className="mt-10">
            {/* Веерная витрина — для широких экранов (> 900px) */}
            <div className="hidden min-[901px]:flex justify-center">
              <UIShowcase overlap={48} arc={8}>
                {featured.map((project) => (
                  <UICardProject
                    key={project.slug}
                    title={project.title}
                    summary={tProjects(`${project.slug}.summary`)}
                    cover={project.cover}
                    tags={project.stack}
                    tagIcons={project.stack.map((tech) => (
                      <Fragment key={tech}>{getTechIcon(tech)}</Fragment>
                    ))}
                    href={`/projects/${project.slug}`}
                    year={project.year}
                    role={tProjects(`${project.slug}.role`)}
                    priority={false}
                  />
                ))}
              </UIShowcase>
            </div>
            {/* Сетка проектов — для узких экранов (≤ 900px) */}
            <div className="min-[901px]:hidden">
              <ProjectsShowcase projects={featured} />
            </div>
          </div>
        </UIContainer>
      </UISection>

      <CtaSection />

      <BackToTop />
    </>
  );
}
