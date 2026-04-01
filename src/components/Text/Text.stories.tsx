import type { Meta, StoryObj } from '@storybook/react';
import { Text, Heading } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: { children: 'Wishlist collection' },
};

export const Secondary: Story = {
  args: { children: 'A soft secondary label', secondary: true },
};

export const Mono: Story = {
  args: { children: '€ 329.00', mono: true },
};

export const Scale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const).map((size) => (
        <Text key={size} size={size}>
          {size} — The quick brown fox
        </Text>
      ))}
    </div>
  ),
};

export const HeadingStory: StoryObj<typeof Heading> = {
  name: 'Heading',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Heading as="h1" size="4xl">Birthday 30</Heading>
      <Heading as="h2" size="3xl">Wishlist</Heading>
      <Heading as="h3" size="2xl">Section title</Heading>
      <Heading as="h4" size="xl">Subsection</Heading>
    </div>
  ),
};
