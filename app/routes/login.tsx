import * as React from 'react';
import type { ActionArgs, LoaderArgs, V2_MetaFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, Link, useActionData, useSearchParams } from '@remix-run/react';
import Input from '~/components/input';

import { verifyLogin } from '~/models/user.server';
import { createUserSession, getUserId } from '~/session.server';
import { safeRedirect, validateEmail } from '~/utils';
import Checkbox from '~/components/Checkbox';
import Button from '~/components/Button';

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect('/profiel');
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  const redirectTo = safeRedirect(formData.get('redirectTo'), '/');
  const remember = formData.get('remember');

  if (!validateEmail(email)) {
    return json(
      { errors: { email: 'Het e-mailadres is ongeldig', password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== 'string' || password.length === 0) {
    return json(
      { errors: { password: 'Het wachtwoord is verplicht', email: null } },
      { status: 400 }
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json(
      { errors: { email: 'Geen gebruiker bekend', password: null } },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === 'on',
    redirectTo,
  });
}

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: 'Inloggen op De Kleine Huisjes',
    },
  ];
};

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/profiel';
  const actionData = useActionData<typeof action>();
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <Form method="post" className="space-y-6" noValidate>
          <div>
            <label
              htmlFor="email"
              className="text-sm text-gray-700 block font-medium"
            >
              E-mailadress
            </label>
            <div className="mt-1">
              <Input
                ref={emailRef}
                id="email"
                required
                autoFocus={true}
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-describedby="email-error"
                className="border-gray-500 text-lg w-full rounded border px-2 py-1"
              />
              {actionData?.errors?.email && (
                <div className="text-red-700 pt-1" id="email-error">
                  {actionData.errors.email}
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm text-gray-700 block font-medium"
            >
              Wachtwoord
            </label>
            <div className="mt-1">
              <Input
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
                className="border-gray-500 text-lg w-full rounded border px-2 py-1"
              />
              {actionData?.errors?.password && (
                <div className="text-red-700 pt-1" id="password-error">
                  {actionData.errors.password}
                </div>
              )}
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <Button submit primary>
            Inloggen
          </Button>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox>Herinner me</Checkbox>
            </div>
            <div className="text-sm text-gray-500 text-center">
              Heb je geen account?{' '}
              <Link
                className="text-blue-500 underline"
                to={{
                  pathname: '/join',
                  search: searchParams.toString(),
                }}
              >
                Opgeven
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
