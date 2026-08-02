/**
 * @vitest-environment jsdom
 */
import type { FC } from 'react';

import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import { UIFactCard } from './ui-fact-card';

afterEach(() => {
  cleanup();
});

const Icon: FC<{ readonly className?: string }> = ({ className }) => (
  <svg data-testid="fact-icon" className={className} />
);

describe('UIFactCard', () => {
  it('рендерит термин и значение семантическими dt/dd', () => {
    const { container } = render(
      <dl>
        <UIFactCard icon={Icon} label="Локация" value="Remote" />
      </dl>,
    );

    expect(container.querySelector('dt')).toHaveTextContent('Локация');
    expect(container.querySelector('dd')).toHaveTextContent('Remote');
  });

  it('размер и цвет иконки задаёт карточка, а не вызывающая сторона', () => {
    render(
      <dl>
        <UIFactCard icon={Icon} label="Роль" value="Frontend" />
      </dl>,
    );

    const icon = screen.getByTestId('fact-icon');
    expect(icon).toHaveClass('size-5');
    expect(icon).toHaveClass('text-accent');
  });

  it('data-name с суффиксом', () => {
    const { container } = render(
      <dl>
        <UIFactCard icon={Icon} label="l" value="v" dataName="email" />
      </dl>,
    );

    expect(
      container.querySelector('[data-name="UIFactCard-email"]'),
    ).toBeInTheDocument();
  });
});
