/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render } from '@testing-library/react';

import { ThemeProvider } from '@/shared/theme';

import { SceneBackground } from './scene-background';

afterEach(() => {
  cleanup();
});

describe('SceneBackground', () => {
  // jsdom не реализует WebGL — getContext('webgl') вернёт null, эффект коротко
  // выйдет. Тест проверяет, что монтирование не падает и canvas на месте.
  it('рендерит декоративный canvas без падения (нет WebGL в jsdom)', () => {
    const { container } = render(
      <ThemeProvider>
        <SceneBackground />
      </ThemeProvider>,
    );
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute('aria-hidden', 'true');
    expect(canvas).toHaveClass('fixed');
  });
});
