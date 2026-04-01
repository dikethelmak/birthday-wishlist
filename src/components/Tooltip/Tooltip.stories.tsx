import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'Link copied!',
    children: <Button variant="ghost">Share list</Button>,
  },
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      {(['top', 'right', 'bottom', 'left'] as const).map((p) => (
        <Tooltip key={p} content={p} placement={p}>
          <Button variant="outline">{p}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const WithDelay: Story = {
  args: {
    content: 'Appears after 500ms',
    delay: 500,
    children: <Button variant="ghost">Hover me</Button>,
  },
};
