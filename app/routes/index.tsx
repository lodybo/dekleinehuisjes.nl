import type { V2_MetaFunction } from '@remix-run/node';

export const meta: V2_MetaFunction = () => [
  {
    title: 'De Kleine Huisjes',
  },
];

export default function Index() {
  return (
    <main className="bg-white relative min-h-screen sm:flex sm:items-center sm:justify-center">
      <h1 className="text-headline-l uppercase">De Kleine Huisjes</h1>
    </main>
  );
}
