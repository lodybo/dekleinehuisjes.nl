import { useState } from 'react';
import * as Toast from '@radix-ui/react-toast';
import CloseButton from '~/components/CloseButton';

type Props = {
  /**
   * The title of the notification.
   */
  title: string;

  /**
   * The description of the notification.
   */
  description: string;

  /**
   * Whether the notification is dismissible or not.
   */
  dismissible?: boolean;

  /**
   * The notification's open state.
   */
  open?: boolean;

  /**
   * The notification's open change handler.
   */
  onOpenChange?: (open: boolean) => void;
};

export default function Notification({
  title,
  description,
  dismissible = false,
  open = false,
  onOpenChange,
}: Props) {
  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className="relative grid grid-cols-[auto_max-content] items-center gap-x-4 rounded-xl border border-neutral-200 px-2.5 py-4 shadow [grid-template-areas:_'title_action'_'description_action'] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
        open={open}
        onOpenChange={onOpenChange}
      >
        <Toast.Title className="mb-1 text-title-l font-medium text-neutral [grid-area:_title]">
          {title}
        </Toast.Title>
        <Toast.Description className="m-0 text-neutral-300 text-stone [grid-area:_description]">
          {description}
        </Toast.Description>

        {dismissible ? (
          <Toast.Close>
            <CloseButton />
          </Toast.Close>
        ) : null}
      </Toast.Root>

      <Toast.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
    </Toast.Provider>
  );
}
