'use client';

import type { FC } from 'react';

import { useTranslations } from 'next-intl';

import {
  LuBraces,
  LuCode,
  LuCommand,
  LuComponent,
  LuGitBranch,
  LuGlobe,
  LuMonitor,
  LuSparkles,
  LuTerminal,
  LuZap,
} from 'react-icons/lu';

import { SITE } from '@/shared/config';
import {
  UIContainer,
  UIGlassCard,
  UIIconStream,
  UILinkButton,
  UISection,
} from '@/shared/ui';

const STREAM_ICON_CLASS = 'size-8 text-accent/25';

/**
 * Наборы декоративных иконок вынесены на уровень модуля: массивы попадают в
 * deps эффектов `UIIconStream`, и новые ссылки на каждый рендер перезапускали бы
 * измерения и анимацию.
 */
const LEFT_ICONS = [
  <LuCode key="c1" className={STREAM_ICON_CLASS} />,
  <LuBraces key="c2" className={STREAM_ICON_CLASS} />,
  <LuTerminal key="c3" className={STREAM_ICON_CLASS} />,
  <LuCommand key="c4" className={STREAM_ICON_CLASS} />,
  <LuGitBranch key="c5" className={STREAM_ICON_CLASS} />,
];

const RIGHT_ICONS = [
  <LuMonitor key="m1" className={STREAM_ICON_CLASS} />,
  <LuSparkles key="m2" className={STREAM_ICON_CLASS} />,
  <LuGlobe key="m3" className={STREAM_ICON_CLASS} />,
  <LuComponent key="m4" className={STREAM_ICON_CLASS} />,
  <LuZap key="m5" className={STREAM_ICON_CLASS} />,
];

/**
 * CTA-секция на главной: призыв к действию на «стеклянной» панели
 * (`UIGlassCard`) с бегущими лентами иконок по бокам.
 */
export const CtaSection: FC = () => {
  const t = useTranslations('Home');

  return (
    <UISection dataName="cta">
      <UIContainer>
        <UIGlassCard dataName="cta">
          <h2 className="relative text-balance text-h2 font-bold text-foreground">
            {t('ctaTitle')}
          </h2>
          <p className="relative mx-auto mt-3 max-w-lg text-body text-muted-foreground">
            {t('ctaDescription')}
          </p>

          <UIIconStream
            icons={LEFT_ICONS}
            speed={12}
            direction="up"
            className="pointer-events-none absolute left-2 top-1/2 h-80 w-14 -translate-y-1/2 lg:left-[12%]"
          />
          <UIIconStream
            icons={RIGHT_ICONS}
            speed={28}
            direction="down"
            className="pointer-events-none absolute right-2 top-1/2 h-80 w-14 -translate-y-1/2 lg:right-[12%]"
          />

          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <UILinkButton href="/contact" variant="accent" size="M">
              {t('ctaContact')}
            </UILinkButton>
            <UILinkButton href={`mailto:${SITE.email}`} variant="outline" size="M">
              {SITE.email}
            </UILinkButton>
          </div>
        </UIGlassCard>
      </UIContainer>
    </UISection>
  );
};
