'use client';

import type { FC } from 'react';
import { useCallback, useState } from 'react';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';

import { SKILLS, SkillDetails, type SkillCategory } from '@/entities/skill';
import type { cnParams } from '@/shared/lib/cn';
import { useCn } from '@/shared/lib/cn';
import { UIModal, UISkill } from '@/shared/ui';

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
 * (UIModal) с карточкой технологии (`SkillDetails`); боковыми стрелками
 * (или ←→) стек листается по кругу.
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

  const close = useCallback(() => {
    setActive(null);
  }, []);
  const step = useCallback(
    (delta: 1 | -1) => {
      setActive((prev) =>
        prev === null
          ? prev
          : {
              index: (prev.index + delta + items.length) % items.length,
              dir: delta,
            },
      );
    },
    [items.length],
  );
  const prev = useCallback(() => {
    step(-1);
  }, [step]);
  const next = useCallback(() => {
    step(1);
  }, [step]);

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
              onClick={() => {
                setActive({ index, dir: 1 });
              }}
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
              <SkillDetails
                skill={skill}
                categoryLabel={t(skill.category)}
                description={t(`description.${skill.id}`)}
                usageLabel={t('usage')}
                docsLabel={t('docs')}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </UIModal>
    </>
  );
};
