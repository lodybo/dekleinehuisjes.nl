import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { requireAdminUser } from '~/session.server';
import { disableUserAuth } from '~/models/user.server';
import invariant from 'tiny-invariant';

export async function action({ request }: LoaderArgs) {
  await requireAdminUser(request);

  const formData = await request.formData();
  const userEmail = formData.get('userEmail');

  invariant(typeof userEmail === 'string', 'Missing user email');

  await disableUserAuth(userEmail);

  return json({});
}

export async function loader() {
  return redirect('/profiel');
}
