import * as Dialog from '@radix-ui/react-dialog';
import Button from '~/components/Button';
import Icon from '~/components/Icon';
import CloseButton from '~/components/CloseButton';

type Props = {
  /**
   * The contents of the modal.
   */
  children: React.ReactNode;

  /**
   * The title of the modal.
   */
  title: string;

  /**
   * The description of the modal.
   */
  description: string;

  /**
   * The caption of the trigger button.
   */
  caption: string;

  /**
   * Whether the modal is open or not.
   */
  open?: boolean;

  /**
   * The modal's open change handler.
   */
  onOpenChange?: (open: boolean) => void;
};

export default function Modal({
  caption,
  title,
  description,
  children,
  open = false,
  onOpenChange,
}: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <Button width="w-60">{caption}</Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-primary opacity-50 data-[state=open]:animate-overlayShow" />

        <Dialog.Content className="fixed top-[50%] left-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-title-l text-stone">
            {title}
          </Dialog.Title>
          <Dialog.Description className="mt-5 mb-7 text-stone">
            {description}
          </Dialog.Description>
          {children}
          <Dialog.Close>
            <CloseButton />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
