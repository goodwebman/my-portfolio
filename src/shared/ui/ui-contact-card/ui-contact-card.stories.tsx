import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LuMail } from 'react-icons/lu';
import { SiTelegram } from 'react-icons/si';

import { UIContactCard } from './ui-contact-card';

/** `UIContactCard` — карточка канала связи: иконка, название, адрес и стрелка-аффорданс. */
const meta = {
  component: UIContactCard,
  tags: ['autodocs'],
  title: 'UI Kit/UIContactCard',
  args: {
    href: 'https://t.me/danya_js',
    icon: <SiTelegram />,
    title: 'Telegram',
    subtitle: 't.me/danya_js',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UIContactCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const External: Story = {};

/** `mailto:` — ссылка остаётся в текущей вкладке. */
export const Email: Story = {
  args: {
    href: 'mailto:super0kesha@mail.ru',
    icon: <LuMail />,
    title: 'Почта',
    subtitle: 'super0kesha@mail.ru',
  },
};
