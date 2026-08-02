/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render } from '@testing-library/react';
import { LuCode, LuTerminal } from 'react-icons/lu';

import { UIIconStream } from './ui-icon-stream';

afterEach(() => {
  cleanup();
});

describe('UIIconStream', () => {
  it('рендерит иконки без падения', () => {
    const { container } = render(
      <UIIconStream
        icons={[<LuCode key="1" />]}
      />,
    );
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('дублирует иконки для seamless loop', () => {
    const { container } = render(
      <UIIconStream
        icons={[<LuCode key="1" />, <LuTerminal key="2" />]}
      />,
    );
    // Каждая иконка продублирована → 2 × 2 = 4 svg
    const svgs = container.querySelectorAll('svg');
    expect(svgs).toHaveLength(4);
  });

  it('применяет пользовательский className', () => {
    const { container } = render(
      <UIIconStream
        icons={[<LuCode key="1" />]}
        className="custom-test-class"
      />,
    );
    const root = container.firstElementChild;
    expect(root).toHaveClass('custom-test-class');
  });

  it('проставляет aria-hidden на внешнем контейнере', () => {
    const { container } = render(
      <UIIconStream
        icons={[<LuCode key="1" />]}
      />,
    );
    const root = container.firstElementChild;
    expect(root).toHaveAttribute('aria-hidden', 'true');
  });

  it('работает с direction down', () => {
    const { container } = render(
      <UIIconStream
        icons={[<LuCode key="1" />]}
        direction="down"
      />,
    );
    const inner = container.firstElementChild?.firstElementChild;
    expect(inner).toBeInTheDocument();
  });
});
