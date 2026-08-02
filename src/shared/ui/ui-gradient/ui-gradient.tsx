import type { FC } from 'react';

import { cn } from '@/shared/lib/cn';

/**
 * Варианты градиентов, используемых в дизайне.
 * Каждый вариант — полный набор Tailwind-классов (bg-linear-to-*, from-*, via-*, to-*,
 * blur, animate), гарантирующий что JIT сканер Tailwind видит их как строковые литералы.
 */
export type UIGradientVariant = 'ambient' | 'glow-top' | 'glow-bottom' | 'card';

const VARIANT_CLASSES: Record<UIGradientVariant, string> = {
  ambient:
    'bg-linear-to-br from-accent/10 via-amber-600/[0.07] to-orange-500/5',
  'glow-top':
    'bg-linear-to-r from-accent/20 via-amber-600/15 to-orange-500/10 blur-3xl animate-glow-pulse',
  'glow-bottom':
    'bg-linear-to-r from-amber-600/10 to-orange-500/5 blur-3xl',
  card: 'bg-linear-to-br from-accent/20 via-amber-600/15 to-orange-500/10',
};

export interface IUIGradientProps {
  /** Предустановленный вариант градиента. */
  readonly variant: UIGradientVariant;
  /** Дополнительные классы (позиционирование, размеры и т.д.). */
  readonly className?: string;
}

/**
 * Декоративный градиентный элемент.
 *
 * Всегда `aria-hidden`, без `pointer-events` — чисто визуальный слой.
 * Используется для ambient-фона, glow-пятен и прочих декоративных эффектов.
 *
 * @example
 * <UIGradient variant="glow-top" className="absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full" />
 */
export const UIGradient: FC<IUIGradientProps> = ({ variant, className }) => (
  <div
    aria-hidden="true"
    className={cn('pointer-events-none', VARIANT_CLASSES[variant], className)}
  />
);

UIGradient.displayName = 'UIGradient';
