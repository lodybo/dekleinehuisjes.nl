import type { V2_MetaFunction } from '@remix-run/node';

export const meta: V2_MetaFunction = () => [
  {
    title: 'De Kleine Huisjes',
  },
];

export default function _index() {
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <h1 className="text-display-l uppercase">De Kleine Huisjes</h1>
    </main>
  );
}
