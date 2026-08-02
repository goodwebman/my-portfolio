import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UILinkButton } from '@/shared/ui/ui-link-button';

import { UIGlassCard } from './ui-glass-card';

/**
 * `UIGlassCard` — «стеклянная» панель под CTA-блоки: три декоративных
 * градиентных слоя лежат абсолютом под контентом, поэтому дети должны быть
 * `relative` — иначе градиенты их перекроют.
 */
const meta = {
  component: UIGlassCard,
  tags: ['autodocs'],
  title: 'UI Kit/UIGlassCard',
  args: {
    children: (
      <>
        <h2 className="relative text-h2 font-bold text-foreground">
          Обсудим ваш проект?
        </h2>
        <p className="relative mx-auto mt-3 max-w-lg text-body text-muted-foreground">
          Открыт к интересным задачам, консультациям и долгосрочному сотрудничеству.
        </p>
        <div className="relative mt-8 flex justify-center">
          <UILinkButton href="/contact" size="M">
            Связаться
          </UILinkButton>
        </div>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className="w-[42rem] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UIGlassCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
