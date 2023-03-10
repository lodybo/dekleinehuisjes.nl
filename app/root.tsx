import type {
  LinksFunction,
  LoaderArgs,
  V2_MetaFunction as MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';

import { getUser } from './session.server';
import tailwindStylesheetUrl from './styles/tailwind.css';
import Document from '~/components/Document';
import { Outlet } from '@remix-run/react';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: tailwindStylesheetUrl },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;600;700&display=swap',
    },
  ];
};

export const meta: MetaFunction = () => [
  {
    charset: 'utf-8',
    title: 'De Kleine Huisjes',
    viewport: 'width=device-width,initial-scale=1',
  },
];

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  });
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document>
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Error</h1>
        <p className="mt-4">Something went wrong</p>
      </div>
    </Document>
  );
}
