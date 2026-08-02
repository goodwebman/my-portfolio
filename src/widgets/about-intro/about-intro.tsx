import { getTranslations } from 'next-intl/server';

import { LuBriefcase, LuCalendar, LuMail, LuMapPin } from 'react-icons/lu';

import { SITE } from '@/shared/config';
import {
  UIAvatar,
  UIBadge,
  UIFactCard,
  UILinkButton,
  UIReveal,
  UIWordReveal,
} from '@/shared/ui';

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
            <UIWordReveal
              as="h1"
              text={SITE.name}
              className="text-h1 font-extrabold tracking-tight text-foreground"
            />
            <UIBadge className="mt-3">{tSite('role')}</UIBadge>
          </div>
          <dl className="grid w-full grid-cols-1 gap-3">
            {facts.map((fact, index) => (
              <UIReveal key={fact.label} delay={index * 0.05}>
                <UIFactCard icon={fact.icon} label={fact.label} value={fact.value} />
              </UIReveal>
            ))}
          </dl>
        </div>
      </UIReveal>

      <div className="max-w-2xl">
        <p className="text-caption font-semibold uppercase tracking-wider text-accent">
          {t('eyebrow')}
        </p>
        <UIWordReveal
          as="h2"
          text={t('heading')}
          className="mt-2 text-balance text-h2 font-bold text-foreground"
          delay={0.1}
        />
        <div className="mt-6 space-y-4 leading-relaxed">
          {bio.map((paragraph, index) => (
            <UIReveal key={paragraph} delay={index * 0.05}>
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
            <UILinkButton href="/projects" variant="accent">
              {t('ctaProjects')}
            </UILinkButton>
            <UILinkButton href="/contact" variant="outline">
              {t('ctaContact')}
            </UILinkButton>
          </div>
        </UIReveal>
      </div>
    </div>
  );
}
