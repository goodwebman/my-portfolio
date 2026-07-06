/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import { UISkill } from './ui-skill';

afterEach(() => {
  cleanup();
});

function getRoot(container: HTMLElement): HTMLElement {
  const el = container.querySelector<HTMLElement>('[data-name^="UISkill"]');
  if (!el) throw new Error('UISkill: root not found');

  return el;
}

describe('UISkill', () => {
  it('data-name по умолчанию и с суффиксом', () => {
    const { container: c1 } = render(<UISkill name="React" />);
    expect(getRoot(c1)).toHaveAttribute('data-name', 'UISkill');

    const { container: c2 } = render(<UISkill name="React" dataName="fe" />);
    expect(getRoot(c2)).toHaveAttribute('data-name', 'UISkill-fe');
  });

  it('рендерит name', () => {
    render(<UISkill name="TypeScript" />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('иконка рендерится только когда передана (через Show)', () => {
    const { queryByTestId } = render(<UISkill name="React" />);
    expect(queryByTestId('icon')).toBeNull();

    cleanup();
    const { getByTestId } = render(
      <UISkill name="React" icon={<svg data-testid="icon" />} />,
    );
    expect(getByTestId('icon')).toBeInTheDocument();
  });

  it('variant solid / outline: ключевые классы', () => {
    const { container: c1 } = render(<UISkill name="React" />);
    expect(getRoot(c1)).toHaveClass('bg-card');

    const { container: c2 } = render(<UISkill name="React" variant="outline" />);
    expect(getRoot(c2)).toHaveClass('border');
    expect(getRoot(c2)).toHaveClass('border-border');
  });

  it('size S / M: высота', () => {
    const { container: c1 } = render(<UISkill name="React" size="S" />);
    expect(getRoot(c1)).toHaveClass('h-8');

    const { container: c2 } = render(<UISkill name="React" size="M" />);
    expect(getRoot(c2)).toHaveClass('h-10');
  });

  it('brandColor задаёт цвет иконки', () => {
    const { container } = render(
      <UISkill name="React" icon={<svg data-testid="icon" />} brandColor="#61DAFB" />,
    );
    const iconWrap = container.querySelector<HTMLElement>('[data-testid="icon"]')
      ?.parentElement;
    expect(iconWrap).not.toBeNull();
    expect(iconWrap!.style.color).not.toBe('');
  });
});
