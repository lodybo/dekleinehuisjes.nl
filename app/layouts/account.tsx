import { Outlet } from '@remix-run/react';
import type { AccountMenuProps } from '~/components/AccountMenu';
import AccountMenu from '~/components/AccountMenu';

type Props = AccountMenuProps & {
  /**
   * The title to render in the header.
   */
  title: string;
};

export default function AccountLayout({ title, children, forAdmin }: Props) {
  return (
    <div className="mt-5 grid grid-cols-[20rem_2fr] grid-rows-[5rem_1fr] gap-8 px-5 [grid-template-areas:_'header_header'_'sidebar_main']">
      <div className="[grid-area:header]">
        <h1 className="text-center text-display-l">{title}</h1>
      </div>

      <AccountMenu forAdmin={forAdmin}>{children}</AccountMenu>

      <main className="pt-5 [grid-area:main]">
        <Outlet />
      </main>
    </div>
  );
}
