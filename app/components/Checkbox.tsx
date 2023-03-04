import React from 'react';
import type { ReactNode } from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import Icon from '~/components/Icon';

type Props = {
  children: ReactNode;
};

export default function Checkbox({ children }: Props) {
  return (
    <form>
      <div className="flex items-center">
        <RadixCheckbox.Root
          className="flex h-6 w-6 appearance-none items-center justify-center rounded-sm border-2 border-neutral bg-white outline-none ring-offset-2 focus:ring"
          defaultChecked
          id="c1"
        >
          <RadixCheckbox.Indicator className="text-neutral-300">
            <Icon name="check" />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        <label className="cursor-pointer pl-4 leading-none" htmlFor="c1">
          {children}
        </label>
      </div>
    </form>
  );
}
