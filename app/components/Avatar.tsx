import React from 'react';
import * as RadixAvatar from '@radix-ui/react-avatar';

type Props = {
  /**
   * Name of the user
   */
  name: string;

  /**
   * Image of the user
   */
  image?: string;

  /**
   * Size of the avatar
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Show the user's name
   */
  showName?: boolean;
};
export default function Avatar({
  name = '',
  image = '',
  size = 'small',
  showName = false,
}: Props) {
  const fallbackName = name
    .split(' ')
    .map((n) => n[0])
    .join('');

  let sizeClass = 'h-11 w-11';
  if (size === 'medium') {
    sizeClass = 'h-16 w-16';
  } else if (size === 'large') {
    sizeClass = 'h-20 w-20';
  }

  return (
    <div className="flex flex-row items-center gap-5">
      <RadixAvatar.Root
        className={`bg-blackA3 inline-flex ${sizeClass} select-none items-center justify-center overflow-hidden rounded-full align-middle`}
      >
        <RadixAvatar.Image
          className="h-full w-full rounded-[inherit] object-cover"
          src={image}
          alt={name}
        />

        <RadixAvatar.Fallback
          className="flex h-full w-full items-center justify-center bg-neutral-200 text-display-s text-white"
          delayMs={600}
        >
          {fallbackName}
        </RadixAvatar.Fallback>
      </RadixAvatar.Root>
      {showName ? <h2 className="text-display-l">{name}</h2> : null}
    </div>
  );
}
