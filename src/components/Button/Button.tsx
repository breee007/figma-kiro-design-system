import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import './Button.css';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Figma variant axis. */
  variant?: 'primary' | 'secondary';
  /** Figma size axis. Only "medium" exists for now. */
  size?: 'medium';
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'medium', type = 'button', className, children, ...rest },
    ref,
  ) => {
    const classes = ['btn', `btn--${variant}`, `btn--${size}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} type={type} className={classes} {...rest}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
