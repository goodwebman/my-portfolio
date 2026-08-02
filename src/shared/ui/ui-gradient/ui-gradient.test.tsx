/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render } from '@testing-library/react';

import { UIGradient } from './ui-gradient';

afterEach(() => {
  cleanup();
});

describe('UIGradient', () => {
  it('рендерит div с aria-hidden', () => {
    const { container } = render(<UIGradient variant="ambient" />);
    const div = container.firstElementChild;
    expect(div?.tagName).toBe('DIV');
    expect(div).toHaveAttribute('aria-hidden', 'true');
  });

  it('рендерит variant="ambient" с ожидаемыми классами', () => {
    const { container } = render(<UIGradient variant="ambient" />);
    const div = container.firstElementChild;
    expect(div).toHaveClass('bg-linear-to-br');
    expect(div).toHaveClass('from-accent/10');
    expect(div).toHaveClass('to-orange-500/5');
  });

  it('рендерит variant="glow-top" с анимацией', () => {
    const { container } = render(<UIGradient variant="glow-top" />);
    const div = container.firstElementChild;
    expect(div).toHaveClass('animate-glow-pulse');
    expect(div).toHaveClass('blur-3xl');
  });

  it('рендерит variant="glow-bottom"', () => {
    const { container } = render(<UIGradient variant="glow-bottom" />);
    const div = container.firstElementChild;
    expect(div).toHaveClass('from-amber-600/10');
  });

  it('применяет пользовательский className', () => {
    const { container } = render(
      <UIGradient variant="ambient" className="absolute inset-0" />,
    );
    const div = container.firstElementChild;
    expect(div).toHaveClass('absolute');
    expect(div).toHaveClass('inset-0');
  });

  it('проставляет pointer-events-none', () => {
    const { container } = render(<UIGradient variant="ambient" />);
    expect(container.firstElementChild).toHaveClass('pointer-events-none');
  });
});
