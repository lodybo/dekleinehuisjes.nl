import type { ActionArgs, NodeOnDiskFile } from '@remix-run/node';
import { json, unstable_parseMultipartFormData } from '@remix-run/node';
import { uploadHandler } from '~/models/images.server';
import { getErrorMessage } from '~/utils';
import { requireUser } from '~/session.server';
import type { APIResponse, ImageUploadResponse } from '~/types/Responses';

export async function action({ request }: ActionArgs) {
  const user = await requireUser(request);

  let image: NodeOnDiskFile | null = null;
  try {
    const formData = await unstable_parseMultipartFormData(
      request,
      uploadHandler
    );

    image = formData.get('file') as NodeOnDiskFile | null;
  } catch (e) {
    const message = getErrorMessage(e);
    return json<APIResponse>({ ok: false, message });
  }

  if (!image) {
    return json<APIResponse>({
      ok: false,
      message: 'Er is geen afbeelding geüpload',
    });
  }

  return json<ImageUploadResponse>({ location: `/image/${image.name}` });
}
