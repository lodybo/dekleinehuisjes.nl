import { PrismaClient } from '@prisma/client';
import type { Recipe } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seed() {
  const arantja = await createUser('arantja');
  const kaylee = await createUser('kaylee');
  const tilai = await createUser('tilai');
  const levy = await createUser('levy');

  // create 2 recipes for each user
  const recipes: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      title: 'Pasta with tomato sauce',
      description: 'This is a delicious pasta with tomato sauce',
      ingredients: ['Pasta', 'tomato sauce'],
      steps: ['Boil pasta', 'mix with tomato sauce'],
      persons: 2,
      time: 30,
      categories: ['Italian', 'Pasta'],
      chefId: arantja.id,
    },
    {
      title: 'Fried rice with egg',
      description: 'This is a delicious fried rice with egg',
      ingredients: ['Rice', 'egg'],
      steps: ['Fry rice', 'add egg'],
      persons: 4,
      time: 15,
      categories: ['Chinese', 'Rice'],
      chefId: kaylee.id,
    },
    {
      title: 'Pancakes with chocolate',
      description: 'This is a delicious pancakes with chocolate',
      ingredients: ['Pancakes', 'chocolate'],
      steps: ['Fry pancakes', 'add chocolate'],
      persons: 6,
      time: 20,
      categories: ['Dutch', 'Pancakes'],
      chefId: tilai.id,
    },
    {
      title: 'Pizza with ham',
      description: 'This is a delicious pizza with ham',
      ingredients: ['Pizza', 'ham'],
      steps: ['Bake pizza', 'add ham'],
      persons: 2,
      time: 30,
      categories: ['Italian', 'Pizza'],
      chefId: levy.id,
    },
  ];

  for (const recipe of recipes) {
    await prisma.recipe.create({ data: recipe });
  }

  console.log(`Database has been seeded. 🌱`);
}

async function createUser(name: string) {
  return prisma.user.create({
    data: {
      name: capitalize(name),
      email: `${name}@dkh.nl`,
      bio: `Hello, I am ${name}`,
      password: {
        create: {
          hash: await bcrypt.hash(name, 10),
        },
      },
    },
  });
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
