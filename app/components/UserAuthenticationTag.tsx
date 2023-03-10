import { Form } from '@remix-run/react';
import type { User } from '~/models/user.server';
import Button from '~/components/Button';

type Props = {
  /**
   * The role of the user.
   */
  hasAuth: User['authEnabled'];

  /**
   * The user's id.
   */
  email: User['email'];
};

export default function UserAuthenticationTag({ hasAuth, email }: Props) {
  return (
    <Form
      id={`user-auth-${email}`}
      method="post"
      action="/api/admin/auth/disable"
      className="flex flex-row gap-3"
    >
      <input type="hidden" name="userEmail" value={email} />

      <span
        className={`rounded-lg p-2 ${
          hasAuth ? 'border-2 border-green text-green' : ''
        }`}
      >
        {hasAuth ? 'Aan' : 'Uit'}
      </span>

      {hasAuth ? (
        <Button form={`user-auth-${email}`} danger submit width="w-32">
          Zet uit
        </Button>
      ) : null}
    </Form>
  );
}
