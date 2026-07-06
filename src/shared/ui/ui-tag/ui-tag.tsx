'use client';

import type { FC, ReactNode } from 'react';
import { memo } from 'react';

import type { cnParams } from '@/shared/lib/cn';
import { useCn } from '@/shared/lib/cn';

/** Визуальные тона тега. */
export type UITagTone = 'default' | 'accent' | 'outline';

/**
 * # Интерфейс пропсов для компонента UITag
 * @interface IUITagProps
 * @property {ReactNode} children - текст тега
 * @property {UITagTone} [tone] - визуальный тон
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUITagProps {
  readonly children: ReactNode;
  readonly tone?: UITagTone;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Мелкий чип для тегов/стека.
 *
 * @component
 */
export const UITag: FC<IUITagProps> = memo(
  ({ children, tone = 'default', className, dataName }) => {
    const classNames = useCn(
      'inline-flex items-center rounded-pill px-2.5 py-0.5 text-caption font-medium',
      tone === 'default' && 'bg-muted text-muted-foreground',
      tone === 'accent' && 'bg-accent-muted text-accent',
      tone === 'outline' && 'border border-border text-muted-foreground',
      className,
    );

    return (
      <span
        data-name={dataName ? `UITag-${dataName}` : 'UITag'}
        className={classNames}
      >
        {children}
      </span>
    );
  },
);
UITag.displayName = 'UITag';
