import type { User } from '~/models/user.server';
import Avatar from '~/components/Avatar';
import UserRoleTag from '~/components/UserRoleTag';
import UserAuthenticationTag from '~/components/UserAuthenticationTag';

type Props = {
  users: User[];
};

export default function UserList({ users }: Props) {
  return (
    <>
      <table className="w-full table-fixed">
        <thead>
          <tr>
            <th className="pl-14 text-left">Naam</th>
            <th className="text-left">Rol</th>
            <th className="text-left">Authenticator</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="flex flex-row items-center gap-2">
                <Avatar name={user.name} image={user.avatar} size="small" />
                <span>{user.name}</span>
              </td>
              <td>
                <UserRoleTag role={user.role} id={user.id} />
              </td>
              <td>
                <UserAuthenticationTag
                  hasAuth={user.authEnabled}
                  email={user.email}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
