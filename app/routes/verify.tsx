import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useActionData, Form } from '@remix-run/react';
import { verifyToken } from 'node-2fa';
import { getUser, verifyLogin } from '~/session.server';
import AuthVerificationForm from '~/components/AuthVerificationForm';
import { validateAuthToken } from '~/validations';
import type { APIResponse } from '~/types/Responses';
import invariant from 'tiny-invariant';

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);

  if (!user) {
    return redirect('/login');
  }

  if (!user.authEnabled) {
    return redirect('/profiel');
  }

  return json(null);
}

export async function action({ request }: ActionArgs) {
  const user = await getUser(request);

  if (!user) return redirect('/login');

  const formData = await request.formData();

  const code = formData.get('code');

  if (!validateAuthToken(code)) {
    return json<APIResponse>(
      { ok: false, message: 'De code is ongeldig' },
      { status: 400 }
    );
  }

  invariant(user.authEnabled, "User hasn't enabled 2FA.");

  const verified = verifyToken(user.authSecret as string, code);

  if (!verified) {
    return json<APIResponse>(
      { ok: false, message: 'De code is verkeerd. Probeer het opnieuw.' },
      { status: 400 }
    );
  }

  return verifyLogin(request, '/profiel');
}

export default function VerifyRoute() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="mx-auto flex h-full max-w-xl flex-col items-center justify-center gap-3">
      <h1 className="text-display-l">Authenticatie</h1>
      <p className="mb-10 text-title-l">
        Vul de eenmalige code uit je authenticator app in.
      </p>
      <AuthVerificationForm Form={Form} actionData={actionData} />
    </div>
  );
}
