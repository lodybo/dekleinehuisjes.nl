import { prisma } from '~/db.server';

export async function getRecipesFromUser(userId: string) {
  return prisma.recipe.findMany({
    where: {
      chefId: userId,
    },
  });
}
