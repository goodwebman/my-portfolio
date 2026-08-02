import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { LuCode, LuMonitor, LuSparkles, LuTerminal } from 'react-icons/lu';

import { UIIconStream } from './ui-icon-stream';

/**
 * `UIIconStream` — бесконечно крутящаяся вертикальная карусель иконок.
 * Иконки дублируются для seamless loop, движение через CSS-анимацию.
 */
const meta = {
  component: UIIconStream,
  tags: ['autodocs'],
  title: 'UI Kit/UIIconStream',
} satisfies Meta<typeof UIIconStream>;

export default meta;

type Story = StoryObj<typeof meta>;

const DEV_ICONS = [
  <LuCode key="code" className="size-9 text-accent/40" />,
  <LuTerminal key="term" className="size-9 text-accent/40" />,
  <LuSparkles key="spark" className="size-9 text-accent/40" />,
  <LuMonitor key="mon" className="size-9 text-accent/40" />,
];

export const Default: Story = {
  args: { icons: DEV_ICONS },
  render: () => (
    <div className="flex h-[500px] items-center justify-center gap-12 bg-background p-8">
      <UIIconStream
        icons={DEV_ICONS}
        speed={15}
        direction="up"
        className="h-72 w-16 rounded-xl border border-border bg-muted/30 p-3"
      />
      <UIIconStream
        icons={DEV_ICONS}
        speed={15}
        direction="down"
        className="h-72 w-16 rounded-xl border border-border bg-muted/30 p-3"
      />
    </div>
  ),
};

export const Slow: Story = {
  args: { icons: DEV_ICONS },
  render: () => (
    <div className="flex h-[500px] items-center justify-center bg-background p-8">
      <UIIconStream
        icons={DEV_ICONS}
        speed={40}
        direction="up"
        className="h-72 w-16 rounded-xl border border-border bg-muted/30 p-3"
      />
    </div>
  ),
};
