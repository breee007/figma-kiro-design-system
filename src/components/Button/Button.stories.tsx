import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './Button';
import type { ButtonProps } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

/** Single source of truth for the story. Add new variant names here. */
const variants = ['primary', 'secondary'] satisfies NonNullable<ButtonProps['variant']>[];

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
      {variants.map((variant) => (
        <div
          key={variant}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
        >
          <Button variant={variant} size="medium">
            Button
          </Button>
          <span style={{ fontSize: 12, fontFamily: 'system-ui, sans-serif' }}>{variant}</span>
        </div>
      ))}
    </div>
  ),
};
