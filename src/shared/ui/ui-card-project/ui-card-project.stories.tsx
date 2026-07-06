import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UICardProject } from './ui-card-project';

/**
 * `UICardProject` — карточка проекта: обложка, мета (год · роль), теги,
 * hover-lift. Оборачивает контент в locale-aware `Link` на `href`.
 */
const meta = {
  component: UICardProject,
  tags: ['autodocs'],
  title: 'UI Kit/UICardProject',
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  args: {
    title: 'Where is Pizza',
    summary: 'Реалтайм-трекинг доставки на WebSocket с оптимистичным UI.',
    cover: '/projects/where-is-pizza/cover.svg',
    href: '/projects/where-is-pizza',
    tags: ['Next.js', 'TypeScript', 'WebSocket'],
    year: 2024,
    role: 'Fullstack',
  },
  argTypes: {
    tags: { control: 'object' },
  },
} satisfies Meta<typeof UICardProject>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Без года и роли — блок меты скрыт через `<Show>`. */
export const WithoutMeta: Story = {
  args: { year: undefined, role: undefined },
};

/** Без тегов — список тегов не рендерится. */
export const WithoutTags: Story = {
  args: { tags: [] },
};
