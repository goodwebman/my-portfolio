/** Внешние ссылки проекта. */
export interface ProjectLinks {
  readonly live?: string;
  readonly repo?: string;
}

/**
 * Проект/кейс портфолио — только нелокализуемое. Тексты (summary, description,
 * role) живут в messages/{locale}.json → namespace `Projects.<slug>`.
 */
export interface Project {
  readonly slug: string;
  /** Имя проекта (брендовое, одинаково во всех локалях). */
  readonly title: string;
  readonly cover: string;
  readonly gallery: readonly string[];
  readonly stack: readonly string[];
  readonly links: ProjectLinks;
  readonly year: number;
  /** Показывать ли на главной. */
  readonly featured?: boolean;
}
