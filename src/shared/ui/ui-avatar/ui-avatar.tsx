'use client';

import type { FC } from 'react';
import { memo } from 'react';

import Image from 'next/image';

import type { cnParams } from '@/shared/lib/cn';
import { useCn } from '@/shared/lib/cn';

/** Размер аватара. */
export type UIAvatarSize = 'S' | 'M' | 'L';

/**
 * # Интерфейс пропсов для компонента UIAvatar
 * @interface IUIAvatarProps
 * @property {string} src - путь к изображению
 * @property {string} alt - альт-текст
 * @property {UIAvatarSize} [size] - размер
 * @property {boolean} [ring] - акцентная обводка
 * @property {boolean} [glow] - мягкое свечение акцентом
 * @property {boolean} [priority] - приоритетная загрузка (для hero)
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUIAvatarProps {
  readonly src: string;
  readonly alt: string;
  readonly size?: UIAvatarSize;
  readonly ring?: boolean;
  readonly glow?: boolean;
  readonly priority?: boolean;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

const SIZE_CLASS: Record<UIAvatarSize, string> = {
  S: 'size-10',
  M: 'size-16',
  L: 'size-28',
};

const SIZE_PX: Record<UIAvatarSize, string> = {
  S: '40px',
  M: '64px',
  L: '112px',
};

/**
 * Аватар: круглое изображение с опциональной акцентной обводкой и свечением.
 *
 * @component
 */
export const UIAvatar: FC<IUIAvatarProps> = memo(
  ({
    src,
    alt,
    size = 'M',
    ring = false,
    glow = false,
    priority = false,
    className,
    dataName,
  }) => {
    const classNames = useCn(
      'relative inline-block shrink-0 overflow-hidden rounded-full bg-muted',
      SIZE_CLASS[size],
      ring &&
        'ring-2 ring-accent ring-offset-2 ring-offset-background',
      glow && 'shadow-[0_0_45px_-8px_var(--accent)]',
      className,
    );

    return (
      <span
        data-name={dataName ? `UIAvatar-${dataName}` : 'UIAvatar'}
        className={classNames}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={SIZE_PX[size]}
          priority={priority}
          className="object-cover"
        />
      </span>
    );
  },
);
UIAvatar.displayName = 'UIAvatar';
