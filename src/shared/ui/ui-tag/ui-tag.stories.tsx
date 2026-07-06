import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SiTypescript } from 'react-icons/si';

import { UITag } from './ui-tag';

/** `UITag` — мелкий чип для тегов/стека. Три тона: default / accent / outline. */
const meta = {
  component: UITag,
  tags: ['autodocs'],
  title: 'UI Kit/UITag',
  args: {
    children: 'TypeScript',
    tone: 'default',
  },
  argTypes: {
    tone: {
      control: 'inline-radio',
      options: ['default', 'accent', 'outline'],
    },
  },
} satisfies Meta<typeof UITag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { tone: 'default' },
};

export const Accent: Story = {
  args: { tone: 'accent' },
};

export const Outline: Story = {
  args: { tone: 'outline' },
};

/** С иконкой перед текстом — например, лого технологии из `react-icons/si`. */
export const WithIcon: Story = {
  args: { icon: <SiTypescript style={{ color: '#3178C6' }} /> },
};
