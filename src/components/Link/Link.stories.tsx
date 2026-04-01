import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: { children: 'sony.com', href: '#' },
};

export const External: Story = {
  args: { children: 'iittala.com', href: '#', external: true },
};

export const Subtle: Story = {
  args: { children: 'View item', href: '#', subtle: true },
};

export const InlineText: Story = {
  render: () => (
    <p style={{ fontSize: '1rem', lineHeight: 1.6 }}>
      Shop from <Link href="#">sony.com</Link> or browse{' '}
      <Link href="#">taschen.com</Link> for art books.
    </p>
  ),
};
