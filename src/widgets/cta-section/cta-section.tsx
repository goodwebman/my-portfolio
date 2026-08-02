'use client';

import type { FC } from 'react';

import { useTranslations } from 'next-intl';

import { LuBraces, LuCode, LuCommand, LuComponent, LuGitBranch, LuGlobe, LuMonitor, LuSparkles, LuTerminal, LuZap } from 'react-icons/lu';

import { Link } from '@/shared/i18n';
import { SITE } from '@/shared/config';
import { UIContainer, UIGradient, UIIconStream, UISection } from '@/shared/ui';
import { uiButtonClassNames } from '@/shared/ui/ui-button';

/**
 * CTA-секция на главной: призыв к действию с эффектом стекла (iOS-style glassmorphism).
 *
 * Декоративные слои (ambient gradient, glow-пятна) лежат под стеклом и создают
 * ощущение глубины и «сочности». Фон размывается через `backdrop-blur-2xl`.
 */
export const CtaSection: FC = () => {
  const t = useTranslations('Home');

  return (
    <UISection dataName="cta">
      <UIContainer>
        <div className="group relative overflow-hidden rounded-card bg-card p-8 text-center shadow-xl shadow-accent/10 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20 sm:p-14">
          {/* Ambient gradient — цветная подложка под стеклом */}
          <UIGradient variant="ambient" className="absolute inset-0" />

       
          <UIGradient
            variant="glow-top"
            className="absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full"
          />

          <UIGradient
            variant="glow-bottom"
            className="absolute -bottom-32 right-1/4 size-64 -translate-x-1/2 rounded-full"
          />

          <h2 className="relative text-balance text-h2 font-bold text-foreground">
            {t('ctaTitle')}
          </h2>
          <p className="relative mx-auto mt-3 max-w-lg text-body text-muted-foreground">
            {t('ctaDescription')}
          </p>
          <UIIconStream
            icons={[
              <LuCode key="c1" className="size-8 text-accent/25" />,
              <LuBraces key="c2" className="size-8 text-accent/25" />,
              <LuTerminal key="c3" className="size-8 text-accent/25" />,
              <LuCommand key="c4" className="size-8 text-accent/25" />,
              <LuGitBranch key="c5" className="size-8 text-accent/25" />,
            ]}
            speed={12}
            direction="up"
            className="pointer-events-none absolute left-2 lg:left-[12%] top-1/2  h-80 w-14 -translate-y-1/2 "
          />

          <UIIconStream
            icons={[
              <LuMonitor key="m1" className="size-8 text-accent/25" />,
              <LuSparkles key="m2" className="size-8 text-accent/25" />,
              <LuGlobe key="m3" className="size-8 text-accent/25" />,
              <LuComponent key="m4" className="size-8 text-accent/25" />,
              <LuZap key="m5" className="size-8 text-accent/25" />,
            ]}
            speed={28}
            direction="down"
            className="pointer-events-none absolute right-2 lg:right-[12%] top-1/2  h-80 w-14 -translate-y-1/2 "
          />

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
  );
};
