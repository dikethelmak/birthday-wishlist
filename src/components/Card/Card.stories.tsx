import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div>
        <p style={{ fontWeight: 500, marginBottom: '0.25rem' }}>Sony WH-1000XM5</p>
        <p style={{ fontSize: '0.875rem', opacity: 0.6 }}>€ 329.00 · sony.com</p>
      </div>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <div>
        <p style={{ fontWeight: 500, marginBottom: '0.25rem' }}>Aalto Vase 160mm</p>
        <p style={{ fontSize: '0.875rem', opacity: 0.6 }}>€ 165.00 · iittala.com</p>
      </div>
    ),
  },
};

export const Flat: Story = {
  args: {
    variant: 'flat',
    children: <p>A flat surface card for subtle grouping.</p>,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {(['elevated', 'outlined', 'flat'] as const).map((v) => (
        <Card key={v} variant={v} style={{ minWidth: 200 }}>
          <p style={{ fontWeight: 500 }}>{v}</p>
          <p style={{ fontSize: '0.875rem', opacity: 0.6, marginTop: '0.25rem' }}>Card variant</p>
        </Card>
      ))}
    </div>
  ),
};
