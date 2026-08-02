import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LuCalendar, LuMail } from 'react-icons/lu';

import { UIFactCard } from './ui-fact-card';

/**
 * `UIFactCard` — карточка факта из списка определений. Ставится внутрь `<dl>`:
 * подпись рендерится как `dt`, значение — как `dd`.
 */
const meta = {
  component: UIFactCard,
  tags: ['autodocs'],
  title: 'UI Kit/UIFactCard',
  args: {
    icon: LuCalendar,
    label: 'Опыт',
    value: '3+ года',
  },
  decorators: [
    (Story) => (
      <dl className="w-72">
        <Story />
      </dl>
    ),
  ],
} satisfies Meta<typeof UIFactCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Длинные значения переносятся, а не растягивают карточку. */
export const LongValue: Story = {
  args: { icon: LuMail, label: 'Email', value: 'super0kesha@mail.ru' },
};
