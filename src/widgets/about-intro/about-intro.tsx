import { getTranslations } from 'next-intl/server';

import { LuBriefcase, LuCalendar, LuMail, LuMapPin } from 'react-icons/lu';

import { Link } from '@/shared/i18n';
import { SITE } from '@/shared/config';
import { UIAvatar, UIGradient, UIReveal } from '@/shared/ui';
import { uiButtonClassNames } from '@/shared/ui/ui-button';
import { AboutWordReveal } from '@/widgets/about-intro/about-word-reveal';

/** Секция «Обо мне»: аватар, факты и биография. Server component. */
export async function AboutIntro() {
  const t = await getTranslations('About');
  const tSite = await getTranslations('Site');

  const facts = [
    { icon: LuCalendar, label: t('factExperience'), value: t('experienceValue') },
    { icon: LuMapPin, label: t('factLocation'), value: tSite('location') },
    { icon: LuBriefcase, label: t('factRole'), value: tSite('role') },
    { icon: LuMail, label: t('factEmail'), value: SITE.email },
  ] as const;
  const bio = tSite.raw('bio') as readonly string[];

  return (
    <div className="relative grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
     

      <UIReveal className="lg:sticky lg:top-24 lg:self-start">
        <div className="flex flex-col items-start gap-6">
          <UIAvatar
            src={SITE.avatar}
            hoverSrc={SITE.avatarHover}
            alt={SITE.name}
            size="L"
            glow
            className="size-52"
          />
          <div>
            <AboutWordReveal
              as="h1"
              text={SITE.name}
              className="text-h1 font-extrabold tracking-tight text-foreground"
            />
            <p className="mt-3 inline-flex items-center gap-2 rounded-pill border border-border bg-card px-3 py-1 text-caption font-medium text-muted-foreground">
              <span className="size-2 rounded-full bg-accent" />
              {tSite('role')}
            </p>
          </div>
          <dl className="grid w-full grid-cols-1 gap-3">
            {facts.map((fact, index) => (
              <UIReveal key={fact.label} delay={index * 0.05}>
                <div className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-accent/20 p-4 transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/15">
                  <UIGradient
                    variant="card"
                    className="absolute inset-0 opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <fact.icon className="relative size-5 shrink-0 text-accent" />
                  <div className="relative min-w-0">
                    <dt className="text-caption text-muted-foreground">{fact.label}</dt>
                    <dd className="mt-0.5 wrap-break-word text-small font-bold text-card-foreground">
                      {fact.value}
                    </dd>
                  </div>
                </div>
              </UIReveal>
            ))}
          </dl>
        </div>
      </UIReveal>

      <div className="max-w-2xl">
        <p className="text-caption font-semibold uppercase tracking-wider text-accent">
          {t('eyebrow')}
        </p>
        <AboutWordReveal
          as="h2"
          text={t('heading')}
          className="mt-2 text-balance text-h2 font-bold text-foreground"
          delay={0.1}
        />
        <div className="mt-6 space-y-4 leading-relaxed">
          {bio.map((paragraph, index) => (
            <UIReveal key={index} delay={index * 0.05}>
              <p
                className={
                  index === 0
                    ? 'text-body font-medium text-foreground sm:text-lg'
                    : 'text-body text-muted-foreground sm:text-lg'
                }
              >
                {paragraph}
              </p>
            </UIReveal>
          ))}
        </div>
        <UIReveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className={uiButtonClassNames({ variant: 'accent' })}
            >
              {t('ctaProjects')}
            </Link>
            <Link
              href="/contact"
              className={uiButtonClassNames({ variant: 'outline' })}
            >
              {t('ctaContact')}
            </Link>
          </div>
        </UIReveal>
      </div>
    </div>
  );
}
