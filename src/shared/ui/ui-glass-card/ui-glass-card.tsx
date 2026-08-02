import type { FC, ReactNode } from 'react';

import type { cnParams } from '@/shared/lib/cn';
import { cn } from '@/shared/lib/cn';
import { UIGradient } from '@/shared/ui/ui-gradient';

/**
 * # Интерфейс пропсов для компонента UIGlassCard
 * @interface IUIGlassCardProps
 * @property {ReactNode} children - содержимое поверх декоративных слоёв
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUIGlassCardProps {
  readonly children: ReactNode;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Крупная «стеклянная» панель для CTA-блоков: карточная заливка, мягкая тень с
 * акцентным оттенком и три декоративных градиентных слоя (ambient + два glow),
 * создающих глубину.
 *
 * Слои лежат абсолютом под контентом, поэтому дети должны быть `relative` —
 * иначе градиенты перекроют текст.
 *
 * @component
 */
export const UIGlassCard: FC<IUIGlassCardProps> = ({
  children,
  className,
  dataName,
}) => (
  <div
    data-name={dataName ? `UIGlassCard-${dataName}` : 'UIGlassCard'}
    className={cn(
      'group relative overflow-hidden rounded-card bg-card p-8 text-center shadow-xl shadow-accent/10 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20 sm:p-14',
      className,
    )}
  >
    <UIGradient variant="ambient" className="absolute inset-0" />
    <UIGradient
      variant="glow-top"
      className="absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full"
    />
    <UIGradient
      variant="glow-bottom"
      className="absolute -bottom-32 right-1/4 size-64 -translate-x-1/2 rounded-full"
    />
    {children}
  </div>
);
