import { Fragment } from 'react';
import type { FC } from 'react';

import type { cnParams } from '@/shared/lib/cn';
import { UICardProject } from '@/shared/ui';

import type { Project } from '../model';

import { getTechIcon } from './tech-icon';

/**
 * # Интерфейс пропсов для компонента ProjectCard
 * @interface IProjectCardProps
 * @property {Project} project - кейс портфолио
 * @property {string} summary - локализованное краткое описание
 * @property {string} [role] - локализованная роль в проекте
 * @property {boolean} [priority] - приоритетная загрузка обложки (первый экран)
 * @property {cnParams | string} [className] - доп. классы
 */
export interface IProjectCardProps {
  readonly project: Project;
  readonly summary: string;
  readonly role?: string;
  readonly priority?: boolean;
  readonly className?: cnParams | string;
}

/**
 * Карточка проекта: связывает данные сущности с презентационным
 * `UICardProject` — раскладывает стек в теги с бренд-иконками и собирает
 * маршрут к детальной странице.
 *
 * Один адаптер на все витрины (сетка проектов, веер на главной), чтобы
 * маппинг `Project → UICardProject` не дублировался по виджетам.
 *
 * @component
 */
export const ProjectCard: FC<IProjectCardProps> = ({
  project,
  summary,
  role,
  priority = false,
  className,
}) => (
  <UICardProject
    title={project.title}
    summary={summary}
    cover={project.cover}
    tags={project.stack}
    tagIcons={project.stack.map((tech) => (
      <Fragment key={tech}>{getTechIcon(tech)}</Fragment>
    ))}
    href={`/projects/${project.slug}`}
    year={project.year}
    role={role}
    priority={priority}
    className={className}
    dataName={project.slug}
  />
);
