import type { ReactNode } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SiNextdotjs, SiTypescript } from 'react-icons/si';

import { UICardProject } from './ui-card-project';

const STORY_ICONS: Record<string, ReactNode> = {
  'Next.js': <SiNextdotjs />,
  TypeScript: <SiTypescript style={{ color: '#3178C6' }} />,
};

/**
 * `UICardProject` — карточка проекта: обложка, мета (год · роль), теги (с
 * иконками технологий, макс. `4` + "+N"), hover-lift. Заголовок и описание
 * подрезаны до фиксированной высоты — карточки в сетке одного размера.
 * Оборачивает контент в locale-aware `Link` на `href`.
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
    tagIcons: ['Next.js', 'TypeScript', 'WebSocket'].map((tag) => STORY_ICONS[tag]),
    year: 2024,
    role: 'Frontend',
  },
  argTypes: {
    tags: { control: 'object' },
    tagIcons: { control: false },
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

/** Больше `4` тегов — лишние сворачиваются в "+N". */
export const ManyTags: Story = {
  args: {
    tags: ['Next.js', 'Express', 'Prisma', 'TypeScript', 'Redux Toolkit', 'TanStack Query', 'Zod'],
  },
};
