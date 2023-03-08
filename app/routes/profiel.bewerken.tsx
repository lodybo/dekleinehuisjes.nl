import { useLoaderData } from '@remix-run/react';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { requireUser } from '~/session.server';
import Avatar from '~/components/Avatar';
import AvatarUploadForm from '~/components/AvatarUploadForm';

export async function loader({ request }: LoaderArgs) {
  const user = await requireUser(request);

  return json({ user });
}

export default function ProfileEdit() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="mt-5 max-w-screen-lg px-5">
      <div className="pt-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-row items-center gap-5">
            <Avatar name={user.name} size="large" showName />
          </div>

          <AvatarUploadForm />
        </div>
      </div>
    </div>
  );
}
