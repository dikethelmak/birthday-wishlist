import { AnchorHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Link.module.css';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  external?: boolean;
  subtle?: boolean;
}

export const Link = ({
  children,
  external = false,
  subtle = false,
  className,
  ...props
}: LinkProps) => {
  return (
    <a
      className={clsx(styles.link, subtle && styles.subtle, className)}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      {...props}
    >
      {children}
      <span className={styles.underline} />
    </a>
  );
};
