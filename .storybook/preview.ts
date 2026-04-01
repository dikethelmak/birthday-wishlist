import type { Preview } from '@storybook/react';
import './preview.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'teal',
      values: [
        { name: 'teal', value: '#b1d8d3' },
        { name: 'white', value: '#ffffff' },
        { name: 'dark', value: '#0c0c0c' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
