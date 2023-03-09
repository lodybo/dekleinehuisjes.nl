import { Form, useActionData, useLoaderData } from '@remix-run/react';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { requireUser } from '~/session.server';
import Button from '~/components/Button';
import Input from '~/components/Input';
import {
  updateUserEmail,
  updateUserName,
  updateUserPassword,
} from '~/models/user.server';
import type { FormResponse, ErrorFields } from '~/types/Responses';
import {
  validateEmail,
  validateName,
  validateUserPassword,
} from '~/validations';

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

  const fields: ErrorFields | undefined = !actionData?.ok
    ? actionData?.fields
    : {};

  return (
    <div className="profile-edit-screen mt-5 px-5">
      <div className="profile-edit-main pt-5">
        <Form className="flex flex-col gap-5" method="post" noValidate>
          <div className="flex flex-col gap-2">
            <Input
              label="Naam"
              id="name"
              name="name"
              type="text"
              defaultValue={user.name}
              aria-invalid={fields?.name ? 'true' : undefined}
              aria-describedby={fields?.name ? 'name-error' : undefined}
            />
            {fields?.name && (
              <p id="name-error" className="text-red">
                {fields.name}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Input
              label="E-mailadres"
              id="email"
              name="email"
              type="email"
              defaultValue={user.email}
              aria-invalid={fields?.email ? 'true' : undefined}
              aria-describedby={fields?.email ? 'email-error' : undefined}
            />
            {fields?.email && (
              <p id="email-error" className="text-red">
                {fields.email}
              </p>
            )}
          </div>

          <fieldset className="flex flex-col border border-neutral-200 px-5 py-2">
            <legend className="w-min px-4 text-title-l text-neutral">
              Wachtwoord
            </legend>
            <p className="mb-2">
              Wil je het wachtwoord wijzigen? Vul het dan hieronder in. Laat de
              velden leeg als je je huidige wachtwoord wilt behouden.
            </p>
            <div className="flex w-full flex-row gap-4">
              <div className="flex w-1/2 flex-col gap-2">
                <Input
                  label="Nieuw wachtwoord"
                  id="password"
                  name="new-password"
                  type="password"
                  autoComplete="new-password"
                  aria-invalid={fields?.newPassword ? 'true' : undefined}
                  aria-describedby={
                    fields?.newPassword ? 'new-password-error' : undefined
                  }
                />
                {fields?.newPassword && (
                  <p id="new-password-error" className="text-red">
                    {fields.newPassword}
                  </p>
                )}
              </div>

              <div className="flex w-1/2 flex-col gap-2">
                <Input
                  label="Nieuw wachtwoord controle"
                  id="password"
                  name="password-verification"
                  type="password"
                  autoComplete="new-password"
                  aria-invalid={
                    fields?.passwordVerification ? 'true' : undefined
                  }
                  aria-describedby={
                    fields?.passwordVerification
                      ? 'password-verification-error'
                      : undefined
                  }
                />
                {fields?.passwordVerification && (
                  <p id="password-verification-error" className="text-red">
                    {fields.passwordVerification}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          <div className="flex flex-row">
            <div className="w-full">
              {actionData?.ok && (
                <p className="text-headline-s text-green">
                  De instellingen zijn opgeslagen.
                </p>
              )}
            </div>

            <div className="w-32 self-end">
              <Button submit>Opslaan</Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
