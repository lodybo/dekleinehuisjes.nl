import { Form, useLoaderData } from '@remix-run/react';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { requireUser } from '~/session.server';
import Button from '~/components/Button';
import Input from '~/components/Input';

export async function loader({ request }: LoaderArgs) {
  const user = await requireUser(request);

  return json({ user });
}

export default function ProfileEdit() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="profile-edit-screen mt-5 px-5">
      <div className="profile-edit-main pt-5">
        <Form
          className="flex flex-col gap-5"
          action="/routes/profiel.bewerken"
          method="post"
        >
          <div className="flex flex-col gap-2">
            <Input
              label="Naam"
              id="name"
              name="name"
              type="text"
              defaultValue={user.name}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Input
              label="E-mailadres"
              id="email"
              name="email"
              type="email"
              defaultValue={user.email}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Input
              label="Wachtwoord"
              id="password"
              name="password"
              type="password"
              placeholder="Laat leeg om het wachtwoord niet te wijzigen..."
            />
          </div>

          <Button submit>Opslaan</Button>
        </Form>
      </div>
    </div>
  );
}
