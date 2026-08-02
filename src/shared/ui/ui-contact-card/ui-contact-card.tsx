import type { FC, ReactNode } from 'react';

import { LuArrowUpRight } from 'react-icons/lu';

import { Link } from '@/shared/i18n';
import { getHrefKind } from '@/shared/lib/href';
import type { cnParams } from '@/shared/lib/cn';
import { cn } from '@/shared/lib/cn';

/**
 * # Интерфейс пропсов для компонента UIContactCard
 * @interface IUIContactCardProps
 * @property {string} href - адрес контакта (http(s) или mailto/tel)
 * @property {ReactNode} icon - иконка канала связи
 * @property {string} title - название канала
 * @property {string} subtitle - «человеческий» адрес (без протокола)
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUIContactCardProps {
  readonly href: string;
  readonly icon: ReactNode;
  readonly title: string;
  readonly subtitle: string;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

const CARD_CLASS =
  'group flex items-center gap-4 rounded-card border border-border bg-card p-4 outline-none transition-colors hover:border-accent/40 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring';

const Body: FC<Pick<IUIContactCardProps, 'icon' | 'title' | 'subtitle'>> = ({
  icon,
  title,
  subtitle,
}) => (
  <>
    <span className="grid size-11 shrink-0 place-items-center rounded-pill bg-muted text-[1.25rem] text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
      {icon}
    </span>
    <span className="min-w-0 flex-1">
      <span className="block font-medium text-card-foreground">{title}</span>
      <span className="block truncate text-caption text-muted-foreground">
        {subtitle}
      </span>
    </span>
    <LuArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
  </>
);

/**
 * Карточка контакта: иконка канала, название, адрес и стрелка-аффорданс.
 * Server-safe — используется и в RSC, и в клиентских списках.
 *
 * @component
 */
export const UIContactCard: FC<IUIContactCardProps> = ({
  href,
  icon,
  title,
  subtitle,
  className,
  dataName,
}) => {
  const classNames = cn(CARD_CLASS, className);
  const name = dataName ? `UIContactCard-${dataName}` : 'UIContactCard';
  const kind = getHrefKind(href);

  if (kind === 'internal') {
    return (
      <Link href={href} data-name={name} className={classNames}>
        <Body icon={icon} title={title} subtitle={subtitle} />
      </Link>
    );
  }

  return (
    <a
      href={href}
      data-name={name}
      className={classNames}
      target={kind === 'external' ? '_blank' : undefined}
      rel={kind === 'external' ? 'noopener noreferrer' : undefined}
    >
      <Body icon={icon} title={title} subtitle={subtitle} />
    </a>
  );
};
