import type { ReactNode } from 'react';

export type AccountMenuProps = {
  /**
   * The children to render in the sidebar.
   */
  children: ReactNode;

  /**
   * Whether the menu is rendered on the admin page.
   */
  forAdmin?: boolean;
};

export default function AccountMenu({
  children,
  forAdmin = false,
}: AccountMenuProps) {
  return (
    <div
      className={`${
        forAdmin ? 'bg-secondary-100' : 'bg-primary-200'
      } rounded-xl px-7 py-5 text-secondary-400 [grid-area:sidebar]`}
    >
      <h2 className="text-display-s">Menu</h2>
      <ul className="mt-2.5 mb-5 space-y-2.5">{children}</ul>
    </div>
  );
}
