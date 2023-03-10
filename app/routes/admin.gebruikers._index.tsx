import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import UserList from '~/components/UserList';
import { getUsers } from '~/models/user.server';

export async function loader() {
  const users = await getUsers();

  return json({ users });
}

export default function UserListRoute() {
  const { users } = useLoaderData<typeof loader>();
  return <UserList users={users} />;
}
