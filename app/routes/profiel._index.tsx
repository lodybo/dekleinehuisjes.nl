import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import RecipesTable from '~/components/RecipesTable';
import { requireUser } from '~/session.server';
import { getRecipesFromUser } from '~/models/recipe.server';
import { useLoaderData } from '@remix-run/react';
import Button from '~/components/Button';

export async function loader({ request }: LoaderArgs) {
  const user = await requireUser(request);

  const recipes = await getRecipesFromUser(user.id);

  return json({ recipes });
}

export default function ProfielIndexRoute() {
  const { recipes } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-display-s">Recepten</h2>
        <div className="w-48">
          <Button primary href="/profiel/recepten/nieuw">
            Nieuw recept
          </Button>
        </div>
      </div>
      {recipes && recipes.length > 0 ? (
        <RecipesTable recipes={recipes} />
      ) : (
        <p>Geen recepten gevonden</p>
      )}
    </>
  );
}
