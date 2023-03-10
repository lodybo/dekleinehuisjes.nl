import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { requireAdminUser } from '~/session.server';
import invariant from 'tiny-invariant';
import { countAdminUsers, updateUserRole } from '~/models/user.server';

export async function action({ request }: ActionArgs) {
  await requireAdminUser(request);

  const formData = await request.formData();
  const userID = formData.get('userID');
  const role = formData.get('userRole');

  invariant(typeof userID === 'string', 'Missing user ID');
  invariant(typeof role === 'string', 'Missing user role');

  if (role === 'EDITOR') {
    await updateUserRole(userID, 'ADMIN');
  } else {
    const adminUsers = await countAdminUsers();
    invariant(adminUsers > 1, 'Cannot remove last admin user');
    await updateUserRole(userID, 'EDITOR');
  }

  return redirect('/admin/gebruikers');
}

export async function loader() {
  return redirect('/profiel');
}
