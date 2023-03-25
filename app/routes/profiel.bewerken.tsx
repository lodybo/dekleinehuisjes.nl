import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { requireUser } from '~/session.server';
import Avatar from '~/components/Avatar';
import AvatarUploadForm from '~/components/AvatarUploadForm';
import { useMatchesData } from '~/utils';
import type { User } from '~/models/user.server';
import BiographyEditor from '~/components/BiographyEditor';

export async function loader({ request }: LoaderArgs) {
  await requireUser(request);

  return json({});
}

export default function ProfileEdit() {
  const data = useMatchesData('routes/profiel');
  const user = data?.user as User;

  return (
    <div className="mt-5 max-w-screen-lg px-5">
      <div className="pt-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-row items-center gap-5">
            <Avatar
              name={user.name}
              image={user.avatar}
              size="large"
              showName
            />
          </div>

          <AvatarUploadForm />

          <h2 className="text-display-m">Jouw bio</h2>
          <BiographyEditor biography={user.bio} />
        </div>
      </div>
    </div>
  );
}
