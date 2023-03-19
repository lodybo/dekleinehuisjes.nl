import type { LoaderArgs } from '@remix-run/node';
import { requireUser } from '~/session.server';
import { getPostsForUser } from '~/models/posts.server';
import { useLoaderData } from '@remix-run/react';
import PostList from '~/components/PostList';
import Button from '~/components/Button';

export async function loader({ request }: LoaderArgs) {
  const user = await requireUser(request);
  const posts = await getPostsForUser(user.id);

  return { posts };
}
export default function ProfielPosts() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col space-y-6">
      <div className="w-32 self-end">
        <Button primary href="/post/nieuw">
          + Nieuwe post
        </Button>
      </div>
      <PostList posts={posts} />
    </div>
  );
}
