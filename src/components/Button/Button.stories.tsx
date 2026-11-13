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
const variants = ['primary', 'secondary', 'tertiary'] satisfies NonNullable<
  ButtonProps['variant']
>[];

/** Rows shown in the story. `className` forces a state without a mouse. */
const states = [
  { label: 'Default', className: undefined },
  { label: 'Hover', className: 'is-hover' },
] as const;

const labelStyle = { fontSize: 12, fontFamily: 'system-ui, sans-serif' } as const;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {states.map((state) => (
        <div key={state.label} style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
          {variants.map((variant) => (
            <div
              key={variant}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
            >
              <Button variant={variant} size="medium" className={state.className}>
                Button
              </Button>
              <span style={labelStyle}>
                {variant} / {state.label.toLowerCase()}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};
