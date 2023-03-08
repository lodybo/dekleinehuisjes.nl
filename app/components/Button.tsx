import { Link } from '@remix-run/react';
import type { ReactNode } from 'react';

type Props = {
  /**
   * The button is used to submit a form.
   */
  submit?: boolean;

  /**
   * The primary button is used to indicate the main action.
   */
  primary?: boolean;

  /**
   * A button without styling
   */
  naked?: boolean;

  /**
   * The content of the button.
   */
  children: ReactNode;

  /**
   * Whether the button is an anchor
   */
  href?: string;

  /**
   * The button's click handler.
   */
  onClick?: () => void;

  /**
   * Whether the button is disabled or not.
   */
  disabled?: boolean;

  /**
   * The width of the button.
   */
  width?: string;
};

export default function Button({
  children,
  submit = false,
  primary = false,
  naked = false,
  href = '',
  onClick,
  disabled = false,
  width = 'w-full',
}: Props) {
  let classes = 'outline-none ring-offset-2 focus:ring-2';

  if (!naked) {
    classes = `${width} rounded-full px-5 py-2 text-label-s uppercase shadow outline-none ring-offset-2 ring-neutral focus:ring-2 disabled:opacity-50 ${
      primary
        ? 'bg-primary text-neutral-400'
        : 'bg-secondary-50 text-secondary-300'
    }`;
  }
  return (
    <button
      onClick={onClick}
      className={classes}
      type={submit ? 'submit' : 'button'}
      disabled={disabled}
    >
      {href ? <Link to={href}>{children}</Link> : children}
    </button>
  );
}
