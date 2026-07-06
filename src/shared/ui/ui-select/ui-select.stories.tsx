import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UISelect, type IUISelectProps } from './ui-select';

const LANG_OPTIONS: IUISelectProps['options'] = [
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'English' },
  { value: 'de', label: 'Deutsch' },
];

/** Controlled-обёртка: держит выбранное значение в локальном state для демо. */
const UISelectDemo = (props: IUISelectProps) => {
  const [value, setValue] = useState(props.value);

  return <UISelect {...props} value={value} onValueChange={setValue} />;
};

/**
 * `UISelect` — доступный селект на Radix UI с порталом и клавиатурной
 * навигацией, стилизованный под токены дизайн-системы.
 */
const meta = {
  component: UISelect,
  tags: ['autodocs'],
  title: 'UI Kit/UISelect',
  render: (args) => <UISelectDemo {...args} />,
  args: {
    value: 'ru',
    onValueChange: () => {},
    options: LANG_OPTIONS,
    ariaLabel: 'Язык интерфейса',
    placeholder: 'Выберите язык',
  },
  argTypes: {
    onValueChange: { control: false },
    options: { control: false },
  },
} satisfies Meta<typeof UISelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Пустое значение — виден placeholder. */
export const Placeholder: Story = {
  args: { value: '' },
};
