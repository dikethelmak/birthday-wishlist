import { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Badge.module.css';

export type BadgeColor = 'default' | 'teal' | 'terracotta' | 'amber' | 'sage' | 'yellow';
export type BadgeVariant = 'subtle' | 'solid' | 'outline';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
  children: ReactNode;
}

export const Badge = ({
  color = 'default',
  variant = 'subtle',
  size = 'md',
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={clsx(
        styles.badge,
        styles[`color-${color}`],
        styles[variant],
        styles[size],
        className
      )}
      {...props}
    >
      {dot && <span className={styles.dot} />}
      {children}
    </span>
  );
};
