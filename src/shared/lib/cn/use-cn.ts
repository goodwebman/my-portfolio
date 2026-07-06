import { useMemo } from 'react';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { cnParams } from './cn';

/**
 * # Мемоизированная версия `cn`
 * `clsx` сворачивает аргументы в стабильную по значению строку-ключ, а дорогой
 * `twMerge` кэшируется по этому ключу (литеральный deps-массив).
 *
 * @param inputs - произвольный набор классов/условий
 * @returns строка классов
 */
export const useCn = (...inputs: cnParams[]): string => {
  const key = clsx(inputs);

  return useMemo(() => twMerge(key), [key]);
};
