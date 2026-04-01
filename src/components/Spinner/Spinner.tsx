import { HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Spinner.module.css';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export const Spinner = ({
  size = 'md',
  label = 'Loading…',
  className,
  ...props
}: SpinnerProps) => {
  return (
    <span
      role="status"
      aria-label={label}
      className={clsx(styles.spinner, styles[size], className)}
      {...props}
    />
  );
};
