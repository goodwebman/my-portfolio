import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UIAvatar } from './ui-avatar';

/**
 * `UIAvatar` — круглое изображение (next/image) с опциональной акцентной
 * обводкой (`ring`) и мягким свечением (`glow`). Размеры S / M / L.
 */
const meta = {
  component: UIAvatar,
  tags: ['autodocs'],
  title: 'UI Kit/UIAvatar',
  args: {
    src: '/avatar.svg',
    alt: 'Аватар',
    size: 'M',
    ring: false,
    glow: false,
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['S', 'M', 'L'],
    },
  },
} satisfies Meta<typeof UIAvatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SizeS: Story = {
  args: { size: 'S' },
};

export const SizeM: Story = {
  args: { size: 'M' },
};

export const SizeL: Story = {
  args: { size: 'L' },
};

export const Ring: Story = {
  args: { size: 'L', ring: true },
};

export const Glow: Story = {
  args: { size: 'L', glow: true },
};

export const RingGlow: Story = {
  args: { size: 'L', ring: true, glow: true },
};
