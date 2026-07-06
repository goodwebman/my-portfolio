'use client';

import type { FC } from 'react';
import { useCallback, useState } from 'react';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { LuExternalLink } from 'react-icons/lu';

import { SKILLS, type SkillCategory } from '@/entities/skill';
import type { cnParams } from '@/shared/lib/cn';
import { cn, useCn } from '@/shared/lib/cn';
import { UIModal, UISkill, uiButtonClassNames } from '@/shared/ui';

export interface ISkillsGridProps {
  /** Фильтр по категории. Без него — все навыки. */
  readonly category?: SkillCategory;
  readonly className?: cnParams | string;
}

/** Активная плашка + направление листания (для slide-анимации контента). */
interface IActive {
  readonly index: number;
  readonly dir: 1 | -1;
}

// Каскад — только по opacity: transform-обёртки создавали бы stacking context
// на каждой плашке. Прозрачность на rest его не создаёт.
const CONTAINER = {
  show: { transition: { staggerChildren: 0.03 } },
};
const ITEM = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
};

/**
 * Сетка навыков со stagger-ревилом. Клик по плашке открывает kit-модалку
 * (UIModal) с описанием технологии, долей использования и ссылкой на доку;
 * боковыми стрелками (или ←→) можно листать стек по кругу.
 *
 * Client-компонент: иконки react-icons рендерятся на клиенте, SKILLS импортятся
 * напрямую (не через RSC-границу).
 */
export const SkillsGrid: FC<ISkillsGridProps> = ({ category, className }) => {
  const t = useTranslations('Skills');
  const tc = useTranslations('Common');
  const shouldReduce = useReducedMotion();
  const classNames = useCn('flex flex-wrap gap-2.5', className);

  const items = category
    ? SKILLS.filter((skill) => skill.category === category)
    : SKILLS;

  const [active, setActive] = useState<IActive | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (delta: 1 | -1) =>
      setActive((prev) =>
        prev === null
          ? prev
          : {
              index: (prev.index + delta + items.length) % items.length,
              dir: delta,
            },
      ),
    [items.length],
  );
  const prev = useCallback(() => step(-1), [step]);
  const next = useCallback(() => step(1), [step]);

  const skill = active ? items[active.index] : null;
  const dir = active?.dir ?? 1;

  return (
    <>
      <motion.div
        className={classNames}
        variants={CONTAINER}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      >
        {items.map((item, index) => (
          <motion.div key={item.id} variants={ITEM}>
            <UISkill
              name={item.name}
              icon={item.icon}
              brandColor={item.brandColor}
              dataName={item.id}
              onClick={() => setActive({ index, dir: 1 })}
            />
          </motion.div>
        ))}
      </motion.div>

      <UIModal
        open={skill !== null}
        onClose={close}
        onPrev={items.length > 1 ? prev : undefined}
        onNext={items.length > 1 ? next : undefined}
        label={skill?.name ?? ''}
        closeLabel={tc('close')}
        prevLabel={tc('prev')}
        nextLabel={tc('next')}
        dataName="skill"
      >
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          {skill ? (
            <motion.div
              key={skill.id}
              custom={dir}
              variants={{
                enter: (d: number) => ({
                  opacity: 0,
                  x: shouldReduce ? 0 : d * 28,
                }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({
                  opacity: 0,
                  x: shouldReduce ? 0 : d * -28,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              <span
                className="text-6xl"
                style={skill.brandColor ? { color: skill.brandColor } : undefined}
                aria-hidden="true"
              >
                {skill.icon}
              </span>

              <span className="mt-4 text-caption font-medium uppercase tracking-widest text-muted-foreground">
                {t(skill.category)}
              </span>
              <h3 className="mt-1 text-h4 font-semibold text-foreground">
                {skill.name}
              </h3>

              <p className="mt-3 text-small leading-relaxed text-muted-foreground">
                {t(`description.${skill.id}`)}
              </p>

              <div className="mt-6 w-full">
                <div className="flex items-baseline justify-between text-caption text-muted-foreground">
                  <span>{t('usage')}</span>
                  <span className="font-semibold text-foreground">
                    {skill.usage}%
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-pill bg-muted">
                  <motion.div
                    className="h-full rounded-pill bg-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.usage}%` }}
                    transition={
                      shouldReduce
                        ? { duration: 0 }
                        : { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }
                    }
                  />
                </div>
              </div>

              <a
                href={skill.docUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={cn(
                  uiButtonClassNames({ variant: 'accent', fullWidth: true }),
                  'mt-6',
                )}
              >
                {t('docs')}
                <LuExternalLink className="size-4" />
              </a>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </UIModal>
    </>
  );
};
