import { HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Divider.module.css';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  subtle?: boolean;
}

export const Divider = ({
  orientation = 'horizontal',
  subtle = false,
  className,
  ...props
}: DividerProps) => {
  return (
    <div
      role="separator"
      className={clsx(
        styles.divider,
        orientation === 'vertical' && styles.vertical,
        subtle && styles.subtle,
        className
      )}
      {...props}
    />
  );
};
