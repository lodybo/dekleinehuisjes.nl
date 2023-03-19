import type { LinkProps } from '@remix-run/react';
import { Link } from '@remix-run/react';

type Props = LinkProps;

export default function Anchor({ to, className, ...props }: Props) {
  return (
    <Link
      className={`${className} border-b border-b-primary text-primary transition hover:text-primary-300`}
      to={to}
      {...props}
    >
      {props.children}
    </Link>
  );
}
