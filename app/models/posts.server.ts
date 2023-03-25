import type { SerializeFrom } from '@remix-run/node';
import type { Post as PrismaPost } from '@prisma/client';
import { prisma } from '~/db.server';

export type Post = SerializeFrom<PrismaPost>;

export function getPosts() {
  return prisma.post.findMany();
}

export function getPostsForUser(userId: string) {
  return prisma.post.findMany({
    where: {
      authorId: userId,
    },
  });
}

export function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: {
      slug,
    },
  });
}

export function createPost(
  title: string,
  content: string,
  slug: string,
  authorId: string,
  published: boolean
) {
  return prisma.post.create({
    data: {
      title,
      content,
      slug,
      published,
      author: {
        connect: {
          id: authorId,
        },
      },
    },
  });
}
