/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import { UIGlassCard } from './ui-glass-card';

afterEach(() => {
  cleanup();
});

describe('UIGlassCard', () => {
  it('рендерит содержимое поверх декоративных слоёв', () => {
    const { container } = render(
      <UIGlassCard>
        <p>Обсудим проект?</p>
      </UIGlassCard>,
    );

    expect(screen.getByText('Обсудим проект?')).toBeInTheDocument();
    // ambient + два glow-пятна, все скрыты от скринридера
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(3);
  });

  it('склеивает className и data-name', () => {
    const { container } = render(
      <UIGlassCard className="mt-4" dataName="cta">
        x
      </UIGlassCard>,
    );
    const root = container.querySelector('[data-name="UIGlassCard-cta"]');

    expect(root).toHaveClass('mt-4');
    expect(root).toHaveClass('overflow-hidden');
  });
});
