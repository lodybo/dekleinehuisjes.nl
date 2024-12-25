import type { LoaderArgs } from '@remix-run/node';
import { getPostBySlug } from '~/models/posts.server';
import invariant from 'tiny-invariant';
import { PostForm } from '~/components/PostForm';
import { useLoaderData } from '@remix-run/react';

export async function loader({ params }: LoaderArgs) {
  const { slug } = params;

  invariant(typeof slug === 'string', 'Slug is required');

  const post = await getPostBySlug(slug);

  return { post };
}

export default function EditPostPage() {
  const { post } = useLoaderData<typeof loader>();

  return <PostForm title={post.title} content={post.content} />;
}
