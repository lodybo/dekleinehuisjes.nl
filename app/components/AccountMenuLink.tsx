import type { LinkProps } from '@remix-run/react';
import { NavLink } from '@remix-run/react';

type MenuLinkProps = LinkProps & {
  large?: boolean;
};
export default function MenuLink({
  to,
  children,
  large = false,
}: MenuLinkProps) {
  return (
    <li className={`${large ? 'mb-1 text-title-l' : ''}`}>
      <NavLink
        className={({ isActive }) => (isActive ? 'text-primary-400' : '')}
        to={to}
        end
      >
        {children}
      </NavLink>
    </li>
  );
}
