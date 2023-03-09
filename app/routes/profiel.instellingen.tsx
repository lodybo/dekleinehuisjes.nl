import { useActionData, useLoaderData } from '@remix-run/react';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { requireUser } from '~/session.server';
import {
  updateUserEmail,
  updateUserName,
  updateUserPassword,
} from '~/models/user.server';
import type { FormResponse } from '~/types/Responses';
import {
  validateEmail,
  validateName,
  validateUserPassword,
} from '~/validations';
import { AccountForm } from '~/components/AccountForm';
import AuthSettingsForm from '~/components/AuthSettingsForm';

export async function loader({ request }: LoaderArgs) {
  const user = await requireUser(request);

  return json({ user });
}

export async function action({ request }: ActionArgs) {
  const user = await requireUser(request);
  const formData = await request.formData();

  const {
    name,
    email,
    'new-password': newPassword,
    'password-verification': passwordVerification,
  } = Object.fromEntries(formData);

  const errors: Record<string, string> = {};

  if (user.name !== name) {
    if (!validateName(name)) {
      errors.name = 'De naam mag niet leeg zijn.';
    } else {
      await updateUserName(user.id, name);
    }
  }

  if (user.email !== email) {
    if (!validateEmail(email)) {
      errors.email = 'Het e-mailadres is leeg of ongeldig.';
    } else {
      await updateUserEmail(user.id, email);
    }
  }

  if (newPassword) {
    if (newPassword !== passwordVerification) {
      errors.passwordVerification = 'De wachtwoorden komen niet overeen.';
    } else {
      if (!validateUserPassword(newPassword)) {
        errors.newPassword = 'Het wachtwoord is ongeldig.';
      } else {
        await updateUserPassword(user.email, newPassword);
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    return json<FormResponse>({ ok: false, fields: errors }, { status: 400 });
  }

  return json<FormResponse>({ ok: true });
}

export default function ProfileEdit() {
  const { user } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <div className="mb-20 space-y-10">
      <AccountForm user={user} actionData={actionData} />

      <AuthSettingsForm hasAuth={user.authEnabled} />
    </div>
  );
}
