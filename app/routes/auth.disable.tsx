import type { LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { requireUser } from '~/session.server';
import { disableUserAuth } from '~/models/user.server';

export async function loader({ request }: LoaderArgs) {
  const user = await requireUser(request);

  await disableUserAuth(user.email);

  return redirect('/profiel/instellingen');
}
