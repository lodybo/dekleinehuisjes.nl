import type { LinkProps } from '@remix-run/react';
import { useLocation, NavLink } from '@remix-run/react';
import { Outlet, useLoaderData } from '@remix-run/react';
import type {
  V2_MetaFunction as MetaFunction,
  LinksFunction,
  LoaderArgs,
} from '@remix-run/node';
import { json } from '@remix-run/node';

import profileStylesUrl from '~/styles/profile.css';
import { requireUser } from '~/session.server';
import Separator from '~/components/Separator';

export let meta: MetaFunction = () => [
  { title: 'Profiel' },
  { name: 'description', content: 'Profiel' },
];

export let links: LinksFunction = () => [
  { rel: 'stylesheet', href: profileStylesUrl },
];

export async function loader({ request }: LoaderArgs) {
  const user = await requireUser(request);

  return json({ user });
}

export default function ProfielLayout() {
  const location = useLocation();
  const { user } = useLoaderData<typeof loader>();

  let title: string;
  switch (location.pathname) {
    case '/profiel/recepten/nieuw':
      title = 'Nieuw recept';
      break;
    case '/profiel/recepten':
      title = 'Mijn recepten';
      break;
    case '/profiel/posts':
      title = 'Mijn posts';
      break;
    case '/profiel/bewerken':
      title = 'Bewerk je profiel';
      break;
    case '/profiel/instellingen':
      title = 'Instellingen';
      break;
    case '/admin':
      title = 'Admin';
      break;
    default:
      title = `Hallo, ${user.name}!`;
      break;
  }

  return (
    <div className="profile-screen mt-5 px-5">
      <div className="profile-header">
        <h1 className="text-center text-display-l">{title}</h1>
      </div>

      <div className="profile-sidebar rounded-xl bg-primary-200 px-7 py-5 text-secondary-400">
        <h2 className="text-display-s">Menu</h2>
        <ul className="mt-2.5 mb-5 space-y-2.5">
          <MenuLink to="/profiel/recepten/nieuw" large>
            + Nieuw recept
          </MenuLink>
          <MenuLink to="/profiel/recepten">Mijn recepten</MenuLink>
          <MenuLink to="/profiel/posts">Mijn posts</MenuLink>
          <Separator />
          <MenuLink to="/profiel/bewerken">Mijn profiel</MenuLink>
          <MenuLink to="/profiel/instellingen">Instellingen</MenuLink>
          {user.role === 'ADMIN' && (
            <>
              <Separator color="bg-primary-100" />
              <MenuLink to="/admin">Admin</MenuLink>
            </>
          )}
        </ul>
      </div>

      <main className="profile-main pt-5">
        <Outlet />
      </main>
    </div>
  );
}

type MenuLinkProps = LinkProps & {
  large?: boolean;
};
const MenuLink = ({ to, children, large = false }: MenuLinkProps) => (
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
