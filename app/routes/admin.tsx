import { useLocation } from '@remix-run/react';
import type {
  LoaderArgs,
  V2_MetaFunction as MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';

import { requireAdminUser } from '~/session.server';
import MenuLink from '~/components/AccountMenuLink';
import AccountLayout from '~/layouts/account';
import Separator from '~/components/Separator';

export let meta: MetaFunction = () => [
  { title: 'Admin' },
  { name: 'description', content: 'Administratie voor De Kleine Huisjes' },
];

export async function loader({ request }: LoaderArgs) {
  const user = await requireAdminUser(request);

  return json({ user });
}

export default function AdminLayout() {
  const location = useLocation();

  let title: string;
  switch (location.pathname) {
    case '/admin/gebruikers':
      title = 'Gebruikers beheren';
      break;

    case '/admin/gebruikers/nieuw':
      title = 'Nieuwe gebruiker toevoegen';
      break;

    default:
      title = 'Administratie';
      break;
  }

  return (
    <AccountLayout title={title} forAdmin>
      <MenuLink to="/admin/gebruikers">Gebruikers beheren</MenuLink>

      <MenuLink to="/admin/gebruikers/nieuw">
        Nieuwe gebruiker toevoegen
      </MenuLink>

      <Separator color="bg-primary-100" />

      <MenuLink to="/profiel">Terug naar profiel</MenuLink>
    </AccountLayout>
  );
}
