/**
 * @vitest-environment jsdom
 */
import type { ComponentProps } from 'react';

import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

// Локале-aware Link завязан на next-intl → next/navigation (недоступен в jsdom).
// Юнит-тесту карточки i18n не нужен — подменяем Link простым якорем.
vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...rest }: ComponentProps<'a'> & { href: string }) => (
    <a href={String(href)} {...rest}>
      {children}
    </a>
  ),
}));

import { UICardProject } from './ui-card-project';

afterEach(() => {
  cleanup();
});

const baseProps = {
  title: 'Where is Pizza',
  summary: 'Realtime трекинг доставки пиццы',
  cover: '/projects/pizza/cover.jpg',
  tags: ['Next.js', 'TypeScript'],
  href: '/projects/where-is-pizza',
} as const;

function getRoot(container: HTMLElement): HTMLElement {
  const el = container.querySelector<HTMLElement>('[data-name^="UICardProject"]');
  if (!el) throw new Error('UICardProject: root not found');

  return el;
}

describe('UICardProject', () => {
  it('data-name по умолчанию и с суффиксом', () => {
    const { container: c1 } = render(<UICardProject {...baseProps} />);
    expect(getRoot(c1)).toHaveAttribute('data-name', 'UICardProject');

    const { container: c2 } = render(
      <UICardProject {...baseProps} dataName="featured" />,
    );
    expect(getRoot(c2)).toHaveAttribute('data-name', 'UICardProject-featured');
  });

  it('это ссылка на href', () => {
    const { container } = render(<UICardProject {...baseProps} />);
    const root = getRoot(container);
    expect(root.tagName).toBe('A');
    expect(root).toHaveAttribute('href', '/projects/where-is-pizza');
  });

  it('рендерит заголовок, описание и теги', () => {
    render(<UICardProject {...baseProps} />);
    expect(screen.getByText('Where is Pizza')).toBeInTheDocument();
    expect(screen.getByText('Realtime трекинг доставки пиццы')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('рендерит обложку с alt = title', () => {
    render(<UICardProject {...baseProps} />);
    expect(screen.getByAltText('Where is Pizza')).toBeInTheDocument();
  });

  it('показывает мета year · role когда переданы', () => {
    render(<UICardProject {...baseProps} year={2024} role="Fullstack" />);
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('Fullstack')).toBeInTheDocument();
  });
});
