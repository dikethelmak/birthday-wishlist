import { useState, useRef, useEffect, ReactNode, HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Tooltip.module.css';

export interface TooltipProps extends HTMLAttributes<HTMLSpanElement> {
  content: ReactNode;
  children: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export const Tooltip = ({
  content,
  children,
  placement = 'top',
  delay = 0,
  className,
  ...props
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const show = () => {
    if (delay > 0) {
      timer.current = setTimeout(() => setVisible(true), delay);
    } else {
      setVisible(true);
    }
  };

  const hide = () => {
    clearTimeout(timer.current);
    setVisible(false);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <span className={clsx(styles.wrapper, className)} {...props}>
      <span onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
        {children}
      </span>
      {visible && (
        <span
          role="tooltip"
          className={clsx(styles.tooltip, styles[placement])}
        >
          {content}
        </span>
      )}
    </span>
  );
};
