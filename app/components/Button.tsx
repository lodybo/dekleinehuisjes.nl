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
};

export default function Button({
  children,
  submit = false,
  primary = false,
  naked = false,
}: Props) {
  let classes = '';

  if (!naked) {
    classes = `w-full rounded-full px-5 py-2 text-label-s uppercase shadow outline-none ring-offset-2 focus:ring-2 ${
      primary
        ? 'bg-primary text-neutral-400'
        : 'bg-secondary-50 text-secondary-300'
    }`;
  }
  return (
    <button className={classes} type={submit ? 'submit' : 'button'}>
      {children}
    </button>
  );
}
