'use client';

import type { FC } from 'react';
import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import { useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { LuArrowRight } from 'react-icons/lu';

import { SITE } from '@/shared/config';
import { registerGsap } from '@/shared/lib/gsap';
import { UIAvatar, UIBadge, UIContainer, UILinkButton } from '@/shared/ui';

/** Главный экран: GSAP-ревил заголовка по словам + parallax аватара. */
export const Hero: FC = () => {
  const t = useTranslations('Hero');
  const tSite = useTranslations('Site');
  const rootRef = useRef<HTMLElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const headingWords = tSite('tagline').split(' ');

  useGSAP(
    () => {
      if (shouldReduce) return;
      const gsap = registerGsap();

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.to(
        '[data-gsap="word"]',
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.055 },
        0.1,
      ).to(
        '[data-gsap="fade-up"]',
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 },
        0.45,
      );

      if (avatarRef.current) {
        gsap.to(avatarRef.current, {
          yPercent: -16,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    },
    { scope: rootRef, dependencies: [shouldReduce] },
  );

  return (
    // overflow-x-clip, а не overflow-hidden: свечение ниже уходит выше секции,
    // под шапку, и не обрезается по её верхней границе — иначе на всю ширину
    // появляется жёсткий стык «тёмный блок за шапкой / светлый низ».
    <section ref={rootRef} className="relative overflow-x-clip">
      {/* декоративное свечение */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-130 -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]"
      />
      <UIContainer>
        <div className="grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.4fr_1fr] lg:py-32">
          <div>
            <UIBadge data-gsap="fade-up">
              {tSite('role')} · {tSite('location')}
            </UIBadge>

            <h1 className="mt-6 text-display font-bold text-foreground">
              {headingWords.map((word, index) => (
                <span
                  key={`${word}-${String(index)}`}
                  className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] mb-[-0.12em]"
                >
                  <span data-gsap="word" className="inline-block will-change-transform">
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <p
              data-gsap="fade-up"
              className="mt-6 max-w-xl text-balance text-body text-muted-foreground sm:text-lg"
            >
              {tSite('shortBio')}
            </p>

            <div data-gsap="fade-up" className="mt-8 flex flex-wrap gap-3">
              <UILinkButton href="/projects" variant="accent" size="M">
                {t('ctaProjects')}
                <LuArrowRight className="size-5" />
              </UILinkButton>
              <UILinkButton href="/contact" variant="outline" size="M">
                {t('ctaContact')}
              </UILinkButton>
            </div>
          </div>

          <div data-gsap="fade-up" className="flex justify-center lg:justify-end">
            <div ref={avatarRef} className="will-change-transform">
              <UIAvatar
                src={SITE.avatar}
                hoverSrc={SITE.avatarHover}
                alt={SITE.name}
                size="L"
                halo
                glow
                priority
                className="size-60 sm:size-72 lg:size-96"
              />
            </div>
          </div>
        </div>
      </UIContainer>
    </section>
  );
};
