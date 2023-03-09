import { Form } from '@remix-run/react';
import Input from '~/components/Input';
import Button from '~/components/Button';
import type { ErrorFields, FormResponse } from '~/types/Responses';
import type { User } from '~/models/user.server';

type Props = {
  user: User;
  actionData: FormResponse | undefined;
};

export function AccountForm({ user, actionData }: Props) {
  const fields: ErrorFields | undefined = !actionData?.ok
    ? actionData?.fields
    : {};

  return (
    <Form className="flex flex-col gap-5" method="post" noValidate>
      <h2 className="text-display-m">Account instellingen</h2>
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
              aria-invalid={fields?.passwordVerification ? 'true' : undefined}
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
  );
}
