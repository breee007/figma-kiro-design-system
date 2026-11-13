import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import './TextInput.css';

interface TextInputBaseProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Figma size axis. */
  size?: 'small' | 'medium' | 'large';
  /** Figma Error / Error Blank states. Sets aria-invalid and styles helperText as the error message. */
  error?: boolean;
  /** Figma Caption = true. Rendered under the field; acts as the error message when `error` is set. */
  helperText?: string;
}

/** Either a visible label, or an aria-label. One of the two is required. */
type TextInputLabelProps =
  | { label: string; 'aria-label'?: string }
  | { label?: undefined; 'aria-label': string };

export type TextInputProps = TextInputBaseProps & TextInputLabelProps;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      size = 'medium',
      error = false,
      label,
      helperText,
      id,
      type = 'text',
      className,
      'aria-describedby': describedBy,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;

    const classes = [
      'text-input',
      `text-input--${size}`,
      error && 'text-input--error',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const describedByIds = [describedBy, helperText ? helperId : undefined]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={classes}>
        <div className="text-input__field">
          <input
            ref={ref}
            id={inputId}
            type={type}
            className="text-input__control"
            aria-invalid={error || undefined}
            aria-describedby={describedByIds || undefined}
            {...rest}
          />
          {label && (
            <label className="text-input__label" htmlFor={inputId}>
              {label}
            </label>
          )}
        </div>
        {helperText && (
          <p id={helperId} className="text-input__helper">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';
