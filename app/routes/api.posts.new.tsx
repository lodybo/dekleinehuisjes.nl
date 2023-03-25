import type { ActionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import invariant from 'tiny-invariant';
import sanitizeHtml from 'sanitize-html';
import slugify from 'slugify';
import type { APIResponse } from '~/types/Responses';
import { getErrorMessage } from '~/utils';
import { createPost } from '~/models/posts.server';
import { requireUser } from '~/session.server';

export async function action({ request }: ActionArgs) {
  const user = await requireUser(request);
  const formData = await request.formData();
  const title = formData.get('post_title');
  const content = formData.get('post_content');
  const publish = formData.get('post_publish') === 'true';

  invariant(!!title && typeof title === 'string', 'No title provided');
  invariant(!!content && typeof content === 'string', 'No content provided');

  const sanitizedContent = sanitizeHtml(content);
  const slug = slugify(title);

  try {
    await createPost(title, sanitizedContent, slug, user.id, publish);
  } catch (error) {
    const message = getErrorMessage(error);
    return json<APIResponse>({ ok: false, message });
  }

  return json<APIResponse>({ ok: true });
}
