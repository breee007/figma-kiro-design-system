import type { Meta, StoryObj } from '@storybook/react-vite';

import { Modal, ModalPanel } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof Modal>;

/**
 * One entry per Figma variant. Each is rendered inline with ModalPanel
 * (no overlay) so they can be compared. Add an entry to extend it.
 */
const variants = [
  { name: 'Close Icon = False', showCloseButton: false },
  { name: 'Close Icon = True', showCloseButton: true },
] as const;

const captionStyle = { fontSize: 12, fontFamily: 'system-ui, sans-serif' } as const;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {variants.map((variant) => (
        <div key={variant.name} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <ModalPanel title="Title" showCloseButton={variant.showCloseButton}>
            You will lose access to this portal if you continue.
          </ModalPanel>
          <span style={captionStyle}>{variant.name}</span>
        </div>
      ))}
    </div>
  ),
};
