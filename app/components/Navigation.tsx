import { Link } from '@remix-run/react';
import * as RadixNavigationMenu from '@radix-ui/react-navigation-menu';
export default function Navigation() {
  return (
    <RadixNavigationMenu.Root className="h-18 relative z-10 flex w-full">
      <RadixNavigationMenu.List className="m-0 flex h-full list-none place-items-center justify-between rounded bg-white p-5 shadow">
        <RadixNavigationMenu.Item>
          <NavigationLink href="/">De Kleine Huisjes</NavigationLink>
        </RadixNavigationMenu.Item>

        <RadixNavigationMenu.Item>
          <NavigationLink href="/login">Inloggen</NavigationLink>
        </RadixNavigationMenu.Item>
      </RadixNavigationMenu.List>
    </RadixNavigationMenu.Root>
  );
}

type LinkProps = RadixNavigationMenu.NavigationMenuLinkProps;
const NavigationLink = ({ href = '', children }: LinkProps) => {
  return (
    <RadixNavigationMenu.Link>
      <Link className="text-stone" to={href}>
        {children}
      </Link>
    </RadixNavigationMenu.Link>
  );
};
