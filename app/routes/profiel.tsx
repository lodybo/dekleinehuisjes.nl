import { useLocation } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';
import type {
  V2_MetaFunction as MetaFunction,
  LoaderArgs,
} from '@remix-run/node';
import { json } from '@remix-run/node';

import { requireUser } from '~/session.server';
import Separator from '~/components/Separator';
import MenuLink from '~/components/AccountMenuLink';
import AccountLayout from '~/layouts/account';

export let meta: MetaFunction = () => [
  { title: 'Profiel' },
  { name: 'description', content: 'Profiel' },
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
    <AccountLayout title={title}>
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
    </AccountLayout>
  );
}
