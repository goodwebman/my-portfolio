/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render } from '@testing-library/react';

import { UITag } from './ui-tag';

afterEach(() => {
  cleanup();
});

function getRoot(container: HTMLElement): HTMLElement {
  const el = container.querySelector<HTMLElement>('[data-name^="UITag"]');
  if (!el) throw new Error('UITag: root not found');

  return el;
}

describe('UITag', () => {
  it('data-name по умолчанию и с суффиксом', () => {
    const { container: c1 } = render(<UITag>React</UITag>);
    expect(getRoot(c1)).toHaveAttribute('data-name', 'UITag');

    const { container: c2 } = render(<UITag dataName="stack">React</UITag>);
    expect(getRoot(c2)).toHaveAttribute('data-name', 'UITag-stack');
  });

  it('tone default / accent / outline: ключевые классы', () => {
    const { container: c1 } = render(<UITag>d</UITag>);
    expect(getRoot(c1)).toHaveClass('bg-muted');

    const { container: c2 } = render(<UITag tone="accent">a</UITag>);
    expect(getRoot(c2)).toHaveClass('bg-accent-muted');
    expect(getRoot(c2)).toHaveClass('text-accent');

    const { container: c3 } = render(<UITag tone="outline">o</UITag>);
    expect(getRoot(c3)).toHaveClass('border');
    expect(getRoot(c3)).toHaveClass('border-border');
  });

  it('рендерит children и className', () => {
    const { container } = render(<UITag className="uppercase">Next.js</UITag>);
    const root = getRoot(container);
    expect(root).toHaveTextContent('Next.js');
    expect(root).toHaveClass('uppercase');
  });
});
