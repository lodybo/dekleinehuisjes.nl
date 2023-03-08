import type { ActionArgs, NodeOnDiskFile } from '@remix-run/node';
import { json } from '@remix-run/node';
import { unstable_parseMultipartFormData } from '@remix-run/node';
import { uploadHandler } from '~/models/images.server';
import { getErrorMessage } from '~/utils';
import { updateUserAvatar } from '~/models/user.server';
import { requireUser } from '~/session.server';

interface UploadResponse {
  ok: boolean;
}

interface SuccessResponse extends UploadResponse {
  ok: true;
}

interface ErrorResponse extends UploadResponse {
  ok: false;
  message: string;
}

export type ImageUploadResponse = SuccessResponse | ErrorResponse;

export async function action({ request }: ActionArgs) {
  const user = await requireUser(request);

  try {
    const formData = await unstable_parseMultipartFormData(
      request,
      uploadHandler
    );

    const avatarImage = formData.get('avatar-image') as NodeOnDiskFile | null;
    const avatarField = formData.get('avatar-field') as NodeOnDiskFile | null;

    console.log({ avatarImage, avatarField });
    let avatarURL: string;
    if (avatarImage) {
      avatarURL = avatarImage.name;
    } else if (avatarField) {
      avatarURL = avatarField.name;
    } else {
      return json<ImageUploadResponse>({
        ok: false,
        message: 'Er is geen afbeelding geüpload',
      });
    }

    await updateUserAvatar(user.email, avatarURL);
  } catch (e) {
    const message = getErrorMessage(e);
    return json<ImageUploadResponse>({ ok: false, message });
  }

  return json<ImageUploadResponse>({ ok: true });
}
