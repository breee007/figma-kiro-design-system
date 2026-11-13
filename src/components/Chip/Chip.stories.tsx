import type { Meta, StoryObj } from '@storybook/react-vite';

import { Chip } from './Chip';
import type { ChipProps } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
};

export default meta;

type Story = StoryObj<typeof Chip>;

/** Single source of truth for the story. Add new variant names here. */
const variants = ['green', 'orange', 'red', 'blue', 'grey'] satisfies NonNullable<
  ChipProps['variant']
>[];

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
      {variants.map((variant) => (
        <div
          key={variant}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
        >
          <Chip variant={variant}>Message</Chip>
          <span style={{ fontSize: 12, fontFamily: 'system-ui, sans-serif' }}>{variant}</span>
        </div>
      ))}
    </div>
  ),
};
