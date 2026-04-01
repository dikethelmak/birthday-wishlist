import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: 'Add new item...' },
};

export const WithLabel: Story = {
  args: { label: 'Item name', placeholder: 'Sony WH-1000XM5 Headphones' },
};

export const WithHint: Story = {
  args: { label: 'URL', placeholder: 'https://...', hint: 'Store name will be extracted automatically' },
};

export const WithError: Story = {
  args: { label: 'Price', placeholder: '€ 0.00', error: 'Price must be a number' },
};

export const MonoPrice: Story = {
  args: {
    placeholder: '€ 0.00',
    style: { fontFamily: 'var(--font-mono)' },
  },
};

export const Disabled: Story = {
  args: { label: 'Item name', placeholder: 'Disabled input', disabled: true },
};
