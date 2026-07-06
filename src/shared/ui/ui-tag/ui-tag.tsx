'use client';

import type { FC, ReactNode } from 'react';
import { memo } from 'react';

import type { cnParams } from '@/shared/lib/cn';
import { useCn } from '@/shared/lib/cn';
import { Show } from '@/shared/ui/show';

/** Визуальные тона тега. */
export type UITagTone = 'default' | 'accent' | 'outline';

/**
 * # Интерфейс пропсов для компонента UITag
 * @interface IUITagProps
 * @property {ReactNode} children - текст тега
 * @property {UITagTone} [tone] - визуальный тон
 * @property {ReactNode} [icon] - иконка перед текстом
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUITagProps {
  readonly children: ReactNode;
  readonly tone?: UITagTone;
  readonly icon?: ReactNode;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Мелкий чип для тегов/стека. С `icon` — иконка технологии перед текстом.
 *
 * @component
 */
export const UITag: FC<IUITagProps> = memo(
  ({ children, tone = 'default', icon, className, dataName }) => {
    const classNames = useCn(
      'inline-flex items-center gap-1 rounded-pill px-2.5 py-0.5 text-caption font-medium',
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
        <Show when={Boolean(icon)}>
          <span className="text-[1em]" aria-hidden="true">
            {icon}
          </span>
        </Show>
        {children}
      </span>
    );
  },
);
UITag.displayName = 'UITag';
