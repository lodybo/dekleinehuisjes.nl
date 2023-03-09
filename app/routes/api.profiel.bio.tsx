import type { ActionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { requireUser } from '~/session.server';
import { updateUserBio } from '~/models/user.server';
import type { APIResponse } from '~/types/APIResponse';
import { getErrorMessage } from '~/utils';

export async function action({ request, params }: ActionArgs) {
  const user = await requireUser(request);
  const formData = await request.formData();

  const bio = formData.get('bio');

  invariant(typeof bio === 'string', 'Bio must be a string');

  try {
    await updateUserBio(user.email, bio);
  } catch (error) {
    const message = getErrorMessage(error);
    return json<APIResponse>({ ok: false, message });
  }

  return json<APIResponse>({ ok: true });
}
