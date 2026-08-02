/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, screen } from '@testing-library/react';

import { renderWithIntl } from '@/shared/lib/testing';

import { UIContactCard } from './ui-contact-card';

afterEach(() => {
  cleanup();
});

describe('UIContactCard', () => {
  it('показывает название канала и адрес', () => {
    renderWithIntl(
      <UIContactCard
        href="https://t.me/x"
        icon={<svg data-testid="social-icon" />}
        title="Telegram"
        subtitle="t.me/x"
      />,
    );

    expect(screen.getByText('Telegram')).toBeInTheDocument();
    expect(screen.getByText('t.me/x')).toBeInTheDocument();
    expect(screen.getByTestId('social-icon')).toBeInTheDocument();
  });

  it('внешняя ссылка открывается в новой вкладке', () => {
    renderWithIntl(
      <UIContactCard href="https://t.me/x" icon={null} title="Telegram" subtitle="t.me/x" />,
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('mailto — обычная ссылка без target', () => {
    renderWithIntl(
      <UIContactCard
        href="mailto:a@b.c"
        icon={null}
        title="Почта"
        subtitle="a@b.c"
        dataName="email"
      />,
    );

    const link = screen.getByRole('link');
    expect(link).not.toHaveAttribute('target');
    expect(link).toHaveAttribute('data-name', 'UIContactCard-email');
  });
});
