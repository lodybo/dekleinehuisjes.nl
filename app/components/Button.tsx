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

  /**
   * Whether the button signals a destructive action.
   */
  danger?: boolean;

  /**
   * The form method of the button.
   */
  formMethod?: 'get' | 'post';

  /**
   * The form action of the button.
   */
  formAction?: string;

  /**
   * The form name of the button.
   */
  formName?: string;

  /**
   * The form of the button.
   */
  form?: string;
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
  danger = false,
  formMethod,
  formAction,
  formName,
  form,
}: Props) {
  let classes = 'outline-none ring-offset-2 focus:ring-2';

  if (!naked) {
    classes = `${width} rounded-full px-5 py-2 text-label-s uppercase shadow outline-none ring-offset-2 ring-neutral focus:ring-2 disabled:opacity-50 ${
      danger
        ? 'bg-red text-white'
        : primary
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
      formMethod={formMethod}
      formAction={formAction}
      name={formName}
      form={form}
    >
      {href ? <Link to={href}>{children}</Link> : children}
    </button>
  );
}
