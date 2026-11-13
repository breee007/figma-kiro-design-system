import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import './Chip.css';

export interface ChipProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Figma variant axis (Property 1). */
  variant?: 'green' | 'orange' | 'red' | 'blue' | 'grey';
  children: React.ReactNode;
}

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  ({ variant = 'grey', className, children, ...rest }, ref) => {
    const classes = ['chip', `chip--${variant}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classes} {...rest}>
        {children}
      </span>
    );
  },
);

Chip.displayName = 'Chip';
