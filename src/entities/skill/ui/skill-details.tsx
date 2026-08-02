'use client';

import type { FC } from 'react';

import { LuExternalLink } from 'react-icons/lu';

import { UILinkButton, UIProgress } from '@/shared/ui';

import type { Skill } from '../model';

/**
 * # Интерфейс пропсов для компонента SkillDetails
 * @interface ISkillDetailsProps
 * @property {Skill} skill - технология
 * @property {string} categoryLabel - локализованное название категории
 * @property {string} description - локализованное описание технологии
 * @property {string} usageLabel - подпись к полосе распространённости
 * @property {string} docsLabel - подпись кнопки со ссылкой на документацию
 */
export interface ISkillDetailsProps {
  readonly skill: Skill;
  readonly categoryLabel: string;
  readonly description: string;
  readonly usageLabel: string;
  readonly docsLabel: string;
}

/**
 * Карточка технологии для модалки: крупная иконка в бренд-цвете, категория,
 * название, описание, доля использования и ссылка на официальную документацию.
 *
 * Все тексты приходят готовыми — сущность не знает про i18n и остаётся
 * переиспользуемой из любого виджета.
 *
 * @component
 */
export const SkillDetails: FC<ISkillDetailsProps> = ({
  skill,
  categoryLabel,
  description,
  usageLabel,
  docsLabel,
}) => (
  <>
    <span
      className="text-6xl"
      style={skill.brandColor ? { color: skill.brandColor } : undefined}
      aria-hidden="true"
    >
      {skill.icon}
    </span>

    <span className="mt-4 text-caption font-medium uppercase tracking-widest text-muted-foreground">
      {categoryLabel}
    </span>
    <h3 className="mt-1 text-h4 font-semibold text-foreground">{skill.name}</h3>

    <p className="mt-3 text-small leading-relaxed text-muted-foreground">
      {description}
    </p>

    <UIProgress className="mt-6" label={usageLabel} value={skill.usage} />

    <UILinkButton
      href={skill.docUrl}
      variant="accent"
      fullWidth
      className="mt-6"
      dataName="skill-docs"
    >
      {docsLabel}
      <LuExternalLink className="size-4" />
    </UILinkButton>
  </>
);
