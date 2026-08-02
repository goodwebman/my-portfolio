import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UIGradient } from './ui-gradient';

const meta = {
  component: UIGradient,
  tags: ['autodocs'],
  title: 'UI Kit/UIGradient',
} satisfies Meta<typeof UIGradient>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Ambient: Story = {
  args: { variant: 'ambient' },
  render: () => (
    <div className="relative h-48 w-full overflow-hidden rounded-xl border border-border bg-card p-8">
      <UIGradient variant="ambient" className="absolute inset-0" />
      <p className="relative text-foreground">Ambient gradient (full-bleed)</p>
    </div>
  ),
};

export const GlowTop: Story = {
  args: { variant: 'glow-top' },
  render: () => (
    <div className="relative h-48 w-full overflow-hidden rounded-xl border border-border bg-card p-8">
      <UIGradient
        variant="glow-top"
        className="absolute -top-24 left-1/2 size-96 -translate-x-1/2"
      />
      <p className="relative text-foreground">
        Top glow — animated gradient orb
      </p>
    </div>
  ),
};

export const GlowBottom: Story = {
  args: { variant: 'glow-bottom' },
  render: () => (
    <div className="relative h-48 w-full overflow-hidden rounded-xl border border-border bg-card p-8">
      <UIGradient
        variant="glow-bottom"
        className="absolute -bottom-32 right-1/4 size-64 -translate-x-1/2"
      />
      <p className="relative text-foreground">
        Bottom glow — static gradient orb
      </p>
    </div>
  ),
};

export const AllVariants: Story = {
  args: { variant: 'ambient' },
  render: () => (
    <div className="relative h-64 w-full overflow-hidden rounded-xl border border-border bg-card">
      <UIGradient variant="ambient" className="absolute inset-0" />
      <UIGradient
        variant="glow-top"
        className="absolute -top-24 left-1/2 size-96 -translate-x-1/2"
      />
      <UIGradient
        variant="glow-bottom"
        className="absolute -bottom-32 right-1/4 size-64 -translate-x-1/2"
      />
      <p className="relative p-8 text-foreground">
        All three variants layered (as used in CTA section)
      </p>
    </div>
  ),
};
