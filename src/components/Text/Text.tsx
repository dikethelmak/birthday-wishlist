import { ElementType, HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Text.module.css';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
type Weight = 'regular' | 'medium' | 'semibold' | 'bold';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: Size;
  weight?: Weight;
  mono?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  children: ReactNode;
}

export const Text = ({
  as: Tag = 'p',
  size = 'md',
  weight = 'regular',
  mono = false,
  secondary = false,
  tertiary = false,
  className,
  children,
  ...props
}: TextProps) => {
  return (
    <Tag
      className={clsx(
        styles.text,
        styles[`size${size.replace(/^(\d)/, '_$1')}`] || styles[`size-${size}`],
        styles[`weight-${weight}`],
        mono && styles.mono,
        secondary && styles.secondary,
        tertiary && styles.tertiary,
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  size?: Size;
  weight?: Weight;
  children: ReactNode;
}

export const Heading = ({
  as: Tag = 'h2',
  size = '2xl',
  weight = 'medium',
  className,
  children,
  ...props
}: HeadingProps) => {
  return (
    <Tag
      className={clsx(
        styles.text,
        styles.heading,
        styles[`size-${size}`],
        styles[`weight-${weight}`],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};
