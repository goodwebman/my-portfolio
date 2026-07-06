'use client';

import type { FC, ReactNode } from 'react';
import { memo } from 'react';

import * as Select from '@radix-ui/react-select';
import { LuCheck, LuChevronDown } from 'react-icons/lu';

import type { cnParams } from '@/shared/lib/cn';
import { cn, useCn } from '@/shared/lib/cn';
import { Show } from '@/shared/ui/show';

/** Опция селекта. */
export interface IUISelectOption {
  readonly value: string;
  readonly label: string;
  /** Опциональная иконка перед подписью. */
  readonly icon?: ReactNode;
}

/**
 * # Интерфейс пропсов для компонента UISelect
 * @interface IUISelectProps
 * @property {string} value - выбранное значение (controlled)
 * @property {(value: string) => void} onValueChange - колбэк выбора
 * @property {readonly IUISelectOption[]} options - опции
 * @property {string} ariaLabel - доступное имя триггера
 * @property {string} [placeholder] - плейсхолдер при пустом значении
 * @property {cnParams | string} [className] - доп. классы триггера
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUISelectProps {
  readonly value: string;
  readonly onValueChange: (value: string) => void;
  readonly options: readonly IUISelectOption[];
  readonly ariaLabel: string;
  readonly placeholder?: string;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Селект на Radix UI (@radix-ui/react-select): доступный, с клавиатурной
 * навигацией и порталом. Обёртка в стиле дизайн-системы (токены темы).
 *
 * @component
 * @example
 * ```tsx
 * <UISelect value={locale} onValueChange={setLocale} ariaLabel="Язык" options={opts} />
 * ```
 */
export const UISelect: FC<IUISelectProps> = memo(
  ({ value, onValueChange, options, ariaLabel, placeholder, className, dataName }) => {
    const triggerClassNames = useCn(
      'inline-flex h-10 items-center justify-between gap-2 rounded-pill border border-border bg-card px-3.5 text-small font-medium text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=open]:bg-muted',
      className,
    );

    return (
      <Select.Root value={value} onValueChange={onValueChange}>
        <Select.Trigger
          data-name={dataName ? `UISelect-${dataName}` : 'UISelect'}
          aria-label={ariaLabel}
          className={triggerClassNames}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon>
            <LuChevronDown className="size-4 text-muted-foreground" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            position="popper"
            sideOffset={6}
            className="z-120 min-w-(--radix-select-trigger-width) overflow-hidden rounded-xl border border-border bg-card p-1 shadow-lg"
          >
            <Select.Viewport>
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className={cn(
                    'relative flex cursor-pointer select-none items-center gap-2 rounded-lg py-2 pl-3 pr-8 text-small text-card-foreground outline-none',
                    'data-highlighted:bg-muted data-[state=checked]:text-accent',
                  )}
                >
                  <Show when={Boolean(option.icon)}>
                    <span className="inline-flex shrink-0 text-[1.05em]">
                      {option.icon}
                    </span>
                  </Show>
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator className="absolute right-2 inline-flex">
                    <LuCheck className="size-4" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    );
  },
);
UISelect.displayName = 'UISelect';
