import type { ActionArgs, NodeOnDiskFile } from '@remix-run/node';
import { json, unstable_parseMultipartFormData } from '@remix-run/node';
import { uploadHandler } from '~/models/images.server';
import { getErrorMessage } from '~/utils';
import { updateUserAvatar } from '~/models/user.server';
import { requireUser } from '~/session.server';
import type { APIResponse } from '~/types/APIResponse';

export async function action({ request }: ActionArgs) {
  const user = await requireUser(request);

  try {
    const formData = await unstable_parseMultipartFormData(
      request,
      uploadHandler
    );

    const avatarImage = formData.get('avatar-image') as NodeOnDiskFile | null;
    const avatarField = formData.get('avatar-field') as NodeOnDiskFile | null;

    let avatarURL: string;
    if (avatarImage) {
      avatarURL = avatarImage.name;
    } else if (avatarField) {
      avatarURL = avatarField.name;
    } else {
      return json<APIResponse>({
        ok: false,
        message: 'Er is geen afbeelding geüpload',
      });
    }

    await updateUserAvatar(user.email, avatarURL);
  } catch (e) {
    const message = getErrorMessage(e);
    return json<APIResponse>({ ok: false, message });
  }

  return json<APIResponse>({ ok: true });
}
