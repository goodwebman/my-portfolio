import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { IconArrowLeft, IconChatGPT, IconExternal, IconGrok } from './icons';

/**
 * Собственные SVG-иконки: те, которых нет в `react-icons` (бренды ChatGPT и
 * Grok), и навигационные стрелки, чья толщина штриха подогнана под типографику
 * проекта. Все наследуют `currentColor` и размер через `className`.
 */
const meta = {
  component: IconArrowLeft,
  tags: ['autodocs'],
  title: 'UI Kit/Icons',
} satisfies Meta<typeof IconArrowLeft>;

export default meta;

type Story = StoryObj<typeof meta>;

export const All: Story = {
  render: () => (
    <div className="flex items-center gap-8 text-foreground">
      <span className="flex flex-col items-center gap-2 text-caption text-muted-foreground">
        <IconArrowLeft className="size-6" />
        ArrowLeft
      </span>
      <span className="flex flex-col items-center gap-2 text-caption text-muted-foreground">
        <IconExternal className="size-6" />
        External
      </span>
      <span className="flex flex-col items-center gap-2 text-caption text-muted-foreground">
        <span className="text-2xl">
          <IconChatGPT />
        </span>
        ChatGPT
      </span>
      <span className="flex flex-col items-center gap-2 text-caption text-muted-foreground">
        <span className="text-2xl">
          <IconGrok />
        </span>
        Grok
      </span>
    </div>
  ),
};
