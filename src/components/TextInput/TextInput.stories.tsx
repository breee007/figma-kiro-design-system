import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextInput } from './TextInput';
import type { TextInputProps } from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
};

export default meta;

type Story = StoryObj<typeof TextInput>;

/** Lists drive the story. Add a name or entry to extend it. */
const sizes = ['small', 'medium', 'large'] satisfies NonNullable<TextInputProps['size']>[];

/** Figma states that come from value / placeholder, not from props. */
const contents = [
  { name: 'Blank', props: {} },
  { name: 'With Placeholder', props: { placeholder: 'Placeholder' } },
  { name: 'Filled', props: { defaultValue: 'Edit Text' } },
] as const;

/** Normal and Error are the error prop. Focus is not in Figma; `.is-focus` forces the ring. */
const statuses = [
  { name: 'normal', error: false, disabled: false, className: undefined, helperText: 'Caption' },
  { name: 'error', error: true, disabled: false, className: undefined, helperText: 'Error message' },
  { name: 'focus', error: false, disabled: false, className: 'is-focus', helperText: 'Caption' },
  { name: 'disabled', error: false, disabled: true, className: undefined, helperText: 'Caption' },
] as const;

const captionStyle = { fontSize: 12, fontFamily: 'system-ui, sans-serif' } as const;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      {sizes.map((size) => (
        <section key={size} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <h3 style={{ ...captionStyle, fontSize: 14, margin: 0 }}>{size}</h3>
          {contents.map((content) => (
            <div key={content.name} style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
              {statuses.map((status) => (
                <div
                  key={status.name}
                  style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                >
                  <TextInput
                    size={size}
                    label="Label"
                    helperText={status.helperText}
                    error={status.error}
                    disabled={status.disabled}
                    className={status.className}
                    {...content.props}
                  />
                  <span style={captionStyle}>
                    {size} / {content.name} / {status.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </section>
      ))}
    </div>
  ),
};
