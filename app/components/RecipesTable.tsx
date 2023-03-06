import type { Recipe } from '@prisma/client';
import type { SerializeFrom } from '@remix-run/node';
import { Link } from '@remix-run/react';

type Props = {
  recipes: SerializeFrom<Recipe[]>;
};

export default function RecipesTable({ recipes }: Props) {
  return (
    <ul className="max-w-md">
      {recipes.map((recipe) => (
        <li
          className="w-full cursor-pointer border-b border-b-neutral-200 p-2 transition-all hover:border-b-neutral-300 hover:pl-3"
          key={recipe.id}
        >
          <Link
            className="inline-block w-full"
            to={`/profiel/recepten/${recipe.id}`}
          >
            {recipe.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
