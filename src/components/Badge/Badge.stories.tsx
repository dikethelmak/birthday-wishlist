import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: 'Available' },
};

export const WithDot: Story = {
  args: { children: 'Reserved', color: 'amber', dot: true },
};

export const Purchased: Story = {
  args: { children: 'Purchased', color: 'sage', variant: 'solid', dot: true },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {(['default', 'teal', 'terracotta', 'amber', 'sage', 'yellow'] as const).map((color) => (
        <Badge key={color} color={color}>{color}</Badge>
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {(['subtle', 'solid', 'outline'] as const).map((variant) => (
        <div key={variant} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {(['default', 'teal', 'terracotta', 'amber', 'sage', 'yellow'] as const).map((color) => (
            <Badge key={color} color={color} variant={variant}>{color}</Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};
