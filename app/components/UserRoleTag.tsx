import { Form } from '@remix-run/react';
import type { User } from '~/models/user.server';
import Button from '~/components/Button';

type Props = {
  /**
   * The role of the user.
   */
  role: User['role'];

  /**
   * The user's id.
   */
  id: User['id'];
};

export default function UserRoleTag({ role, id }: Props) {
  return (
    <Form
      id={`user-role-${id}`}
      method="post"
      action="/api/admin/role"
      className="flex flex-row gap-3"
    >
      <input type="hidden" name="userID" value={id} />
      <input type="hidden" name="userRole" value={role} />

      <span
        className={`rounded-lg border-2 p-2 ${
          role === 'EDITOR'
            ? 'border-secondary-200 bg-secondary-50 text-secondary-300'
            : 'border-primary bg-primary-200 text-primary-400'
        }`}
      >
        {role === 'EDITOR' ? 'Schrijver' : 'Beheerder'}
      </span>

      <Button
        form={`user-role-${id}`}
        primary={role === 'ADMIN'}
        submit
        width="w-32"
      >
        {role === 'EDITOR' ? 'Promoveren' : 'Degraderen'}
      </Button>
    </Form>
  );
}
