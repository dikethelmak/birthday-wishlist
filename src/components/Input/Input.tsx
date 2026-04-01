import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, prefix, suffix, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={clsx(styles.root, error && styles.hasError, className)}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles.inputRow}>
          {prefix && <span className={styles.prefix}>{prefix}</span>}
          <div className={styles.inputWrap}>
            <input
              ref={ref}
              id={inputId}
              className={styles.input}
              {...props}
            />
            <span className={styles.underline} />
          </div>
          {suffix && <span className={styles.suffix}>{suffix}</span>}
        </div>
        {error && <span className={styles.errorMsg}>{error}</span>}
        {hint && !error && <span className={styles.hint}>{hint}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
