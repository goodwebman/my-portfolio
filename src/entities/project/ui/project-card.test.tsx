/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, screen } from '@testing-library/react';

import { renderWithIntl } from '@/shared/lib/testing';

import type { Project } from '../model';

import { ProjectCard } from './project-card';

afterEach(() => {
  cleanup();
});

const PROJECT: Project = {
  slug: 'demo',
  title: 'Demo',
  cover: '/projects/demo/cover.jpg',
  gallery: [],
  stack: ['React', 'Next.js', 'TypeScript', 'Zod', 'Prisma'],
  links: {},
  year: 2026,
};

describe('ProjectCard', () => {
  it('ведёт на детальную страницу проекта в текущей локали', () => {
    renderWithIntl(<ProjectCard project={PROJECT} summary="Кратко" />);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/ru/projects/demo');
  });

  it('показывает заголовок, описание, год и роль', () => {
    renderWithIntl(
      <ProjectCard project={PROJECT} summary="Кратко о проекте" role="Fullstack" />,
    );

    expect(screen.getByRole('heading', { name: 'Demo' })).toBeInTheDocument();
    expect(screen.getByText('Кратко о проекте')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('Fullstack')).toBeInTheDocument();
  });

  it('длинный стек сворачивается в счётчик «+N»', () => {
    renderWithIntl(<ProjectCard project={PROJECT} summary="s" />);

    // 5 технологий: 4 видимых тега + «+1»
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('data-name содержит slug — карточку видно в отладке', () => {
    const { container } = renderWithIntl(<ProjectCard project={PROJECT} summary="s" />);

    expect(
      container.querySelector('[data-name="UICardProject-demo"]'),
    ).toBeInTheDocument();
  });
});
