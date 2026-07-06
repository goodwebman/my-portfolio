import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SceneBackground } from './scene-background';

/**
 * `SceneBackground` — полноэкранный шейдерный фон (WebGL): матовая текстура +
 * film grain + spotlight, инерционно следящий за курсором. `fixed inset-0`,
 * весь эффект на GPU. Двигайте курсор над превью, переключайте тему в тулбаре.
 */
const meta = {
  component: SceneBackground,
  tags: ['autodocs'],
  title: 'UI Kit/SceneBackground',
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SceneBackground>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="relative flex h-[70vh] items-center justify-center">
        <Story />
        <p className="relative text-body text-foreground">
          Контент поверх фона — двигайте курсор
        </p>
      </div>
    ),
  ],
};
