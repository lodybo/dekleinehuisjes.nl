import { Link } from '@remix-run/react';
import type { Post } from '~/models/posts.server';
import Icon from '~/components/Icon';
import Anchor from '~/components/Anchor';

type Props = {
  posts: Post[];
};

export default function PostList({ posts }: Props) {
  return (
    <ul className="w-full space-y-6">
      {posts.map((post) => (
        <li key={post.id} className="flex w-full flex-row justify-between">
          <h2 className="flex-1 text-display-s">
            <Anchor to={`/posts/${post.slug}`}>{post.title}</Anchor>
          </h2>

          {!post.published ? (
            <div className="flex flex-1 justify-center">
              <span className="rounded-lg border border-secondary-50 px-5 py-2.5 capitalize text-secondary-100">
                Ongepubliceerd
              </span>
            </div>
          ) : null}

          <div className="flex flex-1 flex-row justify-end gap-2">
            <Link to={`/post/${post.slug}/bewerken`}>
              <button className="h-full rounded-lg bg-blue px-5 text-white">
                <Icon prefix="far" name="pen-to-square" />
              </button>
            </Link>

            <button className="h-full rounded-lg bg-red px-5 text-white">
              <Icon name="trash-alt" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
