import { forwardRef, useEffect, useId, useImperativeHandle, useRef } from 'react';
import type { DialogHTMLAttributes, ReactNode, SyntheticEvent } from 'react';
import { Button } from '../Button';
import './Modal.css';

interface ModalPanelProps {
  /** Id for the title element. Used by the dialog's aria-labelledby. */
  titleId?: string;
  title: string;
  /** Body content. */
  children: ReactNode;
  /** Figma Close Icon. */
  showCloseButton?: boolean;
  cancelLabel?: string;
  confirmLabel?: string;
  /** Called by the Close icon and the Cancel button. */
  onClose?: () => void;
  onConfirm?: () => void;
}

/**
 * The visible card: title, body and actions. Rendered on its own it is not
 * an overlay, so it can be shown inline (Storybook, docs).
 */
export function ModalPanel({
  titleId,
  title,
  children,
  showCloseButton = false,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  onClose,
  onConfirm,
}: ModalPanelProps) {
  const generatedId = useId();
  const headingId = titleId ?? generatedId;

  return (
    <div className="modal__panel">
      <div className="modal__header">
        <div className="modal__content">
          <h2 id={headingId} className="modal__title">
            {title}
          </h2>
          <div className="modal__body">{children}</div>
        </div>
        {showCloseButton && (
          <button type="button" className="modal__close" aria-label="Close" onClick={onClose}>
            <svg
              aria-hidden="true"
              focusable="false"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="currentColor"
            >
              <path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z" />
            </svg>
          </button>
        )}
      </div>
      <div className="modal__actions">
        <Button variant="tertiary" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </div>
  );
}

export interface ModalProps
  extends Omit<DialogHTMLAttributes<HTMLDialogElement>, 'title' | 'children' | 'onClose' | 'open'>,
    Pick<
      ModalPanelProps,
      'title' | 'children' | 'showCloseButton' | 'cancelLabel' | 'confirmLabel' | 'onConfirm'
    > {
  /** Controlled. The parent decides when the modal is open. */
  open: boolean;
  /** Called on Escape, the Close icon and the Cancel button. Set `open` to false to close. */
  onClose: () => void;
}

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  (
    {
      open,
      onClose,
      title,
      children,
      showCloseButton = false,
      cancelLabel,
      confirmLabel,
      onConfirm,
      className,
      ...rest
    },
    ref,
  ) => {
    const titleId = useId();
    const innerRef = useRef<HTMLDialogElement>(null);
    const triggerRef = useRef<HTMLElement | null>(null);

    useImperativeHandle(ref, () => innerRef.current as HTMLDialogElement);

    // showModal() gives us the top layer, inert background, focus containment and Escape.
    useEffect(() => {
      const dialog = innerRef.current;
      if (!dialog) return;

      if (open && !dialog.open) {
        triggerRef.current = document.activeElement as HTMLElement | null;
        dialog.showModal();
      } else if (!open && dialog.open) {
        dialog.close();
        triggerRef.current?.focus();
        triggerRef.current = null;
      }
    }, [open]);

    // Escape fires `cancel`. Keep the dialog controlled by asking the parent to close.
    const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
      event.preventDefault();
      onClose();
    };

    const classes = ['modal', className].filter(Boolean).join(' ');

    return (
      <dialog
        ref={innerRef}
        className={classes}
        aria-modal="true"
        aria-labelledby={titleId}
        onCancel={handleCancel}
        {...rest}
      >
        <ModalPanel
          titleId={titleId}
          title={title}
          showCloseButton={showCloseButton}
          cancelLabel={cancelLabel}
          confirmLabel={confirmLabel}
          onClose={onClose}
          onConfirm={onConfirm}
        >
          {children}
        </ModalPanel>
      </dialog>
    );
  },
);

Modal.displayName = 'Modal';
