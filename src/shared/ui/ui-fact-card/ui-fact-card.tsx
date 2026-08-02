import type { ComponentType, FC } from 'react';

import type { cnParams } from '@/shared/lib/cn';
import { cn } from '@/shared/lib/cn';
import { UIGradient } from '@/shared/ui/ui-gradient';

/**
 * # Интерфейс пропсов для компонента UIFactCard
 * @interface IUIFactCardProps
 * @property {ComponentType<{ className?: string }>} icon - компонент иконки
 * @property {string} label - подпись факта (термин)
 * @property {string} value - значение факта
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUIFactCardProps {
  readonly icon: ComponentType<{ readonly className?: string }>;
  readonly label: string;
  readonly value: string;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Карточка факта из списка определений (`<dl>`): иконка, термин и значение
 * поверх градиентной подложки, с подъёмом на hover.
 *
 * Иконка принимается компонентом, а не `ReactNode`, — размер и цвет задаёт сама
 * карточка (`size-5 text-accent`), а не вызывающая сторона.
 *
 * @component
 * @example
 * ```tsx
 * <dl>
 *   <UIFactCard icon={LuMapPin} label="Локация" value="Remote" />
 * </dl>
 * ```
 */
export const UIFactCard: FC<IUIFactCardProps> = ({
  icon: Icon,
  label,
  value,
  className,
  dataName,
}) => (
  <div
    data-name={dataName ? `UIFactCard-${dataName}` : 'UIFactCard'}
    className={cn(
      'group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-accent/20 p-4 transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/15',
      className,
    )}
  >
    <UIGradient
      variant="card"
      className="absolute inset-0 opacity-80 transition-opacity duration-300 group-hover:opacity-100"
    />
    <Icon className="relative size-5 shrink-0 text-accent" />
    <div className="relative min-w-0">
      <dt className="text-caption text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 wrap-break-word text-small font-bold text-card-foreground">
        {value}
      </dd>
    </div>
  </div>
);
