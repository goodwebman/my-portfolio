import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getFeaturedProjects, ProjectCard } from '@/entities/project';
import type { Locale } from '@/shared/i18n';
import {
  UIContainer,
  UISection,
  UISectionHeading,
  UIShowcase,
  UITextLink,
} from '@/shared/ui';
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
              <UITextLink href="/tech-stack" dataName="all-skills">
                {t('skillsAll')}
              </UITextLink>
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
              <UITextLink href="/projects" dataName="all-projects">
                {t('projectsAll')}
              </UITextLink>
            }
          />
          <div className="mt-10">
            {/* Веерная витрина — для широких экранов (> 900px) */}
            <div className="hidden min-[901px]:flex justify-center">
              <UIShowcase overlap={48} arc={8}>
                {featured.map((project) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    summary={tProjects(`${project.slug}.summary`)}
                    role={tProjects(`${project.slug}.role`)}
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
