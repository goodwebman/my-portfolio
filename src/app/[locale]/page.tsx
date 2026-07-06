import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { getFeaturedProjects } from '@/entities/project';
import { SITE } from '@/shared/config';
import { UIContainer, UISection, UISectionHeading } from '@/shared/ui';
import { uiButtonClassNames } from '@/shared/ui/ui-button/button-styles';
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
            <ProjectsShowcase projects={featured} />
          </div>
        </UIContainer>
      </UISection>

      <UISection dataName="cta">
        <UIContainer>
          <div className="relative overflow-hidden rounded-card border border-border bg-card p-8 text-center sm:p-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
            />
            <h2 className="relative text-balance text-h2 font-bold text-foreground">
              {t('ctaTitle')}
            </h2>
            <p className="relative mx-auto mt-3 max-w-lg text-body text-muted-foreground">
              {t('ctaDescription')}
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className={uiButtonClassNames({ variant: 'accent', size: 'M' })}
              >
                {t('ctaContact')}
              </Link>
              <a
                href={`mailto:${SITE.email}`}
                className={uiButtonClassNames({ variant: 'outline', size: 'M' })}
              >
                {SITE.email}
              </a>
            </div>
          </div>
        </UIContainer>
      </UISection>
    </>
  );
}
