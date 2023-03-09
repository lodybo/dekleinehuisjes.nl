import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { generateSecret } from 'node-2fa';
import QRCode from 'qrcode';
import { requireUser } from '~/session.server';
import { enableUserAuth } from '~/models/user.server';

export async function loader({ request }: LoaderArgs) {
  const user = await requireUser(request);

  const { secret, uri } = generateSecret({
    name: 'De Kleine Huisjes',
    account: user.email,
  });

  await enableUserAuth(user.email, secret);

  // toDataURL returns a Promise.
  const qr = await QRCode.toDataURL(uri);

  return json({ secret, qr });
}
