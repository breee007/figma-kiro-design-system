import type { Meta, StoryObj } from '@storybook/react-vite';

import { Checkbox } from './Checkbox';
import type { CheckboxProps } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

/** Lists drive the story. Add a name or entry to extend it. */
const sizes = ['small', 'large', 'xl'] satisfies NonNullable<CheckboxProps['size']>[];

const appearances = ['outline', 'fill'] satisfies NonNullable<CheckboxProps['appearance']>[];

/** Checked, indeterminate and disabled come from native props. Focus is forced with `.is-focus`. */
const states = [
  { name: 'unchecked', props: {} },
  { name: 'checked', props: { defaultChecked: true } },
  { name: 'indeterminate', props: { indeterminate: true } },
  { name: 'focus', props: { className: 'is-focus' } },
  { name: 'disabled', props: { disabled: true } },
  { name: 'disabled checked', props: { disabled: true, defaultChecked: true } },
] as const;

const captionStyle = { fontSize: 12, fontFamily: 'system-ui, sans-serif' } as const;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {sizes.map((size) => (
        <section key={size} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ ...captionStyle, fontSize: 14, margin: 0 }}>{size}</h3>
          {appearances.map((appearance) => (
            <div key={appearance} style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
              {states.map((state) => (
                <div
                  key={state.name}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}
                >
                  <Checkbox size={size} appearance={appearance} label="Label" {...state.props} />
                  <span style={captionStyle}>
                    {size} / {appearance} / {state.name}
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
