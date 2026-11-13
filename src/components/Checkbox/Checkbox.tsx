import { forwardRef, useEffect, useId, useImperativeHandle, useRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import './Checkbox.css';

interface CheckboxBaseProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'children'> {
  /** Figma size axis. */
  size?: 'small' | 'large' | 'xl';
  /**
   * Figma Fill / Outline (and Partial filled / Partial outline).
   * Style of the checked and indeterminate looks. Unchecked looks the same for both.
   */
  appearance?: 'outline' | 'fill';
  /** Figma Partial states. Sets the input's `indeterminate` property and shows the dash. */
  indeterminate?: boolean;
}

/** Either a visible label, or an aria-label. One of the two is required. */
type CheckboxLabelProps =
  | { label: string; 'aria-label'?: string }
  | { label?: undefined; 'aria-label': string };

export type CheckboxProps = CheckboxBaseProps & CheckboxLabelProps;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = 'small',
      appearance = 'outline',
      indeterminate = false,
      label,
      id,
      className,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const innerRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

    // `indeterminate` is a DOM property only; there is no HTML attribute for it.
    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const classes = [
      'checkbox',
      `checkbox--${size}`,
      `checkbox--${appearance}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span className={classes}>
        <input
          ref={innerRef}
          id={inputId}
          type="checkbox"
          className="checkbox__control"
          {...rest}
        />
        {label && (
          <label className="checkbox__label" htmlFor={inputId}>
            {label}
          </label>
        )}
      </span>
    );
  },
);

Checkbox.displayName = 'Checkbox';
