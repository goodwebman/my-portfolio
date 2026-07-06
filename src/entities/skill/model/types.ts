import type { ReactNode } from 'react';

/** Категория навыка (для группировки на странице стека). */
export type SkillCategory = 'frontend' | 'backend' | 'tools';

/** Навык/технология. */
export interface Skill {
  readonly id: string;
  readonly name: string;
  /** Иконка как ReactNode — источник-агностично (react-icons и т.п.). */
  readonly icon: ReactNode;
  readonly category: SkillCategory;
  /** Бренд-цвет иконки (hex). Опционально — чёрно-белые бренды без него. */
  readonly brandColor?: string;
  /** Ссылка на официальную документацию. */
  readonly docUrl: string;
  /** Доля разработчиков, использующих технологию (%, по опросам). Плейсхолдер. */
  readonly usage: number;
}

/** Заголовки категорий для UI. */
export const SKILL_CATEGORY_LABEL: Record<SkillCategory, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Tools & DevOps',
};

/** Порядок вывода категорий. */
export const SKILL_CATEGORY_ORDER: readonly SkillCategory[] = [
  'frontend',
  'backend',
  'tools',
];
