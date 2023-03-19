import { Post, PrismaClient } from '@prisma/client';
import type { Recipe, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seed() {
  const arantja = await createUser('arantja');
  const kaylee = await createUser('kaylee');
  const tilai = await createUser('tilai');
  const levy = await createUser('levy');
  await createUser('lody', 'ADMIN');

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

  // create 2 posts for each user
  const posts: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      title: 'Hello world',
      content: 'This is my first post',
      slug: 'hello-world',
      published: false,
      authorId: arantja.id,
    },
    {
      title: 'Lorem ipsum',
      content:
        'Lorem <strong>ipsum</strong> dolor sit amet, consectetur adipiscing elit.',
      slug: 'lorem-ipsum',
      published: true,
      authorId: kaylee.id,
    },
    {
      title: 'Dolor sit amet',
      content: 'Dolor sit amet, consectetur adipiscing elit.',
      slug: 'dolor-sit-amet',
      published: true,
      authorId: tilai.id,
    },
    {
      title: 'Consectetur adipiscing',
      content: 'Consectetur adipiscing elit.',
      slug: 'consectetur-adipiscing',
      published: true,
      authorId: levy.id,
    },
  ];

  for (const post of posts) {
    await createPost(post);
  }

  console.log(`Database has been seeded. 🌱`);
}

async function createUser(name: string, role: Role = 'EDITOR') {
  return prisma.user.create({
    data: {
      name: capitalize(name),
      email: `${name}@dkh.nl`,
      bio: `Hello, I am ${name}`,
      avatar: 'https://api.dicebear.com/5.x/avataaars/svg',
      role,
      password: {
        create: {
          hash: await bcrypt.hash(`${name}iscool`, 10),
        },
      },
    },
  });
}

async function createPost({
  title,
  content,
  slug,
  published,
  authorId,
}: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) {
  return prisma.post.create({
    data: {
      title,
      content,
      slug,
      published,
      author: {
        connect: { id: authorId },
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
