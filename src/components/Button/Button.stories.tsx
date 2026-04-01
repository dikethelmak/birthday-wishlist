import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['ghost', 'solid', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Share list' },
};

export const Solid: Story = {
  args: { variant: 'solid', children: 'Add item' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Edit mode' },
};

export const Small: Story = {
  args: { variant: 'solid', size: 'sm', children: 'Small' },
};

export const Large: Story = {
  args: { variant: 'solid', size: 'lg', children: 'Large' },
};

export const Disabled: Story = {
  args: { variant: 'solid', disabled: true, children: 'Disabled' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Button variant="ghost">Ghost</Button>
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
};
