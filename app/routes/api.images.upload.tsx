import type { ActionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { unstable_parseMultipartFormData } from '@remix-run/node';
import { uploadHandler } from '~/models/images.server';

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
  await unstable_parseMultipartFormData(request, uploadHandler);

  await sleep(2000);

  return json<ImageUploadResponse>({ ok: true });
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
