'use client';

import type { FC, ReactNode } from 'react';
import { memo } from 'react';

import { motion, useReducedMotion } from 'motion/react';

import type { cnParams } from '@/shared/lib/cn';
import { useCn } from '@/shared/lib/cn';
import { Show } from '@/shared/ui/show';

/** Размер плашки. */
export type UISkillSize = 'S' | 'M';
/** Вариант плашки. */
export type UISkillVariant = 'solid' | 'outline';

/**
 * # Интерфейс пропсов для компонента UISkill
 * @interface IUISkillProps
 * @property {string} name - название технологии
 * @property {ReactNode} [icon] - иконка (source-agnostic, приходит извне)
 * @property {string} [brandColor] - бренд-цвет иконки (hex)
 * @property {UISkillSize} [size] - размер
 * @property {UISkillVariant} [variant] - вариант оформления
 * @property {() => void} [onClick] - клик (напр. открыть модалку технологии)
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUISkillProps {
  readonly name: string;
  readonly icon?: ReactNode;
  readonly brandColor?: string;
  readonly size?: UISkillSize;
  readonly variant?: UISkillVariant;
  readonly onClick?: () => void;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Плашка технологии. С `onClick` — кнопка-триггер (напр. открывает модалку с
 * описанием) с пружинистым hover/tap; без него — статичный `span`, чтобы
 * витрины стека (карточка проекта) не отдавали в a11y-дерево фейковые кнопки.
 * Иконка передаётся как `ReactNode` — компонент не завязан на источник иконок.
 *
 * @component
 */
export const UISkill: FC<IUISkillProps> = memo(
  ({ name, icon, brandColor, size = 'M', variant = 'solid', onClick, className, dataName }) => {
    const shouldReduce = useReducedMotion();
    const interactive = onClick !== undefined;

    const classNames = useCn(
      'inline-flex select-none items-center gap-2 rounded-pill border font-medium outline-none transition-colors',
      interactive && 'cursor-pointer focus-visible:ring-2 focus-visible:ring-ring',
      size === 'M' ? 'h-10 px-4 text-small' : 'h-8 px-3 text-caption',
      variant === 'solid'
        ? 'border-border bg-card text-foreground shadow-sm hover:border-accent/50'
        : 'border-border text-foreground hover:bg-muted',
      className,
    );

    const content = (
      <>
        <Show when={Boolean(icon)}>
          <span
            className="inline-flex shrink-0 text-[1.15em]"
            style={brandColor ? { color: brandColor } : undefined}
          >
            {icon}
          </span>
        </Show>
        {name}
      </>
    );

    const dataNameAttr = dataName ? `UISkill-${dataName}` : 'UISkill';

    if (!interactive) {
      return (
        <span data-name={dataNameAttr} className={classNames}>
          {content}
        </span>
      );
    }

    return (
      <motion.button
        type="button"
        data-name={dataNameAttr}
        className={classNames}
        onClick={onClick}
        whileHover={shouldReduce ? undefined : { scale: 1.05 }}
        whileTap={shouldReduce ? undefined : { scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        {content}
      </motion.button>
    );
  },
);
UISkill.displayName = 'UISkill';
