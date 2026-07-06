'use client';

import type { FC } from 'react';
import { memo } from 'react';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';

import { Link } from '@/i18n/navigation';

import type { cnParams } from '@/shared/lib/cn';
import { useCn } from '@/shared/lib/cn';
import { Show } from '@/shared/ui/show';
import { UITag } from '@/shared/ui/ui-tag';

/**
 * # Интерфейс пропсов для компонента UICardProject
 * @interface IUICardProjectProps
 * @property {string} title - заголовок проекта
 * @property {string} summary - краткое описание
 * @property {string} cover - обложка (путь)
 * @property {readonly string[]} tags - теги/стек
 * @property {string} href - ссылка на детальную страницу
 * @property {number} [year] - год
 * @property {string} [role] - роль
 * @property {boolean} [priority] - приоритетная загрузка обложки
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUICardProjectProps {
  readonly title: string;
  readonly summary: string;
  readonly cover: string;
  readonly tags: readonly string[];
  readonly href: string;
  readonly year?: number;
  readonly role?: string;
  readonly priority?: boolean;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Карточка проекта: обложка, мета, теги, hover-lift. Ведёт на `href`.
 *
 * @component
 */
export const UICardProject: FC<IUICardProjectProps> = memo(
  ({ title, summary, cover, tags, href, year, role, priority = false, className, dataName }) => {
    const shouldReduce = useReducedMotion();
    const classNames = useCn('group block', className);

    return (
      <Link
        href={href}
        data-name={dataName ? `UICardProject-${dataName}` : 'UICardProject'}
        className={classNames}
      >
        <motion.article
          whileHover={shouldReduce ? undefined : { y: -6 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-full flex-col overflow-hidden rounded-card border border-border bg-card transition-colors group-hover:border-accent/40"
        >
          <div className="relative aspect-16/10 overflow-hidden bg-muted">
            <Image
              src={cover}
              alt={title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <Show when={year !== undefined || Boolean(role)}>
              <div className="mb-2 flex items-center gap-1.5 text-caption text-muted-foreground">
                <Show when={year !== undefined}>
                  <span>{year}</span>
                </Show>
                <Show when={year !== undefined && Boolean(role)}>
                  <span aria-hidden="true">·</span>
                </Show>
                <Show when={Boolean(role)}>
                  <span>{role}</span>
                </Show>
              </div>
            </Show>

            <h3 className="text-h3 font-semibold text-card-foreground">{title}</h3>
            <p className="mt-2 line-clamp-2 text-small text-muted-foreground">
              {summary}
            </p>

            <Show when={tags.length > 0}>
              <ul className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li key={tag}>
                    <UITag>{tag}</UITag>
                  </li>
                ))}
              </ul>
            </Show>
          </div>
        </motion.article>
      </Link>
    );
  },
);
UICardProject.displayName = 'UICardProject';
