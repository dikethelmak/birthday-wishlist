import type { Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Design System/Colors',
};
export default meta;

const palettes = [
  {
    name: 'Neutral',
    swatches: [
      { label: '0', value: '#ffffff' },
      { label: '50', value: '#f5f5f4' },
      { label: '100', value: '#e8e7e6' },
      { label: '200', value: '#d1cfcd' },
      { label: '300', value: '#b4b0ac' },
      { label: '500', value: '#706c67' },
      { label: '700', value: '#434039' },
      { label: '900', value: '#1a1815' },
      { label: '950', value: '#0c0c0c' },
    ],
  },
  {
    name: 'Teal',
    swatches: [
      { label: '50', value: '#f0f8f7' },
      { label: '100', value: '#d8efed' },
      { label: '200', value: '#b1d8d3' },
      { label: '300', value: '#85bfb9' },
      { label: '400', value: '#5d9f9a' },
      { label: '500', value: '#40827d' },
      { label: '600', value: '#2e6864' },
      { label: '700', value: '#245250' },
      { label: '800', value: '#1c3f3d' },
    ],
  },
  {
    name: 'Terracotta',
    swatches: [
      { label: '100', value: '#faeee8' },
      { label: '200', value: '#f4d5c4' },
      { label: '300', value: '#eba983' },
      { label: '400', value: '#e27a4c' },
      { label: '500', value: '#db5e1e' },
      { label: '600', value: '#b84d16' },
      { label: '700', value: '#8f3c10' },
    ],
  },
  {
    name: 'Amber',
    swatches: [
      { label: '100', value: '#fdf4e3' },
      { label: '300', value: '#f5cc72' },
      { label: '500', value: '#e8a22d' },
      { label: '600', value: '#c48320' },
      { label: '700', value: '#956318' },
    ],
  },
  {
    name: 'Sage',
    swatches: [
      { label: '100', value: '#edf4ef' },
      { label: '300', value: '#9dcaaa' },
      { label: '500', value: '#68a87b' },
      { label: '600', value: '#4d8860' },
      { label: '700', value: '#376349' },
    ],
  },
  {
    name: 'Yellow',
    swatches: [
      { label: '100', value: '#fdf9df' },
      { label: '300', value: '#f1e06a' },
      { label: '400', value: '#e6d370' },
      { label: '500', value: '#d4bb45' },
      { label: '600', value: '#a8943a' },
    ],
  },
];

const isDark = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
};

export const Palette = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem' }}>
    {palettes.map(({ name, swatches }) => (
      <div key={name}>
        <p style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.08em', opacity: 0.5, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
          {name}
        </p>
        <div style={{ display: 'flex', gap: '4px' }}>
          {swatches.map(({ label, value }) => (
            <div
              key={label}
              style={{
                width: 56,
                height: 56,
                borderRadius: 4,
                backgroundColor: value,
                display: 'flex',
                alignItems: 'flex-end',
                padding: '4px 6px',
                border: value === '#ffffff' ? '1px solid #e0e0e0' : 'none',
              }}
            >
              <span style={{ fontSize: 10, color: isDark(value) ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)', fontFamily: 'monospace' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);
