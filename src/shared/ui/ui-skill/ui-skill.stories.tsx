import { SiReact } from 'react-icons/si';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UISkill } from './ui-skill';

/**
 * `UISkill` — кликабельная плашка технологии (кнопка-триггер) с пружинистым
 * hover/tap. Иконка приходит извне как `ReactNode`. Размеры S / M,
 * варианты solid / outline.
 */
const meta = {
  component: UISkill,
  tags: ['autodocs'],
  title: 'UI Kit/UISkill',
  args: {
    name: 'React',
    icon: <SiReact />,
    brandColor: '#61DAFB',
    size: 'M',
    variant: 'solid',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['S', 'M'],
    },
    variant: {
      control: 'inline-radio',
      options: ['solid', 'outline'],
    },
    icon: { control: false },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof UISkill>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: { variant: 'solid' },
};

export const Outline: Story = {
  args: { variant: 'outline' },
};

export const SizeS: Story = {
  args: { size: 'S' },
};

export const SizeM: Story = {
  args: { size: 'M' },
};

/** Без иконки — плашка `<Show>`-скрывает слот иконки. */
export const NoIcon: Story = {
  args: { icon: undefined, brandColor: undefined },
};
