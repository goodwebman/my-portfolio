/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import { UISelect, type IUISelectOption } from './ui-select';

afterEach(() => {
  cleanup();
});

const noop = (): void => {};

const OPTIONS: readonly IUISelectOption[] = [
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'English' },
];

describe('UISelect', () => {
  it('рендерит триггер с aria-label и data-name', () => {
    const { container } = render(
      <UISelect
        value="ru"
        onValueChange={noop}
        options={OPTIONS}
        ariaLabel="Язык"
      />,
    );
    const trigger = container.querySelector('[data-name="UISelect"]');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-label', 'Язык');
  });

  it('data-name с суффиксом dataName', () => {
    const { container } = render(
      <UISelect
        value="ru"
        onValueChange={noop}
        options={OPTIONS}
        ariaLabel="Язык"
        dataName="lang"
      />,
    );
    expect(
      container.querySelector('[data-name="UISelect-lang"]'),
    ).toBeInTheDocument();
  });

  it('показывает placeholder при пустом значении', () => {
    render(
      <UISelect
        value=""
        onValueChange={noop}
        options={OPTIONS}
        ariaLabel="Язык"
        placeholder="Выберите"
      />,
    );
    expect(screen.getByText('Выберите')).toBeInTheDocument();
  });

  it('применяет className к триггеру', () => {
    const { container } = render(
      <UISelect
        value="ru"
        onValueChange={noop}
        options={OPTIONS}
        ariaLabel="Язык"
        className="w-40"
      />,
    );
    expect(container.querySelector('[data-name="UISelect"]')).toHaveClass('w-40');
  });
});
