import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import { SITE } from '@/shared/config';
import { UIAvatar, UIReveal } from '@/shared/ui';
import { uiButtonClassNames } from '@/shared/ui/ui-button/button-styles';

/** Секция «Обо мне»: аватар, факты и биография. Server component. */
export async function AboutIntro() {
  const t = await getTranslations('About');
  const tSite = await getTranslations('Site');

  const facts: readonly { readonly label: string; readonly value: string }[] = [
    { label: t('factExperience'), value: t('experienceValue') },
    { label: t('factLocation'), value: tSite('location') },
    { label: t('factRole'), value: tSite('role') },
    { label: t('factEmail'), value: SITE.email },
  ];
  const bio = tSite.raw('bio') as readonly string[];

  return (
    <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
      <UIReveal className="lg:sticky lg:top-24 lg:self-start">
        <div className="flex flex-col items-start gap-6">
          <UIAvatar
            src={SITE.avatar}
            alt={SITE.name}
            size="L"
            ring
            glow
            className="size-40"
          />
          <div>
            <h1 className="text-h2 font-bold text-foreground">{SITE.name}</h1>
            <p className="mt-1 text-body text-muted-foreground">{tSite('role')}</p>
          </div>
          <dl className="grid w-full grid-cols-2 gap-3">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-xl border border-border bg-card p-3"
              >
                <dt className="text-caption text-muted-foreground">{fact.label}</dt>
                <dd className="mt-0.5 truncate text-small font-medium text-card-foreground">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </UIReveal>

      <div className="max-w-2xl">
        <UIReveal>
          <h2 className="text-h3 font-semibold text-foreground">{t('heading')}</h2>
        </UIReveal>
        <div className="mt-4 space-y-4 text-body leading-relaxed text-muted-foreground">
          {bio.map((paragraph, index) => (
            <UIReveal key={index} delay={index * 0.05}>
              <p>{paragraph}</p>
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
