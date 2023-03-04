import type { ActionArgs, V2_MetaFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';

import { logout } from '~/session.server';

export const meta: V2_MetaFunction = () => [
  {
    title: 'Logout',
  },
];

export async function action({ request }: ActionArgs) {
  return logout(request);
}

export async function loader() {
  return redirect('/');
}
